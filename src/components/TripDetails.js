'use client'

import React, { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'


// Define the reusable InputField component
const InputField = ({ label, id, type = 'text', placeholder, value, onChange, min }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min={min}  // Pass the min date as a prop for the End Date input
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
)

export default function TripDetails({
  userImage,
  userName,
  userId,
  carName,
  chargesPerDay,
  startDate,
  onDownloadPDF,
  onEmailId,
  onEndTrip
}) {
  const [endDate, setEndDate] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [fines, setFines] = useState(2100) // Example fixed fine, replace with actual fine calculation
  const [minEndDate, setMinEndDate] = useState('')

  useEffect(() => {
    // Set the minimum end date to be the start date
    const formattedStartDate = new Date(startDate)
    const minDate = formattedStartDate.toISOString().split('T')[0] // format date to YYYY-MM-DD
    setMinEndDate(minDate)

    if (endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setTotalPrice(diffDays * chargesPerDay)
    }
  }, [endDate, startDate, chargesPerDay])

  return (
    <>
    
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Profile Section */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={userImage}
              alt={userName}
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="text-center">
              <h2 className="text-xl font-semibold">{userName}</h2>
              <p className="text-sm text-gray-500">ID: {userId}</p>
            </div>
            <div className="flex gap-2 w-full">
              <button
                onClick={onDownloadPDF}
                className="flex-1 px-4 py-2 text-sm font-medium text-green-600 bg-white border border-green-600 rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Download PDF
              </button>
              <button
                onClick={onEmailId}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Email Id
              </button>
            </div>
          </div>

          {/* Trip Details Section */}
          <div className="md:col-span-2">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Car Name</p>
                <p className="font-medium">{carName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Charges Per Day</p>
                <p className="font-medium">{chargesPerDay} AED</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <div className="relative">
                    <input
                      type="text"
                      value={startDate}
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <div>
                  <div className='-mt-2'>
                  <InputField
                    label="End Date"
                    id="endDate"
                    type="date"
                    value={endDate}
                    min={minEndDate} // Prevent selecting dates before start date
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Price</span>
                    <span className="font-medium">{totalPrice} AED</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Fines</span>
                    <span className="font-medium text-red-500">{fines} AED</span>
                  </div>
                  <hr className="my-2 border-gray-200" />
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Total</span>
                    <span className="font-bold">{totalPrice + fines} AED</span>
                  </div>
                </div>
                <button
                  onClick={onEndTrip}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-4"
                >
                  End Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
