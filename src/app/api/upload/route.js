import multiparty from 'multiparty';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';

import mime from 'mime-types';
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from 'next/server';

const bucketName = 'xantory-english';

const pump = promisify(pipeline);

export async function POST(req) {
    await mongooseConnect();

    const formData = await req.formData();
    const file = formData.getAll('file')[0];
    const filePath = `/tmp/${file.name}`;
    await pump(file.stream(), fs.createWriteStream(filePath));

    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });

    const ext = file.name.split('.').pop();
    const newFilename = Date.now() + '.' + ext;
    await client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fs.readFileSync(filePath),
        ACL: 'public-read',
        ContentType: mime.lookup(filePath),
    }));
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;

    return NextResponse.json({ link }, { status: 200 });
}

export const config = {
    api: { bodyParser: false },
};