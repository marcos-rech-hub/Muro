import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Info, X } from 'lucide-react';

// Coordenadas históricas do Muro de Berlim (principais segmentos)
const berlinWallCoordinates = [
  // Segmento Norte - Bernauer Straße
  { lat: 52.5755, lng: 13.3903, name: "Bernauer Straße" },
  { lat: 52.5708, lng: 13.3889, name: "Wedding" },
  { lat: 52.5665, lng: 13.3875, name: "Mitte Norte" },
  { lat: 52.5622, lng: 13.3861, name: "Gesundbrunnen" },
  { lat: 52.5579, lng: 13.3847, name: "Prenzlauer Berg" },
  
  // Segmento Central
  { lat: 52.5536, lng: 13.3833, name: "Alexanderplatz" },
  { lat: 52.5493, lng: 13.3819, name: "Hackescher Markt" },
  { lat: 52.5450, lng: 13.3805, name: "Museumsinsel" },
  { lat: 52.5407, lng: 13.3791, name: "Unter den Linden" },
  { lat: 52.5364, lng: 13.3777, name: "Brandenburger Tor" },
  { lat: 52.5321, lng: 13.3763, name: "Pariser Platz" },
  { lat: 52.5278, lng: 13.3749, name: "Tiergarten" },
  
  // Segmento Sul
  { lat: 52.5235, lng: 13.3735, name: "Potsdamer Platz" },
  { lat: 52.5192, lng: 13.3721, name: "Leipziger Platz" },
  { lat: 52.5149, lng: 13.3707, name: "Anhalter Bahnhof" },
  { lat: 52.5106, lng: 13.3693, name: "Kreuzberg Norte" },
  { lat: 52.5063, lng: 13.3679, name: "Checkpoint Charlie" },
  
  // Continuação Sul
  { lat: 52.5020, lng: 13.3665, name: "Kochstraße" },
  { lat: 52.4977, lng: 13.3651, name: "Moritzplatz" },
  { lat: 52.4934, lng: 13.3637, name: "Oranienstraße" },
  { lat: 52.4891, lng: 13.3623, name: "Görlitzer Park" },
  { lat: 52.4848, lng: 13.3609, name: "Schlesisches Tor" },
  
  // Volta para Leste
  { lat: 52.4805, lng: 13.3595, name: "Oberbaumbrücke" },
  { lat: 52.4762, lng: 13.3581, name: "Warschauer Straße" },
  { lat: 52.4719, lng: 13.3567, name: "Friedrichshain" },
  { lat: 52.4676, lng: 13.3553, name: "Ostbahnhof" },
  
  // Segmento Leste
  { lat: 52.4633, lng: 13.3539, name: "Treptow" },
  { lat: 52.4590, lng: 13.3525, name: "Alt-Treptow" },
  { lat: 52.4547, lng: 13.3511, name: "Plänterwald" },
  { lat: 52.4504, lng: 13.3497, name: "Baumschulenweg" },
  
  // Volta Norte
  { lat: 52.4461, lng: 13.3483, name: "Neukölln Leste" },
  { lat: 52.4418, lng: 13.3469, name: "Britz" },
  { lat: 52.4375, lng: 13.3455, name: "Rudow" },
  { lat: 52.4332, lng: 13.3441, name: "Gropiusstadt" }
];

// Principais checkpoints históricos
const checkpoints = [
  {
    id: 1,
    name: 'Checkpoint Charlie',
    position: { lat: 52.5074, lng: 13.3903 },
    description: 'O mais famoso posto de controle entre Berlim Oriental e Ocidental, localizado na Friedrichstraße. Era usado principalmente por diplomatas, militares aliados e estrangeiros.',
    type: 'principal',
    year: '1961-1989',
    significance: 'Símbolo da Guerra Fria e ponto de tensão durante a Crise de Berlim'
  },
  {
    id: 2,
    name: 'Portão de Brandenburgo',
    position: { lat: 52.5163, lng: 13.3777 },
    description: 'Símbolo histórico de Berlim que ficou inacessível durante a divisão, localizado na "faixa da morte" entre os muros.',
    type: 'simbolico',
    year: '1961-1989',
    significance: 'Tornou-se símbolo da reunificação alemã após 1989'
  },
  {
    id: 3,
    name: 'Bernauer Straße',
    position: { lat: 52.5355, lng: 13.3903 },
    description: 'Local onde muitas famílias foram separadas dramaticamente. Hoje abriga o Memorial do Muro de Berlim mais importante.',
    type: 'memorial',
    year: '1961-1989',
    significance: 'Cenário de fugas dramáticas e separações familiares'
  },
  {
    id: 4,
    name: 'Potsdamer Platz',
    position: { lat: 52.5096, lng: 13.3760 },
    description: 'Importante centro comercial e cultural que foi completamente dividido pelo muro. Hoje é um símbolo da Berlim reunificada.',
    type: 'comercial',
    year: '1961-1989',
    significance: 'Transformação de terra de ninguém em centro moderno'
  },
  {
    id: 5,
    name: 'Checkpoint Alpha (Helmstedt)',
    position: { lat: 52.1167, lng: 11.0833 },
    description: 'Principal posto de controle na fronteira entre a Alemanha Ocidental e Oriental, fora de Berlim.',
    type: 'fronteira',
    year: '1945-1989',
    significance: 'Controle de acesso terrestre a Berlim Ocidental'
  },
  {
    id: 6,
    name: 'East Side Gallery',
    position: { lat: 52.5058, lng: 13.4394 },
    description: 'Seção preservada do muro com murais artísticos, hoje um memorial ao ar livre.',
    type: 'memorial',
    year: '1990-presente',
    significance: 'Maior galeria ao ar livre do mundo sobre o muro'
  }
];

const BerlinMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<typeof checkpoints[0] | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 52.5200, lng: 13.4050 });
  const [zoomLevel, setZoomLevel] = useState(11);

  // Função para converter coordenadas lat/lng para pixels no mapa
  const latLngToPixel = (lat: number, lng: number, mapWidth: number, mapHeight: number) => {
    // Bounds aproximados de Berlim
    const bounds = {
      north: 52.6755,
      south: 52.3382,
      east: 13.7611,
      west: 13.0883
    };

    const x = ((lng - bounds.west) / (bounds.east - bounds.west)) * mapWidth;
    const y = ((bounds.north - lat) / (bounds.north - bounds.south)) * mapHeight;
    
    return { x, y };
  };

  const getCheckpointColor = (type: string) => {
    const colors = {
      principal: '#ef4444', // red-500
      fronteira: '#f97316', // orange-500
      aeroporto: '#3b82f6', // blue-500
      simbolico: '#8b5cf6', // violet-500
      memorial: '#10b981', // emerald-500
      comercial: '#eab308' // yellow-500
    };
    return colors[type as keyof typeof colors] || '#ef4444';
  };

  const getCheckpointIcon = (type: string) => {
    switch (type) {
      case 'principal': return '🚧';
      case 'fronteira': return '🛂';
      case 'simbolico': return '🏛️';
      case 'memorial': return '🕊️';
      case 'comercial': return '🏢';
      default: return '📍';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Mapa Principal */}
      <div className="relative bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
        <div 
          ref={mapRef}
          className="relative w-full h-96 bg-gradient-to-br from-blue-900 via-gray-800 to-red-900"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23374151' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        >
          {/* Overlay do OpenStreetMap simulado */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-blue-600 to-red-600"></div>
          </div>

          {/* Linha do Muro de Berlim */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <pattern id="wallPattern" patternUnits="userSpaceOnUse" width="20" height="4">
                <rect width="20" height="4" fill="none"/>
                <rect width="10" height="4" fill="#fbbf24"/>
              </pattern>
            </defs>
            
            {berlinWallCoordinates.map((coord, index) => {
              if (index === berlinWallCoordinates.length - 1) return null;
              
              const current = latLngToPixel(coord.lat, coord.lng, 800, 384);
              const next = latLngToPixel(
                berlinWallCoordinates[index + 1].lat, 
                berlinWallCoordinates[index + 1].lng, 
                800, 
                384
              );
              
              return (
                <line
                  key={index}
                  x1={`${(current.x / 800) * 100}%`}
                  y1={`${(current.y / 384) * 100}%`}
                  x2={`${(next.x / 800) * 100}%`}
                  y2={`${(next.y / 384) * 100}%`}
                  stroke="url(#wallPattern)"
                  strokeWidth="4"
                  opacity="0.9"
                />
              );
            })}
          </svg>

          {/* Checkpoints */}
          {checkpoints.map((checkpoint) => {
            const position = latLngToPixel(
              checkpoint.position.lat, 
              checkpoint.position.lng, 
              800, 
              384
            );
            
            return (
              <button
                key={checkpoint.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform cursor-pointer z-10"
                style={{
                  left: `${(position.x / 800) * 100}%`,
                  top: `${(position.y / 384) * 100}%`
                }}
                onClick={() => setSelectedCheckpoint(checkpoint)}
              >
                <div 
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs"
                  style={{ backgroundColor: getCheckpointColor(checkpoint.type) }}
                >
                  {getCheckpointIcon(checkpoint.type)}
                </div>
              </button>
            );
          })}

          {/* Labels das áreas */}
          <div className="absolute top-4 left-4 bg-blue-600 bg-opacity-80 text-white px-4 py-2 rounded-lg">
            <h3 className="font-bold text-lg">BERLIM OCIDENTAL</h3>
            <p className="text-sm opacity-90">Setores: Americano, Britânico, Francês</p>
          </div>
          
          <div className="absolute top-4 right-4 bg-red-600 bg-opacity-80 text-white px-4 py-2 rounded-lg">
            <h3 className="font-bold text-lg">BERLIM ORIENTAL</h3>
            <p className="text-sm opacity-90">Setor Soviético</p>
          </div>

          {/* Indicador do Muro */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 bg-opacity-90 text-black px-4 py-2 rounded-lg">
            <p className="font-bold text-sm">🧱 MURO DE BERLIM (1961-1989)</p>
          </div>
        </div>
      </div>

      {/* Modal de Informações do Checkpoint */}
      {selectedCheckpoint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedCheckpoint(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4"
                style={{ backgroundColor: getCheckpointColor(selectedCheckpoint.type) }}
              >
                {getCheckpointIcon(selectedCheckpoint.type)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedCheckpoint.name}</h3>
                <p className="text-gray-400 text-sm capitalize">{selectedCheckpoint.type}</p>
              </div>
            </div>
            
            <div className="space-y-3 text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-1">Período:</h4>
                <p className="text-sm">{selectedCheckpoint.year}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-1">Descrição:</h4>
                <p className="text-sm">{selectedCheckpoint.description}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-1">Significado Histórico:</h4>
                <p className="text-sm">{selectedCheckpoint.significance}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legenda do Mapa */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <Info className="mr-2" size={20} />
          Legenda do Mapa Histórico
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-1 bg-yellow-400"></div>
            <span className="text-gray-300">Muro de Berlim (155 km)</span>
          </div>
          
          {[
            { type: 'principal', label: 'Checkpoint Principal', icon: '🚧' },
            { type: 'fronteira', label: 'Posto de Fronteira', icon: '🛂' },
            { type: 'simbolico', label: 'Local Simbólico', icon: '🏛️' },
            { type: 'memorial', label: 'Memorial', icon: '🕊️' },
            { type: 'comercial', label: 'Área Comercial', icon: '🏢' }
          ].map(({ type, label, icon }) => (
            <div key={type} className="flex items-center space-x-3">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                style={{ backgroundColor: getCheckpointColor(type) }}
              >
                {icon}
              </div>
              <span className="text-gray-300 text-sm">{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-700">
          <h4 className="font-semibold text-white mb-2">Dados Históricos:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <p>• <strong>Extensão total:</strong> 155 km</p>
              <p>• <strong>Altura:</strong> 3,6 metros</p>
              <p>• <strong>Período:</strong> 13/08/1961 - 09/11/1989</p>
            </div>
            <div>
              <p>• <strong>Vítimas:</strong> Mais de 140 mortos</p>
              <p>• <strong>Tentativas de fuga:</strong> Mais de 5.000</p>
              <p>• <strong>Famílias separadas:</strong> Milhares</p>
            </div>
          </div>
        </div>
      </div>

      {/* Instruções de Uso */}
      <div className="bg-blue-900 bg-opacity-50 rounded-lg p-4">
        <h4 className="font-semibold text-blue-200 mb-2">Como usar o mapa:</h4>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• Clique nos ícones coloridos para ver informações detalhadas sobre cada checkpoint</li>
          <li>• A linha amarela tracejada representa o percurso histórico do Muro de Berlim</li>
          <li>• As áreas azul e vermelha representam Berlim Ocidental e Oriental respectivamente</li>
          <li>• Cada checkpoint tem informações históricas específicas e contexto da época</li>
        </ul>
      </div>
    </div>
  );
};

export default BerlinMap;