import { PoliceCode } from '../types';

export const policeCodes: PoliceCode[] = [
  {
    code: '100',
    keyword: 'Verkehrsunfall',
    description: 'Verkehrsunfall ohne Personenschaden',
    priority: 3,
    requiredVehicles: 1,
    suggestedUnits: ['patrol', 'traffic']
  },
  {
    code: '101',
    keyword: 'Verkehrsunfall schwer',
    description: 'Verkehrsunfall mit Personenschaden',
    priority: 1,
    requiredVehicles: 2,
    suggestedUnits: ['patrol', 'traffic']
  },
  {
    code: '200',
    keyword: 'Diebstahl',
    description: 'Diebstahl / Einbruch',
    priority: 2,
    requiredVehicles: 1,
    suggestedUnits: ['patrol', 'detective']
  },
  {
    code: '300',
    keyword: 'Körperverletzung',
    description: 'Körperverletzung / Schlägerei',
    priority: 1,
    requiredVehicles: 2,
    suggestedUnits: ['patrol']
  },
  {
    code: '400',
    keyword: 'Häusliche Gewalt',
    description: 'Häusliche Gewalt',
    priority: 1,
    requiredVehicles: 2,
    suggestedUnits: ['patrol']
  },
  {
    code: '500',
    keyword: 'Verdächtige Person',
    description: 'Verdächtige Person / Verhalten',
    priority: 3,
    requiredVehicles: 1,
    suggestedUnits: ['patrol']
  },
  {
    code: '600',
    keyword: 'Rauschgift',
    description: 'Rauschgiftdelikt',
    priority: 2,
    requiredVehicles: 2,
    suggestedUnits: ['patrol', 'k9']
  },
  {
    code: '700',
    keyword: 'Bedrohung',
    description: 'Bedrohung / Erpressung',
    priority: 1,
    requiredVehicles: 2,
    suggestedUnits: ['patrol', 'sek']
  },
  {
    code: '800',
    keyword: 'Demonstration',
    description: 'Demonstration / Versammlung',
    priority: 2,
    requiredVehicles: 3,
    suggestedUnits: ['patrol']
  },
  {
    code: '900',
    keyword: 'Geiselnahme',
    description: 'Geiselnahme / Amoklage',
    priority: 1,
    requiredVehicles: 4,
    suggestedUnits: ['patrol', 'sek']
  }
];