import React , {Component,Fragment} from 'react';
import { connect } from 'react-redux';
import {
    Page,
    Badge,
    Layout,
    Banner,
    Card,
    Avatar,
    TextStyle,
    Stack,
    List,
    TextField,
} from "@shopify/polaris";
import SkeletonLoader from "../../components/EvisaResources/SkeletonLoader/SkeletonLoader";
import {evisaAction, evisaActionResetModal, evisaDetails} from "../../store/actions";
import ActionsModal from '../../components/EvisaResources/ActionsModal/ActionsModal';
import EvisaDropZone from '../../components/EvisaResources/EvisaDropZone/EvisaDropZone';
import withErrorHandling from "../../hoc/withErrorHandling";
import evisaAxios from "../../evisaAxios";
class EvisaRequest  extends Component{

    state = {
        modal : {
            modalActive : false,
            data : {},
            modalAction : '',
            modalDestructive : false,
            modalTitle : '',
            modalPrimary : '',
            modalMessage:'',
            modalActionType: '',
        },
        form : {
            file: [],
            evisaPdf:'',
            evisaRef:'',
            evisaRefErr: '',
            rejectedFile : [],
        }
    };
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.onGetDetails({id:id});
    }


    handleFileUpload = (files,accepted,rejected) => {
        let updatedFormData = {
            ...this.state.form
        };
        updatedFormData.evisaPdf = accepted[0];
        updatedFormData.file = accepted;
        updatedFormData.rejectedFile = rejected;
        this.setState({form:updatedFormData});
    };

    handleModal = (action,data) => {

        let updatedModal = {
            ...this.state.modal,
        };

        if(action === 'cancel'){
            updatedModal.modalMessage = 'Êtes-vous sûr de vouloir annuler le Evisa? cette action est irréversible';
            updatedModal.modalPrimary = 'Oui, Annuler';
            updatedModal.modalTitle = 'Annulation Evisa';
            updatedModal.modalDestructive = true;
            updatedModal.data = {...data};
            updatedModal.modalActive = true;
            updatedModal.modalActionType = 'cancel';
        }
        if(action === 'refused'){
            updatedModal.modalMessage = 'Êtes-vous sûr de vouloir Refusé le Evisa? cette action est irréversible';
            updatedModal.modalPrimary = 'Oui, Refuser';
            updatedModal.modalTitle = 'Refuser le Evisa';
            updatedModal.modalDestructive = true;
            updatedModal.data = {...data};
            updatedModal.modalActive = true;
            updatedModal.modalActionType = 'refused';
        }
        if(action === 'process'){
            updatedModal.modalMessage = 'Êtes-vous sûr de vouloir mettre en cours? cette action est irréversible';
            updatedModal.modalPrimary = 'Mettre en cours';
            updatedModal.modalTitle = 'Commencer le traitement de l\'evisa';
            updatedModal.modalDestructive = false;
            updatedModal.data = {...data};
            updatedModal.modalActive = true;
            updatedModal.modalActionType = 'process';
        }
        if(action === 'accept'){
            updatedModal.modalMessage = 'Êtes-vous sûr de vouloir Accourdé le Evisa? cette action est irréversible';
            updatedModal.modalPrimary = 'Accourdé';
            updatedModal.modalTitle = 'Accordé le Evisa';
            updatedModal.modalDestructive = false;
            updatedModal.data = {id:this.props.details.id,evisa_ref:this.state.form.evisaRef,traveller_visa_pdf:this.state.form.evisaPdf};
            updatedModal.modalActive = true;
            updatedModal.modalActionType = 'accept';
        }
        this.props.onOpenModal(true);
        this.setState({modal:updatedModal});
    };

    handleCloseModal = () => {
        this.props.onOpenModal(false);

    };
    handleActionRequest = (action,data) => {
        let formData = data;
        if(action === 'accept'){
            formData = {id:this.props.details.id,evisa_ref:this.state.form.evisaRef,traveller_visa_pdf:this.state.form.evisaPdf};
        }
       this.props.onAction(action,formData);

    };

    handleInputChange = (value) => {
        let updatedFormData = {
            ...this.state.form
        };
        updatedFormData.evisaRef = value;
        this.setState({form:updatedFormData});
    };
    render() {
        const {evisaRef} = this.state.form;
        const evisaReference = this.props.details.evisa_reference ? "Référence " + this.props.details.evisa_reference : null;
        const card = this.props.details.evisa_original_status === 'processing' && this.props.authUser.evisa_settings_permission ? (
            <Card
                primaryFooterAction={{content: 'Confirmer',onAction:() => this.handleModal('accept',{id:this.props.details.id,evisa_ref:evisaRef,traveller_visa_pdf:this.state.form.evisaPdf})   }}
            >

                <Card.Section  >
                    <Banner
                        title="Si le visa est prêt, téléchargez-le ici (Format PDF)"
                        status="warning"
                    >
                        <List>
                            <List.Item>
                                Un email sera envoyé à l'agence.
                            </List.Item>
                            <List.Item>
                                L'agence destinataire devra se connecter pour télécharger l'evisa.
                            </List.Item>
                        </List>

                    </Banner>
                    <EvisaDropZone handleDrop={this.handleFileUpload} files={this.state.form.file} rejectedFiles={this.state.form.rejectedFile} />
                </Card.Section>
            </Card>
        ): null;
        const evisaPdfCard = this.props.details.evisa_original_status === 'accepted' ? (
            <Card title='Evisa'>
                <Card.Section>
                    <Banner
                        title="Votre Evisa est prêt."
                        status="success"
                    />
                    <object width="100%" height="400" data={this.props.details.evisa_pdf} type="application/pdf">   </object>

                </Card.Section>
            </Card>
        ) : null;
        const evisa_original_status = this.props.details.evisa_original_status;
        let evisa_status_css_class = '';
        let progress = '';

        switch (evisa_original_status) {
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


        const pageContent = !this.props.loading && Object.keys(this.props.details).length > 0 && this.props.err === null? (

            <Page
                breadcrumbs={[{content: 'Mes demandes', url: '/e-visa'}]}
                title={this.props.details.civilite + ' ' + this.props.details.first_name.toLowerCase() + ' ' + this.props.details.last_name.toLowerCase()}
                titleMetadata={<Badge status={evisa_status_css_class} progress={progress}>{this.props.details.evisa_status}</Badge>}
                subtitle={evisaReference}
                primaryAction={{content: 'Enregistrer', disabled: true}}
                secondaryActions={[
                    {
                        disabled: evisa_original_status !== 'pending' || !this.props.authUser.evisa_settings_permission,
                        content: 'Mettre en cours',
                        accessibilityLabel: 'Mettre à jour le statut evisa',
                        onAction : () => this.handleModal('process',{id:this.props.details.id})
                    },
                ]}
                actionGroups={[
                    {
                        title: 'Actions',
                        accessibilityLabel: 'Actions',
                        actions: [
                            {
                                destructive: true,
                                disabled:evisa_original_status !== 'pending',
                                content: 'Annuler',
                                accessibilityLabel: 'Annuler',
                                onAction: () => this.handleModal('cancel',{id:this.props.details.id}),
                            },
                            {
                                destructive: true,
                                disabled:evisa_original_status !== 'processing' || !this.props.authUser.evisa_settings_permission,
                                content: 'Refusé',
                                accessibilityLabel: 'Refusé',
                                onAction: () => this.handleModal('refused',{id:this.props.details.id}),
                            },
                        ],
                    },
                ]}
                pagination={{
                    hasPrevious: true,
                    hasNext: true,
                }}
                separator
            >

                <Layout >
                    <Layout.Section>
                        <Card
                            title={
                                <Stack>
                                    <Avatar name={this.props.details.civilite + ' ' + this.props.details.first_name + ' ' + this.props.details.last_name} customer={true} initials={this.props.details.first_name.charAt(0)} size="medium" />
                                    <div>
                                        <h3>
                                            <TextStyle variation="strong">{this.props.details.civilite + ' ' +  this.props.details.first_name.toLowerCase() + ' ' + this.props.details.last_name.toLowerCase()}</TextStyle>
                                        </h3>
                                        <div>
                                            <TextStyle variation="subdued">{this.props.details.evisa.type}</TextStyle>
                                        </div>
                                        <TextStyle variation="subdued">Arrivée le {this.props.details.evisa.arrival}</TextStyle>
                                    </div>
                                </Stack>
                            } sectioned

                        >
                        </Card>

                        {card}
                        {evisaPdfCard}

                    </Layout.Section>
                    <Layout.Section secondary>
                        <Card title="Détails Evisa"
                              primaryFooterAction={{content: 'Document de voyage',url:this.props.details.passport_scan,external:true}}
                        >
                            <Card.Section>
                                <TextStyle variation="subdued">{this.props.details.evisa.destination.name}</TextStyle><br />
                                <TextStyle variation="subdued">{this.props.details.evisa.type}</TextStyle><br />
                                <TextStyle variation="strong">{this.props.details.evisa.formated_sale_price}</TextStyle>

                            </Card.Section>
                            <Card.Section title="Contact">
                                <p><a href="mailto:hemza@mail.com">{this.props.details.email}</a></p>
                                <br />
                                <p>{this.props.details.phone}</p>
                            </Card.Section>
                            <Card.Section title="Passeport">
                                <p>
                                    <p>{this.props.details.passport_type}</p>
                                </p>
                                <p>
                                    <label>N°</label> : {this.props.details.passport_number}
                                </p>
                                <p>
                                    <label>Délivré le</label> : {this.props.details.passport_delivery}
                                </p>
                                <p>
                                    <label>Expire le</label> : {this.props.details.passport_expiry}
                                </p>
                            </Card.Section>
                            <Card.Section title="Adresse">
                                <p>
                                    {this.props.details.address}
                                </p>
                                <p>
                                    {this.props.details.birth_place}
                                </p>
                            </Card.Section>
                        </Card>
                    </Layout.Section>
                </Layout>

            </Page>
        ) : <SkeletonLoader />;
        return (
            <Fragment>
                {pageContent}

                <ActionsModal active={this.props.modalStatus}
                              destructive={this.state.modal.modalDestructive}
                              title={this.state.modal.modalTitle}
                              content={this.state.modal.modalPrimary}
                              message={this.state.modal.modalMessage}
                              loading={this.props.actionLoading}
                              actionType={this.state.modal.modalActionType}
                              data={this.state.modal.data}
                              handleActionRequest={this.handleActionRequest}
                              handleCloseModal={this.handleCloseModal}
                >
                    <TextField error={this.state.form.evisaRefErr}
                               type="text"
                               onChange={this.handleInputChange}
                               value={this.state.form.evisaRef}
                               label="Réference Evisa"  />

                </ActionsModal>
            </Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        authUser:state.auth.userId,
        details : state.evisaDetails.evisaDetails,
        loading:state.evisaDetails.loading,
        err : state.evisaDetails.err,

        actionLoading : state.evisaAction.loading,
        actionErr : state.evisaAction.err,
        finished:state.evisaAction.finished,
        reset:state.evisaAction.modelReset,
        modalStatus:state.evisaAction.modalStatus,

    }
};
const mapDispatchToProps = dispatch => {
    return {
        onGetDetails : (data) => dispatch(evisaDetails(data)),
        onAction : (action,data) => dispatch(evisaAction(action,data)),
        onOpenModal: (status) => dispatch(evisaActionResetModal(status))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandling(EvisaRequest,evisaAxios));