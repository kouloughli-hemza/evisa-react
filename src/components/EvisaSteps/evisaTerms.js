import React from 'react';
import { Modal,TextContainer,Banner} from "@shopify/polaris";

const evisaTerms = (props) => {
    return(
        <div>
            <Modal
                open={props.conditionModal}
                onClose={() => props.handleConditionModal(false)}
                title="Conditions pour Evisa"
                primaryAction={{
                    content: 'Oui, j\'accepte les conditions',
                    onAction: () => props.handleConditionModal(false),
                }}

            >
                <Modal.Section>
                    <TextContainer>
                        <Banner  status="info">
                            <p>
                                {props.visaSettings !== null ? props.visaSettings.visa_type : null}
                            </p>
                        </Banner>
                        <p>
                            <div dangerouslySetInnerHTML={{__html: props.visaSettings !== null ? props.visaSettings.visa_conditions : null}} />
                            <div dangerouslySetInnerHTML={{__html: props.visaSettings !== null ? props.visaSettings.visa_required_docs : null}} />

                        </p>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </div>
    )
};

export default evisaTerms;
