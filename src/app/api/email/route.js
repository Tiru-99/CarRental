import { Client, Databases, Storage } from "node-appwrite";
import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const { documentId } = await request.json();

        // Initialize Appwrite Client
        const client = new Client()
            .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
            .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
            .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY);

        const databases = new Databases(client);
        const storage = new Storage(client);

        // Fetch document details
        const document = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
            documentId
        );

        // Get file buffer directly
        const pdfArrayBuffer = await storage.getFileDownload(
            process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
            document.pdfFileId2
        );

        const pdfBuffer = Buffer.from(pdfArrayBuffer);

        console.log("This is the email and password for this email data",  process.env.NEXT_PUBLIC_USER_EMAIL,process.env.NEXT_PUBLIC_EMAIL_PASS, document.email)

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NEXT_PUBLIC_USER_EMAIL,
                pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
            },
        });

        // Send email
        const info =  transporter.sendMail({
            from: `"AutoBreeze Car Rental Services" <${process.env.NEXT_PUBLIC_USER_EMAIL}>`,
            to: document.email,
            subject: "Your PDF Document",
            text: "Please find the attached PDF document for your Car Rental Application.",
            attachments: [{
                filename: "document.pdf",
                content: pdfBuffer,
                contentType: "application/pdf",
            }],
        });

        return Response.json({
            message: "Email sent successfully!",
            messageId: info.messageId
        }, { status: 200 });

    } catch (error) {
        console.error("Email send error:", error);
        return Response.json({
            error: "Internal Server Error",
            details: error.message
        }, { status: 500 });
    }
}