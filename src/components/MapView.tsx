import React from 'react';
import { Vehicle, Incident, EmergencyCall } from '../types';
import { MapPin, Car, AlertTriangle, Phone } from 'lucide-react';

interface MapViewProps {
  vehicles: Vehicle[];
  incidents: Incident[];
  calls: EmergencyCall[];
}

export function MapView({ vehicles, incidents, calls }: MapViewProps) {
  const activeCalls = calls.filter(call => ['incoming', 'active'].includes(call.status));
  const activeIncidents = incidents.filter(incident => incident.status !== 'completed');

  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <h2 className="font-bold text-gray-800">Lagekarte Duisburg</h2>
      </div>
      
      <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gray-100">
          <div className="w-full h-full relative">
            {/* Simulated map grid */}
            <div className="absolute inset-0 opacity-20">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute w-full border-t border-gray-300" style={{ top: `${i * 5}%` }} />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute h-full border-l border-gray-300" style={{ left: `${i * 5}%` }} />
              ))}
            </div>

            {/* Duisburg districts overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-gray-200 opacity-30 select-none">
                DUISBURG
              </div>
            </div>

            {/* Vehicle positions */}
            {vehicles.map((vehicle, index) => (
              <div
                key={vehicle.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${20 + (index % 8) * 10}%`,
                  top: `${20 + Math.floor(index / 8) * 15}%`
                }}
              >
                <div className={`p-2 rounded-full shadow-lg ${
                  vehicle.status === 'available' ? 'bg-green-500' :
                  vehicle.status === 'busy' ? 'bg-red-500' :
                  vehicle.status === 'enroute' ? 'bg-orange-500' :
                  vehicle.status === 'onscene' ? 'bg-blue-500' :
                  'bg-gray-500'
                }`}>
                  <Car className="w-4 h-4 text-white" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div className="font-bold">{vehicle.callsign}</div>
                  <div>Status: {vehicle.status}</div>
                  <div>Besatzung: {vehicle.crew}</div>
                </div>
              </div>
            ))}

            {/* Active incidents */}
            {activeIncidents.map((incident, index) => (
              <div
                key={incident.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${30 + (index % 6) * 12}%`,
                  top: `${30 + Math.floor(index / 6) * 20}%`
                }}
              >
                <div className={`p-2 rounded-full shadow-lg animate-pulse ${
                  incident.priority === 1 ? 'bg-red-600' :
                  incident.priority === 2 ? 'bg-orange-500' :
                  incident.priority === 3 ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}>
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div className="font-bold">P{incident.priority} - {incident.keyword}</div>
                  <div>{incident.description}</div>
                  <div>{incident.location.address}</div>
                  <div>Status: {incident.status}</div>
                </div>
              </div>
            ))}

            {/* Active calls */}
            {activeCalls.map((call, index) => (
              <div
                key={call.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{
                  left: `${40 + (index % 5) * 15}%`,
                  top: `${25 + Math.floor(index / 5) * 25}%`
                }}
              >
                <div className={`p-2 rounded-full shadow-lg animate-bounce ${
                  call.urgency === 'critical' ? 'bg-red-700' :
                  call.urgency === 'high' ? 'bg-orange-600' :
                  call.urgency === 'medium' ? 'bg-yellow-600' :
                  'bg-green-600'
                }`}>
                  <Phone className="w-4 h-4 text-white" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div className="font-bold">Notruf - {call.urgency.toUpperCase()}</div>
                  <div>{call.description}</div>
                  <div>{call.location.address}</div>
                  <div>Anrufer: {call.caller}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
          <h3 className="font-bold text-sm mb-2">Legende</h3>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Verfügbare Fahrzeuge</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Beschäftigte Fahrzeuge</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>Aktive Einsätze</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
              <span>Eingehende Notrufe</span>
            </div>
          </div>
        </div>

        {/* Status info */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
          <div className="text-sm space-y-1">
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-blue-600" />
              <span>{vehicles.length} Fahrzeuge</span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{activeIncidents.length} Einsätze</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-orange-600" />
              <span>{activeCalls.length} Notrufe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}