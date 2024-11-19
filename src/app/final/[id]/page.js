"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter here
import TripDetails from "@/components/TripDetails"; // Adjust the import path as necessary
import { getCarAndClientDetails } from "@/utils/appwriteConf";
import Navbar from "@/components/Navbar";
import { isUserLoggedIn } from "@/utils/appwriteAuth";

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tripDetails) {
    return <div>Failed to fetch trip details. Please try again later.</div>;
  }

  return (
    <div className="p-4">
      <Navbar />
      <TripDetails
        userImage={tripDetails.passportImageUrl}
        userName={tripDetails.fullName}
        userId={userId}
        carName={tripDetails.carInfo}
        chargesPerDay={tripDetails.rentCharges}
        startDate={tripDetails.rentalDate}
        onDownloadPDF={() => console.log("Download PDF clicked")}
        onEmailId={() => console.log(`Send email to: ${tripDetails.email}`)}
        onEndTrip={() => console.log("End Trip clicked")}
      />
    </div>
  );
}
