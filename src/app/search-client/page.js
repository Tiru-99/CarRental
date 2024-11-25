'use client'

import React, { useEffect, useState } from "react"
import ProfileCard from "@/components/clientCard"
import { getEvents } from "@/utils/appwriteConf"
import Navbar from "@/components/Navbar"
import { Search } from 'lucide-react'
import Link from "next/link"
import { getFileDownloadURL } from "@/utils/appwriteConf"
import { toast } from "react-toastify"


export default function SearchClient() {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
 
  const [searchTerm, setSearchTerm] = useState("")

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

 

  const handleEmail = (email) => {
    alert(`Sending email to: ${email}`)
    // Add email functionality if needed
  }

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
              <Link  key={user.$id} href ={`/final/${user.$id}`}><ProfileCard
               
                firstName={user.firstName}
                lastName={user.lastName}
                id={user.$id}
                profilePicture={user.passportImageUrl}
                onDownload={() => handleDownload(user.pdfFileId2)}
                onEmail={() => handleEmail(user.email)}
              /></Link>
            ))}
          </div>
          {filteredUsers.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No users found matching your search.</p>
          )}
        </div>
      </div>
    </>
  )
}