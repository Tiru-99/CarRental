'use client'

import { useState } from 'react'
import { Search, Users, Briefcase, Calendar, Snowflake, Tag, Droplet, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const cars = [
    {
      id: 1,
      name: 'Mercedes G63',
      image: '/cars/car1.jpg',
      category: 'Luxury',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '1600 AED'
    },
    {
      id: 2,
      name: 'Mercedes s500',
      image: '/cars/car2.webp',
      category: 'Luxury',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '1000 AED'
    },
    {
      id: 3,
      name: 'Infiniti QX-50',
      image: '/cars/car3.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 4,
      name: 'Honda HRV',
      image: '/cars/car4.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 5,
      name: 'Chevrolet Trailblazer 2023',
      image: '/cars/car5.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 6,
      name: 'Chevrolet Trailblazer',
      image: '/cars/car6.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 7,
      name: 'Nissan-X-Trail',
      image: '/cars/car7.png',
      category: 'SUV',
      passengers: 7,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '200 AED'
    },
    {
      id: 8,
      name: 'Koleos',
      image: '/cars/car8.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 9,
      name: 'Range Rover Defender',
      image: '/cars/car9.png',
      category: 'Luxury',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '800 AED'
    },
    {
      id: 10,
      name: 'GMC Yukon Denali',
      image: '/cars/car10.png',
      category: 'Luxury',
      passengers: 7,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '600 AED'
    },
    {
      id: 11,
      name: 'BMW X5',
      image: '/cars/car11.png',
      category: 'Luxury',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '650 AED'
    },
    {
      id: 12,
      name: 'Chevy Tahoe',
      image: '/cars/car12.png',
      category: 'SUV',
      passengers: 7,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '500 AED'
    },
    {
      id: 13,
      name: 'Ford Bronco Sport',
      image: '/cars/car13.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '200 AED'
    },
    {
      id: 14,
      name: 'Mazda CX-5',
      image: '/cars/car14.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 15,
      name: 'Nissan Pathfinder',
      image: '/cars/car15.png',
      category: 'SUV',
      passengers: 7,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '325 AED'
    },
    {
      id: 16,
      name: 'Honda ZR-V',
      image: '/cars/car16.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 17,
      name: 'Mazda CX-30',
      image: '/cars/car17.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 18,
      name: 'MG HS Trophy',
      image: '/cars/car18.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 19,
      name: 'Jeep Wrangler (Sahara)',
      image: '/cars/car19.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '400 AED'
    },
    {
      id: 20,
      name: 'Mazda CX-30 Gray',
      image: '/cars/car20.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 21,
      name: 'Cadillac CTS 2024',
      image: '/cars/car21.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '225 AED'
    },
    {
      id: 22,
      name: 'Nissan Patrol',
      image: '/cars/car22.png',
      category: 'Luxury',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '500 AED'
    },
    {
      id: 23,
      name: 'Jeep Gladiator Sport (Silver)',
      image: '/cars/car23.png',
      category: 'SUV',
      passengers: 7,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '185 AED'
    },
    {
      id: 24,
      name: 'Mercedes S580',
      image: '/cars/car24.png',
      category: 'SUV',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '1400 AED'
    },
    {
      id: 25,
      name: 'Range Rover Rogue',
      image: '/cars/car25.png',
      category: 'Luxury',
      passengers: 5,
      bags: 3,
      doors: 4,
      hasAC: true,
      mileage: '250 Kmpl',
      deposit: '1500 AED',
      fuelPolicy: 'Level to Level',
      insurance: 'Basic',
      discount: true,
      dailyCharges: '1400 AED'
    },
  ];
  

const categories = ['All', 'Sedan', 'MPV', 'SUV', 'Luxury']

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'All' || car.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          className="pl-10"
          placeholder="Search for Cars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className="min-w-[100px]"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.map((car) => (
          <Card key={car.id}>
            <CardHeader className="p-0">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <CardTitle>{car.name}</CardTitle>
              
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{car.passengers}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4" />
                  <span>{car.bags}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{car.doors}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Snowflake className="w-4 h-4" />
                  <span>{car.hasAC ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <h3 className="font-semibold">Features</h3>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Mileage: {car.mileage}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Deposit: {car.deposit}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplet className="w-4 h-4" />
                    <span>Fuel Policy: {car.fuelPolicy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Insurance: {car.insurance}</span>
                  </div>
                  {car.discount && (
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      <span>Discount included in Price</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span>Daily Charges: {car.dailyCharges}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

