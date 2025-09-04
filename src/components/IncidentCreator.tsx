import React, { useState } from 'react';
import { EmergencyCall, Incident, Vehicle } from '../types';
import { policeCodes } from '../data/policeCodes';
import { X, AlertTriangle, Car, Shield, Users } from 'lucide-react';

interface IncidentCreatorProps {
  call: EmergencyCall | null;
  vehicles: Vehicle[];
  onCreateIncident: (incident: Omit<Incident, 'id' | 'createdAt'>) => void;
  onClose: () => void;
}

export function IncidentCreator({ call, vehicles, onCreateIncident, onClose }: IncidentCreatorProps) {
  const [selectedCode, setSelectedCode] = useState('');
  const [freeText, setFreeText] = useState(call?.description || '');
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [specialUnits, setSpecialUnits] = useState<string[]>([]);
  const [specialRights, setSpecialRights] = useState(false);
  const [forwardTo, setForwardTo] = useState<string[]>([]);

  const availableVehicles = vehicles.filter(v => v.status === 'available');
  const selectedCodeData = policeCodes.find(code => code.code === selectedCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCode || selectedVehicles.length === 0) return;

    const incident: Omit<Incident, 'id' | 'createdAt'> = {
      callId: call?.id,
      keyword: selectedCodeData?.keyword || '',
      priority: selectedCodeData?.priority || 3,
      location: call?.location || {
        address: '',
        coordinates: [51.4295, 6.7749]
      },
      description: call?.description || '',
      freeText,
      assignedVehicles: selectedVehicles,
      specialUnits,
      specialRights,
      forwardTo,
      status: 'created'
    };

    onCreateIncident(incident);
    onClose();
  };

  if (!call) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Einsatz erstellen</h2>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Call Information */}
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Anrufdaten</h3>
                <div className="bg-gray-50 p-3 rounded">
                  <p><strong>Anrufer:</strong> {call.caller}</p>
                  <p><strong>Telefon:</strong> {call.phoneNumber}</p>
                  <p><strong>Adresse:</strong> {call.location.address}</p>
                  <p><strong>Beschreibung:</strong> {call.description}</p>
                </div>
              </div>

              {/* Police Code Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Einsatzstichwort *
                </label>
                <select
                  value={selectedCode}
                  onChange={(e) => setSelectedCode(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Stichwort auswählen</option>
                  {policeCodes.map(code => (
                    <option key={code.code} value={code.code}>
                      {code.code} - {code.keyword} (P{code.priority})
                    </option>
                  ))}
                </select>
              </div>

              {/* Free Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Freitext / Zusatzinformationen
                </label>
                <textarea
                  value={freeText}
                  onChange={(e) => setFreeText(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded h-20 focus:ring-2 focus:ring-blue-500"
                  placeholder="Zusätzliche Informationen zum Einsatz..."
                />
              </div>
            </div>

            {/* Vehicle and Options */}
            <div className="space-y-4">
              {/* Vehicle Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Car className="w-4 h-4 inline mr-1" />
                  Fahrzeuge zuweisen * ({selectedVehicles.length} ausgewählt)
                </label>
                <div className="border border-gray-300 rounded max-h-32 overflow-y-auto">
                  {availableVehicles.map(vehicle => (
                    <label
                      key={vehicle.id}
                      className="flex items-center p-2 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    >
                      <input
                        type="checkbox"
                        checked={selectedVehicles.includes(vehicle.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedVehicles([...selectedVehicles, vehicle.id]);
                          } else {
                            setSelectedVehicles(selectedVehicles.filter(id => id !== vehicle.id));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="font-mono text-sm">{vehicle.callsign}</span>
                      <span className="ml-2 text-sm text-gray-600">({vehicle.type})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Units */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Spezialeinheiten
                </label>
                <div className="space-y-2">
                  {['SEK', 'K9', 'Verkehrspolizei', 'Kriminaltechnik'].map(unit => (
                    <label key={unit} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={specialUnits.includes(unit)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSpecialUnits([...specialUnits, unit]);
                          } else {
                            setSpecialUnits(specialUnits.filter(u => u !== unit));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{unit}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Special Rights */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={specialRights}
                    onChange={(e) => setSpecialRights(e.target.checked)}
                    className="mr-2"
                  />
                  <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />
                  <span className="text-sm font-medium">Sonder- und Wegerechte</span>
                </label>
              </div>

              {/* Forward To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="w-4 h-4 inline mr-1" />
                  Weiterleitung an
                </label>
                <div className="space-y-2">
                  {['Feuerwehr', 'Rettungsdienst', 'THW', 'BALM'].map(service => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={forwardTo.includes(service)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForwardTo([...forwardTo, service]);
                          } else {
                            setForwardTo(forwardTo.filter(s => s !== service));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm">{service}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!selectedCode || selectedVehicles.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Einsatz erstellen und alarmieren
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}