import React, { Component ,Fragment} from 'react';
import { Toast } from "@shopify/polaris";
const withErrorHandling = (WarappedComponent,axios) => {

    return class extends Component {
        state = {
            error:null,
            isError:false,
        };
        componentWillMount () {
             this.reqInterceptor = axios.interceptors.request.use( req => {
                 this.setState( { error: null,isError:true } );
                 return req;
             } );
           this.resInterceptor = axios.interceptors.response.use( res => res, error => {
               let customError = null;
               if (error.response) {
                   if(error.response.status === 404){
                       customError = 'Il semble que vous ayez tapé l\'URL manuellement';
                   }else{
                       customError = 'Erreur lors de la récupération des détails, veuillez réessayer.\n';
                   }
               }else{
                   customError = 'Erreur lors de la récupération des détails, veuillez réessayer.\n';
               }
                 this.setState( { error: customError ,isError:true} );
             } );
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        confirmErrorHandler = () => {
            this.setState({error:null,isError:false});
        };
        render() {
            const showError = this.state.error ? (
                <Toast content={this.state.error} onDismiss={this.confirmErrorHandler} error={this.state.isError} />

            ) : null;
            return (
                <Fragment>
                    <WarappedComponent {...this.props} />
                    {showError}
                </Fragment>

            )
        }
    };
};
export default withErrorHandling;