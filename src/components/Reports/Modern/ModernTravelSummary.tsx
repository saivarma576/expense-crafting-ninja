
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Clock, Utensils, Airplay, Hotel } from 'lucide-react';

// Sample travel data
const travelData = [
  {
    id: 1,
    purpose: 'Client Meeting',
    destination: 'New York, NY',
    duration: '3 days',
    departureDate: 'Apr 10, 2025',
    returnDate: 'Apr 13, 2025',
    mealsProvided: true,
    totalCost: 2150.75
  },
  {
    id: 2,
    purpose: 'Industry Conference',
    destination: 'Las Vegas, NV',
    duration: '5 days',
    departureDate: 'Mar 22, 2025',
    returnDate: 'Mar 27, 2025',
    mealsProvided: false,
    totalCost: 3280.50
  }
];

const ModernTravelSummary: React.FC = () => {
  return (
    <div className="space-y-6">
      {travelData.map((trip, index) => (
        <motion.div 
          key={trip.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.2 }}
        >
          <Card className="overflow-hidden border-0 shadow-sm bg-gradient-to-br from-gray-50 to-white rounded-2xl">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Left side - Travel info */}
                <div className="p-6 flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold">{trip.purpose}</h3>
                    <Badge className="bg-blue-100 text-blue-700 border-0">
                      ${trip.totalCost.toLocaleString()}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{trip.destination}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CalendarDays className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{trip.departureDate} - {trip.returnDate}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Utensils className="h-4 w-4 text-gray-500 mr-2" />
                      <span>
                        {trip.mealsProvided ? 'Meals provided' : 'No meals provided'}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Travel timeline */}
                <div className="bg-gray-50 p-6 md:w-64">
                  <h4 className="text-sm font-medium text-gray-600 mb-4">Travel Components</h4>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100">
                        <Airplay className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Flight</p>
                        <p className="text-xs text-gray-500">$850</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
                        <Hotel className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Hotel</p>
                        <p className="text-xs text-gray-500">$650</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100">
                        <Utensils className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Meals</p>
                        <p className="text-xs text-gray-500">$220</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ModernTravelSummary;
