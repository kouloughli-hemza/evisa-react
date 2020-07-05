import React , { Component,Fragment }from 'react';
import './step2.css';
import {
    FormLayout,
    TextField,
    Form,
    Button,
    Layout,
    Modal,
    Select,
    ChoiceList, Banner
} from '@shopify/polaris';
import { connect } from 'react-redux';
import { travellerValidator,handleTravellerFormModal,handleDeleteTraveller} from "../../store/actions";
import DropZoneEvisa from "../EvisaControlls/DropZoneEvisa";
import ResourceListWithSelectionExample from "../EvisaControlls/travellersList";
class Step2 extends Component{

    state = {
        active:false,
        traveller_civilite : '',
        traveller_first_name : '',
        traveller_last_name : '',
        traveller_birth_date : '',
        traveller_birth_place : '',
        traveller_passport_type : 'Passeport Ordinaire',
        traveller_phone : '',
        traveller_email : '',
        traveller_passport_nbr:'',
        traveller_passport_delivered_at:'',
        traveller_passport_expire_at:'',
        traveller_full_address :'',
        traveller_files : '',
        rejectedFile : [],
        image:'',
        files : [],
        addTravellerButtonDisabled : true,
        selectedItems : [],
    };
    componentDidMount(){
        if(this.props.step === 2 ){
            this.props.onCloseModal(false);
            if(this.props.reduxTravellers.length < 1){
                this.props.HandleNextButtonStatus(false);
            }else{
                this.props.HandleNextButtonStatus(true);
            }
        }
    }


    handleChoiceList = (value) => {
        this.setState({traveller_civilite:value});
    };


    handleSelectionChange = (selectedItems)  => {
        this.setState({ selectedItems });
    };



    render(){

        const options = [
            {label: 'Passeport Ordinaire', value: 'Passeport Ordinaire'},
            {label: 'Passeport diplomatique', value: 'Passeport diplomatique'},
            {label: 'Passeport de Service', value: 'Passeport de Service'},
            {label: 'Passeport spécial', value: 'Passeport spécial'},
            {label: 'Passeport Pour étrangers', value: 'Passeport Pour étrangers'},
            {label: 'Carte d\'identité', value: 'Carte d\'identité'},
        ];
        const {
            traveller_civilite,traveller_first_name,
            traveller_last_name,traveller_birth_date,traveller_birth_place,traveller_passport_type,
            traveller_passport_delivered_at,traveller_passport_expire_at,
            traveller_phone,traveller_email,traveller_passport_nbr,
            traveller_full_address,
            files,selectedItems} = this.state;

        const {reduxTravellers} = this.props;
        const travellersList = reduxTravellers.length > 0 ? (
            <ResourceListWithSelectionExample deleteTraveller={this.props.onDeleteTraveller} selected={selectedItems} items={reduxTravellers} handleSelected={this.handleSelectionChange}/>
        ) : <Banner
            title="Vous pouvez commencer à ajouter des voyageurs"
            status="warning"
        >
        </Banner>;
        return this.props.step === 2 ? (
            <Fragment>
                <Layout.Section title="Voyageurs" >
                    {travellersList}
                </Layout.Section>
                <Layout.Section >
                    <Button primary fullWidth  onClick={() => this.props.onCloseModal(true)}>Ajouter un voyageur</Button>
                </Layout.Section>
                <Modal
                    open={this.props.modalActive}
                    onClose={() => this.props.onCloseModal(false)}
                    title="Données voyageurs"
                    primaryAction={{
                        content: 'Ajouter un voyageur',
                        onAction: this.handleSubmit,
                        disabled: false,
                        loading:this.props.isLoading
                    }}
                    secondaryActions={[
                        {
                            content: 'Cancel',
                            onAction: () => this.props.onCloseModal(false)
                        },
                    ]}
                >
                    <Modal.Section>
                        <Form onSubmit={this.handleSubmit}>
                            <FormLayout>
                                <FormLayout.Group>
                                    <ChoiceList
                                        //title="Civilite"
                                        choices={[
                                            {label: 'M', value: 'M'},
                                            {label: 'Mme', value: 'Mme'},
                                            {label: 'Mlle', value: 'Mlle'},
                                            {label: 'Dr', value: 'Dr'},
                                        ]}
                                        selected={traveller_civilite}
                                        onChange={(value) => this.handleChoiceList(value)}
                                        error={this.props.err.traveller_civilite}
                                    />
                                </FormLayout.Group>
                                <FormLayout.Group>

                                    <TextField error={this.props.err.traveller_first_name} autoFocus={true} value={traveller_first_name} onChange={this.handleChange('traveller_first_name')} label="Nom" type="text" />
                                    <TextField error={this.props.err.traveller_last_name} type="text" onChange={this.handleChange('traveller_last_name')} value={traveller_last_name} label="Prénom"  />
                                    <TextField error={this.props.err.traveller_birth_date} type="date" onChange={this.handleChange('traveller_birth_date')} value={traveller_birth_date} label="Date de naissance"  />
                                    <TextField error={this.props.err.traveller_birth_place} type="text" onChange={this.handleChange('traveller_birth_place')} value={traveller_birth_place} label="Lieu de naissance"  />
                                    <Select
                                        label="Documents de voyage"
                                        options={options}
                                        name="traveller_passport_type"
                                        onChange={(value) => this.handleSelectChange(value,'traveller_passport_type')}
                                        value={traveller_passport_type}
                                        error={this.props.err.traveller_passport_type}
                                    />
                                    <TextField error={this.props.err.traveller_passport_nbr} showCharacterCount={true} maxLength="10" type="number"  onChange={this.handleChange('traveller_passport_nbr')} value={traveller_passport_nbr} label="Numéro de passeport"  />
                                    <TextField error={this.props.err.traveller_passport_delivered_at} type="date" onChange={this.handleChange('traveller_passport_delivered_at')} value={traveller_passport_delivered_at} label="Date de délivrance"  />
                                    <TextField error={this.props.err.traveller_passport_expire_at} type="date" onChange={this.handleChange('traveller_passport_expire_at')} value={traveller_passport_expire_at} label="Date d'expiration"  />
                                </FormLayout.Group>

                                <TextField  error={this.props.err.traveller_full_address} multiline type="text" onChange={this.handleChange('traveller_full_address')} value={traveller_full_address} label="Adresse"  />
                                <FormLayout.Group>
                                    <TextField error={this.props.err.traveller_phone} showCharacterCount={true} maxLength="10" type="traveller_phone" onChange={this.handleChange('traveller_phone')} value={traveller_phone} label="Mobile du voyageur"  />
                                    <TextField error={this.props.err.traveller_email} type="email" onChange={this.handleChange('traveller_email')} value={traveller_email} label="Email du voyageur"  />
                                </FormLayout.Group>
                                <DropZoneEvisa handleDrop={this.handleFileUpload} files={files} rejectedFiles={this.state.rejectedFile}/>
                            </FormLayout>
                        </Form>
                    </Modal.Section>
                </Modal>
            </Fragment>
        ) : null;
    }

    handleSelectChange = (value,selectName) => {
        this.setState(() => {
            return {[selectName]:value}
        })
    };


    handleChange = (field) => {
        return (value) => {
            this.setState({[field]: value});
            this.props.handleSecondStepFormFieldchange(field,value);
        };
    };
    handleFileUpload = (files,accepted,rejected) => {
        console.log(accepted[0]);
        this.setState({traveller_files:accepted[0],files : accepted,rejectedFile:rejected})
    };
    /* ==== End handle images == */
    handleSubmit = (event) => {

        event.preventDefault();
        const {traveller_civilite,traveller_first_name,
            traveller_last_name,traveller_birth_date,traveller_birth_place,traveller_passport_type,
            traveller_passport_delivered_at,traveller_passport_expire_at,
            traveller_phone,traveller_email,traveller_passport_nbr,
            traveller_full_address,
            traveller_files} = this.state;

        let traveller = Object.assign({
            traveller_civilite: traveller_civilite[0],
            traveller_first_name:traveller_first_name,
            traveller_last_name:traveller_last_name,
            traveller_phone:traveller_phone,
            traveller_email:traveller_email,
            traveller_passport_nbr:traveller_passport_nbr,
            traveller_full_address:traveller_full_address,
            traveller_birth_date:traveller_birth_date,
            traveller_birth_place: traveller_birth_place,
            traveller_passport_type: traveller_passport_type,
            traveller_passport_delivered_at: traveller_passport_delivered_at,
            traveller_passport_expire_at: traveller_passport_expire_at,
            traveller_files: traveller_files
        });
        this.props.onValidate(traveller);
    };

}
const mapDispatchToProps = dispatch => {
    return {
        onValidate : (traveller) => dispatch(travellerValidator(traveller)),
        onCloseModal : (status) => dispatch(handleTravellerFormModal(status)),
        onDeleteTraveller : (travellers) => dispatch(handleDeleteTraveller(travellers))
    }
};

const mapStateToProps = state => {
    return {
        isLoading : state.travellerValidator.loading,
        err : state.travellerValidator.err,
        isFormValid : state.travellerValidator.formValid,
        modalActive : state.travellerValidator.modalActive,
        reduxTravellers : state.travellerValidator.travellers,
        nextButton : state.travellerValidator.nextButton
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Step2);