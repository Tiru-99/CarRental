"use client"
import React, { useState , useEffect} from 'react';
import {  Document, Page, View, Text, Image, StyleSheet,pdf } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ImageDrawForm from '../../components/ImageEditor';
import {nanoid} from 'nanoid';
import { databases } from '../../utils/appwriteConf';
import { uploadFileToAppwrite } from '../../utils/appwriteConf';
import { ID } from 'appwrite';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { isUserLoggedIn } from '@/utils/appwriteAuth';


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

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 15,
    borderBottom: '1px solid #ccc',
    paddingBottom: 10,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    padding: 4,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  label: {
    width: '30%',
    fontSize: 10,
    fontWeight: 'bold',
  },
  value: {
    width: '70%',
    fontSize: 10,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  imageContainer: {
    width: '45%',
  },
  imageLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  image: {
    width: '100%',
    height: 120,
    objectFit: 'cover',
    border: '1px solid #ccc',
  },
  vehicleDiagram: {
    marginTop: 10,
    border: '1px solid #ccc',
    padding: 10,
  },
  legend: {
    fontSize: 8,
    marginTop: 5,
  },
  signatureSection: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
    borderTop: '1px solid #000',
    paddingTop: 5,
    fontSize: 8,
  },
})

export const PDFDocument = ({ formData, carImages, fuelImage, passportImage }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Vehicle Rental Agreement</Text>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Personal Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.value}>{formData.fullName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{formData.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{formData.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{formData.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{formData.dob}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Passport ID:</Text>
          <Text style={styles.value}>{formData.passportId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Emirates ID:</Text>
          <Text style={styles.value}>{formData.emiratesId}</Text>
        </View>
      </View>

      {/* License Information */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>License Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>License Number:</Text>
          <Text style={styles.value}>{formData.licenseNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Secondary License:</Text>
          <Text style={styles.value}>{formData.licenseNumber2}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Issue Date:</Text>
          <Text style={styles.value}>{formData.licenseIssueDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Expiry Date:</Text>
          <Text style={styles.value}>{formData.licenseExpiryDate}</Text>
        </View>
      </View>

      {/* Vehicle Information */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Vehicle Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Car Details:</Text>
          <Text style={styles.value}>{formData.carInfo}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Fuel Type:</Text>
          <Text style={styles.value}>{formData.carFuel}</Text>
        </View>
      </View>

      {/* Rental Information */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Rental Information</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Charges:</Text>
          <Text style={styles.value}>{formData.rentCharges}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Rental Date:</Text>
          <Text style={styles.value}>{formData.rentalDate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.value}>{formData.rentalLocation}</Text>
        </View>
      </View>

      {/* Vehicle Condition Diagram */}
      <View style={styles.vehicleDiagram}>
        <Text style={styles.sectionHeading}>Vehicle Condition</Text>
        <Text style={styles.legend}>
          Legend: B=BENT | BR=BROKEN | C=CUT | D=DENTED | P=PAINTED | FF=FOREIGN FLUID | 
          G=GOUGED | M=MISSING | R=RUST | S=SCRATCHED | ST=STAINED | T=TORN
        </Text>
        {/* Vehicle diagram would go here */}
      </View>

      {/* Images Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeading}>Documentation</Text>
        <View style={styles.imageGrid}>
          {passportImage && (
            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>Passport</Text>
              <Image src={passportImage} style={styles.image} />
            </View>
          )}
          {Object.entries(carImages).map(([key, value]) => (
            value && (
              <View key={key} style={styles.imageContainer}>
                <Text style={styles.imageLabel}>{key}</Text>
                <Image src={value} style={styles.image} />
              </View>
            )
          ))}
          {fuelImage && (
            <View style={styles.imageContainer}>
              <Text style={styles.imageLabel}>Fuel Status</Text>
              <Image src={fuelImage} style={styles.image} />
            </View>
          )}
        </View>
      </View>

      {/* Signatures */}
      <View style={styles.signatureSection}>
        <View style={styles.signatureBox}>
          <Text>Customer Signature</Text>
          <Text>Date: _____________</Text>
        </View>
        <View style={styles.signatureBox}>
          <Text>Agent Signature</Text>
          <Text>Date: _____________</Text>
        </View>
      </View>
    </Page>
  </Document>
)

export default function IntegratedCarRentalForm() {

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    passportId: '',
    passportIssueDate:'',
    passportExpiryDate:'',
    emiratesId: '',
    licenseNumber: '',
    licenseNumber2:'',
    licenseIssueDate: '',
    licenseExpiryDate: '',
    carInfo: '',
    carFuel: '',
    rentCharges: '',
    rentalDate: '',
    rentalLocation: '',
  });

  const uniqueId = nanoid();
  const router = useRouter(); 

  useEffect(() => {
    const checkUser = async () => {
      const status = await isUserLoggedIn();
      if (!status.success) {
        alert("You need to be logged in first to use the app")
        router.push("/signin"); // Redirect to login page if not logged in
      }
    };

    checkUser();
  },[router])

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

  

 const handleGeneratePDF = async(formData , carImages , fuelImage , passportImage) => {
  try {
    const instance = pdf(
        <PDFDocument 
            formData={formData} 
            carImages={carImages} 
            fuelImage={fuelImage} 
            passportImage={passportImage} 
        />
    );
    const blob = await instance.toBlob();
    return blob;
} catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
}
 }

  //method to handle personal info in databas

  const dbId =process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ;
  const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
  const buckedId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;



  const handleSubmit = async (e) => {
    e.preventDefault();

     // Collect all required fields
  const requiredFields = [
    'fullName', 'email', 'phone', 'address', 'dob', 'passportId',
    'passportIssueDate', 'passportExpiryDate', 'emiratesId',
    'licenseNumber', 'licenseIssueDate', 'licenseExpiryDate', 
    'carInfo', 'carFuel', 'rentCharges', 'rentalDate', 'rentalLocation',
  ];

  // Check if any required field is empty
  const missingFields = requiredFields.filter(field => !formData[field]?.trim());
  
  if (missingFields.length > 0) {
    alert(`Please fill out the following fields: ${missingFields.join(', ')}`);
    return;
  }


    const bucketId = buckedId;
    const uploadedImages = [];

    try {


      const pdfBlob = await handleGeneratePDF(formData, carImages, fuelImage, passportImage);
      const pdfFileId = await uploadFileToAppwrite(
          pdfBlob, 
          bucketId, 
          'application/pdf', 
          `document-${formData?.fullName || 'user'}`
      );

        // Upload car images
        for (const [key, image] of Object.entries(carImages)) {
            if (image) {
                const fileId = await uploadFileToAppwrite(image, bucketId);
                uploadedImages.push(fileId);
            }
        }

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
                fullName: formData?.fullName || '',
                email: formData?.email || '',
                dob : formData?.dob || '',
                carInfo : formData?.carInfo || '',
                passportId : formData?.passportId || '',
                passportIssueDate: formData?.passportIssueDate || '',
                passportExpiryDate : formData?.passportExpiryDate || '',
                emiratesId : formData?.emiratesId || '',
                licenseNumber : formData?.licenseNumber || '',
                licenseNumber2 : formData?.licenseNumber2 || '',
                licenseExpiryDate : formData?.licenseExpiryDate || '',
                licenseIssueDate : formData?.licenseIssueDate || '',
                phone: formData?.phone || '',
                rentalDate : formData?.rentalDate || '',
                rentCharges : formData?.rentCharges || '',
                address: formData?.address || '',
                carImageIds: uploadedImages,
                passportImageId: passportImageId || '',
                fuelImageId: fuelImageId || '',
                pdfFileId : pdfFileId,
            }
        );

        alert('Form Submitted Successfully');
        console.log('Document created successfully:', response);
    } catch (error) {
        console.error('Failed to submit form:', error);
        alert('Error occurred while submitting the form: ' + error.message);
    }
};

  return (
    <div>
    <Navbar></Navbar>
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Client Registration</h1>
      <Section title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Full Name" id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required ={false}/>
          <InputField label="Email" id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required ={false}/>
          <InputField label="Phone Number" id="phone" type="tel" placeholder="+1234567890" value={formData.phone} onChange={handleChange} required ={false}/>
          <InputField label="Address" id="address" placeholder="123 Main St, City, Country" value={formData.address} onChange={handleChange} required ={false} />
          <InputField label="Date of Birth" id="dob" type="date" value={formData.dob} onChange={handleChange} required ={false} />
        </div>
      </Section>

      <Section title="Passport Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Passport ID" id="passportId" placeholder="AB1234567" value={formData.passportId} onChange={handleChange} required ={false}/>
          <FileInput label="Client Photo" id="passportPhoto" onChange={handlePassportImageChange} required ={false}/>
          {passportImage && (
             <div className='mt-2 '>
                <img src={passportImage} alt="passport-image" className="w-32 h-32 object-cover" />
                <span className="text-sm text-green-600">✓ Client Image uploaded</span>
             </div>
          )}
          <InputField label="Issue Date" id="passportIssueDate" type="date" value={formData.passportIssueDate} onChange={handleChange} required ={false}/>
          <InputField label="Expiry Date" id="passportExpiryDate" type="date" value={formData.passportExpiryDate} onChange={handleChange} required ={false}/>
        </div>
      </Section>

      <Section title="Emirates ID & License Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Emirates ID" id="emiratesId" placeholder="784-1234-1234567-1" value={formData.emiratesId} onChange={handleChange} required ={false}/>
          <InputField label="License Number" id="licenseNumber" placeholder="12345678" value={formData.licenseNumber} onChange={handleChange} required ={false}/>
          <InputField label="License Number 2 (optional)" id="licenseNumber2" placeholder="12345678" value={formData.licenseNumber2} onChange={handleChange} />
          <InputField label="License Issue Date" id="licenseIssueDate" type="date" value={formData.licenseIssueDate} onChange={handleChange} required ={false}/>
          <InputField label="License Expiry Date" id="licenseExpiryDate" type="date" value={formData.licenseExpiryDate} onChange={handleChange} required ={false}/>
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
            <InputField label="Car Fuel" id="carFuel" placeholder="e.g., Petrol, Diesel, Electric" value={formData.carFuel} onChange={handleChange} required ={false}/>
            <InputField label="Car Rent Charges" id="rentCharges" type="number" placeholder="Enter daily rate" value={formData.rentCharges} onChange={handleChange} required ={false}/>
            <InputField label="Trip Start Date" id="rentalDate" type="date" value={formData.rentalDate} onChange={handleChange} required ={false}/>
            <InputField label="Rental Location" id="rentalLocation" placeholder="Enter pickup location" value={formData.rentalLocation} onChange={handleChange} required ={false}/>
          </div>
          
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
          Submit Registration
        </button>
      </div>
    </form>
    
    {isClient && (
  <div className="mt-6 text-center">
    <PDFDownloadLink
      document={
        <PDFDocument
          formData={formData}
          carImages={carImages}
          fuelImage={fuelImage}
          passportImage={passportImage}
        />
      }
      fileName={`${formData.fullName}.pdf`}
      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
    >
      {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
    </PDFDownloadLink>
  </div>
)}
  
    </div>
  );
}