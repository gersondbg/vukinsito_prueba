const { sequelize, User, Property, Room, Review, Booking, Extra, Coupon } = require('./models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true }); // WARNING: This clears the DB
        console.log('Database synced (cleared previous data)');

        // --- Users ---
        const users = await User.bulkCreate([
            { id: '1', name: 'Juan Pérez', email: 'juan@example.com', type: 'owner', status: 'active', joined: '2024-03-15' },
            { id: '2', name: 'María González', email: 'maria@example.com', type: 'owner', status: 'active', joined: '2024-05-20' },
            { id: '3', name: 'Carlos López', email: 'carlos@example.com', type: 'guest', status: 'active', joined: '2024-08-10' },
            { id: '4', name: 'Ana Rodríguez', email: 'ana@example.com', type: 'owner', status: 'pending', joined: '2024-11-28' },
            { id: '5', name: 'Pedro Sánchez', email: 'pedro@example.com', type: 'owner', status: 'active', joined: '2024-06-15' }, // Added from mockProperties
            { id: 'u_guest1', name: 'Carlos Mendoza', email: 'cmendoza@example.com', type: 'guest', status: 'active' },
            { id: 'u_guest2', name: 'Laura Vega', email: 'lvega@example.com', type: 'guest', status: 'active' }
        ]);
        console.log('Users seeded');

        // --- Properties ---
        const properties = await Property.bulkCreate([
            { id: '1', name: 'Hotel Miraflores', ownerId: '1', ownerName: 'Juan Pérez', location: 'Miraflores, Lima', status: 'active', revenue: 45800 },
            { id: '2', name: 'Hostal El Patio', ownerId: '2', ownerName: 'María González', location: 'Barranco, Lima', status: 'active', revenue: 28900 },
            { id: '3', name: 'Hotel Costa Verde', ownerId: 'u_guest1', ownerName: 'Carlos Mendoza', location: 'Cusco Centro', status: 'pending', revenue: 0 }, // Using Carlos Mendoza as owner here to match admin page logic roughly
            { id: '4', name: 'Business Inn', ownerId: '4', ownerName: 'Ana Rodríguez', location: 'San Isidro, Lima', status: 'active', revenue: 62300 },
            { id: '5', name: 'Resort Máncora', ownerId: '5', ownerName: 'Pedro Sánchez', location: 'Máncora, Piura', status: 'active', revenue: 89400 },
            { id: '6', name: 'Urban Lofts', ownerId: '1', ownerName: 'Juan Pérez', location: 'Barranco, Lima', status: 'active', revenue: 12000 }
        ]);
        console.log('Properties seeded');

        // --- Rooms ---
        const rooms = await Room.bulkCreate([
            {
                id: '1', propertyId: '1', hotel: 'Hotel Miraflores', name: 'Suite Ejecutiva', location: 'Miraflores, Lima', price: 250,
                images: ['luxury hotel room', 'modern bedroom', 'hotel suite'],
                description: 'Amplia suite con vista al mar, perfecta para viajes de negocios o placer. Incluye área de trabajo, minibar y baño privado con jacuzzi.',
                amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Minibar', 'Jacuzzi', 'Vista al mar'],
                capacity: 2, available: true, rating: 4.8, rules: ['Check-in: 14:00', 'Check-out: 12:00', 'No se permiten mascotas', 'No fumar']
            },
            {
                id: '2', propertyId: '2', hotel: 'Hostal El Patio', name: 'Habitación Doble Standard', location: 'Barranco, Lima', price: 120,
                images: ['cozy hostel room', 'budget hotel', 'comfortable bedroom'],
                description: 'Habitación acogedora con dos camas individuales, ideal para viajeros que buscan comodidad a buen precio.',
                amenities: ['WiFi', 'TV', 'Ventilador', 'Baño compartido'],
                capacity: 2, available: true, rating: 4.2, rules: ['Check-in: 15:00', 'Check-out: 11:00', 'Mascotas previa consulta']
            },
            {
                id: '3', propertyId: '3', hotel: 'Hotel Costa Verde', name: 'Suite Familiar', location: 'Cusco Centro', price: 350,
                images: ['family hotel suite', 'spacious room', 'hotel bedroom'],
                description: 'Suite espaciosa con dos habitaciones separadas, perfecta para familias. Incluye sala de estar y cocina pequeña.',
                amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Cocina', 'Sala de estar', 'Balcón'],
                capacity: 4, available: true, rating: 4.9, rules: ['Check-in: 14:00', 'Check-out: 12:00', 'Niños bienvenidos']
            },
            {
                id: '4', propertyId: '4', hotel: 'Business Inn', name: 'Habitación Individual', location: 'San Isidro, Lima', price: 180,
                images: ['business hotel room', 'single bedroom', 'modern hotel'],
                description: 'Habitación individual moderna diseñada para el viajero de negocios. Escritorio amplio y acceso rápido al distrito financiero.',
                amenities: ['WiFi', 'TV', 'Escritorio', 'Aire acondicionado', 'Caja fuerte'],
                capacity: 1, available: true, rating: 4.5, rules: ['Check-in: 13:00', 'Check-out: 12:00', 'No fumar']
            },
            {
                id: '5', propertyId: '5', hotel: 'Resort Máncora', name: 'Bungalow Playa', location: 'Máncora, Piura', price: 420,
                images: ['beach bungalow', 'tropical resort', 'ocean view room'],
                description: 'Bungalow frente al mar con acceso directo a la playa. Terraza privada con hamaca y vista panorámica al océano.',
                amenities: ['WiFi', 'TV', 'Aire acondicionado', 'Terraza privada', 'Acceso a playa', 'Minibar'],
                capacity: 2, available: true, rating: 4.9, rules: ['Check-in: 15:00', 'Check-out: 11:00', 'No fumar en interiores']
            },
            {
                id: '6', propertyId: '6', hotel: 'Urban Lofts', name: 'Loft Moderno', location: 'Barranco, Lima', price: 280,
                images: ['modern loft', 'urban apartment', 'contemporary room'],
                description: 'Loft de diseño contemporáneo en el corazón del distrito bohemio de Lima. Techos altos y decoración artística.',
                amenities: ['WiFi', 'TV', 'Cocina completa', 'Aire acondicionado', 'Terraza'],
                capacity: 2, available: true, rating: 4.7, rules: ['Check-in: 16:00', 'Check-out: 11:00', 'No fiestas']
            }
        ]);
        console.log('Rooms seeded');

        // --- Reviews ---
        const reviews = await Review.bulkCreate([
            { id: 'r1', roomId: '1', userId: 'u_guest1', userName: 'Carlos Mendoza', rating: 5, comment: 'Excelente ubicación y servicio impecable. La vista es espectacular.', date: '2025-11-20', verified: true },
            { id: 'r2', roomId: '1', userId: '2', userName: 'María González', rating: 4, comment: 'Muy buena relación calidad-precio. Habitación limpia y cómoda.', date: '2025-11-15', verified: true },
            { id: 'r3', roomId: '2', userId: '1', userName: 'Juan Pérez', rating: 4, comment: 'Buen lugar, muy céntrico y limpio.', date: '2025-11-18', verified: true },
            { id: 'r4', roomId: '3', userId: '4', userName: 'Ana Rodríguez', rating: 5, comment: 'Perfecto para nuestra familia. Muy espacioso y bien equipado.', date: '2025-11-22', verified: true },
            { id: 'r5', roomId: '3', userId: '5', userName: 'Pedro Sánchez', rating: 5, comment: 'Increíble experiencia, el personal muy atento.', date: '2025-11-10', verified: true },
            { id: 'r6', roomId: '4', userId: 'u_guest1', userName: 'Roberto Lima', rating: 4, comment: 'Ideal para trabajo, muy tranquilo y bien ubicado.', date: '2025-11-25', verified: true },
            { id: 'r7', roomId: '5', userId: 'u_guest2', userName: 'Laura Vega', rating: 5, comment: 'Paradisíaco! La mejor experiencia de vacaciones.', date: '2025-11-28', verified: true },
            { id: 'r8', roomId: '6', userId: 'u_guest1', userName: 'Diego Castro', rating: 5, comment: 'Diseño increíble, muy instagrameable. Zona excelente.', date: '2025-11-12', verified: true }
        ]);
        console.log('Reviews seeded');

        // --- Extras ---
        const extras = await Extra.bulkCreate([
            { id: 'e1', name: 'Desayuno incluido', price: 25, icon: 'Coffee' },
            { id: 'e2', name: 'Traslado aeropuerto', price: 45, icon: 'Plane' },
            { id: 'e3', name: 'Tour city', price: 80, icon: 'MapPin' },
            { id: 'e4', name: 'Late checkout', price: 30, icon: 'Clock' },
            { id: 'e5', name: 'Spa & masajes', price: 120, icon: 'Sparkles' }
        ]);
        console.log('Extras seeded');

        // --- Coupons ---
        const coupons = await Coupon.bulkCreate([
            { code: 'VERANO2025', discount: 20, type: 'percentage', validUntil: '2025-03-31', usageLimit: 100, usedCount: 45 },
            { code: 'PRIMERAVEZ', discount: 50, type: 'fixed', validUntil: '2025-12-31', usageLimit: 500, usedCount: 234 },
            { code: 'FINDESEMANA', discount: 15, type: 'percentage', validUntil: '2025-06-30', usageLimit: 200, usedCount: 89 },
        ]);
        console.log('Coupons seeded');

        // --- Bookings ---
        const bookings = await Booking.bulkCreate([
            {
                id: 'b1', roomId: '1', userId: 'u_guest1', roomName: 'Suite Ejecutiva', hotelName: 'Hotel Miraflores',
                checkIn: '2025-12-10', checkOut: '2025-12-12', guests: 2, totalPrice: 525, status: 'confirmed',
                paymentMethod: 'Tarjeta Visa', guestName: 'Carlos Mendoza', guestEmail: 'carlos@example.com',
                extras: [{ id: 'e1', name: 'Desayuno incluido', price: 25 }], couponCode: 'VERANO2025', discount: 25
            },
            {
                id: 'b2', roomId: '3', userId: '4', roomName: 'Suite Familiar', hotelName: 'Hotel Costa Verde',
                checkIn: '2025-12-15', checkOut: '2025-12-18', guests: 4, totalPrice: 1050, status: 'confirmed',
                paymentMethod: 'Tarjeta Mastercard', guestName: 'Ana Rodríguez', guestEmail: 'ana@example.com',
                extras: [{ id: 'e1', name: 'Desayuno incluido', price: 25 }, { id: 'e3', name: 'Tour city', price: 80 }]
            },
            {
                id: 'b3', roomId: '5', userId: 'u_guest2', roomName: 'Bungalow Playa', hotelName: 'Resort Máncora',
                checkIn: '2025-12-20', checkOut: '2025-12-25', guests: 2, totalPrice: 2100, status: 'pending',
                paymentMethod: 'Tarjeta Visa', guestName: 'Laura Vega', guestEmail: 'laura@example.com',
                extras: [{ id: 'e1', name: 'Desayuno incluido', price: 25 }, { id: 'e5', name: 'Spa & masajes', price: 120 }]
            }
        ]);
        console.log('Bookings seeded');

        console.log('All data seeded successfully!');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        // Do not close connection if we want to keep server running, but this is a script.
        // await sequelize.close(); 
    }
};

seedData();
