import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const region = import.meta.env.VITE_AWS_REGION;
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const bucketName = import.meta.env.VITE_AWS_S3_BUCKET;

let s3Client = null;

if (region && accessKeyId && secretAccessKey) {
    s3Client = new S3Client({
        region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
} else {
    console.warn("AWS S3 Credentials missing. Uploads will fail.");
}

export const uploadResumeToS3 = async (file, jbId) => {
    console.log("🔍 Starting S3 Upload...");
    console.log("Region:", region);
    console.log("Bucket:", bucketName);
    console.log("Access Key:", accessKeyId ? `${accessKeyId.substring(0, 10)}...` : "MISSING");
    console.log("File:", file.name, "Size:", file.size, "Type:", file.type);

    if (!s3Client) {
        const missingVars = [];
        if (!region) missingVars.push("VITE_AWS_REGION");
        if (!accessKeyId) missingVars.push("VITE_AWS_ACCESS_KEY_ID");
        if (!secretAccessKey) missingVars.push("VITE_AWS_SECRET_ACCESS_KEY");
        if (!bucketName) missingVars.push("VITE_AWS_S3_BUCKET");

        throw new Error(`AWS Configuration missing: ${missingVars.join(', ')}. Please check your .env file and restart the dev server.`);
    }

    if (!file || !jbId) {
        throw new Error("File and JB ID are required");
    }

    // Format: clients/resumes/JB-id-YYYY-MM-DD/resume.pdf
    // Date format: YYYY-MM-DD (e.g., 2026-01-17)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(now.getDate()).padStart(2, '0');
    const dateStr = `${year}${month}${day}`;

    // Sanitize JB ID just in case
    const sanitizedJbId = jbId.replace(/[^a-zA-Z0-9-_]/g, '');

    // Get file extension
    const fileExt = file.name.split('.').pop();

    // Construct the exact path: clients/resumes/JB-id-YYYY-MM-DD/resume.pdf
    const folderPath = `clients/resumes/${sanitizedJbId}-${dateStr}`;
    const fileName = `resume.${fileExt}`;
    const fullKey = `${folderPath}/${fileName}`;

    console.log("📁 Upload path:", fullKey);

    try {
        // Convert File to ArrayBuffer for browser compatibility
        console.log("📦 Converting file to buffer...");
        const fileBuffer = await file.arrayBuffer();
        console.log("✅ File converted, size:", fileBuffer.byteLength);

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fullKey,
            Body: new Uint8Array(fileBuffer),
            ContentType: file.type,
            ContentLength: file.size,
        });

        console.log("📤 Sending to S3...");
        await s3Client.send(command);
        console.log(`✅ Resume uploaded successfully to: ${fullKey}`);
        // Return the full S3 key path as expected by the API
        return fullKey;
    } catch (error) {
        console.error("❌ S3 Upload Error:", error);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error code:", error.$metadata?.httpStatusCode);

        // Provide specific error messages
        let userMessage = error.message;

        if (error.name === "InvalidAccessKeyId") {
            userMessage = "Invalid AWS Access Key ID. Please check your credentials.";
        } else if (error.name === "SignatureDoesNotMatch") {
            userMessage = "Invalid AWS Secret Access Key. Please check your credentials.";
        } else if (error.name === "NoSuchBucket") {
            userMessage = `S3 bucket "${bucketName}" does not exist. Please create it first.`;
        } else if (error.name === "AccessDenied" || error.message?.includes("Access Denied")) {
            userMessage = "Access Denied. Please check your IAM permissions (need s3:PutObject).";
        } else if (error.message?.includes("CORS")) {
            userMessage = "CORS error. Please configure CORS on your S3 bucket.";
        } else if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkingError")) {
            userMessage = "Network error. Check your AWS credentials and bucket configuration.";
        }

        throw new Error(userMessage);
    }
};
