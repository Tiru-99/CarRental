'use client'

import React, { useState, useEffect } from 'react'
import { Calendar, Download, Car, CreditCard, Flag } from 'lucide-react'

const InputField = ({ label, id, type = 'text', placeholder, value, onChange, min, disabled }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        disabled={disabled}
        className={`w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 ${disabled ? 'bg-gray-100' : ''}`}
      />
      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    </div>
  </div>
)

export default function TripDetails({
  userImage,
  firstName,
  lastName,
  userId,
  carName,
  chargesPerDay,
  startDate,
  onDownloadEmiratesId,
  onDownloadPassportId,
  onEndTrip
}) {
  const [endDate, setEndDate] = useState('')
  const [totalPrice, setTotalPrice] = useState(0)
  const [fines, setFines] = useState(2100)
  const [minEndDate, setMinEndDate] = useState('')

  useEffect(() => {
    const formattedStartDate = new Date(startDate)
    const minDate = formattedStartDate.toISOString().split('T')[0]
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
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-gradient-to-br from-green-600 to-green-700 text-white p-8">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={userImage}
                  alt={`${firstName} ${lastName}`}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Active
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{`${firstName} ${lastName}`}</h2>
                <p className="text-green-200">ID: {userId}</p>
              </div>
              <div className="flex flex-col gap-2 w-full mt-4">
                <button
                  onClick={onDownloadEmiratesId}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-green-700 bg-white rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  <Download size={18} className="mr-2" />
                  Emirates ID
                </button>
                <button
                  onClick={onDownloadPassportId}
                  className="flex items-center justify-center px-4 py-2 text-sm font-medium text-green-700 bg-white rounded-md hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  <Download size={18} className="mr-2" />
                  Passport
                </button>
              </div>
            </div>
          </div>
          <div className="p-8 md:flex-1">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-gray-800">
                <Car size={24} className="text-green-600" />
                <span className="text-xl font-semibold">{carName}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-800">
                <CreditCard size={24} className="text-green-600" />
                <span className="text-xl font-semibold">{chargesPerDay} AED / day</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Start Date"
                  id="startDate"
                  type="text"
                  value={startDate}
                  disabled={true}
                />
                <InputField
                  label="End Date"
                  id="endDate"
                  type="date"
                  value={endDate}
                  min={minEndDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
              <div className="bg-green-50 rounded-lg p-6 mt-6 border border-green-100">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Price</span>
                    <span className="font-semibold text-green-700">{totalPrice} AED</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Fines</span>
                    <span className="font-semibold text-red-500">{fines} AED</span>
                  </div>
                  <hr className="my-2 border-green-200" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-green-800">Total</span>
                    <span className="text-green-800">{totalPrice + fines} AED</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={onEndTrip}
                  className="flex items-center px-6 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <Flag size={18} className="mr-2" />
                  End Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

