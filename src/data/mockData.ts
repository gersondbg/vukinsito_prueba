export interface Room {
  id: string;
  name: string;
  hotel: string;
  location: string;
  price: number;
  images: string[];
  description: string;
  amenities: string[];
  capacity: number;
  available: boolean;
  rating: number;
  reviews: Review[];
  rules: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentMethod: string;
  guestName: string;
  guestEmail: string;
  extras: Extra[];
  couponCode?: string;
  discount?: number;
}

export interface Extra {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  usageLimit: number;
  usedCount: number;
}

export const mockExtras: Extra[] = [
  { id: 'e1', name: 'Desayuno incluido', price: 25, icon: 'Coffee' },
  { id: 'e2', name: 'Traslado aeropuerto', price: 45, icon: 'Plane' },
  { id: 'e3', name: 'Tour city', price: 80, icon: 'MapPin' },
  { id: 'e4', name: 'Late checkout', price: 30, icon: 'Clock' },
  { id: 'e5', name: 'Spa & masajes', price: 120, icon: 'Sparkles' },
];

export const mockCoupons: Coupon[] = [
  { code: 'VERANO2025', discount: 20, type: 'percentage', validUntil: '2025-03-31', usageLimit: 100, usedCount: 45 },
  { code: 'PRIMERAVEZ', discount: 50, type: 'fixed', validUntil: '2025-12-31', usageLimit: 500, usedCount: 234 },
  { code: 'FINDESEMANA', discount: 15, type: 'percentage', validUntil: '2025-06-30', usageLimit: 200, usedCount: 89 },
];

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Suite Ejecutiva',
    hotel: 'Hotel Miraflores',
    location: 'Miraflores, Lima',
    price: 250,
    images: ['luxury hotel room', 'modern bedroom', 'hotel suite'],
    description: 'Amplia suite con vista al mar, perfecta para viajes de negocios o placer. Incluye área de trabajo, minibar y baño privado con jacuzzi.',
    amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Minibar', 'Jacuzzi', 'Vista al mar'],
    capacity: 2,
    available: true,
    rating: 4.8,
    rules: ['Check-in: 14:00', 'Check-out: 12:00', 'No se permiten mascotas', 'No fumar'],
    reviews: [
      {
        id: 'r1',
        userName: 'Carlos Mendoza',
        rating: 5,
        comment: 'Excelente ubicación y servicio impecable. La vista es espectacular.',
        date: '2025-11-20',
        verified: true
      },
      {
        id: 'r2',
        userName: 'María González',
        rating: 4,
        comment: 'Muy buena relación calidad-precio. Habitación limpia y cómoda.',
        date: '2025-11-15',
        verified: true
      }
    ]
  },
  {
    id: '2',
    name: 'Habitación Doble Standard',
    hotel: 'Hostal El Patio',
    location: 'Barranco, Lima',
    price: 120,
    images: ['cozy hostel room', 'budget hotel', 'comfortable bedroom'],
    description: 'Habitación acogedora con dos camas individuales, ideal para viajeros que buscan comodidad a buen precio.',
    amenities: ['WiFi', 'TV', 'Ventilador', 'Baño compartido'],
    capacity: 2,
    available: true,
    rating: 4.2,
    rules: ['Check-in: 15:00', 'Check-out: 11:00', 'Mascotas previa consulta'],
    reviews: [
      {
        id: 'r3',
        userName: 'Juan Pérez',
        rating: 4,
        comment: 'Buen lugar, muy céntrico y limpio.',
        date: '2025-11-18',
        verified: true
      }
    ]
  },
  {
    id: '3',
    name: 'Suite Familiar',
    hotel: 'Hotel Costa Verde',
    location: 'Cusco Centro',
    price: 350,
    images: ['family hotel suite', 'spacious room', 'hotel bedroom'],
    description: 'Suite espaciosa con dos habitaciones separadas, perfecta para familias. Incluye sala de estar y cocina pequeña.',
    amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Cocina', 'Sala de estar', 'Balcón'],
    capacity: 4,
    available: true,
    rating: 4.9,
    rules: ['Check-in: 14:00', 'Check-out: 12:00', 'Niños bienvenidos'],
    reviews: [
      {
        id: 'r4',
        userName: 'Ana Rodríguez',
        rating: 5,
        comment: 'Perfecto para nuestra familia. Muy espacioso y bien equipado.',
        date: '2025-11-22',
        verified: true
      },
      {
        id: 'r5',
        userName: 'Pedro Sánchez',
        rating: 5,
        comment: 'Increíble experiencia, el personal muy atento.',
        date: '2025-11-10',
        verified: true
      }
    ]
  },
  {
    id: '4',
    name: 'Habitación Individual',
    hotel: 'Business Inn',
    location: 'San Isidro, Lima',
    price: 180,
    images: ['business hotel room', 'single bedroom', 'modern hotel'],
    description: 'Habitación individual moderna diseñada para el viajero de negocios. Escritorio amplio y acceso rápido al distrito financiero.',
    amenities: ['WiFi', 'TV', 'Escritorio', 'Aire acondicionado', 'Caja fuerte'],
    capacity: 1,
    available: true,
    rating: 4.5,
    rules: ['Check-in: 13:00', 'Check-out: 12:00', 'No fumar'],
    reviews: [
      {
        id: 'r6',
        userName: 'Roberto Lima',
        rating: 4,
        comment: 'Ideal para trabajo, muy tranquilo y bien ubicado.',
        date: '2025-11-25',
        verified: true
      }
    ]
  },
  {
    id: '5',
    name: 'Bungalow Playa',
    hotel: 'Resort Máncora',
    location: 'Máncora, Piura',
    price: 420,
    images: ['beach bungalow', 'tropical resort', 'ocean view room'],
    description: 'Bungalow frente al mar con acceso directo a la playa. Terraza privada con hamaca y vista panorámica al océano.',
    amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Terraza privada', 'Acceso a playa', 'Minibar'],
    capacity: 2,
    available: true,
    rating: 4.9,
    rules: ['Check-in: 15:00', 'Check-out: 11:00', 'No fumar en interiores'],
    reviews: [
      {
        id: 'r7',
        userName: 'Laura Vega',
        rating: 5,
        comment: 'Paradisíaco! La mejor experiencia de vacaciones.',
        date: '2025-11-28',
        verified: true
      }
    ]
  },
  {
    id: '6',
    name: 'Loft Moderno',
    hotel: 'Urban Lofts',
    location: 'Barranco, Lima',
    price: 280,
    images: ['modern loft', 'urban apartment', 'contemporary room'],
    description: 'Loft de diseño contemporáneo en el corazón del distrito bohemio de Lima. Techos altos y decoración artística.',
    amenities: ['WiFi', 'TV', 'Cocina completa', 'Aire acondicionado', 'Terraza'],
    capacity: 2,
    available: true,
    rating: 4.7,
    rules: ['Check-in: 16:00', 'Check-out: 11:00', 'No fiestas'],
    reviews: [
      {
        id: 'r8',
        userName: 'Diego Castro',
        rating: 5,
        comment: 'Diseño increíble, muy instagrameable. Zona excelente.',
        date: '2025-11-12',
        verified: true
      }
    ]
  }
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    roomId: '1',
    roomName: 'Suite Ejecutiva',
    hotelName: 'Hotel Miraflores',
    checkIn: '2025-12-10',
    checkOut: '2025-12-12',
    guests: 2,
    totalPrice: 525,
    status: 'confirmed',
    paymentMethod: 'Tarjeta Visa',
    guestName: 'Carlos Mendoza',
    guestEmail: 'carlos@example.com',
    extras: [mockExtras[0]],
    couponCode: 'VERANO2025',
    discount: 25
  },
  {
    id: 'b2',
    roomId: '3',
    roomName: 'Suite Familiar',
    hotelName: 'Hotel Costa Verde',
    checkIn: '2025-12-15',
    checkOut: '2025-12-18',
    guests: 4,
    totalPrice: 1050,
    status: 'confirmed',
    paymentMethod: 'Tarjeta Mastercard',
    guestName: 'Ana Rodríguez',
    guestEmail: 'ana@example.com',
    extras: [mockExtras[0], mockExtras[2]],
  },
  {
    id: 'b3',
    roomId: '5',
    roomName: 'Bungalow Playa',
    hotelName: 'Resort Máncora',
    checkIn: '2025-12-20',
    checkOut: '2025-12-25',
    guests: 2,
    totalPrice: 2100,
    status: 'pending',
    paymentMethod: 'Tarjeta Visa',
    guestName: 'Laura Vega',
    guestEmail: 'laura@example.com',
    extras: [mockExtras[0], mockExtras[4]],
  }
];

export const mockStats = {
  totalBookings: 156,
  totalRevenue: 89450,
  occupancyRate: 78,
  averageRating: 4.6,
  monthlyData: [
    { month: 'Ene', revenue: 12500, bookings: 25 },
    { month: 'Feb', revenue: 11200, bookings: 22 },
    { month: 'Mar', revenue: 15800, bookings: 31 },
    { month: 'Abr', revenue: 13400, bookings: 28 },
    { month: 'May', revenue: 16200, bookings: 34 },
    { month: 'Jun', revenue: 14800, bookings: 29 },
    { month: 'Jul', revenue: 18900, bookings: 38 },
    { month: 'Ago', revenue: 17600, bookings: 35 },
    { month: 'Sep', revenue: 14200, bookings: 27 },
    { month: 'Oct', revenue: 16500, bookings: 32 },
    { month: 'Nov', revenue: 19200, bookings: 41 },
    { month: 'Dic', revenue: 21150, bookings: 45 },
  ]
};
