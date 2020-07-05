import React , { Component,Fragment } from 'react';
import { withRouter } from "react-router-dom"
import Step1 from '../../components/EvisaSteps/Step1';
import Step2 from '../../components/EvisaSteps/Step2';
import Step3 from '../../components/EvisaSteps/Step3';
import EvisaControlls from '../../components/EvisaControlls/EvisaControlls';
import './evisa.css';
import {connect} from 'react-redux';
import {
    evisaRequest,
    initNationality,
    gettingEvisaTypes,
    evisaValidator,
    gettingEvisaSettings, handleEvisaSettingModal
} from '../../store/actions/index';
import {Page, Spinner,Card} from "@shopify/polaris";
import {updateCurrentStep} from "../../store/actions/evisa";

class Evisa extends Component{

    state = {
        step : this.props.step,

    evisa: {
            evisa_destination_country_id : '',
            traveller_nationality : '12',
            evisa_type : '',
            evisa_arrival_date : '',
            travellers : []
        },
        controlls : {
            nextButton : {
                label : 'Suivant',
                enabled : true,
            },
            prevButton : {
                label : 'Précedent',
                enabled : false,
            }
        },
        modalOpen:false,

    };
    componentDidMount() {
        this.props.onInitNationalities();
    }

    handleNextStep = () => {
        let nextButtonEnabled = true;
        let prevButtonEnabled = true;

        if (this.props.step === 1){
            let updatedEvisa = {...this.state.evisa};
            delete updatedEvisa.travellers;
            this.props.onValidateEvisa(updatedEvisa);
        }

        let updatedState = {
            ...this.state
        };
        let updatedControlls = {
            ...updatedState.controlls
        };
        if(this.props.step === 2 ) {
            updatedControlls.nextButton.label = 'Terminer';
            this.props.updateStep(3);
            nextButtonEnabled = true;
            prevButtonEnabled = true;
        }

        if(this.props.step === 3 ){
            const data = {
                ...this.props.evisaData,
                travellers : {
                    ...this.props.reduxTravellers
                }
            };

            this.props.onEvisaRequest(data,this.props.history);
        }
        updatedControlls.nextButton.enabled = nextButtonEnabled;
        updatedControlls.prevButton.enabled = prevButtonEnabled;
        updatedState.controlls = updatedControlls;
        return { controlls : updatedControlls}

    };


    handlePrevStep = () => {
        if(this.props.step > 1 ){
            this.props.updateStep(this.props.step - 1);
            let updatedState = {
                ...this.state
            };
            let updatedControlls = {
                ...updatedState.controlls
            };

            updatedControlls.nextButton.label = 'Suivant';
            updatedControlls.nextButton.enabled = true;
            updatedState.controlls = updatedControlls;
            return { controlls : updatedControlls}
        }
    };

    handleInputChange = (value,elementName) => {
        let updatedEVisaData = {
            ...this.state.evisa
        };
        updatedEVisaData[elementName] = value;
        this.setState({evisa: updatedEVisaData});
    };

    handleSelectChange = (value,selectName) => {
        let updatedEVisaData = {
            ...this.state.evisa
        };
        updatedEVisaData[selectName] = value;
        this.setState({evisa: updatedEVisaData});
        if(selectName === 'evisa_destination_country_id'){
            this.props.onGetEvisaTypes(value);
        }
        if(selectName === 'evisa_type'){
            this.props.onGetEvisaSettings(this.state.evisa.evisa_destination_country_id,value)
        }
    };

    handleModalToggle = () => {
        this.setState(prevState => {
            return {modalOpen: !prevState.modalOpen}
        })
    };
    HandleNextButtonStatus = (status) => {
        let updatedState = {
            ...this.state
        };
        let updatedControlls = {
            ...updatedState.controlls
        };
        let updatedButton = {
            ...updatedControlls.nextButton
        };
        updatedButton.enabled = status;
        updatedControlls.nextButton = updatedButton;
        this.setState({controlls:updatedControlls});
    };
    handleSecondStepFormFieldchange = (field,value) => {
        this.setState({[field]: value});
    };





    render() {

        const evisaControlls = this.props.isFinished ? null : (
            <EvisaControlls Step1loading={this.props.evisaValidatorLoading} step3Loading={this.props.isLoading} step={this.props.step} nextButtonStatus={this.props.nextButton}  {...this.state.controlls} prevStep={this.handlePrevStep} nextStep={this.handleNextStep}/>
        );
        let price = this.props.evisaSettings !== null ? this.props.evisaSettings.sale_price  : '0.00';
        let priceSub = this.props.evisaSettings !== null ? this.props.evisaSettings.visa_price  : '0.00';
        if(this.props.reduxTravellers.length > 0 && this.props.evisaSettings !== null ){
            price = Number(price) * this.props.reduxTravellers.length;
            priceSub = Number(priceSub) * this.props.reduxTravellers.length;
        }

        const content = this.props.nationalitiesLoader ? <div style={{textAlign: 'center',width:'100%'}}><Spinner/></div> : (
            <Fragment>
                <div className=" monthly-price">
                        <span
                            className="pricing-table__feature-value pricing-table__feature-price monthly-price__price">
                              <span className="price">
                                  <span aria-hidden="true">
                                    <span className="price__number">{price} DZD</span>
                                    <span className="price__number_sub">{priceSub} DZD</span>
                                  </span>
                          </span>
                        </span>
                </div>
                <Step1 visaSettings={this.props.evisaSettings} conditionModal={this.props.conditionModalStatus} handleConditionModal={this.props.onHandleEvisaSettingsModal} evisaTypes={this.props.evisaTypes} countries={this.props.countries} nationalities={this.props.nationalities} {...this.state.evisa} inputChange={this.handleInputChange} selectChange={this.handleSelectChange} step={this.props.step}/>
                {
                    this.props.step === 2 ? (
                        <Step2  handleSecondStepFormFieldchange={this.handleSecondStepFormFieldchange}  HandleNextButtonStatus={this.HandleNextButtonStatus} {...this.state}  handleClick={this.handleModalToggle} inputChange={this.handleInputChange} selectChange={this.handleSelectChange}step={this.props.step}/>
                    ) : null
                }
                <Step3 {...this.state.evisa}
                       evisaSettings={this.props.evisaSettings}
                       travellers={this.props.reduxTravellers}
                       isSubmited={this.props.evisaSubmited}
                       error={this.props.error}
                       loading={this.props.isLoading}
                       toast={this.props.toast}
                       step={this.props.step}/>

                {evisaControlls}
            </Fragment>
        );

        return(
                <Page
                    breadcrumbs={[{content: 'Acceuil', url: '/home'}]}
                    title="Demande Evisa"
                    subtitle="Veuillez noter que les renseignements que vous fournissez doivent correspondre à l'information figurant sur votre passeport."
                >
                    <Card>
                        <Card.Section>
                            {content}

                        </Card.Section>
                    </Card>
                </Page>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFinished : state.evisa.finished,
        isLoading : state.evisa.loading,
        evisaSubmited : state.evisa.submited,
        toast : state.evisa.toastVisible,
        error : state.evisa.err,
        nationalities: state.nationalities.nationalities,
        nationalitiesLoader: state.nationalities.loading,
        countries: state.nationalities.countries,
        evisaTypes : state.evisaTypes.evisaTypes,
        reduxTravellers : state.travellerValidator.travellers,
        nextButton : state.travellerValidator.nextButton,
        evisaValidatorNextButton : state.evisaValidator.nextButton,
        evisaValidatorLoading : state.evisaValidator.loading,
        step : state.evisa.currentStep,
        evisaData : state.evisaValidator.evisa,
        evisaSettings : state.evisaSettings.evisaSettings,
        conditionModalStatus : state.evisaSettings.showModal,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onEvisaRequest : (data,history) => dispatch(evisaRequest(data,history)),
        onInitNationalities : () => dispatch(initNationality()),
        onGetEvisaTypes : (country) => dispatch(gettingEvisaTypes(country)),
        onGetEvisaSettings : (country,type) => dispatch(gettingEvisaSettings(country,type)),
        onHandleEvisaSettingsModal : (status) => dispatch(handleEvisaSettingModal(status)),
        onValidateEvisa : (data) => dispatch(evisaValidator(data)),
        updateStep : (step) => dispatch(updateCurrentStep(step))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Evisa));