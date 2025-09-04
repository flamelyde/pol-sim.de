export interface EmergencyCall {
  id: string;
  timestamp: Date;
  caller: string;
  phoneNumber: string;
  location: {
    address: string;
    coordinates: [number, number];
  };
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  status: 'incoming' | 'active' | 'assigned' | 'completed';
  estimatedDuration?: number;
}

export interface Incident {
  id: string;
  callId?: string;
  keyword: string;
  priority: 1 | 2 | 3 | 4;
  location: {
    address: string;
    coordinates: [number, number];
  };
  description: string;
  freeText: string;
  assignedVehicles: string[];
  specialUnits: string[];
  specialRights: boolean;
  forwardTo: string[];
  status: 'created' | 'dispatched' | 'enroute' | 'onscene' | 'completed';
  createdAt: Date;
  dispatchedAt?: Date;
  completedAt?: Date;
}

export interface Vehicle {
  id: string;
  callsign: string;
  type: 'patrol' | 'k9' | 'traffic' | 'sek' | 'detective' | 'motorcycle';
  status: 'available' | 'busy' | 'enroute' | 'onscene' | 'unavailable';
  location: {
    address: string;
    coordinates: [number, number];
  };
  crew: number;
  specialization?: string[];
}

export interface PoliceCode {
  code: string;
  keyword: string;
  description: string;
  priority: 1 | 2 | 3 | 4;
  requiredVehicles: number;
  suggestedUnits: string[];
}