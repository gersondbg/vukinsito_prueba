import { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { RoomCard } from '../components/RoomCard';
import { mockRooms } from '../data/mockData';
import { SlidersHorizontal } from 'lucide-react';

export function SearchPage() {
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);

  const handleSearch = (location: string, checkIn: string, checkOut: string, guests: number) => {
    let filtered = mockRooms;

    if (location) {
      filtered = filtered.filter(
        (room) =>
          room.location.toLowerCase().includes(location.toLowerCase()) ||
          room.hotel.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (guests) {
      filtered = filtered.filter((room) => room.capacity >= guests);
    }

    setFilteredRooms(filtered);
  };

  const applyFilters = () => {
    let filtered = mockRooms.filter(
      (room) => room.price >= priceRange[0] && room.price <= priceRange[1] && room.rating >= minRating
    );
    setFilteredRooms(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-gray-900 mb-6">Encuentra tu alojamiento ideal</h1>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg text-gray-900">Filtros</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-3">
                    Rango de precio (S/)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                      className="w-full"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>S/ {priceRange[0]}</span>
                      <span>S/ {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-3">
                    Calificación mínima
                  </label>
                  <select
                    value={minRating}
                    onChange={(e) => setMinRating(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="0">Todas</option>
                    <option value="3">3+ estrellas</option>
                    <option value="4">4+ estrellas</option>
                    <option value="4.5">4.5+ estrellas</option>
                  </select>
                </div>

                <button
                  onClick={applyFilters}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Aplicar filtros
                </button>

                <button
                  onClick={() => {
                    setPriceRange([0, 500]);
                    setMinRating(0);
                    setFilteredRooms(mockRooms);
                  }}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredRooms.length} {filteredRooms.length === 1 ? 'alojamiento encontrado' : 'alojamientos encontrados'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No se encontraron alojamientos con los criterios seleccionados
                </p>
                <button
                  onClick={() => setFilteredRooms(mockRooms)}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Ver todos los alojamientos
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
