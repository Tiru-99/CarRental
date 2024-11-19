"use client"
import React from "react";

export default function ProfileCard({ name, id, onDownload, onEmail,profilePicture }) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex flex-col ">
          <img
            className="w-24 h-24 rounded-full object-cover mb-4"
            src={profilePicture}
            alt={`${name}'s profile`}
          />
          <h3 className="text-xl font-medium text-gray-900 mb-1">{name}</h3>
          <p className="text-sm text-gray-500 mb-4">ID: {id}</p>
          <div className="flex gap-2 w-full">
            <button
              onClick={onDownload}
              className="flex-1 px-4 py-2 text-sm font-medium text-green-600 bg-white border border-green-600 rounded-full hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Download PDF
            </button>
            <button
              onClick={onEmail}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Email Id
            </button>
          </div>
        </div>
      </div>
    )
  }