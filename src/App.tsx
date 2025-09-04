import React, { useState } from 'react';
import { useGameState } from './hooks/useGameState';
import { Header } from './components/Header';
import { CallPanel } from './components/CallPanel';
import { IncidentCreator } from './components/IncidentCreator';
import { IncidentPanel } from './components/IncidentPanel';
import { VehiclePanel } from './components/VehiclePanel';
import { MapView } from './components/MapView';
import { EmergencyCall } from './types';

function App() {
  const {
    calls,
    incidents,
    vehicles,
    score,
    gameTime,
    acceptCall,
    createIncident,
    completeIncident
  } = useGameState();

  const [selectedCall, setSelectedCall] = useState<EmergencyCall | null>(null);

  const activeCalls = calls.filter(call => ['incoming', 'active'].includes(call.status)).length;
  const activeIncidents = incidents.filter(incident => incident.status !== 'completed').length;

  const handleCreateIncident = (call: EmergencyCall) => {
    setSelectedCall(call);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Header
        gameTime={gameTime}
        activeCalls={activeCalls}
        activeIncidents={activeIncidents}
        score={score}
      />
      
      <div className="p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
          <CallPanel
            calls={calls}
            onAcceptCall={acceptCall}
            onCreateIncident={handleCreateIncident}
          />
          
          <IncidentPanel
            incidents={incidents}
            vehicles={vehicles}
            onCompleteIncident={completeIncident}
          />
          
          <VehiclePanel vehicles={vehicles} />
        </div>
        
        <MapView
          vehicles={vehicles}
          incidents={incidents}
          calls={calls}
        />
      </div>

      {selectedCall && (
        <IncidentCreator
          call={selectedCall}
          vehicles={vehicles}
          onCreateIncident={createIncident}
          onClose={() => setSelectedCall(null)}
        />
      )}
    </div>
  );
}

export default App;