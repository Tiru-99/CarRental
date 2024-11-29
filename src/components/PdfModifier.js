"use client"
import {  PDFDocument, rgb, StandardFonts  } from "pdf-lib";



const PdfModifier = ({formData , carViewImages , formId}) => {
  console.log("This is my formId phase 2 ",formId);
  
  const modifyPdf = async () => {
    console.log("this is my formData in pdf" , formData.firstName);
    try {
      // URL to the existing PDF file
      const pdfUrl = "/autobreeze contract.pdf";
      const imageUrl1  = carViewImages.frontView;
      const imageUrl2 = carViewImages.rearView; // Replace with your image URL

      // Fetch and load the existing PDF
      const existingPdfBytes = await fetch(pdfUrl).then((res) =>
        res.arrayBuffer()
      );

      // Fetch the image and convert it to bytes
      const imageBytes = await fetch(imageUrl1).then((res) => res.arrayBuffer());
      const imageBytes2 = await fetch(imageUrl2).then((res) => res.arrayBuffer());

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Embed a font
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Embed the image
      const embeddedImage = await pdfDoc.embedPng(imageBytes); 
      const embeddedImage2 = await pdfDoc.embedPng(imageBytes2); 
     
      // Access the first page
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { height } = firstPage.getSize();

      firstPage.drawText( formId ||"Agreement Number is not found", {
        x: 515,
        y: height - 151,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //fuel1 box 
      firstPage.drawText(formData?.carFuel || '', {
        x: 638,
        y: height - 488,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //fuel2 box 

      firstPage.drawText(formData?.carFuel || '', {
        x: 642,
        y: height - 940,
        size: 14,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      // Add text to the PDF
      //text in first row

      //firstName
      firstPage.drawText(formData?.firstName || '', {
        x: 120,
        y: height - 212,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //dob
      firstPage.drawText(formData?.dob || '', {
        x: 120,
        y: height - 232,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //passportId
      firstPage.drawText(formData?.passportId || '', {
        x: 120,
        y: height - 252,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      //passportIssueDate
      firstPage.drawText(formData?.passportIssueDate || '', {
        x: 120,
        y: height - 272,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //passportExpiryDate
      firstPage.drawText(formData?.passportExpiryDate || '', {
        x: 120,
        y: height - 292,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //text fields in second row
      //lastName
      firstPage.drawText(formData?.lastName || '', {
        x: 380,
        y: height - 212,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Nationality 
      firstPage.drawText(formData?.nationality || '', {
        x: 380,
        y: height - 232,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //LicenseNo
      firstPage.drawText(formData?.licenseNumber || '', {
        x: 380,
        y: height - 252,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //LicenseIssueDate
      firstPage.drawText(formData?.licenseIssueDate || '', {
        x: 380,
        y: height - 272,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //LicenseExpiryDate
      firstPage.drawText(formData?.licenseExpiryDate || '', {
        x: 380,
        y: height - 292,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //additional driver information 
      //first coloum
      //firstname 

      firstPage.drawText(formData?.firstName2 || '', {
        x: 120,
        y: height - 341,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //DOB
      firstPage.drawText(formData?.dob2 || '', {
        x: 120,
        y: height - 361,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //passport Id
      firstPage.drawText(formData?.passportId2 || '', {
        x: 120,
        y: height - 381,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Issue Date
      firstPage.drawText(formData?.passportIssueDate2 || '', {
        x: 120,
        y: height - 401,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Expiry Date
      firstPage.drawText(formData?.passportExpiryDate2 || '', {
        x: 120,
        y: height - 421,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //second row 

      //last name 
      firstPage.drawText(formData?.lastName2 || '', {
        x: 380,
        y: height - 341,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Nationality 
      firstPage.drawText(formData?.nationality2 || '', {
        x: 380,
        y: height - 361,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //License Number
      firstPage.drawText(formData?.licenseNumber2 || '', {
        x: 380,
        y: height - 381,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Issue Date
      firstPage.drawText(formData?.licenseIssueDate2 || '', {
        x: 380,
        y: height - 401,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Expiry Date
      firstPage.drawText(formData?.licenseExpiryDate2 || '', {
        x: 380,
        y: height - 421,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      // Add the image to the PDF
      firstPage.drawImage(embeddedImage, {
        x: 570, // X coordinate for the image
        y: height-470, // Y coordinate for the image
        width: 200,
        height: 290,
      });

      firstPage.drawImage(embeddedImage2, {
        x: 570, // X coordinate for the image
        y: height-920, // Y coordinate for the image
        width: 200,
        height: 290,
      });


      //Credit Card Authorisation 

      firstPage.drawText(`${formData?.firstName} ${formData?.lastName}` || '', {
        x: 100,
        y: height - 472,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //passport Id

      firstPage.drawText(formData?.passportId || '', {
        x: 160,
        y: height - 492,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      
      //nationalId

      firstPage.drawText(formData?.nationalId || '', {
        x: 370,
        y: height - 492,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //creditCardNo 

      firstPage.drawText(formData?.creditCardNo || '', {
        x: 160,
        y: height - 531,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //expiry date
      firstPage.drawText(formData?.creditCardExpiryDate || '', {
        x: 330,
        y: height - 531,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //amount dhs
      firstPage.drawText("", {
        x: 480,
        y: height - 531,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //name of cardholder 
      firstPage.drawText(formData?.holderCreditCard || '', {
        x: 200,
        y: height - 551,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //vehicle information section

      //Brand
      firstPage.drawText(formData?.carBrand || '', {
        x: 130,
        y: height - 612,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Plate No 
      firstPage.drawText(formData?.carPlateNo || '', {
        x: 380,
        y: height - 612,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Model
      firstPage.drawText(formData?.carModel || '', {
        x: 130,
        y: height - 635,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //Color
      firstPage.drawText(formData?.carColor || '', {
        x: 380,
        y: height - 635,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //rental information section 

      //rental start date 
      firstPage.drawText(formData?.rentalDate || '', {
        x: 160,
        y: height - 683,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //vehicle handover time 
      firstPage.drawText(formData?.vehicleHandoverTime || '', {
        x: 160,
        y: height - 707,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      
      //rental Location 
      firstPage.drawText(formData?.rentalLocation || '', {
        x: 160,
        y: height - 728,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //rental end date
      firstPage.drawText(formData?.rentalEndDate || '', {
        x: 450,
        y: height - 683,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //vehicle received time 
      firstPage.drawText(formData?.vehicleReceivedTime || '', {
        x: 450,
        y: height - 707,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //payment information
      
      //rate per day
      firstPage.drawText(formData?.rentCharges || '', {
        x: 160,
        y: height-772,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //total rent value 
      firstPage.drawText("", {
        x: 160,
        y: height-795,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });
      
      //toll gate
      firstPage.drawText("", {
        x: 160,
        y: height-814,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //rental duration 
      firstPage.drawText("", {
        x: 400,
        y: height-772,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //daily km limit 
      firstPage.drawText(formData?.dailyKmValue || '', {
        x: 400,
        y: height-795,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //extra milage
      firstPage.drawText("", {
        x: 400,
        y: height - 814,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });


      //Payment received Details

      //security deposti 
      firstPage.drawText(formData?.securityDeposit || '', {
        x: 160,
        y: height - 870,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      //advance payment 

       firstPage.drawText(formData?.advancePayment || '', {
        x: 420,
        y: height - 870,
        size: 12,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });



      // Serialize the updated PDF
      const pdfBytes = await pdfDoc.save();

      // Trigger the browser to download the file
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "ModifiedWithImage.pdf";
      link.click();
      return pdfDoc;
    } catch (error) {
      console.error("Error modifying PDF:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Modify Existing PDF with Text and Image</h2>
      <button
        onClick={modifyPdf}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
         Download PDF
        
      </button>
    </div>
  );
  
};

export default PdfModifier;
