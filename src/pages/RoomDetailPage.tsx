import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockRooms } from '../data/mockData';
import { getImageUrl } from '../utils/imageMapping';
import { Star, MapPin, Users, Wifi, Tv, Wind, Coffee, CheckCircle, X } from 'lucide-react';
import { ReviewSection } from '../components/ReviewSection';

export function RoomDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = mockRooms.find((r) => r.id === id);

  const [selectedImage, setSelectedImage] = useState(0);

  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-gray-900 mb-4">Habitación no encontrada</h2>
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver a búsqueda
          </button>
        </div>
      </div>
    );
  }

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi className="w-5 h-5" />,
    TV: <Tv className="w-5 h-5" />,
    'Aire acondicionado': <Wind className="w-5 h-5" />,
    Minibar: <Coffee className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/search')}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <X className="w-5 h-5" />
          <span>Volver</span>
        </button>

        {/* Image Gallery */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img
              src={getImageUrl(room.images[selectedImage])}
              alt={room.name}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            {room.images.map((img, idx) => (
              <img
                key={idx}
                src={getImageUrl(img)}
                alt={`${room.name} ${idx + 1}`}
                onClick={() => setSelectedImage(idx)}
                className={`w-full h-32 md:h-28 object-cover rounded-lg cursor-pointer transition-all ${
                  selectedImage === idx ? 'ring-4 ring-blue-600' : 'hover:opacity-75'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl text-gray-900 mb-2">{room.name}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{room.hotel} • {room.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-lg">
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-xl text-gray-900">{room.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>Hasta {room.capacity} personas</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{room.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4">Servicios e instalaciones</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {room.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="text-blue-600">
                      {amenityIcons[amenity] || <CheckCircle className="w-5 h-5" />}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4">Políticas del alojamiento</h2>
              <ul className="space-y-2">
                {room.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <ReviewSection reviews={room.reviews} averageRating={room.rating} />
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl text-blue-600">S/ {room.price}</span>
                  <span className="text-gray-600">/ noche</span>
                </div>
              </div>

              <button
                onClick={() => navigate(`/checkout/${room.id}`)}
                className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
              >
                Reservar ahora
              </button>

              <p className="text-center text-sm text-gray-500 mb-4">
                No se realizará ningún cargo todavía
              </p>

              <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">S/ {room.price} × 1 noche</span>
                  <span className="text-gray-900">S/ {room.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tarifa de servicio</span>
                  <span className="text-gray-900">S/ 15</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
                  <span className="text-gray-900">Total</span>
                  <span className="text-lg text-gray-900">S/ {room.price + 15}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <CheckCircle className="w-4 h-4 inline mr-1" />
                  Cancelación gratuita hasta 24h antes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
