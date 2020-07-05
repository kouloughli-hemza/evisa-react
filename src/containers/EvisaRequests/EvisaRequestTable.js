import React, { Component} from 'react';
import {connect } from 'react-redux';
import IndexPagination from '../../components/EvisaResources/IndexPagination';
import {debounce} from 'lodash';

import {
    Page,
    Card,
    Pagination,
    Filters,
    ChoiceList,
    DataTable,
    Avatar, Badge
} from '@shopify/polaris';
import {evisaTypes, gettingEvisaRequests, initAgencies, initDestinations} from "../../store/actions";
import SelectBoxFilter from '../../components/EvisaResources/SelectBoxFilter/SelectBoxFilter';

const resourceName = {
    singular: 'Evisa',
    plural: 'Evisas',
};
const sortOptions = [
    { label: 'Récent', value: 'DATE_CREATED_DESC' },
    { label: 'Ancien', value: 'DATE_CREATED_ASC' },
];

class EvisaRequestTable extends Component {


    state = {
        sortValue: 'DATE_MODIFIED_DESC',
        appliedFilters: [],
        searchValue: '',
        status : null,
        isFirstPage: true,
        isLastPage: false,
        selectedAgency: '',
        selectedDestination:'',
        destinationQuery : '',
        selectedQueryDestination :'',
        agencyQuery : '',
        selectedQueryAgency :'',
        selectedQueryEvisaTypes : '',
        evisaTypesQuery : '',
    };


    componentDidMount() {
        this.props.onGetRequests({});
    }

    render(){
        const rows = this.props.evisaRequests.map(request => {
            let evisa_status_css_class = '';
            let progress = '';

            switch (request.evisa_original_status) {
                case "pending":
                    progress = 'incomplete';
                    evisa_status_css_class = 'info';
                    break;
                case "processing" :
                    progress = 'partiallyComplete';
                    evisa_status_css_class = 'attention';
                    break;
                case "accepted" :
                    progress = 'complete';
                    evisa_status_css_class = 'success';
                    break;
                default :
                    progress = 'complete';
                    evisa_status_css_class = 'warning';
                    break;
            }
            let finalObject = {
                    //avatar : <Avatar source={request.evisa.agency.avatar} size="medium" initials={request.evisa.agency.name.charAt(0)}  />,
                    tpr : request.id,
                    date : request.created_at,
                    agencyName : request.evisa.agency.name,
                    destination:request.evisa.destination.name,
                    type : request.evisa.type,
                    traveller : request.first_name + ' ' + request.last_name,
                    price : request.evisa.formated_sale_price,
                    evisa_status : <Badge progress={progress} status={evisa_status_css_class}>{request.evisa_status}</Badge>
                };
            return Object.values(finalObject);
        });
        const {
            sortValue,
            searchValue,
            status,
            selectedQueryDestination,
            destinationQuery,
            agencyQuery,
            selectedQueryAgency,
            selectedQueryEvisaTypes,
            evisaTypesQuery
        } = this.state;

        const agencyFilter = this.props.authUser.evisa_settings_permission === true ? (
            <SelectBoxFilter options={this.props.agencies}
                             handleInputChange={this.handleAgencyQuery}
                             loading={this.props.loadingAgencies}
                             err = {this.props.errAgencies}
                             inputValue = {this.state.agencyQuery}
                             selected={this.state.selectedQueryAgency}
                             handleSelect={this.handleSelectQueryAgency}
                             placeholder='Rechercher une agence'
                             emptyState='Aucune agence trouvée !'

            />) : null;
        const availableFilters = [
            {
                key: 'status',
                label: 'Status',
                operatorText: 'is greater than',
                filter: (
                    <ChoiceList
                        title="Account status"
                        titleHidden
                        choices={[
                            {label: 'En attente', value: 'pending'},
                            {label: 'En cours', value: 'processing'},
                            {label: 'Accordé', value: 'accepted'},
                            {label: 'Refusé', value: 'refused'},
                            {label: 'Annulé', value: 'cancelled'},
                        ]}
                        selected={this.state.status || []}
                        onChange={this.handleAccountStatusChange}

                    />
                ),
                shortcut: true,
            },
            {
                key: 'agence',
                label: 'Agence',
                filter : agencyFilter
            },
            {
                key: 'destination',
                label: 'Destination',
                filter : (
                    <SelectBoxFilter options={this.props.destinations}
                                     handleInputChange={this.handleDestinationQuery}
                                     loading={this.props.loadingDestinations}
                                     err = {this.props.errDestinations}
                                     inputValue = {this.state.destinationQuery}
                                     selected={this.state.selectedQueryDestination}
                                     handleSelect={this.handleSelectQueryDestination}
                                     placeholder='Rechercher une destination'
                                     emptyState='Aucune destintion trouvée !'

                    />
                )
            },

            {
                key: 'evisaType',
                label: 'Type Evisa',
                filter : (
                    <SelectBoxFilter options={this.props.evisaTypes || []}
                                     handleInputChange={this.handleEvisaTypeQuery}
                                     loading={this.props.loadingTypes}
                                     err = {this.props.errTypes}
                                     inputValue = {this.state.evisaTypesQuery}
                                     selected={this.state.selectedQueryEvisaTypes}
                                     handleSelect={this.handleSelectQueryEvisaTypes}
                                     placeholder='Rechercher un type'
                                     emptyState='Aucun type trouvé !'

                    />
                )
            },
        ];


        const appliedFilters = [];
        if (!this.isEmpty(status)) {
            const key = 'status';
            let title = null;
            switch (status[0]) {

                case 'pending' :
                    title = 'En attente';
                    break;
                case 'processing' :
                    title = 'En cours';
                    break;
                case 'accepted' :
                    title = 'Accordé';
                    break;
                case 'refused' :
                    title = 'Refusé';
                    break;
                case 'cancelled' :
                    title = 'Annulé';
                    break;
                default :
                    title = '';
            }
            appliedFilters.push({
                key,
                label: 'Evisa ' + ' ' + title,
                onRemove: this.handleAccountStatusRemove,
            });

        }
        if (!this.isEmpty(selectedQueryAgency)) {
            const key = 'selectedAgency';
            appliedFilters.push({
                key,
                label: 'Agence' + ' ' + agencyQuery,
                onRemove: this.handleAgencyRemove,
            });
        }
        if (!this.isEmpty(selectedQueryDestination)) {
            const key = 'selectedQueryDestination';
            appliedFilters.push({
                key,
                label: 'Destination' + ' ' + destinationQuery,
                onRemove: this.handleDestinationRemove,
            });
        }
        if (!this.isEmpty(selectedQueryEvisaTypes)) {
            const key = 'selectedQueryEvisaTypes';
            appliedFilters.push({
                key,
                label: 'Type: ' + ' ' + evisaTypesQuery,
                onRemove: this.handleEvisaTypesRemove,
            });
        }


        const paginationMarkup = this.props.evisaRequests.length > 0
            ? (
                <IndexPagination>
                    <Pagination
                        hasPrevious={this.props.meta.prev_page_url !== null}
                        hasNext={this.props.meta.next_page_url !== null}
                        onPrevious={this.handlePreviousPage}
                        onNext={this.handleNextPage}
                    />
                </IndexPagination>
            )
            : null;



        return (
            <Page title="Mes demandes"
                  breadcrumbs={[{content: 'Acceuil', url: '/home'}]}
                  primaryAction={{content: 'Nouvelle demande', disabled: false,url:'/evisa'}}
            >

                    <Card sectioned>
                        <Card.Subsection>
                            <Filters
                                queryPlaceholder='Trouver un voyageur'
                                onClearAll={this.clearAllFilters}
                                resourceName={resourceName}
                                filters={availableFilters}
                                appliedFilters={appliedFilters}
                                onFiltersChange={this.handleFiltersChange}
                                queryValue={searchValue}
                                onQueryChange={this.handleSearchChange}

                            />
                        </Card.Subsection>
                        <Card.Subsection>
                            <DataTable
                                columnContentTypes={[
                                    'numeric',
                                    'date',
                                    'text',
                                    'text',
                                    'text',
                                    'text',
                                    'numeric',
                                    'text',
                                ]}
                                headings={[
                                    'TPR',
                                    'Date',
                                    'Agence',
                                    'Destination',
                                    'Type',
                                    'Voyageur',
                                    'Tarif',
                                    'Status',
                                ]}
                                rows={rows}
                                footerContent={paginationMarkup}
                            />

                        </Card.Subsection>
                    </Card>
            </Page>
        )

    }

    handlePreviousPage = () => {
        if(this.props.meta.prev_page_url !== null){
            this.props.onGetRequests({
                page:this.props.meta.current_page - 1,
                status:this.state.status,
                agence:this.state.selectedAgency,
                destination:this.state.selectedDestination,
                type:this.state.selectedQueryEvisaTypes,
                orderBy:this.state.sortValue,
                search:this.state.searchValue
            });
        }
    };

    handleNextPage = () => {
        if(this.props.meta.next_page_url !== null){
            this.props.onGetRequests({
                page:this.props.meta.current_page + 1,
                status:this.state.status,
                agence:this.state.selectedAgency,
                destination:this.state.selectedDestination,
                type:this.state.selectedQueryEvisaTypes,
                orderBy:this.state.sortValue,
                search:this.state.searchValue
            });
        }
    };

    handleFiltersChange= appliedFilters => {
        const items = this.props.evisaRequests;
        this.setState({ items, appliedFilters });
    };

    handleSearchChange = searchValue =>  {
        this.setState({ searchValue });
        this.onChangeDebounced(searchValue)
    };

    handleSelectQueryEvisaTypes = selected => {
        const selectedText = selected.map(selectedItem => {
            const matchedOption = this.props.evisaTypes.find(option => {
                return option.value.match(selectedItem);
            });
            return matchedOption && matchedOption.label;
        });
        this.setState({selectedQueryEvisaTypes:selected,evisaTypesQuery:selectedText});
        this.props.onGetRequests(
            {
                status:this.state.status,
                agence:this.state.selectedAgency,
                destination:this.state.selectedDestination,
                type:selected,
                orderBy:this.state.sortValue,
                search:this.state.searchValue});
    };
    handleSelectQueryDestination = selected => {
        const selectedText = selected.map(selectedItem => {
            const matchedOption = this.props.destinations.find(option => {
                return option.value.match(selectedItem);
            });
            return matchedOption && matchedOption.label;
        });
        this.setState({selectedQueryDestination:selected,destinationQuery:selectedText});
        this.props.onGetRequests({status:this.state.status,agence:this.state.selectedAgency,destination:selected, type:this.state.selectedQueryEvisaTypes,
            orderBy:this.state.sortValue,
            search:this.state.searchValue});
    };

    handleSelectQueryAgency = selected => {
        const selectedText = selected.map(selectedItem => {
            const matchedOption = this.props.agencies.find(option => {
                return option.value.match(selectedItem);
            });
            return matchedOption && matchedOption.label;
        });
        this.setState({selectedQueryAgency:selected,agencyQuery:selectedText});
        this.props.onGetRequests({status:this.state.status,agence:selected,destination:this.state.selectedQueryDestination,
            type:this.state.selectedQueryEvisaTypes,
            orderBy:this.state.sortValue,
            search:this.state.searchValue});
    };
    handleAgencyQuery = agencyQuery =>  {
        if(agencyQuery === '')
        {
            this.setState({selectedQueryAgency:''});
        }
        this.setState({ agencyQuery });
        this.onChangeAgencyQueryDebounced(agencyQuery)
    };

    handleDestinationQuery = destinationQuery =>  {
        if(destinationQuery === '')
        {
            this.setState({selectedQueryDestination:''});
        }
        this.setState({ destinationQuery });
        this.onChangeDestinationQueryDebounced(destinationQuery)
    };
    handleEvisaTypeQuery = evisaTypesQuery =>  {
        if(evisaTypesQuery === '')
        {
            this.setState({selectedQueryEvisaTypes:''});
        }
        this.setState({ evisaTypesQuery });
        this.onChangeEvisaTypesQueryDebounced(evisaTypesQuery)
    };

    onChangeDebounced = (searchValue) => {
        this.props.onGetRequests({
            status:this.state.status,
            agence:this.state.selectedQueryAgency,
            destination:this.state.selectedQueryDestination,
            type:this.state.selectedQueryEvisaTypes,
            orderBy:this.state.sortValue,
            search:searchValue
        });
    };

    onChangeDestinationQueryDebounced = (searchValue) => {
        this.props.onGetDestinations({destination:searchValue});
    };
    onChangeAgencyQueryDebounced = (searchValue) => {
        this.props.onGetAgencies({agency:searchValue});
    };
    onChangeEvisaTypesQueryDebounced = (searchValue) => {
        this.props.onGetEvisaTypes({type:searchValue});
    };

    onChangeDebounced = debounce(this.onChangeDebounced, 1000);
    onChangeDestinationQueryDebounced = debounce(this.onChangeDestinationQueryDebounced, 1000);
    onChangeAgencyQueryDebounced = debounce(this.onChangeAgencyQueryDebounced, 1000);
    onChangeEvisaTypesQueryDebounced = debounce(this.onChangeEvisaTypesQueryDebounced, 1000);


    handleSortChange = sortValue =>  {
        this.setState({ sortValue });
        this.props.onGetRequests({
            status:this.state.status,
            agence:this.state.selectedQueryAgency,
            destination:this.state.selectedQueryDestination,
            type:this.state.selectedQueryEvisaTypes,
            orderBy:sortValue
        });
    };


    handleAccountStatusChange = (value) => {
        let status = [...value];
        this.setState({status});
        this.props.onGetRequests({
            status:value[0],
            agence:this.state.selectedAgency,
            destination:this.state.selectedQueryDestination,
            type:this.state.selectedQueryEvisaTypes,
            orderBy:this.state.sortValue
        });

    };

    handleDestinationRemove = () => {
        this.setState({selectedDestination:null,selectedQueryDestination:'',destinationQuery:''})
        this.props.onGetRequests({
            status:this.state.status,
            agence:this.state.selectedAgency,
            destination:'',
            type:this.state.selectedQueryEvisaTypes,
            orderBy:this.state.sortValue
        });

    };
    handleAgencyRemove = () => {
        this.setState({selectedAgency:null,selectedQueryAgency:'',AgencyQuery:''});
        this.props.onGetRequests({
            status:this.state.status,
            agence:'',
            destination:this.state.selectedDestination,
            type:this.state.selectedQueryEvisaTypes,
            orderBy:this.state.sortValue
        });

    };
    handleAccountStatusRemove = () => {
        this.setState({status:null});
        this.props.onGetRequests({
            status:'',
            agence:this.state.selectedAgency,
            destination:this.state.selectedDestination,
            type:this.state.selectedQueryEvisaTypes,
            orderBy:this.state.sortValue
        });

    };

    handleEvisaTypesRemove = () => {
        this.setState({selectedQueryEvisaTypes:'',evisaTypesQuery:''});
        this.props.onGetRequests({
            status:this.state.status,
            agence:this.state.selectedAgency,
            destination:this.state.selectedDestination,
            type:'',
            orderBy:this.state.sortValue

        });
    };
    clearAllFilters = () => {
        this.handleDestinationRemove();
        this.handleAgencyRemove();
        this.handleAccountStatusRemove();
        this.handleEvisaTypesRemove();
        this.props.onGetRequests({status:'',agence:'',destination:'',type:''});
    };

    isEmpty = (value)  => {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
}
const mapStateToProps = state => {
    return {
        authUser : state.auth.userId,
        isLoading: state.evisaRequests.loading,
        evisaRequests: state.evisaRequests.evisaRequests,
        meta : state.evisaRequests.meta,
        err : state.evisaRequests.err,

        destinations : state.evisaDestinations.destinations,
        loadingDestinations: state.evisaDestinations.loading,
        errDestinations : state.evisaDestinations.err,

        agencies : state.evisaAgencies.agencies,
        loadingAgencies: state.evisaAgencies.loading,
        errAgencies : state.evisaAgencies.err,

        evisaTypes : state.evisaTypes.evisaTypes,
        loadingTypes: state.evisaTypes.loading,
        errTypes : state.evisaTypes.err
    }
};

const mapDispatchToProps = dispatch => {
    return  {
        onGetRequests : (data) => dispatch(gettingEvisaRequests(data)),
        onGetDestinations : (searchQuery) => dispatch(initDestinations(searchQuery)),
        onGetAgencies : (searchQuery) => dispatch(initAgencies(searchQuery)),
        onGetEvisaTypes : (searchQuery) => dispatch(evisaTypes(searchQuery))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(EvisaRequestTable);