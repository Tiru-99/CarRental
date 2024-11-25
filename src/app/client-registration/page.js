"use client"
import React, { useState , useEffect} from 'react';
// import {  Document, Page, View, Text, Image, StyleSheet, pdf } from '@react-pdf/renderer';
// import { PDFDownloadLink } from '@react-pdf/renderer';
import handleGeneratePDF2 from '@/lib/handleGenerate2';
import ImageDrawForm from '../../components/ImageEditor';
import {nanoid} from 'nanoid';
import { databases } from '../../utils/appwriteConf';
import { uploadFileToAppwrite , updateDocuments } from '../../utils/appwriteConf';
import { ID } from 'appwrite';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { isUserLoggedIn } from '@/utils/appwriteAuth';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import ImageEditor2 from '@/components/ImageEditor2';
import { CarSelection } from '@/components/CarSelection';
import PdfModifier from '@/components/PdfModifier';



const InputField = ({ label, id, type = 'text', placeholder, value, onChange , required = false}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const FileInput = ({ label, id , onChange }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="file"
      id={id}
       accept="image/*"
      onChange={onChange}
      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

// const styles = StyleSheet.create({
//   // Existing styles remain unchanged
//   page: {
//     padding: 30,
//     fontFamily: 'Helvetica',
//     fontSize: 10,
//   },
//   headerImage: { 
//     width: '60%',
//     height: 80,
//     marginBottom: 10,
//     marginLeft: 'auto',
//     marginRight: 'auto',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     textTransform: 'uppercase',
//   },
//   section: {
//     marginBottom: 15,
//     borderBottom: '1px solid #ccc',
//     paddingBottom: 10,
//   },
//   sectionHeading: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     backgroundColor: '#f5f5f5',
//     padding: 4,
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 4,
//     alignItems: 'center',
//   },
//   label: {
//     width: '30%',
//     fontSize: 10,
//     fontWeight: 'bold',
//   },
//   value: {
//     width: '70%',
//     fontSize: 10,
//   },
//   imageGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 10,
//     marginTop: 10,
//   },
//   imageContainer: {
//     width: '45%',
//   },
//   imageLabel: {
//     fontSize: 10,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   image: {
//     width: '100%',
//     height: 120,
//     objectFit: 'cover',
//     border: '1px solid #ccc',
//   },
//   vehicleDiagram: {
//     marginTop: 10,
//     border: '1px solid #ccc',
//     padding: 10,
//   },
//   legend: {
//     fontSize: 8,
//     marginTop: 5,
//   },
//   signatureSection: {
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   signatureBox: {
//     width: '45%',
//     borderTop: '1px solid #000',
//     paddingTop: 5,
//     fontSize: 8,
//   },
//   // Additional styles for credit card authorization
//   creditCardHeader: {
//     backgroundColor: '#f5f5f5',
//     padding: 8,
//     marginBottom: 10,
//   },
//   creditCardHeaderText: {
//     color: 'black',
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   creditCardRow: {
//     flexDirection: 'row',
//     marginBottom: 8,
//     alignItems: 'center',
//     gap: 4,
//   },
//   creditCardLabel: {
//     fontSize: 10,
//     marginRight: 4,
//   },
//   creditCardValue: {
//     fontSize: 10,
//     flex: 1,
//     marginRight: 2,
//   },
// });
// const companyLogo = '/images/logo.png';

// export const PDFDocument2 = ({ formData, carImages, fuelImage, passportImage , companyLogo , carViewImages}) => (
//   <Document>
//     <Page size="A4" style={styles.page}>

//     {companyLogo && (
//         <Image src={companyLogo} style={styles.headerImage} />
//       )}

//       <Text style={styles.title}>Vehicle Rental Agreement</Text>

//       {/* Personal Information */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeading}>Personal Information</Text>
//         <View style={styles.row}>
//           <Text style={styles.label}>Full Name:</Text>
//           <Text style={styles.value}>{formData.fullName}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Email:</Text>
//           <Text style={styles.value}>{formData.email}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Phone:</Text>
//           <Text style={styles.value}>{formData.phone}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Address:</Text>
//           <Text style={styles.value}>{formData.address}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Date of Birth:</Text>
//           <Text style={styles.value}>{formData.dob}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Passport ID:</Text>
//           <Text style={styles.value}>{formData.passportId}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Emirates ID:</Text>
//           <Text style={styles.value}>{formData.emiratesId}</Text>
//         </View>
//       </View>

//     <View style={styles.section}>
//     <View style={styles.creditCardHeader}>
//       <Text style={styles.creditCardHeaderText}>CREDIT CARD AUTHORISATION</Text>
//     </View>

//     <View style={styles.creditCardRow}>
//       <Text style={styles.creditCardLabel}>I</Text>
//       <Text style={styles.creditCardValue}>{formData.fullName}</Text>
//       <Text style={styles.creditCardLabel}>the undersigned with the following</Text>
//     </View>

//     <View style={styles.creditCardRow}>
//       <Text style={styles.creditCardLabel}>Passport Number</Text>
//       <Text style={styles.creditCardValue}>{formData.passportId}</Text>
//       <Text style={styles.creditCardLabel}>National ID</Text>
//       <Text style={styles.creditCardValue}>{formData.nationalId}</Text>
//     </View>

//     <View style={styles.creditCardRow}>
//       <Text style={styles.creditCardLabel}>
//         I hereby authorise reserve car rental to debit my credit card for the changes as per below
//       </Text>
//     </View>

//     <View style={styles.creditCardRow}>
//       <Text style={styles.creditCardLabel}>Credit Card No.</Text>
//       <Text style={styles.creditCardValue}>{formData.creditCardNo}</Text>
//       <Text style={styles.creditCardLabel}>Expiry Date</Text>
//       <Text style={styles.creditCardValue}>{formData.creditCardExpiryDate}</Text>
//       <Text style={styles.creditCardLabel}>Amount Dhs</Text>
//       <Text style={styles.creditCardValue}></Text>
//     </View>

//     <View style={styles.creditCardRow}>
//       <Text style={styles.creditCardLabel}>Name of the card holder</Text>
//       <Text style={styles.creditCardValue}>{formData.holderCreditCard}</Text>
//       <Text style={styles.creditCardLabel}>Signature</Text>
//       <Text style={styles.creditCardValue}></Text>
//     </View>
//   </View>

//       {/* License Information */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeading}>License Information</Text>
//         <View style={styles.row}>
//           <Text style={styles.label}>License Number:</Text>
//           <Text style={styles.value}>{formData.licenseNumber}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Secondary License:</Text>
//           <Text style={styles.value}>{formData.licenseNumber2}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Issue Date:</Text>
//           <Text style={styles.value}>{formData.licenseIssueDate}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Expiry Date:</Text>
//           <Text style={styles.value}>{formData.licenseExpiryDate}</Text>
//         </View>
//       </View>

//       {/* Vehicle Information */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeading}>Vehicle Information</Text>
//         <View style={styles.row}>
//           <Text style={styles.label}>Car Info:</Text>
//           <Text style={styles.value}>{formData.carInfo}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Car Model</Text>
//           <Text style={styles.value}>{formData.carModel}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Car Fuel:</Text>
//           <Text style={styles.value}>{formData.carFuel}</Text>
//         </View>
//       </View>

//       {/* Rental Information */}
//       <View style={styles.section}>
//         <Text style={styles.sectionHeading}>Rental Information</Text>
//         <View style={styles.row}>
//           <Text style={styles.label}>Charges:</Text>
//           <Text style={styles.value}>{formData.rentCharges}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Rental Date:</Text>
//           <Text style={styles.value}>{formData.rentalDate}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Location:</Text>
//           <Text style={styles.value}>{formData.rentalLocation}</Text>
//         </View>
//       </View>

//         {/* Payment Information  */}
//         <View style={styles.section}>
//           <Text style={styles.sectionHeading}>Payment Information</Text>
//         <View style={styles.row}>
//           <Text style={styles.label}>Rate Per Day</Text>
//           <Text style={styles.value}>{formData.rentCharges}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Daily KM Limit</Text>
//           <Text style={styles.value}>{formData.dailyKmValue}</Text>
//         </View>
//         <View style={styles.row}>
//           <Text style={styles.label}>Car Fuel:</Text>
//           <Text style={styles.value}>{formData.carFuel}</Text>
//         </View>
//       </View>

//       {/* Vehicle Condition Diagram */}

//       {/* Car View Images Section */}
      


// {/* Images Section */}
// <View style={styles.section}>
//   <Text style={styles.sectionHeading}>Documentation</Text>
//   <View style={styles.imageGrid}>
//     {passportImage && (
//       <View style={styles.imageContainer}>
//         <Text style={styles.imageLabel}>Passport</Text>
//         <Image src={passportImage} style={styles.image} />
//       </View>
//     )}
//     {Object.entries(carImages).map(([key, value]) => (
//       value && (
//         <View key={key} style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>{key}</Text>
//           <Image src={value} style={styles.image} />
//         </View>
//       )
//     ))}
//     {fuelImage && (
//       <View style={styles.imageContainer}>
//         <Text style={styles.imageLabel}>Fuel Status</Text>
//         <Image src={fuelImage} style={styles.image} />
//       </View>
//     )}
//     {Object.entries(carViewImages).map(([key, value]) => (
//       value && (
//         <View key={key} style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>{key}</Text>
//           <Image src={value} style={styles.image} />
//         </View>
//       )
//     ))}
  
//   </View>
// </View>


//       {/* Signatures */}
//       <View style={styles.signatureSection}>
//         <View style={styles.signatureBox}>
//           <Text>Customer Signature</Text>
//           <Text>Date: _____________</Text>
//         </View>
//         <View style={styles.signatureBox}>
//           <Text>Agent Signature</Text>
//           <Text>Date: _____________</Text>
//         </View>
//       </View>
//     </Page>
//   </Document>
// )

export default function IntegratedCarRentalForm() {
  const[showDownloadPdfButton , setShowDownloadPdfButton] = useState(false)
  const [isClient, setIsClient] = useState(false);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const[formId , setFormId] = useState(null);
  const[loading , setLoading] = useState(false);
 

  useEffect(() => {
    setIsClient(true)
  }, []);

  useEffect(() => {
    const fetchFormId = async () => {

      setLoading(true);
      try {
        const documentId = process.env.NEXT_PUBLIC_APPWRITE_DOCUMENT_ID; 
        const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID; 
        const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID2;

        const document = await databases.getDocument(databaseId, collectionId, documentId);
        
        if (!document) {
          console.log("Document with id not found");
        } else {
          const formID = document.formNo;
          setFormId(formID);  // Set formId after fetching
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching form ID:', error.message);
      } finally{
        setLoading(false);
      }
    };

    fetchFormId();
  }, []);

  console.log("this is my useEffect form Id" , formId);

  const [formData, setFormData] = useState({
    fullName: '',
    firstName :'',
    lastName:'',
    firstName2:'',
    lastName2:'',
    email: '',
    phone: '',
    address: '',
    dob: '',
    dob2:'',
    nationality:'',
    nationality2:'',
    passportId: '',
    passportId2:'',
    passportIssueDate:'',
    passportExpiryDate:'',
    passportIssueDate2:'',
    passportExpiryDate2:'',
    emiratesId: '',
    licenseNumber: '',
    licenseNumber2:'',
    licenseIssueDate: '',
    licenseExpiryDate: '',
    emiratesId2:'',
    licenseIssueDate2:'',
    licenseExpiryDate2:'',
    creditCardNo:'',
    holderCreditCard:'',
    nationalId:'',
    creditCardExpiryDate:'',
    carInfo: '',
    carBrand:'',
    carPlateNo:'',
    carColor:'',
    carFuel: '',
    carModel:'',
    rentCharges: '',
    rentalDate: '',
    rentalEndDate:'',
    vehicleHandoverTime:'',
    vehicleReceivedTime:'',
    rentalLocation: '',
    dailyKmValue:'',
    securityDeposit:'',
    advancePayment:''
  });

  const uniqueId = nanoid();
  const router = useRouter(); 

  useEffect(() => {
    const checkUser = async () => {
      const status = await isUserLoggedIn();
      if (!status.success) {
        toast.error("You need to be logged in first to use the app")
        router.push("/signin"); // Redirect to login page if not logged in
      }
    };

    checkUser();
  },[router])

  const frontViewUrl = "/images/front-car-image.jpg"
  const rearViewUrl = "/images/rear-view-image.jpg"

  const [carViewImages, setCarViewImages] = useState({
    frontView: null,
    rearView: null,
  });

  console.log(carViewImages)

  const handleSaveFrontView = (imageData) => {
    setCarViewImages(prev => ({ ...prev, frontView: imageData }))
  }

  const handleSaveRearView = (imageData) => {
    setCarViewImages(prev => ({ ...prev, rearView: imageData }))
  }

  const[carImages , setCarImages] = useState({
    angle1 : null , 
    angle2 : null , 
    angle3 : null , 
    angle4 : null , 
    angle5 : null
  }); 


  const[fuelImage , setFuelImage] = useState(null);
  // const[pdfblob ,setPdfBlob] = useState(null);
  const[passportImage ,setPassportImage] = useState(null);
  const[emiratesId1Image , setEmiratesId1Image] = useState(null);
  const[emiratesId2Image , setEmiratesId2Image] = useState(null);
  const[passportImage2 , setPassportImage2] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({ ...prevData, [id]: value }));
  };

 console.log(formData);

  //Function to save the Image 
  const handleImageSave = (angleIndex, imageData) => {
    setCarImages(prevImages => ({
      ...prevImages,
      [`angle${angleIndex}`]: imageData
    }));
  };

  const handlePassportImageChange = (event) =>{
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPassportImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  const handlePassportImage2Change = (event) =>{
    const file = event.target.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) =>{
        setPassportImage2(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleFuelImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFuelImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmiratesImage1Change=(event) =>{
    const file = event.target.files?.[0];
    if(file){
      const reader = new FileReader(); 
      reader.onload = (e) =>{
        setEmiratesId1Image(e.target.result)
      };
      reader.readAsDataURL(file);
    }
  }

  const handleEmiratesImage2Change = (event) =>{
     const file = event.target.files?.[0] ; 
     if(file){
      const reader = new FileReader();
      reader.onload = (e) =>{
        setEmiratesId2Image(e.target.result);
      };
      reader.readAsDataURL(file);
     }
  }


//  const handleGeneratePDF = async(formData , carImages , fuelImage , passportImage, carViewImages) => {
//   try {
//     const instance = pdf(
//         <PDFDocument2 
//             formData={formData} 
//             carImages={carImages} 
//             fuelImage={fuelImage} 
//             passportImage={passportImage} 
//             carViewImages={carViewImages}
//         />
//     );
//     const blob = await instance.toBlob();
//     return blob;
// } catch (error) {
//     console.error('Error generating PDF:', error);
//     throw error;
// }
//  }


//  const handleGeneratePDF2 = async (formData, carViewImages) => {
//   console.log("this is my formdata , and carViewImages ", formData, carViewImages);
  
//   try {
//     const pdfDoc = await PdfModifier({ 
//       formData: formData,
//       carViewImages: carViewImages
//     });

//     // Now you can get the bytes and create blob
//     const pdfBytes = await pdfDoc.save();
//     const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
//     return blob;
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     throw error;
//   }
// };
  //method to handle personal info in database

  const dbId =process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
  const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;



  const handleSubmit = async (e) => {
    e.preventDefault();

     // Collect all required fields
  const requiredFields = [
    'firstName','lastName', 'email', 'phone', 'address', 'dob', 'passportId',
    'passportIssueDate', 'passportExpiryDate', 'emiratesId',
    'licenseNumber', 'licenseIssueDate', 'licenseExpiryDate', 
    'carInfo', 'carFuel', 'rentCharges', 'rentalDate', 'rentalLocation',
  ];

  // Check if any required field is empty
  const missingFields = requiredFields.filter(field => !formData[field]?.trim());
  
  if (missingFields.length > 0) {
    toast.error(`Please fill out the following fields: ${missingFields.join(', ')}`);
    return;
  }

    const uploadedImages = [];
    const carViewUploadedImages = [] ; 

    try {

      console.log("this is my bucket Id" , bucketId);
      setIsSubmitting(true);
      // const pdfBlob = await handleGeneratePDF(formData, carImages, fuelImage, passportImage , carViewImages);
      // const pdfFileId = await uploadFileToAppwrite(
      //     pdfBlob, 
      //     bucketId, 
      //     'application/pdf', 
      //     `document-${formData?.fullName || 'user'}`
      // );

      const pdfBlob2 = await handleGeneratePDF2(formData , carViewImages ,formId)
      console.log("This is my pdfBlob2",pdfBlob2);
      const pdfFileId2 = await uploadFileToAppwrite(
        pdfBlob2, 
        bucketId, 
        'application/pdf', 
        `document-${formData?.fullName || 'user'}`
      )

        // Upload car images
        for (const [key, image] of Object.entries(carImages)) {
            if (image) {
                const fileId = await uploadFileToAppwrite(image, bucketId);
                uploadedImages.push(fileId);
            }
        }

        for(const[key , image] of Object.entries(carViewImages)){
          if(image){
            const carViewFileId = await uploadFileToAppwrite(image , bucketId);
            carViewUploadedImages.push(carViewFileId)
          }
        }

        const emiratesImageId1 = emiratesId1Image
        ? await uploadFileToAppwrite(emiratesId1Image , bucketId)
        :null

        const emiratesImageId2 = emiratesId2Image
        ? await uploadFileToAppwrite(emiratesId2Image , bucketId)
        :null

        const passportImageId2 = passportImage2
        ? await uploadFileToAppwrite(passportImage2 , bucketId)
        : null;
        // Upload passport image
        const passportImageId = passportImage
            ? await uploadFileToAppwrite(passportImage, bucketId)
            : null;

        // Upload fuel image
        const fuelImageId = fuelImage
            ? await uploadFileToAppwrite(fuelImage, bucketId)
            : null;

        // Save to database
        const response = await databases.createDocument(
            dbId,
            collectionId,
            ID.unique(), // Using ID.unique() instead of 'unique()'
            {
                clientId: uniqueId,
                firstName:formData?.firstName||'',
                lastName : formData?.lastName ||'',
                firstName2:formData?.firstName2||'',
                lastName2:formData.lastName2||'',
                email: formData?.email || '',
                dob : formData?.dob || '',
                dob2:formData?.dob2||'',
                nationality:formData?.nationality||'',
                nationality2:formData?.nationality2||'',
                carInfo : formData?.carInfo || '',
                carModel : formData?.carModel || '',
                carBrand:formData?.carBrand || '',
                carPlateNo:formData?.carPlateNo || '',
                carColor:formData?.carColor||'',
                passportId : formData?.passportId || '',
                passportId2:formData?.passportId2 || '',
                passportIssueDate: formData?.passportIssueDate || '',
                passportExpiryDate : formData?.passportExpiryDate || '',
                passportIssueDate2:formData?.passportIssueDate2 || '',
                passportExpiryDate2:formData?.passportExpiryDate2 || '',
                emiratesId : formData?.emiratesId || '',
                emiratesId2 : formData?.emiratesId2|| '',
                creditCardNo:formData?.creditCardNo||'',
                creditCardExpiryDate:formData?.creditCardExpiryDate||'',
                nationalId:formData?.nationalId||'',
                holderCreditCard:formData?.holderCreditCard ||'',
                licenseNumber : formData?.licenseNumber || '',
                licenseNumber2 : formData?.licenseNumber2 || '',
                licenseExpiryDate : formData?.licenseExpiryDate || '',
                licenseExpiryDate2 : formData?.licenseExpiryDate2||'',
                licenseIssueDate : formData?.licenseIssueDate || '',
                licenseIssueDate2 : formData?.licenseIssueDate2 || '',
                dailyKmValue:formData?.dailyKmValue || '',
                phone: formData?.phone || '',
                rentalDate : formData?.rentalDate || '',
                rentalEndDate:formData?.rentalEndDate||'',
                rentCharges : formData?.rentCharges || '',
                vehicleHandoverTime:formData?.vehicleHandoverTime||'',
                vehicleReceivedTime:formData?.vehicleReceivedTime || '',
                address: formData?.address || '',
                carImageIds: uploadedImages,
                carViewImages: carViewUploadedImages,
                passportImageId: passportImageId || '',
                fuelImageId: fuelImageId || '',
                emiratesImageId1 : emiratesImageId1 ||'',
                emiratesImageId2 : emiratesImageId2 || '',
                passportImageId2:passportImageId2 || '',
                // pdfFileId : pdfFileId,
                pdfFileId2 : pdfFileId2,
                securityDeposit:formData?.securityDeposit || '',
                advancePayment:formData?.advancePayment ||'',
            }
        );

        setIsSubmitting(false);
        setShowDownloadPdfButton(true);

        updateDocuments(); 
        
        toast.success('Form Submitted Successfully');
        
        console.log('Document created successfully:', response);
        
    } catch (error) {
        toast.error('Failed to submit form:', error);
        alert('Error occurred while submitting the form: ' + error.message);
        console.log(error);
    }finally{
      setIsSubmitting(false)
    }
};



  return (
    <div>
    <Navbar></Navbar>
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Client Registration</h1>
      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="First Name" id="firstName" placeholder="--" value={formData.firstName} onChange={handleChange} required ={true}/>
          <InputField label="Last Name" id="lastName" placeholder="--" value={formData.lastName} onChange={handleChange} required ={true}/>
          <InputField label="Email" id="email" type="email" placeholder="--" value={formData.email} onChange={handleChange} required ={true}/>
          <InputField label="Nationality" id="nationality" placeholder="--" value={formData.nationality} onChange={handleChange} required ={true}/>
          <InputField label="Phone Number" id="phone" type="tel" placeholder="--" value={formData.phone} onChange={handleChange} required ={true}/>
          <InputField label="Address" id="address" placeholder="--" value={formData.address} onChange={handleChange} required ={true} />
          <InputField label="Date of Birth" id="dob" type="date" value={formData.dob} onChange={handleChange} required ={true} />
        </div>
      </Section>

      <Section title="Passport Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Passport ID" id="passportId" placeholder="--" value={formData.passportId} onChange={handleChange} required ={true}/>
          <FileInput label="Client Photo" id="passportPhoto" onChange={handlePassportImageChange} required ={true}/>
          {passportImage && (
             <div className='mt-2 '>
                <img src={passportImage} alt="passport-image" className="w-32 h-32 object-cover" />
                <span className="text-sm text-green-600">✓ Client Image uploaded</span>
             </div>
          )}
          <InputField label="Issue Date" id="passportIssueDate" type="date" value={formData.passportIssueDate} onChange={handleChange} required ={true}/>
          <InputField label="Expiry Date" id="passportExpiryDate" type="date" value={formData.passportExpiryDate} onChange={handleChange} required ={true}/>
          <FileInput label="Passport Photo" id="passportPhoto2" onChange={handlePassportImage2Change} required ={true}/>
          {passportImage2 && (
             <div className='mt-2 '>
                <img src={passportImage2} alt="passport-image" className="w-32 h-32 object-cover" />
                <span className="text-sm text-green-600">✓ Passport Image uploaded</span>
             </div>
          )}
        </div>
      </Section>

      <Section title="Emirates ID & License Information">
      <p className='font-bold mb-2'>Driver 1 </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Emirates ID" id="emiratesId" placeholder="--" value={formData.emiratesId} onChange={handleChange} required ={true}/>
          <InputField label="License Number" id="licenseNumber" placeholder="--" value={formData.licenseNumber} onChange={handleChange} required ={true}/>
          <InputField label="License Issue Date" id="licenseIssueDate" type="date" value={formData.licenseIssueDate} onChange={handleChange} required ={true}/>
          <InputField label="License Expiry Date" id="licenseExpiryDate" type="date" value={formData.licenseExpiryDate} onChange={handleChange} required ={true}/>
          <FileInput label="Emirates Id Image" id="emiratesIdImage" onChange={handleEmiratesImage1Change} required ={true}/>
          {emiratesId1Image && (
             <div className='mt-2 '>
                <img src={emiratesId1Image} alt="passport-image" className="w-32 h-32 object-cover" />
                <span className="text-sm text-green-600">Emirates Image uploaded</span>
             </div>
          )}
        </div>

      <p className='font-bold mb-2 '>Driver 2 (optional)</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="First Name" id="firstName2" placeholder="--" value={formData.firstName2} onChange={handleChange} required ={false}/>
            <InputField label="Last Name" id="lastName2" placeholder="--" value={formData.lastName2} onChange={handleChange} required ={false}/>
            <InputField label="Date of Birth" id="dob2" type="date" value={formData.dob2} onChange={handleChange} required ={false} />
            <InputField label="Emirates ID" placeholder="--" id="emiratesId2" value={formData.emiratesId2} onChange={handleChange} required={false}/>
            <InputField label="Nationality" id="nationality2" placeholder="--" value={formData.nationality2} onChange={handleChange} required ={false}/>
            <InputField label="License Number" id="licenseNumber2" placeholder="--" value={formData.licenseNumber2} onChange={handleChange}  required={false}/>
            <InputField label="License Issue Date" id="licenseIssueDate2" type="date" value={formData.licenseIssueDate2} onChange={handleChange}  required={false}/>
            <InputField label="License Expiry Date" id="licenseExpiryDate2" type="date" value={formData.licenseExpiryDate2} onChange={handleChange}  required={false}/>
            <InputField label="Passport ID" id="passportId2" placeholder="--" value={formData.passportId2} onChange={handleChange} required ={false}/>
            <InputField label="Issue Date" id="passportIssueDate2" type="date" value={formData.passportIssueDate2} onChange={handleChange} required ={false}/>
            <InputField label="Expiry Date" id="passportExpiryDate2" type="date" value={formData.passportExpiryDate2} onChange={handleChange} required ={false}/>
            <FileInput label="Emirates Id 2 Image" id="emiratesIdImage" onChange={handleEmiratesImage2Change} required ={false}/>
            {emiratesId2Image && (
             <div className='mt-2 '>
                <img src={emiratesId2Image} alt="passport-image" className="w-32 h-32 object-cover" />
                <span className="text-sm text-green-600">Emirates Image uploaded</span>
             </div>
          )}
        </div>


      </Section>

      <Section title="Credit Card Details (optional)">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Credit Card No"
              id="creditCardNo"
              placeholder="Enter your credit card number"
              value={formData.creditCardNo}
              onChange={handleChange}
              required={false}
            />
            <InputField
              label="Name of the Card Holder"
              id="holderCreditCard"
              placeholder="Enter cardholder's name"
              value={formData.holderCreditCard}
              onChange={handleChange}
              required={false}
            />
            <InputField
              label="National ID"
              id="nationalId"
              placeholder="Enter national ID"
              value={formData.nationalId}
              onChange={handleChange}
              required={false}
            />
            <InputField
              label="Credit Card Expiry Date"
              id="creditCardExpiryDate"
              type="date"
              value={formData.creditCardExpiryDate}
              onChange={handleChange}
              required={false}
            />
          </div>
      </Section>


      

      <Section title="Vehicle Information">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-full">
              <label htmlFor="carInfo" className="block text-sm font-medium text-gray-700 mb-1">Car Information</label>
              <textarea
                id="carInfo"
                rows="3"
                placeholder="Enter car details (make, model, year, etc.)"
                value={formData.carInfo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <CarSelection
                label="Car Model"
                id="carModel"
                value={formData.carModel}
                onChange={handleChange}
                required={true}
              />
             <InputField label="Car Brand" id="carBrand" placeholder="--" value={formData.carBrand} onChange={handleChange} required ={false}/>
             <InputField label="Car Plate No" id="carPlateNo" placeholder="--" value={formData.carPlateNo} onChange={handleChange} required ={false}/>
             <InputField label="Car Color" id="carColor" placeholder="--" value={formData.carColor} onChange={handleChange} required ={false}/>
            <InputField label="Car Fuel" id="carFuel" placeholder="--" value={formData.carFuel} onChange={handleChange} required ={false}/>
            <InputField label="Car Rent Charges" id="rentCharges" type="number" placeholder="Enter daily rate" value={formData.rentCharges} onChange={handleChange} required ={false}/>
           
            <InputField
                  label="Daily KM Value"
                  id="dailyKmValue"
                  placeholder="Enter daily KM allowance"
                  value={formData.dailyKmValue}
                  onChange={handleChange}
                  required={true}
                />
          </div>

      
      <Section title="Rental Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Rental Start" id="rentalDate" type="date" value={formData.rentalDate} onChange={handleChange} required ={false}/>
        <InputField label="Rental End Date" id="rentalEndDate" type="date" value={formData.rentalEndDate} onChange={handleChange} required ={false}/>
        <InputField label="Vehicle Handover Time" id="vehicleHandoverTime"  value={formData.vehicleHandoverTime} onChange={handleChange} required ={false}/>
        <InputField label="Vehicle Received Time" id="vehicleReceivedTime" value={formData.vehicleReceivedTime} onChange={handleChange} required ={false}/>
        <InputField label="Rental Location" id="rentalLocation" placeholder="Enter pickup locaiotn" value={formData.rentalLocation} onChange={handleChange} required ={false}/>
        </div>
      </Section>

      <Section title="Payment Received Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Security Deposit" id="securityDeposit"  value={formData.securityDeposit} onChange={handleChange} required ={false}/>
        <InputField label="Advance Payment" id="advancePayment"  value={formData.advancePayment} onChange={handleChange} required ={false}/>
        </div>
      </Section>
          
          <div>
            <label className="block text-xl font-semibold mb-4">Car Pictures (5 different angles)</label>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Angle {index}</h3>
                  <ImageDrawForm 
                     onSave={(imageData) => handleImageSave(index, imageData)}
                  />
                   {carImages[`angle${index}`] && (
                      <div className="mt-2">
                        <span className="text-green-600 text-sm">✓ Image saved</span>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Front View</h2>
                <ImageEditor2 imageUrl={frontViewUrl} onSave={handleSaveFrontView} />
                {/*insert image saved Icon Here */}
                {carViewImages.frontView && (
                  <div className="mt-2">
                    <img src={fuelImage} alt="Fuel Image" className="w-32 h-32 object-cover" />
                    <span className="text-sm text-green-600">✓ Fuel image uploaded</span>
                  </div>
          )}
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Rear View</h2>
                <ImageEditor2 imageUrl={rearViewUrl} onSave={handleSaveRearView} />  
                {carViewImages.frontView && (
                  <div className="mt-2">
                    <img src={fuelImage} alt="Fuel Image" className="w-32 h-32 object-cover" />
                    <span className="text-sm text-green-600">✓ Fuel image uploaded</span>
                  </div>
                )}
              </div>

          </div>
          
          <FileInput label="Fuel Image" id="fuelImage"
          onChange={handleFuelImageChange} required ={true}/>

          {fuelImage && (
            <div className="mt-2">
              <img src={fuelImage} alt="Fuel Image" className="w-32 h-32 object-cover" />
              <span className="text-sm text-green-600">✓ Fuel image uploaded</span>
            </div>
          )}

        </div>
      </Section>

      <div className="mt-8 flex justify-end">
        <button
          
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          {isSubmitting ? (
          <Loader2 className="animate-spin mr-2" size={20} />
        ) : (
          'Submit Form'
        )}
      </button>
      </div>
    </form>

          <div>
              {loading ? (
                // Show a loading indicator if the `loading` state is true
                <div>Loading...</div>
              ) : showDownloadPdfButton ? (
                // Show PdfModifier only if the form is submitted and `formId` is available
                formId ? (
                  <PdfModifier formData={formData} carViewImages={carViewImages} formId={formId} />
                ) : (
                  // Show error message if `formId` is not available after submission
                  <div>Failed to load form data.</div>
                )
              ) : (
                // Placeholder or nothing if the form is not submitted and `showDownloadPdfButton` is false
                <div>Submit the form to proceed.</div>
              )}
            </div>

    
    
    {/* {isClient && showDownloadPdfButton &&  (
  <div className="mt-6 text-center">
    <PDFDownloadLink
      document={
        <PDFDocument2
          formData={formData}
          carImages={carImages}
          fuelImage={fuelImage}
          passportImage={passportImage}
          companyLogo={companyLogo}
          carViewImages={carViewImages}
        />
      }
      fileName={`${formData.fullName}.pdf`}
      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
    >
      {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
    </PDFDownloadLink>
  </div>
)} */}
  
    </div>
  );
}