import React from 'react';
import { Incident, Vehicle } from '../types';
import { AlertTriangle, Clock, MapPin, Car, CheckCircle } from 'lucide-react';

interface IncidentPanelProps {
  incidents: Incident[];
  vehicles: Vehicle[];
  onCompleteIncident: (incidentId: string) => void;
}

export function IncidentPanel({ incidents, vehicles, onCompleteIncident }: IncidentPanelProps) {
  const activeIncidents = incidents.filter(incident => incident.status !== 'completed');

  const priorityColors = {
    1: 'bg-red-100 border-red-400 text-red-800',
    2: 'bg-orange-100 border-orange-400 text-orange-800',
    3: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    4: 'bg-blue-100 border-blue-400 text-blue-800'
  };

  const getVehicleCallsigns = (vehicleIds: string[]) => {
    return vehicleIds
      .map(id => vehicles.find(v => v.id === id)?.callsign)
      .filter(Boolean)
      .join(', ');
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <h2 className="font-bold text-gray-800 flex items-center">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Aktive Einsätze ({activeIncidents.length})
        </h2>
      </div>
      
      <div className="p-4 max-h-80 overflow-y-auto">
        {activeIncidents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Keine aktiven Einsätze</p>
        ) : (
          <div className="space-y-3">
            {activeIncidents.map(incident => (
              <div
                key={incident.id}
                className={`p-3 rounded-lg border-2 ${priorityColors[incident.priority]}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">P{incident.priority}</span>
                    <span className="font-medium">{incident.keyword}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{incident.createdAt.toLocaleTimeString('de-DE')}</span>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span>{incident.location.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Car className="w-3 h-3" />
                    <span>{getVehicleCallsigns(incident.assignedVehicles)}</span>
                  </div>
                  <p className="font-medium">{incident.description}</p>
                  {incident.freeText && (
                    <p className="text-gray-600 italic">{incident.freeText}</p>
                  )}
                </div>

                {incident.specialRights && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-200 text-red-800">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Sonder- und Wegerechte
                    </span>
                  </div>
                )}

                {incident.forwardTo.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-600">
                      Weitergeleitet an: {incident.forwardTo.join(', ')}
                    </span>
                  </div>
                )}

                <div className="mt-3">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    incident.status === 'completed' ? 'bg-green-200 text-green-800' :
                    incident.status === 'onscene' ? 'bg-blue-200 text-blue-800' :
                    incident.status === 'enroute' ? 'bg-orange-200 text-orange-800' :
                    'bg-gray-200 text-gray-800'
                  }`}>
                    {incident.status === 'created' && 'Erstellt'}
                    {incident.status === 'dispatched' && 'Alarmiert'}
                    {incident.status === 'enroute' && 'Anfahrt'}
                    {incident.status === 'onscene' && 'Vor Ort'}
                    {incident.status === 'completed' && 'Abgeschlossen'}
                  </span>
                  
                  {incident.status !== 'completed' && (
                    <button
                      onClick={() => onCompleteIncident(incident.id)}
                      className="ml-2 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 inline-flex items-center"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Abschließen
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}