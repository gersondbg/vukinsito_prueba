import { useState, useEffect } from 'react';
import { Shield, Users, Building2, DollarSign, Activity, CheckCircle, Clock, XCircle, Search } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { Booking } from '../data/mockData';

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'properties' | 'monitoring' | 'bookings'>('overview');



  const usersByType = [
    { name: 'Huéspedes', value: 987, color: '#3b82f6' },
    { name: 'Propietarios', value: 156, color: '#8b5cf6' },
    { name: 'Admins', value: 8, color: '#10b981' },
  ];

  const propertyStatus = [
    { name: 'Activas', value: 142, color: '#10b981' },
    { name: 'Pendientes', value: 8, color: '#f59e0b' },
    { name: 'Suspendidas', value: 6, color: '#ef4444' },
  ];

  const revenueData = [
    { month: 'Ene', revenue: 95000 },
    { month: 'Feb', revenue: 88000 },
    { month: 'Mar', revenue: 112000 },
    { month: 'Abr', revenue: 98000 },
    { month: 'May', revenue: 125000 },
    { month: 'Jun', revenue: 108000 },
  ];

  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/bookings')
      .then(res => res.json())
      .then(data => setBookings(data))
      .catch(err => console.error('Error fetching bookings:', err));
  }, []);

  const platformStats = {
    totalUsers: 1243,
    totalProperties: 156,
    totalRevenue: bookings.reduce((sum: number, b: Booking) => sum + parseFloat(b.totalPrice.toString()), 0),
    activeBookings: bookings.filter((b: Booking) => b.status === 'confirmed' || b.status === 'pending').length,
  };

  const mockProperties = [
    { id: '1', name: 'Hotel Miraflores', owner: 'Juan Pérez', status: 'active', rooms: 12, revenue: 45800 },
    { id: '2', name: 'Hostal El Patio', owner: 'María González', status: 'active', rooms: 6, revenue: 28900 },
    { id: '3', name: 'Hotel Costa Verde', owner: 'Carlos Mendoza', status: 'pending', rooms: 8, revenue: 0 },
    { id: '4', name: 'Business Inn', owner: 'Ana Rodríguez', status: 'active', rooms: 15, revenue: 62300 },
    { id: '5', name: 'Resort Máncora', owner: 'Pedro Sánchez', status: 'active', rooms: 20, revenue: 89400 },
  ];

  const mockUsers = [
    { id: '1', name: 'Juan Pérez', email: 'juan@example.com', type: 'owner', status: 'active', joined: '2024-03-15' },
    { id: '2', name: 'María González', email: 'maria@example.com', type: 'owner', status: 'active', joined: '2024-05-20' },
    { id: '3', name: 'Carlos López', email: 'carlos@example.com', type: 'guest', status: 'active', joined: '2024-08-10' },
    { id: '4', name: 'Ana Rodríguez', email: 'ana@example.com', type: 'owner', status: 'pending', joined: '2024-11-28' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Shield className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600">Control total de la plataforma VUKINSITO</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'overview'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'bookings'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
            Reservas
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'users'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('properties')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'properties'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
            Propiedades
          </button>
          <button
            onClick={() => setActiveTab('monitoring')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${activeTab === 'monitoring'
              ? 'border-purple-600 text-purple-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
          >
            Monitoreo
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <AdminStatCard
                icon={<Users className="w-6 h-6" />}
                label="Usuarios Totales"
                value={platformStats.totalUsers.toString()}
                bgColor="bg-blue-50"
                iconColor="text-blue-600"
              />
              <AdminStatCard
                icon={<Building2 className="w-6 h-6" />}
                label="Propiedades"
                value={platformStats.totalProperties.toString()}
                bgColor="bg-purple-50"
                iconColor="text-purple-600"
              />
              <AdminStatCard
                icon={<DollarSign className="w-6 h-6" />}
                label="Ingresos Totales"
                value={`S/ ${platformStats.totalRevenue.toLocaleString()}`}
                bgColor="bg-green-50"
                iconColor="text-green-600"
              />
              <AdminStatCard
                icon={<Activity className="w-6 h-6" />}
                label="Reservas Activas"
                value={platformStats.activeBookings.toString()}
                bgColor="bg-orange-50"
                iconColor="text-orange-600"
              />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg text-gray-900 mb-4">Usuarios por Tipo</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={usersByType}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {usersByType.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg text-gray-900 mb-4">Estado de Propiedades</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={propertyStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {propertyStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue Chart */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg text-gray-900 mb-4">Ingresos de la Plataforma</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8b5cf6" name="Ingresos (S/)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">Gestión de Reservas</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar reserva..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Todas</option>
                    <option>Confirmadas</option>
                    <option>Pendientes</option>
                    <option>Canceladas</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Habitación</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Huésped</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Fechas</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Total</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Estado</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking: Booking) => (
                      <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900 text-sm">{booking.id.slice(0, 8)}...</td>
                        <td className="py-3 px-4 text-gray-900">
                          <div>
                            <p className="font-medium">{booking.roomName}</p>
                            <p className="text-sm text-gray-500">{booking.hotelName}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-900">
                          <div>
                            <p className="font-medium">{booking.guestName}</p>
                            <p className="text-sm text-gray-500">{booking.guestEmail}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {booking.checkIn} - {booking.checkOut}
                        </td>
                        <td className="py-3 px-4 text-gray-900 font-medium">
                          S/ {parseFloat(booking.totalPrice.toString()).toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                              }`}
                          >
                            {booking.status === 'confirmed' ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                Confirmada
                              </>
                            ) : booking.status === 'pending' ? (
                              <>
                                <Clock className="w-3 h-3" />
                                Pendiente
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3" />
                                Cancelada
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Ver Detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">Gestión de Usuarios</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar usuario..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Todos</option>
                    <option>Propietarios</option>
                    <option>Huéspedes</option>
                    <option>Admins</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Usuario</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Email</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Tipo</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Estado</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Registro</th>
                      <th className="text-left py-3 px-4 text-sm text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">{user.name}</td>
                        <td className="py-3 px-4 text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                            {user.type === 'owner' ? 'Propietario' : 'Huésped'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                              }`}
                          >
                            {user.status === 'active' ? (
                              <>
                                <CheckCircle className="w-3 h-3" />
                                Activo
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3" />
                                Pendiente
                              </>
                            )}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{new Date(user.joined).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                              Ver
                            </button>
                            <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                              Suspender
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-gray-900">Gestión de Propiedades</h2>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Buscar propiedad..."
                    className="px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <select className="px-4 py-2 border border-gray-300 rounded-lg">
                    <option>Todas</option>
                    <option>Activas</option>
                    <option>Pendientes</option>
                    <option>Suspendidas</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mockProperties.map((property) => (
                  <div key={property.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg text-gray-900 mb-1">{property.name}</h3>
                        <p className="text-sm text-gray-600">Propietario: {property.owner}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${property.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                          }`}
                      >
                        {property.status === 'active' ? 'Activa' : 'Pendiente'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Habitaciones</p>
                        <p className="text-lg text-gray-900">{property.rooms}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ingresos</p>
                        <p className="text-lg text-gray-900">S/ {property.revenue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Revisar
                      </button>
                      {property.status === 'pending' && (
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                          Aprobar
                        </button>
                      )}
                      <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                        Suspender
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Monitoring Tab */}
        {activeTab === 'monitoring' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <h3 className="text-lg text-gray-900">Estado del Sistema</h3>
                </div>
                <p className="text-2xl text-green-600 mb-2">Operativo</p>
                <p className="text-sm text-gray-600">Todos los servicios funcionando correctamente</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg text-gray-900 mb-4">Sincronización DIGIGOL</h3>
                <p className="text-2xl text-blue-600 mb-2">99.8%</p>
                <p className="text-sm text-gray-600">Uptime en las últimas 24h</p>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg text-gray-900 mb-4">Transacciones</h3>
                <p className="text-2xl text-purple-600 mb-2">1,234</p>
                <p className="text-sm text-gray-600">En las últimas 24 horas</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg text-gray-900 mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                <ActivityItem
                  icon={<CheckCircle className="w-5 h-5 text-green-600" />}
                  text="Nueva propiedad aprobada: Business Inn"
                  time="Hace 5 minutos"
                />
                <ActivityItem
                  icon={<Users className="w-5 h-5 text-blue-600" />}
                  text="Nuevo usuario registrado: Ana Rodríguez"
                  time="Hace 12 minutos"
                />
                <ActivityItem
                  icon={<DollarSign className="w-5 h-5 text-green-600" />}
                  text="Pago procesado: S/ 850.00"
                  time="Hace 23 minutos"
                />
                <ActivityItem
                  icon={<XCircle className="w-5 h-5 text-red-600" />}
                  text="Reserva cancelada: #B789"
                  time="Hace 45 minutos"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminStatCard({ icon, label, value, bgColor, iconColor }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  iconColor: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className={`inline-flex p-3 ${bgColor} rounded-lg ${iconColor} mb-4`}>
        {icon}
      </div>
      <p className="text-gray-600 text-sm mb-1">{label}</p>
      <p className="text-2xl text-gray-900">{value}</p>
    </div>
  );
}

function ActivityItem({ icon, text, time }: { icon: React.ReactNode; text: string; time: string }) {
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div className="flex-1">
        <p className="text-gray-900">{text}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}
