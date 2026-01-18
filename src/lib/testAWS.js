import { S3Client, ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const region = import.meta.env.VITE_AWS_REGION;
const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const bucketName = import.meta.env.VITE_AWS_S3_BUCKET;

// Test AWS Configuration
export const testAWSConfig = async () => {
    console.log("🔍 Testing AWS Configuration...");
    console.log("Region:", region);
    console.log("Access Key ID:", accessKeyId ? `${accessKeyId.substring(0, 10)}...` : "MISSING");
    console.log("Secret Access Key:", secretAccessKey ? "***SET***" : "MISSING");
    console.log("Bucket Name:", bucketName);

    if (!region || !accessKeyId || !secretAccessKey || !bucketName) {
        console.error("❌ AWS credentials are missing!");
        return {
            success: false,
            error: "Missing AWS credentials in .env file"
        };
    }

    try {
        const s3Client = new S3Client({
            region,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
        });

        // Test 1: List buckets (verify credentials)
        console.log("📋 Test 1: Listing buckets...");
        const listCommand = new ListBucketsCommand({});
        const listResponse = await s3Client.send(listCommand);
        console.log("✅ Credentials are valid!");
        console.log("Available buckets:", listResponse.Buckets?.map(b => b.Name));

        // Check if our bucket exists
        const bucketExists = listResponse.Buckets?.some(b => b.Name === bucketName);
        if (!bucketExists) {
            console.error(`❌ Bucket "${bucketName}" not found!`);
            return {
                success: false,
                error: `Bucket "${bucketName}" does not exist. Available buckets: ${listResponse.Buckets?.map(b => b.Name).join(', ')}`
            };
        }
        console.log(`✅ Bucket "${bucketName}" exists!`);

        // Test 2: Upload a test file
        console.log("📤 Test 2: Uploading test file...");
        const testContent = "This is a test file";
        const testKey = "test/test-upload.txt";

        const uploadCommand = new PutObjectCommand({
            Bucket: bucketName,
            Key: testKey,
            Body: new TextEncoder().encode(testContent),
            ContentType: "text/plain",
        });

        await s3Client.send(uploadCommand);
        console.log(`✅ Test file uploaded successfully to: ${testKey}`);

        return {
            success: true,
            message: "All tests passed! AWS S3 is configured correctly."
        };

    } catch (error) {
        console.error("❌ AWS Test Failed:", error);

        let errorMessage = error.message;
        if (error.name === "InvalidAccessKeyId") {
            errorMessage = "Invalid AWS Access Key ID";
        } else if (error.name === "SignatureDoesNotMatch") {
            errorMessage = "Invalid AWS Secret Access Key";
        } else if (error.name === "AccessDenied") {
            errorMessage = "Access Denied - Check IAM permissions";
        } else if (error.message?.includes("CORS")) {
            errorMessage = "CORS error - Configure CORS on your S3 bucket";
        }

        return {
            success: false,
            error: errorMessage,
            details: error
        };
    }
};
