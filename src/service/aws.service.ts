import { S3 } from "aws-sdk";

import mimetypes from 'mime-types'

class AwsService {
    private s3: S3;

    constructor() {
        this.s3 = new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'eu-central-1',
        });

        this.s3.config.update({
            signatureVersion: 'v4',
        });
    }


    public getPresignedUrl(fileName: string) {
        const fileType = mimetypes.lookup(fileName);


        const params = {
            Bucket: "BUCKET_NAME",
            Fields: {
                key: fileName,
                acl: 'public-read',
                "Content-Type": fileType,
            },
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
        };

        return {
            destination: `https://s3.eu-central-1.amazonaws.com/BUCKET_NAME/${fileName}`,
            ...this.s3.createPresignedPost(params),
        }
    }
}

export default new AwsService();