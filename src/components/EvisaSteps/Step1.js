import React from 'react';
import {Layout, Select,TextField,Banner} from "@shopify/polaris";
import EvisaTerms from "./evisaTerms";

const step1 = props => {
    const {evisa_arrival_date,traveller_nationality,evisa_destination_country_id,evisa_type} = props;
    return props.step === 1 ? (
        <Layout>
            <Layout.Section oneHalf>

                <Select
                    label="Nationalité"
                    options={props.nationalities}
                    name="traveller_nationality"
                    onChange={(value) => props.selectChange(value,'traveller_nationality')}
                    value={traveller_nationality}
                />

            </Layout.Section>

            <Layout.Section oneHalf>
                <Select
                    label="Pays de destination"
                    options={props.countries}
                    name="evisa_destination_country_id"
                    onChange={(value) => props.selectChange(value,'evisa_destination_country_id')}
                    value={evisa_destination_country_id}
                />
            </Layout.Section>


            <Layout.Section oneHalf>
                <Select
                    label="Type de visa"
                    options={props.evisaTypes}
                    name="type"
                    onChange={(value) => props.selectChange(value,'evisa_type')}
                    value={evisa_type}

                />
            </Layout.Section>

            <Layout.Section oneHalf>
                <TextField label="Date d'arrivée"  value={evisa_arrival_date} onChange={(value) => props.inputChange(value,'evisa_arrival_date')} type="date" />
            </Layout.Section>
            <EvisaTerms  visaSettings={props.visaSettings} conditionModal={props.conditionModal} handleConditionModal={props.handleConditionModal}/>
        </Layout>
    ) : null;
};
export default step1;