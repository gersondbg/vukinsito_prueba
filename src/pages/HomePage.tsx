import { Link } from 'react-router-dom';
import { Search, Calendar, CreditCard, FileText, TrendingUp, Star, Users, Shield, Info, X } from 'lucide-react';
import { useState } from 'react';

export function HomePage() {
  const [showInfo, setShowInfo] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Info Banner */}
      {showInfo && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">
                  <strong>Demo:</strong> Cambia tu rol en el menú superior (Huésped → Propietario → Admin) para ver diferentes funcionalidades
                </p>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl mb-6">
              VUKINSITO
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Tu plataforma integral de reservas conectada con DIGIGOL
            </p>
            <p className="text-lg mb-10 max-w-3xl mx-auto">
              Automatiza tus reservas, procesa pagos y emite comprobantes desde una sola plataforma sincronizada en tiempo real
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/search"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Buscar Alojamiento
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors border-2 border-white"
              >
                Acceder al Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-gray-900 mb-4">
              Funcionalidades Clave
            </h2>
            <p className="text-lg text-gray-600">
              Todo lo que necesitas para gestionar tu alojamiento
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Search className="w-8 h-8" />}
              title="Catálogo Digital"
              description="Gestiona habitaciones, fotos, precios y descripciones desde DIGIGOL"
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Reservas en Tiempo Real"
              description="Calendario interactivo con validación automática de disponibilidad"
            />
            <FeatureCard
              icon={<CreditCard className="w-8 h-8" />}
              title="Pagos Integrados"
              description="Procesamiento seguro con Culqi, antifraude y confirmación automática"
            />
            <FeatureCard
              icon={<FileText className="w-8 h-8" />}
              title="Comprobantes Automáticos"
              description="Boletas, facturas y notas generadas desde DIGIGOL"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Inteligencia Comercial"
              description="Recomendaciones automáticas de precios y promociones"
            />
            <FeatureCard
              icon={<Star className="w-8 h-8" />}
              title="Reseñas Verificadas"
              description="Solo huéspedes con reserva confirmada pueden opinar"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Upselling"
              description="Ofrece tours, desayuno, transporte y servicios adicionales"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="Sincronización Total"
              description="Toda acción se refleja en el sistema central DIGIGOL"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard number="1,200+" label="Alojamientos" />
            <StatCard number="50,000+" label="Reservas Mensuales" />
            <StatCard number="98%" label="Satisfacción" />
            <StatCard number="24/7" label="Soporte" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl mb-4">
            ¿Listo para digitalizar tu negocio?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Únete a miles de alojamientos que ya confían en VUKINSITO
          </p>
          <Link
            to="/dashboard"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Comenzar Ahora
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white mb-4">VUKINSITO</h3>
              <p className="text-sm">
                Plataforma de reservas integrada con DIGIGOL para alojamientos modernos
              </p>
            </div>
            <div>
              <h4 className="text-white mb-4">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li>Funcionalidades</li>
                <li>Precios</li>
                <li>Integraciones</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm">
                <li>Documentación</li>
                <li>Centro de ayuda</li>
                <li>Contacto</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li>Sobre nosotros</li>
                <li>Blog</li>
                <li>Términos y condiciones</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            © 2025 VUKINSITO. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-lg text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-4xl text-blue-600 mb-2">{number}</div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}