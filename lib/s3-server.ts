"use server";
import { GetObjectCommand, S3 } from "@aws-sdk/client-s3"
// import fs from "fs"
// import path from "path"
import { awsConfig } from "./s3"




// export async function downloadFromAwsS3(fileKey: string) {
//     try {
//         const s3 = new S3({
//             region: awsConfig.region!,
//             credentials: {
//                 secretAccessKey: awsConfig.secretAccessKey!,
//                 accessKeyId: awsConfig.accessKeyId!,
//             }
//         })
//         const payload = {
//             Bucket: awsConfig.bucket_name!,
//             Key: fileKey,
//         }
//         const { Body } = await s3.send(new GetObjectCommand(payload))
//         if(!Body){
//             throw new Error("No file found in S3")
//         }

//         const tmpDir = path.join(process.cwd(), 'tmp');
//         if (!fs.existsSync(tmpDir)) {
//             fs.mkdirSync(tmpDir, { recursive: true });
//         }

//         const file_name = `tmp/pdf-${Date.now()}.pdf`
//         const buffer = await Body?.transformToByteArray();
//         if(buffer){
//             fs.writeFileSync(file_name, Buffer.from(buffer))
//         }
//         return file_name
//     } catch (error) {
//         console.error(error)
//         return null
//     }
// }



// // lib/s3-server.ts
// import { GetObjectCommand, S3 } from "@aws-sdk/client-s3";
// import { awsConfig } from "./s3";

export async function downloadFromAwsS3(fileKey: string): Promise<Buffer | null> {
    try {
        const s3 = new S3({
            region: awsConfig.region!,
            credentials: {
                secretAccessKey: awsConfig.secretAccessKey!,
                accessKeyId: awsConfig.accessKeyId!,
            }
        });

        const payload = {
            Bucket: awsConfig.bucket_name!,
            Key: fileKey,
        };

        const { Body } = await s3.send(new GetObjectCommand(payload));

        console.log("Body of downloaded file", Body)
        
        if (!Body) {
            throw new Error("No file found in S3");
        }

        const buffer = await Body.transformToByteArray();
        console.log(buffer, "pdf buffer file")
        return Buffer.from(buffer);
    } catch (error) {
        console.error(error);
        return null;
    }
}