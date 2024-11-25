"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter here
import TripDetails from "@/components/TripDetails"; // Adjust the import path as necessary
import { getCarAndClientDetails , getFileDownloadURL } from "@/utils/appwriteConf";
import Navbar from "@/components/Navbar";
import { isUserLoggedIn } from "@/utils/appwriteAuth";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function UserPage() {
  const { id } = useParams();
  const router = useRouter(); // Always define hooks at the top level 
  const userId = Array.isArray(id) ? id[0] : id; // Handle cases where id might be an array 
  const [tripDetails, setTripDetails] = useState(null); 
  const [loading, setLoading] = useState(true);

  // Check login status
  useEffect(() => {
    const checkUser = async () => {
      const status = await isUserLoggedIn();
      if (!status.success) {
        router.push("/signin"); // Redirect to login page if not logged in
      }
    };

    checkUser();
  }, [router]);

  // Fetch trip details
  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getCarAndClientDetails(userId);
        if (data) {
          setTripDetails(data.details);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) fetchDetails();
  }, [userId]);


  console.log("This is my tripDetails", tripDetails);

  const handleDownload = async (fileId) => {

    console.log("this is my fileID" , fileId);
    if (!fileId) {
        toast.error('Invalid file ID!');
        return;
    }

    try {
        // Get the download URL from Appwrite
        const fileUrl = getFileDownloadURL(fileId);

        console.log("This is my fileURl" , fileUrl);
        
        // Open the file in a new tab
        window.open(fileUrl, '_blank');
        
        // Or download it directly
        const anchor = document.createElement('a');
        anchor.href = fileUrl;
        anchor.download = `document-${Date.now()}.`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

    } catch (error) {
        console.error('Error downloading file:', error);
        toast.error('Failed to download the file. Please try again.');
    }
};

  if (loading) {
    <Loader2 className="animate-spin mr-2" size={20} />
  }

  if (!tripDetails) {
    return <div>Failed to fetch trip details. Please try again later.</div>;
  }



  return (
    <div className="p-4">
      <Navbar />
      <TripDetails
        userImage={tripDetails.passportImageUrl}
        firstName={tripDetails.firstName}
        lastName={tripDetails.lastName}
        userId={userId}
        carName={tripDetails.carInfo}
        chargesPerDay={tripDetails.rentCharges}
        startDate={tripDetails.rentalDate}
        onDownloadPassportId={()=>handleDownload(tripDetails.passportImageId2)}
        onDownloadEmiratesId={()=>handleDownload(tripDetails.emiratesImageId1)}
        onEmailId={() => console.log(`Send email to: ${tripDetails.email}`)}
        onEndTrip={() => console.log("End Trip clicked")}
      />
    </div>
  );
}
