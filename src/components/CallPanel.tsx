import React from 'react';
import { EmergencyCall } from '../types';
import { Phone, Clock, MapPin, User, AlertCircle } from 'lucide-react';

interface CallPanelProps {
  calls: EmergencyCall[];
  onAcceptCall: (callId: string) => void;
  onCreateIncident: (call: EmergencyCall) => void;
}

export function CallPanel({ calls, onAcceptCall, onCreateIncident }: CallPanelProps) {
  const urgencyColors = {
    low: 'bg-green-100 border-green-400 text-green-800',
    medium: 'bg-yellow-100 border-yellow-400 text-yellow-800',
    high: 'bg-orange-100 border-orange-400 text-orange-800',
    critical: 'bg-red-100 border-red-400 text-red-800'
  };

  const activeCalls = calls.filter(call => ['incoming', 'active'].includes(call.status));

  return (
    <div className="bg-white border border-gray-300 rounded-lg">
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300">
        <h2 className="font-bold text-gray-800 flex items-center">
          <Phone className="w-4 h-4 mr-2" />
          Eingehende Notrufe ({activeCalls.length})
        </h2>
      </div>
      
      <div className="p-4 max-h-80 overflow-y-auto">
        {activeCalls.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Keine offenen Notrufe</p>
        ) : (
          <div className="space-y-3">
            {activeCalls.map(call => (
              <div
                key={call.id}
                className={`p-3 rounded-lg border-2 ${urgencyColors[call.urgency]}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span className="font-bold uppercase">{call.urgency}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm">
                    <Clock className="w-3 h-3" />
                    <span>{call.timestamp.toLocaleTimeString('de-DE')}</span>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="w-3 h-3" />
                    <span>{call.caller} ({call.phoneNumber})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span>{call.location.address}</span>
                  </div>
                  <p className="font-medium mt-2">{call.description}</p>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  {call.status === 'incoming' && (
                    <>
                      <button
                        onClick={() => onAcceptCall(call.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        Anruf annehmen
                      </button>
                    </>
                  )}
                  {call.status === 'active' && (
                    <button
                      onClick={() => onCreateIncident(call)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Einsatz erstellen
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