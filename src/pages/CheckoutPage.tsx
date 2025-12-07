import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockRooms, mockExtras, mockCoupons } from '../data/mockData';
import { getImageUrl } from '../utils/imageMapping';
import { CreditCard, Lock, Tag, Plus, Minus, Coffee, Plane, MapPin, Clock, Sparkles } from 'lucide-react';

export function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = mockRooms.find((r) => r.id === id);

  const [checkIn, setCheckIn] = useState('2025-12-15');
  const [checkOut, setCheckOut] = useState('2025-12-17');
  const [guests, setGuests] = useState(2);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  if (!room) {
    return null;
  }

  const nights = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );

  const roomTotal = room.price * nights;
  const extrasTotal = selectedExtras.reduce((sum: number, extraId: string) => {
    const extra = mockExtras.find((e) => e.id === extraId);
    return sum + (extra?.price || 0);
  }, 0);

  const subtotal = roomTotal + extrasTotal;
  const serviceFee = 15;

  const coupon = appliedCoupon ? mockCoupons.find((c) => c.code === appliedCoupon) : null;
  const discount = coupon
    ? coupon.type === 'percentage'
      ? (subtotal * coupon.discount) / 100
      : coupon.discount
    : 0;

  const total = subtotal + serviceFee - discount;

  const toggleExtra = (extraId: string) => {
    setSelectedExtras((prev: string[]) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const applyCoupon = () => {
    const validCoupon = mockCoupons.find((c) => c.code === couponCode);
    if (validCoupon) {
      setAppliedCoupon(couponCode);
    } else {
      alert('Cupón no válido');
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Starting payment process...');

    const bookingData = {
      roomId: room.id,
      roomName: room.name,
      hotelName: room.hotel,
      checkIn,
      checkOut,
      guests,
      totalPrice: total,
      paymentMethod: 'Credit Card',
      guestName,
      guestEmail,
      couponCode: appliedCoupon || '',
      discount: discount || 0
    };

    console.log('Sending booking data:', bookingData);

    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const booking = await response.json();
        console.log('Booking created:', booking);
        navigate(`/confirmation/${booking.id}`);
      } else {
        const errorText = await response.text();
        console.error('Server error:', errorText);
        alert('Error al procesar la reserva: ' + errorText);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Error de conexión con el servidor');
    }
  };

  const extraIcons: Record<string, React.ReactNode> = {
    Coffee: <Coffee className="w-5 h-5" />,
    Plane: <Plane className="w-5 h-5" />,
    MapPin: <MapPin className="w-5 h-5" />,
    Clock: <Clock className="w-5 h-5" />,
    Sparkles: <Sparkles className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl text-gray-900 mb-8">Confirmar y pagar</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Details */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4">Detalles de la reserva</h2>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={checkIn}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Huéspedes</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Upselling - Extras */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4">Mejora tu experiencia</h2>
              <p className="text-gray-600 mb-6">Agrega servicios adicionales a tu reserva</p>

              <div className="space-y-4">
                {mockExtras.map((extra) => (
                  <div
                    key={extra.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-lg cursor-pointer transition-colors ${selectedExtras.includes(extra.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => toggleExtra(extra.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-blue-600">
                        {extraIcons[extra.icon]}
                      </div>
                      <div>
                        <h3 className="text-gray-900">{extra.name}</h3>
                        <p className="text-sm text-gray-600">S/ {extra.price} por estadía</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedExtras.includes(extra.id) ? (
                        <Minus className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupon */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4">¿Tienes un cupón?</h2>

              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Ingresa tu código"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  onClick={applyCoupon}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Aplicar
                </button>
              </div>

              {appliedCoupon && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800">
                    ✓ Cupón {appliedCoupon} aplicado - Descuento de{' '}
                    {coupon?.type === 'percentage' ? `${coupon.discount}%` : `S/ ${coupon?.discount}`}
                  </p>
                </div>
              )}

              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Cupones disponibles:</p>
                <div className="flex flex-wrap gap-2">
                  {mockCoupons.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setCouponCode(c.code);
                        setAppliedCoupon(c.code);
                      }}
                      className="px-3 py-1 text-sm bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100"
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Guest Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl text-gray-900 mb-4">Información del huésped</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Nombre completo</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Juan Pérez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Email</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="juan@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment */}
            <form onSubmit={handlePayment} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-gray-600" />
                <h2 className="text-xl text-gray-900">Información de pago</h2>
                <Lock className="w-4 h-4 text-green-600 ml-auto" />
                <span className="text-sm text-gray-600">Pago seguro con Culqi</span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Número de tarjeta</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4111 1111 1111 1111"
                    maxLength={19}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Fecha de vencimiento</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      maxLength={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirmar y pagar S/ {total.toFixed(2)}
              </button>

              <p className="mt-4 text-sm text-center text-gray-500">
                Al confirmar, aceptas los términos y condiciones
              </p>
            </form>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <img
                  src={getImageUrl(room.images[0])}
                  alt={room.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-gray-900">{room.name}</h3>
                  <p className="text-sm text-gray-600">{room.hotel}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">S/ {room.price} × {nights} noches</span>
                  <span className="text-gray-900">S/ {roomTotal}</span>
                </div>

                {selectedExtras.length > 0 && (
                  <>
                    {selectedExtras.map((extraId) => {
                      const extra = mockExtras.find((e) => e.id === extraId);
                      return extra ? (
                        <div key={extraId} className="flex justify-between">
                          <span className="text-gray-600">{extra.name}</span>
                          <span className="text-gray-900">S/ {extra.price}</span>
                        </div>
                      ) : null;
                    })}
                  </>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Tarifa de servicio</span>
                  <span className="text-gray-900">S/ {serviceFee}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento ({appliedCoupon})</span>
                    <span>- S/ {discount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-900">Total (PEN)</span>
                  <span className="text-2xl text-gray-900">S/ {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
