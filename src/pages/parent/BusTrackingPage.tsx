import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Phone, User, MapPin, CheckCircle, Radio, ArrowLeft, Bus } from 'lucide-react';

// --- MOCK DATA with Bangalore GPS Coordinates ---
const trackingData = {
  bus: {
    number: 'Bus #4',
    plate: 'KA01-G-5678',
    status: 'En Route',
    location: { lat: 12.9716, lng: 77.5946 } // Current bus location (Bangalore)
  },
  driver: {
    name: 'Mr. Kumar Gowda',
    phone: '+91 99887 76655',
    avatar: 'https://placehold.co/100x100/F9A87B/4F5D75?text=KG',
  },
  route: {
    name: 'South Bangalore - Morning Pickup',
    stops: [
      { id: 1, name: 'Jayanagar 4th Block', status: 'completed', location: { lat: 12.9293, lng: 77.5825 } },
      { id: 2, name: 'Basavanagudi', status: 'completed', location: { lat: 12.9421, lng: 77.5714 } },
      { id: 3, name: 'Koramangala 5th Block', status: 'current', location: { lat: 12.9352, lng: 77.6245 } },
      { id: 4, name: 'Indiranagar (100ft Road)', status: 'pending', location: { lat: 12.9784, lng: 77.6408 } },
      { id: 5, name: 'MG Road', status: 'pending', location: { lat: 12.9757, lng: 77.6068 } },
      { id: 6, name: 'School Campus (Vidyaniketan)', status: 'pending', location: { lat: 12.9850, lng: 77.5998 } },
    ],
  },
};

// --- Main Component ---
export default function BusTrackingPage() {
  const mapRef = useRef(null);
  
  const currentStop = useMemo(() => {
    return trackingData.route.stops.find(stop => stop.status === 'current');
  }, [trackingData.route.stops]);

  // --- Leaflet Map Initialization ---
  useEffect(() => {
    const loadMap = () => {
        if (!window.L || mapRef.current) return;

        const L = window.L;
        const map = L.map('map-container', { zoomControl: false }).setView([12.9716, 77.5946], 12);
        mapRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const busIcon = L.divIcon({
            html: `<div class="p-1 bg-blue-600 rounded-full shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2l.64 2.54.81 3.24A1 1 0 0 1 21.46 24H2.54a1 1 0 0 1-.99-.22l.81-3.24L4 17h2m0 0h11m0 0v-4m-11 4V7a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v6m-9 0h7"/></svg></div>`,
            className: 'map-bus-icon',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
        });

        L.marker([trackingData.bus.location.lat, trackingData.bus.location.lng], { icon: busIcon }).addTo(map);

        trackingData.route.stops.forEach(stop => {
            const color = stop.status === 'completed' ? '#9CA3AF' : '#1D4ED8';
            L.circleMarker([stop.location.lat, stop.location.lng], {
                radius: 6, fillColor: color, color: color, weight: 1, opacity: 1, fillOpacity: 0.8
            }).bindPopup(stop.name).addTo(map);
        });
        
        const routeLatLngs = trackingData.route.stops.map(s => [s.location.lat, s.location.lng]);
        L.polyline(routeLatLngs, { color: 'rgba(29, 78, 216, 0.5)', weight: 5 }).addTo(map);
    };
    
    if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
        document.head.appendChild(link);
    }

    if (!document.getElementById('leaflet-js')) {
        const script = document.createElement('script');
        script.id = 'leaflet-js';
        script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
        script.onload = loadMap;
        document.body.appendChild(script);
    } else {
        loadMap();
    }
    
    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Map Area - Takes up a portion of the screen */}
      <div className="h-3/5 bg-gray-200 relative">
        <div id="map-container" className="w-full h-full"></div>
        <button 
            onClick={() => alert('Navigate back')} 
            className="absolute top-4 left-4 bg-white p-2 rounded-full shadow-lg text-gray-700 hover:bg-gray-100 z-[1000]"
        >
            <ArrowLeft size={24}/>
        </button>
      </div>

      {/* Information Panel - Takes the remaining screen space */}
      <div className="bg-white rounded-t-2xl shadow-2xl p-4 sm:p-5 flex flex-col gap-5 flex-grow overflow-y-auto">
        <div>
            <div className="flex justify-between items-center">
                <p className="font-bold text-xl text-gray-900">Bus is {trackingData.bus.status}</p>
                 <div className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                    On Time
                </div>
            </div>
            <p className="text-sm text-gray-500">Currently heading to: <span className="font-medium text-gray-700">{currentStop?.name}</span></p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src={trackingData.driver.avatar} alt={trackingData.driver.name} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-bold text-gray-800">{trackingData.driver.name}</p>
              <p className="text-sm text-gray-500">{trackingData.bus.number}</p>
            </div>
          </div>
          <a href={`tel:${trackingData.driver.phone}`} className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors">
            <Phone size={20} />
          </a>
        </div>
        <div>
            <h3 className="font-bold text-md mb-3 text-gray-800">Route Progress</h3>
            <div className="space-y-0">
                {trackingData.route.stops.map((stop, index) => {
                    const isCompleted = stop.status === 'completed';
                    const isCurrent = stop.status === 'current';
                    const isLast = index === trackingData.route.stops.length - 1;
                    return (
                        <div key={stop.id} className="flex gap-4">
                            <div className="flex flex-col items-center">
                                {isCurrent ? (
                                    <Radio size={24} className="text-blue-600 animate-pulse"/>
                                ) : (
                                     <CheckCircle size={24} className={isCompleted ? "text-blue-600" : "text-gray-300"} />
                                )}
                                {!isLast && (
                                     <div className={`w-0.5 h-full ${isCompleted ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                                )}
                            </div>
                           <div className="pb-6">
                                <p className={`font-semibold ${isCurrent ? 'text-blue-700' : 'text-gray-800'}`}>
                                    {stop.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {isCompleted ? 'Completed' : isCurrent ? 'Next Stop' : 'Upcoming'}
                                </p>
                           </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
}
