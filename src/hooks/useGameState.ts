import { useState, useCallback, useEffect } from 'react';
import { EmergencyCall, Incident, Vehicle } from '../types';
import { generateRandomCall } from '../data/emergencyCalls';
import { initialVehicles } from '../data/vehicles';

export function useGameState() {
  const [calls, setCalls] = useState<EmergencyCall[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(new Date());

  // Generate random calls
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 10 seconds
        const newCall = generateRandomCall();
        setCalls(prev => [...prev, newCall]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Update game time
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const acceptCall = useCallback((callId: string) => {
    setCalls(prev => prev.map(call => 
      call.id === callId ? { ...call, status: 'active' } : call
    ));
  }, []);

  const createIncident = useCallback((incident: Omit<Incident, 'id' | 'createdAt'>) => {
    const newIncident: Incident = {
      ...incident,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    setIncidents(prev => [...prev, newIncident]);
    
    if (incident.callId) {
      setCalls(prev => prev.map(call => 
        call.id === incident.callId ? { ...call, status: 'assigned' } : call
      ));
    }

    setScore(prev => prev + 10);
  }, []);

  const updateVehicleStatus = useCallback((vehicleId: string, status: Vehicle['status']) => {
    setVehicles(prev => prev.map(vehicle => 
      vehicle.id === vehicleId ? { ...vehicle, status } : vehicle
    ));
  }, []);

  const completeIncident = useCallback((incidentId: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId ? 
        { ...incident, status: 'completed', completedAt: new Date() } : 
        incident
    ));
    
    // Free up vehicles
    const incident = incidents.find(i => i.id === incidentId);
    if (incident) {
      incident.assignedVehicles.forEach(vehicleId => {
        updateVehicleStatus(vehicleId, 'available');
      });
      setScore(prev => prev + 25);
    }
  }, [incidents, updateVehicleStatus]);

  return {
    calls,
    incidents,
    vehicles,
    score,
    gameTime,
    acceptCall,
    createIncident,
    updateVehicleStatus,
    completeIncident
  };
}