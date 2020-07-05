import React from 'react';
import {Banner, Card, List, Spinner,Badge} from "@shopify/polaris";

const step3 = props => {
    const travellers = props.travellers.map(traveller => {
        return (
            <List.Item>{traveller.traveller_first_name + ' ' + traveller.traveller_last_name}</List.Item>
        )
    });
    const title = props.error == null ? 'Merci d\'utiliser notre service  Evisa , un email avec plus de détails vous sera envoyé bientôt. Lorsque le statut du visa changera, vous recevrez un email de confirmation' : props.error;
    const status = props.error == null ? 'success' : 'critical';
    const banner = !props.isSubmited ? null : (
        <Banner
            title={title}
            status={status}
        />
    );
    const content = props.loading ? <div style={{textAlign: 'center',width:'100%'}}><Spinner/></div> : banner;
    const visaType = props.evisaSettings !== null ? props.evisaSettings.visa_type : null;
    const cardTitle = 'Détails evisa ' + visaType;
    return props.step === 3 ? (
        <div className="step">
            {content}
            <Card title={cardTitle}>
                <Card.Section subdued title="List voyageurs">
                    <List type="number">
                        {travellers}
                    </List>
                </Card.Section>

                <Card.Section>
                    <p>La durée de traitement est de : <Badge status="attention">{props.evisaSettings.visa_duration}  Jours</Badge></p>
                </Card.Section>

            </Card>

        </div>
    ) : null;
};
export default step3;