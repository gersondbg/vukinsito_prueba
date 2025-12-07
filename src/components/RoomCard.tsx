import { Link } from 'react-router-dom';
import { Star, MapPin, Users, Wifi, Tv } from 'lucide-react';
import type { Room } from '../data/mockData';
import { getImageUrl } from '../utils/imageMapping';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link to={`/room/${room.id}`} className="block bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl(room.images[0])}
          alt={room.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {room.available && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-green-500 text-white rounded-full text-sm">
            Disponible
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg text-gray-900 mb-1">{room.name}</h3>
            <div className="flex items-center gap-1 text-gray-600 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{room.hotel}</span>
            </div>
            <p className="text-sm text-gray-500">{room.location}</p>
          </div>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-900">{room.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 my-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{room.capacity} personas</span>
          </div>
          {room.amenities.includes('WiFi') && <Wifi className="w-4 h-4" />}
          {room.amenities.includes('TV') && <Tv className="w-4 h-4" />}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <span className="text-2xl text-blue-600">S/ {room.price}</span>
            <span className="text-gray-600 text-sm ml-1">/ noche</span>
          </div>
          <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Ver detalles
          </span>
        </div>
      </div>
    </Link>
  );
}
