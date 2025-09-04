import { Vehicle } from '../types';

export const initialVehicles: Vehicle[] = [
  {
    id: 'DU-1-1',
    callsign: 'DU 1/1',
    type: 'patrol',
    status: 'available',
    location: {
      address: 'Königstraße 20, 47051 Duisburg',
      coordinates: [51.4320, 6.7620]
    },
    crew: 2
  },
  {
    id: 'DU-1-2',
    callsign: 'DU 1/2',
    type: 'patrol',
    status: 'available',
    location: {
      address: 'Mercatorstraße 15, 47051 Duisburg',
      coordinates: [51.4305, 6.7585]
    },
    crew: 2
  },
  {
    id: 'DU-2-1',
    callsign: 'DU 2/1',
    type: 'patrol',
    status: 'available',
    location: {
      address: 'Kaiser-Wilhelm-Straße 10, 47166 Duisburg',
      coordinates: [51.4890, 6.7700]
    },
    crew: 2
  },
  {
    id: 'DU-K9-1',
    callsign: 'DU K9/1',
    type: 'k9',
    status: 'available',
    location: {
      address: 'Düsseldorfer Straße 150, 47053 Duisburg',
      coordinates: [51.4080, 6.7710]
    },
    crew: 2,
    specialization: ['drugs', 'explosives']
  },
  {
    id: 'DU-VK-1',
    callsign: 'DU VK/1',
    type: 'traffic',
    status: 'available',
    location: {
      address: 'Wanheimerstraße 100, 47053 Duisburg',
      coordinates: [51.4120, 6.7450]
    },
    crew: 2,
    specialization: ['accidents', 'traffic_control']
  },
  {
    id: 'DU-SEK-1',
    callsign: 'DU SEK/1',
    type: 'sek',
    status: 'available',
    location: {
      address: 'Polizeipräsidium, 47051 Duisburg',
      coordinates: [51.4330, 6.7650]
    },
    crew: 4,
    specialization: ['high_risk', 'weapons', 'hostage']
  },
  {
    id: 'DU-KR-1',
    callsign: 'DU KR/1',
    type: 'detective',
    status: 'available',
    location: {
      address: 'Von-der-Mark-Straße 70, 47137 Duisburg',
      coordinates: [51.4730, 6.7595]
    },
    crew: 2,
    specialization: ['investigations', 'forensics']
  },
  {
    id: 'DU-M-1',
    callsign: 'DU M/1',
    type: 'motorcycle',
    status: 'available',
    location: {
      address: 'Emscherstraße 50, 47137 Duisburg',
      coordinates: [51.4810, 6.7800]
    },
    crew: 1,
    specialization: ['traffic', 'pursuit']
  }
];