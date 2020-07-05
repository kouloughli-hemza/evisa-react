import React from 'react';
import { Modal,Stack,TextContainer } from "@shopify/polaris";

const actionsModal = props => {
    const children = props.actionType === 'accept' ? props.children : null;
    return(
        <Modal
            open={props.active}
            onClose={props.handleCloseModal}
            title={props.title}
            primaryAction={{
                destructive:props.destructive,
                content: props.content,
                onAction: () => props.handleActionRequest(props.actionType,props.data),
                loading:props.loading,
            }}
            secondaryActions={[
                {
                    content: 'Annuler',
                    onAction: props.handleCloseModal,
                },
            ]}
        >
            <Modal.Section>
                <Stack vertical>
                    <Stack.Item>
                        <TextContainer>
                            <p>
                                {props.message}
                            </p>
                        </TextContainer>
                    </Stack.Item>

                    <Stack.Item>
                        <TextContainer>
                            <p>
                                {children}
                            </p>
                        </TextContainer>
                    </Stack.Item>


                </Stack>
            </Modal.Section>
        </Modal>
    )
};
export default actionsModal;