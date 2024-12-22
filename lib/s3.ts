import { PutObjectCommand, S3 } from "@aws-sdk/client-s3"

export const awsConfig = {
    bucket_name: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
}

export async function uploadFile(file: File) {
    try {
        const s3 = new S3({
            region: awsConfig.region!,
            credentials: {
                accessKeyId: awsConfig.accessKeyId!,
                secretAccessKey: awsConfig.secretAccessKey!,
            },
        });

        const fileKey = `uploads/${Date.now().toString()}${file.name.replace(" ", "-")}`
        const payload = {
            Bucket: awsConfig.bucket_name!,
            Key: fileKey,
            Body: file,
        }
        await s3.send(new PutObjectCommand(payload))

        return Promise.resolve({
            fileKey,
            fileName: file.name
        })
    } catch (error) {
        console.error(error)
        throw new Error("Failed to upload file")
    }
}

export function getAWSURL(fileKey: string) {
    return `https://${awsConfig.bucket_name}.s3.${awsConfig.region}.amazonaws.com/${fileKey}`
}
