import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Download, Mail, Calendar, MapPin, Users, CreditCard } from 'lucide-react';

export function BookingConfirmationPage() {
  const { bookingId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl text-gray-900 mb-2">¡Reserva confirmada!</h1>
          <p className="text-lg text-gray-600">
            Tu reserva ha sido procesada exitosamente
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl text-gray-900 mb-1">Número de reserva</h2>
              <p className="text-2xl text-blue-600">{bookingId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Estado</p>
              <span className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full">
                Confirmada
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Alojamiento</p>
                <p className="text-gray-900">Suite Ejecutiva - Hotel Miraflores</p>
                <p className="text-sm text-gray-600">Miraflores, Lima</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Fechas</p>
                <p className="text-gray-900">15 Dic 2025 - 17 Dic 2025</p>
                <p className="text-sm text-gray-600">2 noches</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Huéspedes</p>
                <p className="text-gray-900">2 personas</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CreditCard className="w-5 h-5 text-gray-400 mt-1" />
              <div>
                <p className="text-sm text-gray-600">Total pagado</p>
                <p className="text-2xl text-gray-900">S/ 515.00</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <Mail className="w-4 h-4 inline mr-1" />
              Se ha enviado la confirmación y el comprobante a tu correo electrónico
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-5 h-5" />
            <span>Descargar comprobante</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            <Mail className="w-5 h-5" />
            <span>Reenviar confirmación</span>
          </button>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-lg text-gray-900 mb-4">Próximos pasos</h3>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                1
              </div>
              <p className="text-gray-700">
                Recibirás un email de confirmación con todos los detalles de tu reserva
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                2
              </div>
              <p className="text-gray-700">
                El alojamiento te contactará 24h antes del check-in
              </p>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">
                3
              </div>
              <p className="text-gray-700">
                Presenta tu comprobante en la recepción el día del check-in
              </p>
            </li>
          </ol>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center"
          >
            Volver al inicio
          </Link>
          <Link
            to="/search"
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            Buscar más alojamientos
          </Link>
        </div>
      </div>
    </div>
  );
}
