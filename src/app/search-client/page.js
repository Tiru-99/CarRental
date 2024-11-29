'use client'

import React, { useEffect, useState } from "react"
import ProfileCard from "@/components/clientCard"
import { getEvents } from "@/utils/appwriteConf"
import Navbar from "@/components/Navbar"
import { Search } from 'lucide-react'
import Link from "next/link"
import { isUserLoggedIn } from "@/utils/appwriteAuth"
import { getFileDownloadURL } from "@/utils/appwriteConf"
import { toast } from "react-toastify"
import axios from "axios"
import Loader from "@/components/Loader"
import { useRouter } from "next/navigation"


export default function SearchClient() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [hoveredUserId, setHoveredUserId] = useState(null)
  const[isLoading , setIsLoading] = useState(false);

  const router = useRouter(); 
  const [searchTerm, setSearchTerm] = useState("")

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { Users, error } = await getEvents()
        if (error) {
          setError(error)
        } else {
          setUsers(Users)
          setFilteredUsers(Users)
        }
      } catch (err) {
        console.error("Error fetching users:", err)
        setError("Failed to fetch users.")
      } 
    }

    fetchUsers()
  }, [])

  useEffect(() => {
    const results = users.filter(user =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredUsers(results)

  }, [searchTerm, users])



const sendPdf = async (documentId) => {

  setIsLoading(true);

  console.log("this is my documentID for sending email" , documentId);
    try {
        const response = await axios.post('/api/email',  {documentId : documentId} );

        if (response.status === 200) {
            toast.success("Email to the client sent successfully");
            setIsLoading(false);
        } else {
            console.error("Error:", response.data.error);
        }
    } catch (error) {
        console.error("Error in sendPdf:", error.message);
    }finally{
      setIsLoading(false);
    }
};


  const handleDownload = async (fileId) => {
    if (!fileId) {
        toast.error('Invalid file ID!');
        return;
    }

    try {
        // Get the download URL from Appwrite
        const fileUrl = getFileDownloadURL(fileId);
        
        // Open the file in a new tab
        window.open(fileUrl, '_blank');
        
        // Or download it directly
        const anchor = document.createElement('a');
        anchor.href = fileUrl;
        anchor.download = `document-${Date.now()}.pdf`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

    } catch (error) {
        console.error('Error downloading file:', error);
        toast.error('Failed to download the file. Please try again.');
    }
};


  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredUsers.map((user) => (
        <div key={user.$id} className="relative group">
          <Link href={`/final/${user.$id}`}>
            <ProfileCard
              firstName={user.firstName}
              lastName={user.lastName}
              id={user.$id}
              profilePicture={user.passportImageUrl}
              onDownload={() => handleDownload(user.pdfFileId2)}
            />
          </Link>
          <div className="absolute top-2 right-2 z-10">
            <button 
              onClick={() => sendPdf(user.$id)} 
              onMouseEnter={() => setHoveredUserId(user.$id)}
              onMouseLeave={() => setHoveredUserId(null)}
              className="bg-green-500 text-white rounded-full p-2 hover:bg-green-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              aria-label="Send Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </button>
            {hoveredUserId === user.$id && (
              <div className="absolute right-0 mt-2 py-1 px-2 bg-gray-800 text-white text-xs rounded shadow-lg whitespace-nowrap">
                Send Email
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No users found matching your search.</p>
          )}
        </div>
      </div>
      {isLoading && <Loader/>}
    </>
  )
}