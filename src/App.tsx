import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { Header } from './components/Header';
import { useState } from 'react';

export type UserRole = 'guest' | 'owner' | 'admin';

function App() {
  const [userRole, setUserRole] = useState<UserRole>('guest');

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header userRole={userRole} setUserRole={setUserRole} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/room/:id" element={<RoomDetailPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/confirmation/:bookingId" element={<BookingConfirmationPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
