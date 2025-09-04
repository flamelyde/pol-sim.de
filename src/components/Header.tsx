import React from 'react';
import { Clock, AlertTriangle, Phone } from 'lucide-react';

interface HeaderProps {
  gameTime: Date;
  activeCalls: number;
  activeIncidents: number;
  score: number;
}

export function Header({ gameTime, activeCalls, activeIncidents, score }: HeaderProps) {
  return (
    <div className="bg-blue-900 text-white p-4 border-b border-blue-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">POLIZEI LEITSTELLE DUISBURG</h1>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{gameTime.toLocaleTimeString('de-DE')}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-yellow-400" />
            <span className="font-bold">{activeCalls}</span>
            <span className="text-sm">Offene Anrufe</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="font-bold">{activeIncidents}</span>
            <span className="text-sm">Aktive Einsätze</span>
          </div>
          
          <div className="bg-blue-800 px-3 py-1 rounded">
            <span className="text-sm">Score: </span>
            <span className="font-bold text-yellow-400">{score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}