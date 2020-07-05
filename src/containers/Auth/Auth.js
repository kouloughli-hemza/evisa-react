import React ,{ Component } from 'react'
import {Card, FormLayout, Button,Layout, Form, Page, TextField,InlineError} from '@shopify/polaris';
import { connect } from 'react-redux';
import {auth} from "../../store/actions/auth";
class Auth extends Component{

    state = {
        form : {
            email : {
                value : '',
                required : true,
                valid : false
            },
            password : {
                value : '',
                required : true,
                valid : false
            }
        }
    };

    handleInputChange = (event,elementName) => {

        let updatedFormData = {
            ...this.state.form
        };


        let updatedFormElement = {
            ...updatedFormData[elementName]
        };
        console.log(event);

        updatedFormElement.value = event;
        updatedFormData[elementName] = updatedFormElement;
        this.setState({form:updatedFormData});

    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.onFormSubmit(this.state.form.email.value,this.state.form.password.value);
    };
    render() {
        const invalidCredentials = this.props.error.error ? 'Informations d\'identification invalides\n' : null;
        return(
            <Page title="Caravane2">
                <Layout>
                    <Layout.AnnotatedSection
                        title="Détails de connexion"
                        description="Utiliser les détails de votre compte caravane2 pour vous connecter"
                    >
                        <Card sectioned>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormLayout>
                                    <TextField
                                        error={this.props.error.username}
                                        type="text"
                                        label="Nom d'utilisateur / Email"
                                        name="email"
                                        value={this.state.form['email'].value}
                                        onChange={(e) => this.handleInputChange(e,'email')}
                                    />
                                    <TextField
                                        error={this.props.error.password}
                                        type="password"
                                        name="password"
                                        label="Mot de pass"
                                        value={this.state.form['password'].value}
                                        onChange={(e) => this.handleInputChange(e,'password')}
                                    />
                                    <InlineError message={invalidCredentials}  />
                                    <Button loading={this.props.isLoading}
                                            onClick={this.handleFormSubmit}
                                            primary fullWidth>S'identifier</Button>

                                </FormLayout>
                            </Form>
                        </Card>
                    </Layout.AnnotatedSection>
                </Layout>
            </Page>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoading: state.auth.loading,
        error : state.auth.error
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onFormSubmit : (email,password) => dispatch(auth(email,password))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Auth);