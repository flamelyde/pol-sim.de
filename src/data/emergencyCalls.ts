import { EmergencyCall } from '../types';
import { duisburgLocations, duisburgStreets } from './duisburgLocations';

const callerNames = [
  'Hans Müller', 'Maria Schmidt', 'Peter Weber', 'Anna Becker', 'Klaus Fischer',
  'Sabine Meyer', 'Thomas Wagner', 'Petra Schulz', 'Markus Hoffmann', 'Andrea Richter'
];

const callDescriptions = {
  low: [
    'Parkplatzrempler ohne Verletzte',
    'Verdächtige Person vor meinem Haus',
    'Nachbarschaftsstreit wegen Lärm',
    'Fahrrad wurde gestohlen'
  ],
  medium: [
    'Einbruch in Keller, Täter weg',
    'Verkehrsunfall, Blechschaden',
    'Randalierer im Park',
    'Rauschgifthandel beobachtet'
  ],
  high: [
    'Einbruch in Wohnung, bin zu Hause',
    'Verkehrsunfall mit Verletzten',
    'Schlägerei vor der Kneipe',
    'Mann bedroht Passanten mit Messer'
  ],
  critical: [
    'Bewaffneter Raubüberfall im Gang!',
    'Schüsse gefallen in der Nachbarschaft!',
    'Geiselnahme in der Bank!',
    'Schwerer Unfall, mehrere Verletzte!'
  ]
};

export function generateRandomCall(): EmergencyCall {
  const urgency = Math.random() < 0.1 ? 'critical' : 
                  Math.random() < 0.25 ? 'high' :
                  Math.random() < 0.5 ? 'medium' : 'low';
  
  const location = duisburgLocations[Math.floor(Math.random() * duisburgLocations.length)];
  const streetNumber = Math.floor(Math.random() * 200) + 1;
  const street = duisburgStreets[Math.floor(Math.random() * duisburgStreets.length)];
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date(),
    caller: callerNames[Math.floor(Math.random() * callerNames.length)],
    phoneNumber: `0203${Math.floor(Math.random() * 9000000) + 1000000}`,
    location: {
      address: Math.random() > 0.3 ? `${street} ${streetNumber}, 47051 Duisburg` : location.address,
      coordinates: location.coordinates
    },
    description: callDescriptions[urgency][Math.floor(Math.random() * callDescriptions[urgency].length)],
    urgency,
    status: 'incoming',
    estimatedDuration: Math.floor(Math.random() * 60) + 15
  };
}