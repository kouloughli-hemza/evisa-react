import React from 'react';
import {DropZone,Stack,Banner,List,Thumbnail,Caption} from '@shopify/polaris';

const evisaDropZone = props => {


    const {files,rejectedFiles} = props;
    const hasError = rejectedFiles.length > 0;

    const fileUpload = !files.length && <DropZone.FileUpload />;
    const uploadedFiles = (
        <Stack vertical>
            {files.map((file, index) => (
                <Stack alignment="center" key={index}>
                    <Thumbnail
                        size="small"
                        alt={file.name}
                        source={window.URL.createObjectURL(file)}
                    />
                    <div>
                        {file.name} <Caption>{file.size} bytes</Caption>
                    </div>
                </Stack>
            ))}
        </Stack>
    );

    const errorMessage = hasError && (
        <Banner
            title="Les Fichier suivants ne peuvent pas être téléchargés:"
            status="critical"
        >
            <List type="bullet">
                {rejectedFiles.map((file, index) => (
                    <List.Item key={index}>
                        {`"${file.name}" n'est pas pris en charge. Le type de fichier doit être PDF.`}
                    </List.Item>
                ))}
            </List>
        </Banner>
    );

    return (
        <Stack vertical>
            {errorMessage}
            <DropZone accept="application/pdf" actionTitle="add file" type="file" onDrop={props.handleDrop}>
                {uploadedFiles}
                {fileUpload}
            </DropZone>
        </Stack>
    );
};
export default evisaDropZone;