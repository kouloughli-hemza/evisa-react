import React from 'react';
import {SkeletonPage, Layout, Card, SkeletonBodyText} from "@shopify/polaris";

const skeletonLoader = props => {
    return(
        <SkeletonPage primaryAction secondaryActions={2}>
            <Layout >
                <Layout.Section>
                    <Card title={<SkeletonBodyText lines={3}/>} sectioned>
                        <SkeletonBodyText lines={1}/>
                    </Card>

                    
                </Layout.Section>
                <Layout.Section secondary>
                    <Card title="Détails Evisa"
                          primaryAction>
                        <Card.Section>
                            <SkeletonBodyText lines={3} />
                        </Card.Section>
                        <Card.Section title="Contact">
                            <SkeletonBodyText lines={2} />
                        </Card.Section>
                        <Card.Section title="Passeport">
                            <SkeletonBodyText lines={4} />
                        </Card.Section>
                        <Card.Section title="Adresse">
                            <SkeletonBodyText lines={3} />
                        </Card.Section>
                    </Card>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    )
};

export default  skeletonLoader;