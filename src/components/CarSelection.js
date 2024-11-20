import React from 'react'


export const CarSelection = ({ label, id, value, onChange, required = false }) => {
  const carNames = [
  'Mercedes G63',
  'Mercedes s500',
  'Infiniti QX-50',
  'Honda HRV',
  'Chevrolet Trailblazer 2023',
  'Chevrolet Trailblazer',
  'Nissan-X-Trail',
  'Koleos',
  'Range Rover Defender',
  'GMC Yukon Denali',
  'BMW X5',
  'Chevy Tahoe',
  'Ford Bronco Sport',
  'Mazda CX-5',
  'Nissan Pathfinder',
  'Mazda CX-30',
  'Honda ZR-V',
  'MG HS Trophy',
  'Jeep Wrangler (Sahara)',,
  'Mazda CX-30 (Gray)',
  'Cadillac CTS 2004',
  'Nissan Patrol',
  'Jeep Gladiator Sport 2023',
  'Range Rover Rogue'
  ]

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select a car</option>

        {carNames.map((car, index) => (
          <option key={index} value={car}>
            {car}
          </option>
        ))}
      </select>
    </div>
  )
}