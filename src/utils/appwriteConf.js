import { Client, Databases, Storage } from 'appwrite';
import { ID } from 'appwrite';

// Client configuration
const client = new Client();
const VITE_PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(VITE_PROJECT_ID);

const databases = new Databases(client);
const storage = new Storage(client);

// Utility function to get file extension from type
const getFileExtension = (fileType) => {
    switch (fileType) {
        case 'application/pdf':
            return 'pdf';
        case 'image/jpeg':
            return 'jpg';
        case 'image/png':
            return 'png';
        case 'image/webp':
            return 'webp';
        default:
            return 'jpg';
    }
};

// Utility function to convert base64 to File
const base64ToFile = async (base64String, fileName = 'image.jpg', fileType = 'image/jpeg') => {
    const base64WithoutPrefix = base64String.includes('base64,')
        ? base64String.split('base64,')[1]
        : base64String;

    const byteString = atob(base64WithoutPrefix);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: fileType });
    const extension = getFileExtension(fileType);
    return new File([blob], `${fileName}.${extension}`, { type: fileType });
};

// Utility function to determine file type and name
const getFileDetails = (fileData) => {
    if (fileData instanceof File) {
        return {
            fileName: fileData.name.split('.')[0], // Remove extension if present
            fileType: fileData.type
        };
    }
    
    // For PDF blobs
    if (fileData instanceof Blob && fileData.type === 'application/pdf') {
        return {
            fileName: 'document',
            fileType: 'application/pdf'
        };
    }
    
    // Default to image for base64 strings
    return {
        fileName: 'image',
        fileType: 'image/jpeg'
    };
};

// Main upload function that handles both images and PDFs
export const uploadFileToAppwrite = async (fileData, bucketId, fileType = null, customFileName = null) => {
    try {
        let fileToUpload;
        
        // Handle different types of input
        if (fileData instanceof File) {
            fileToUpload = fileData;
        }
        else if (fileData instanceof Blob) {
            const { fileName } = getFileDetails(fileData);
            const extension = getFileExtension(fileType || fileData.type);
            const finalFileName = `${customFileName || fileName}.${extension}`;
            
            fileToUpload = new File(
                [fileData],
                finalFileName,
                { type: fileType || fileData.type }
            );
        }
        else if (typeof fileData === 'string' && (fileData.includes('base64') || fileData.includes('data:'))) {
            const { fileName } = getFileDetails(fileData);
            const extension = getFileExtension(fileType || 'image/jpeg');
            const finalFileName = `${customFileName || fileName}.${extension}`;
            
            fileToUpload = await base64ToFile(fileData, customFileName || fileName, fileType || 'image/jpeg');
        }
        else {
            throw new Error('Invalid file format. Expected File, Blob, or base64 string');
        }

        // Validate file size
        const maxSize = 30 * 1024 * 1024; // 30MB limit
        if (fileToUpload.size > maxSize) {
            throw new Error('File size exceeds the maximum limit of 30MB');
        }

        // Upload to Appwrite
        const response = await storage.createFile(
            bucketId,
            ID.unique(),
            fileToUpload
        );

        return response.$id;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

export const getEvents = async () => {
    try {
      const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID, // Fixed variable name typo
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID
      );
  
      // Map over the documents to format user objects
      const Users = response.documents.map((document) => ({
        $id: document.$id, // Correct property name for document ID
        fullName: document.fullName,
        email: document.email,
        pdfFileID: document.pdfFileID,
        passportImageId:document.passportImageId,
        passportImageUrl: storage.getFilePreview(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, // Bucket ID for your storage
        document.passportImageId // Image file ID
      ), // Generates the URL to preview the image
    }));
  
      return { Users };
    } catch (error) {
      console.error("Error fetching events:", error);
      return { Users: [], error: error.message }; // Return an empty array with the error message
    }
  };


  export const getCarAndClientDetails = async (id) => {
    if (!id) {
      console.error('No document ID provided');
      return null;
    }

    
  
    try {
      // Fetch the document using the provided `id`
      const response = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID, 
        id
      );
  
      const details = {
        carInfo: response.carInfo,
        rentCharges: response.rentCharges,
        rentalDate: response.rentalDate,
        fullName: response.fullName,
        email: response.email,
        passportImageId: response.passportImageId,
        passportImageUrl: storage.getFilePreview(
          process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID,
          response.passportImageId
        ),
      }
  
      return { details };
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
export { client, databases, storage };