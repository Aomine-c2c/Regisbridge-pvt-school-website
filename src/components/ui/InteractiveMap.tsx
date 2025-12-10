'use client';

import { useState, useCallback } from 'react';
import { MapPin, Navigation, Maximize2, X, ExternalLink } from 'lucide-react';

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  title?: string;
  address?: string;
  className?: string;
}

export default function InteractiveMap({
  latitude,
  longitude,
  title = 'Location',
  address,
  className = '',
}: InteractiveMapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const embedUrl = `https://www.google.com/maps?q=${latitude},${longitude}&z=16&t=${mapType === 'satellite' ? 'k' : 'm'}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(prev => !prev);
  }, []);

  const toggleMapType = useCallback(() => {
    setMapType(prev => prev === 'roadmap' ? 'satellite' : 'roadmap');
  }, []);

  const coordinates = {
    lat: Math.abs(latitude),
    latDir: latitude >= 0 ? 'N' : 'S',
    lng: Math.abs(longitude),
    lngDir: longitude >= 0 ? 'E' : 'W',
  };

  const formatCoordinates = () => {
    const latDeg = Math.floor(coordinates.lat);
    const latMin = Math.floor((coordinates.lat - latDeg) * 60);
    const latSec = ((coordinates.lat - latDeg - latMin / 60) * 3600).toFixed(1);

    const lngDeg = Math.floor(coordinates.lng);
    const lngMin = Math.floor((coordinates.lng - lngDeg) * 60);
    const lngSec = ((coordinates.lng - lngDeg - lngMin / 60) * 3600).toFixed(1);

    return `${latDeg}°${latMin}'${latSec}"${coordinates.latDir} ${lngDeg}°${lngMin}'${lngSec}"${coordinates.lngDir}`;
  };

  const MapContent = () => (
    <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden group">
      {/* Map Controls Overlay */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          onClick={toggleMapType}
          className="bg-white shadow-lg px-4 py-2 rounded-lg text-sm font-semibold text-[#1C1A75] hover:bg-gray-50 transition-all duration-200"
          aria-label="Toggle map type"
        >
          {mapType === 'roadmap' ? '🛰️ Satellite' : '🗺️ Map'}
        </button>
        {!isFullscreen && (
          <button
            onClick={toggleFullscreen}
            className="bg-white shadow-lg p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
            aria-label="Fullscreen"
          >
            <Maximize2 className="text-[#1C1A75]" size={20} />
          </button>
        )}
      </div>

      {/* Map iframe */}
      <iframe
        title={title}
        className="w-full h-full border-0"
        loading="lazy"
        src={embedUrl}
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Hover overlay with quick actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D4AF37] hover:bg-[#c49d2e] text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all duration-200"
            >
              <Navigation size={16} />
              Get Directions
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 hover:bg-white text-[#1C1A75] px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all duration-200"
            >
              <ExternalLink size={16} />
              Open in Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Regular Map Container */}
      <div className={`${className} ${isFullscreen ? 'hidden' : ''}`}>
        <div className="h-64 sm:h-80 md:h-96">
          <MapContent />
        </div>
        
        {/* Map Info Footer */}
        <div className="bg-white p-4 rounded-b-lg border-t border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#D4AF37] mt-1 flex-shrink-0" size={20} />
              <div>
                {address && (
                  <p className="text-sm font-semibold text-gray-900 mb-1">{address}</p>
                )}
                <p className="text-xs text-gray-600">
                  Coordinates: {formatCoordinates()}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Decimal: {latitude.toFixed(6)}, {longitude.toFixed(6)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Map Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 animate-fade-in">
          <div className="w-full h-full p-4">
            <div className="relative w-full h-full">
              {/* Close button */}
              <button
                onClick={toggleFullscreen}
                className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200"
                aria-label="Close fullscreen"
              >
                <X className="text-[#1C1A75]" size={24} />
              </button>

              {/* Title */}
              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
                <h3 className="font-bold text-[#1C1A75] text-lg">{title}</h3>
                {address && (
                  <p className="text-sm text-gray-600 mt-1">{address}</p>
                )}
              </div>

              <MapContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
