import { useState } from 'react';
import { mockBookings, mockStats, mockCoupons } from '../data/mockData';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Calendar, Star, Users, Plus, Edit, Trash2, BarChart3, Tag } from 'lucide-react';
import { CouponManager } from '../components/CouponManager';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'analytics' | 'coupons'>('overview');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">Panel de Control</h1>
            <p className="text-gray-600">Gestiona tu alojamiento desde aquí</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" />
            <span>Nueva habitación</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'bookings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Reservas
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'analytics'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Estadísticas
          </button>
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'coupons'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            Cupones
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <StatCard
                icon={<Calendar className="w-6 h-6" />}
                label="Total Reservas"
                value={mockStats.totalBookings.toString()}
                change="+12%"
                positive
              />
              <StatCard
                icon={<DollarSign className="w-6 h-6" />}
                label="Ingresos Totales"
                value={`S/ ${mockStats.totalRevenue.toLocaleString()}`}
                change="+18%"
                positive
              />
              <StatCard
                icon={<TrendingUp className="w-6 h-6" />}
                label="Ocupación"
                value={`${mockStats.occupancyRate}%`}
                change="+5%"
                positive
              />
              <StatCard
                icon={<Star className="w-6 h-6" />}
                label="Calificación"
                value={mockStats.averageRating.toString()}
                change="+0.2"
                positive
              />
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4">Reservas Recientes</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Huésped</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Habitación</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Fechas</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Total</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-900">{booking.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-900">{booking.guestName}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{booking.roomName}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                          {new Date(booking.checkOut).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">S/ {booking.totalPrice}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-sm ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {booking.status === 'confirmed' ? 'Confirmada' : booking.status === 'pending' ? 'Pendiente' : 'Cancelada'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-purple-600" />
                Recomendaciones Inteligentes
              </h2>
              <div className="space-y-4">
                <RecommendationCard
                  title="Ajusta tus precios para el fin de semana"
                  description="La demanda está alta. Incrementa tus precios en 15% para maximizar ingresos."
                  action="Aplicar sugerencia"
                />
                <RecommendationCard
                  title="Crea una promoción para la temporada baja"
                  description="Enero tiene baja ocupación. Te sugerimos crear un cupón de 20% de descuento."
                  action="Crear promoción"
                />
                <RecommendationCard
                  title="Actualiza las fotos de tus habitaciones"
                  description="Las habitaciones con fotos actualizadas tienen 45% más reservas."
                  action="Subir fotos"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">Todas las Reservas</h2>
                <div className="flex gap-3">
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Todas</option>
                    <option>Confirmadas</option>
                    <option>Pendientes</option>
                    <option>Canceladas</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Buscar..."
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg text-gray-900">{booking.guestName}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {booking.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1">{booking.roomName} - {booking.hotelName}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {booking.guests} huéspedes
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-blue-600 mb-2">S/ {booking.totalPrice}</p>
                        <div className="flex gap-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-6">Ingresos Mensuales</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockStats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Ingresos (S/)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Bookings Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-6">Reservas por Mes</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockStats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bookings" fill="#8b5cf6" name="Reservas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && <CouponManager coupons={mockCoupons} />}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, change, positive }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
        <span className={`text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-2xl text-gray-900">{value}</p>
    </div>
  );
}

function RecommendationCard({ title, description, action }: {
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="bg-white rounded-lg p-4 flex items-start justify-between">
      <div className="flex-1">
        <h3 className="text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button className="ml-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 whitespace-nowrap">
        {action}
      </button>
    </div>
  );
}
