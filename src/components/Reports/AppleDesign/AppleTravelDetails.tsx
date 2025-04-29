
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Sample travel data
const travelData = [
  { name: 'Marketing Conference', purpose: 'conference', duration: 4, cost: 4500, travelers: 3 },
  { name: 'Client Meeting - NYC', purpose: 'client', duration: 2, cost: 2200, travelers: 2 },
  { name: 'Team Training', purpose: 'training', duration: 3, cost: 3800, travelers: 5 },
  { name: 'Sales Convention', purpose: 'conference', duration: 5, cost: 6200, travelers: 4 },
  { name: 'Product Demo - Chicago', purpose: 'client', duration: 1, cost: 1800, travelers: 2 },
  { name: 'Internal Workshop', purpose: 'training', duration: 2, cost: 2000, travelers: 8 }
];

interface BubbleChartPoint {
  x: number;
  y: number;
  z: number;
  name: string;
  purpose: string;
}

const AppleTravelDetails: React.FC = () => {
  // Convert to bubble chart data format
  const bubbleData: BubbleChartPoint[] = travelData.map(item => ({
    x: item.duration,
    y: item.cost,
    z: item.travelers * 10,
    name: item.name,
    purpose: item.purpose
  }));
  
  // Determine color based on purpose
  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case 'conference': return '#007AFF';
      case 'client': return '#FF9500';
      case 'training': return '#5856D6';
      default: return '#999';
    }
  };
  
  // Purpose badge style
  const getPurposeBadge = (purpose: string) => {
    switch (purpose) {
      case 'conference':
        return <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 border-none">Conference</Badge>;
      case 'client':
        return <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 border-none">Client Visit</Badge>;
      case 'training':
        return <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 border-none">Training</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-none">Other</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2 border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Travel Expenses Overview</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Duration" 
                  unit=" days" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Cost" 
                  unit=" USD" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#666' }}
                />
                <ZAxis 
                  type="number" 
                  dataKey="z" 
                  range={[40, 160]} 
                  name="Travelers" 
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: 'none', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' 
                  }}
                  formatter={(value: any, name: any) => {
                    if (name === 'Duration') return [`${value} days`, name];
                    if (name === 'Cost') return [`$${value}`, name];
                    if (name === 'Travelers') return [`${Math.round(Number(value)/10)} people`, name];
                    return [value, name];
                  }}
                  labelFormatter={(label: number) => bubbleData[label].name}
                />
                <Scatter name="Travel expenses" data={bubbleData}>
                  {
                    bubbleData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getPurposeColor(entry.purpose)} 
                      />
                    ))
                  }
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span className="text-xs text-gray-500">Conference</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
              <span className="text-xs text-gray-500">Client Visit</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
              <span className="text-xs text-gray-500">Training</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Recent Travel Expenses</h3>
          <div className="space-y-4">
            {travelData.slice(0, 4).map((trip, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{trip.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {trip.duration} {trip.duration === 1 ? 'day' : 'days'} • {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">${trip.cost.toLocaleString()}</p>
                    <div className="mt-1">{getPurposeBadge(trip.purpose)}</div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-2">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                View all travel expenses
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppleTravelDetails;
