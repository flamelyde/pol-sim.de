import React from 'react';
import { Vehicle } from '../types';
import { Car, Users, MapPin, Clock } from 'lucide-react';

interface VehiclePanelProps {
  vehicles: Vehicle[];
}

export function VehiclePanel({ vehicles }: VehiclePanelProps) {
  const statusColors = {
    available: 'bg-green-100 border-green-400 text-green-800',
    busy: 'bg-red-100 border-red-400 text-red-800',
    enroute: 'bg-orange-100 border-orange-400 text-orange-800',
    onscene: 'bg-blue-100 border-blue-400 text-blue-800',
    unavailable: 'bg-gray-100 border-gray-400 text-gray-800'
  };

  const typeNames = {
    patrol: 'Streife',
    k9: 'Diensthund',
    traffic: 'Verkehrspolizei',
    sek: 'SEK',
    detective: 'Kripo',
    motorcycle: 'Motorrad'
  };

  const statusNames = {
    available: 'Verfügbar',
    busy: 'Beschäftigt',
    enroute: 'Anfahrt',
    onscene: 'Vor Ort',
    unavailable: 'Nicht verfügbar'
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <h2 className="font-bold text-gray-800 flex items-center">
          <Car className="w-4 h-4 mr-2" />
          Fahrzeugstatus ({vehicles.length})
        </h2>
      </div>
      
      <div className="p-4 max-h-80 overflow-y-auto">
        <div className="space-y-2">
          {vehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className={`p-3 rounded border-l-4 ${statusColors[vehicle.status]}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold font-mono">{vehicle.callsign}</span>
                    <span className="text-sm text-gray-600">({typeNames[vehicle.type]})</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm mt-1">
                    <Users className="w-3 h-3" />
                    <span>{vehicle.crew} Besatzung</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{vehicle.location.address}</span>
                  </div>

                  {vehicle.specialization && (
                    <div className="text-xs text-gray-600 mt-1">
                      {vehicle.specialization.join(', ')}
                    </div>
                  )}
                </div>
                
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    statusColors[vehicle.status]
                  }`}>
                    {statusNames[vehicle.status]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}