import { useState } from 'react';
import { Plus, Tag, Percent, DollarSign, Calendar, Users, Edit, Trash2 } from 'lucide-react';
import type { Coupon } from '../data/mockData';

interface CouponManagerProps {
  coupons: Coupon[];
}

export function CouponManager({ coupons: initialCoupons }: CouponManagerProps) {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: 0,
    type: 'percentage' as 'percentage' | 'fixed',
    validUntil: '',
    usageLimit: 100,
  });

  const handleCreateCoupon = () => {
    if (newCoupon.code && newCoupon.discount > 0 && newCoupon.validUntil) {
      setCoupons([
        ...coupons,
        {
          ...newCoupon,
          usedCount: 0,
        },
      ]);
      setNewCoupon({
        code: '',
        discount: 0,
        type: 'percentage',
        validUntil: '',
        usageLimit: 100,
      });
      setShowCreateForm(false);
    }
  };

  const handleDeleteCoupon = (code: string) => {
    setCoupons(coupons.filter((c) => c.code !== code));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-gray-900 mb-2">Gestión de Cupones</h2>
          <p className="text-gray-600">Crea y administra códigos promocionales</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Nuevo cupón</span>
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg text-gray-900 mb-4">Crear nuevo cupón</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Código del cupón</label>
              <input
                type="text"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                placeholder="VERANO2025"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Tipo de descuento</label>
              <select
                value={newCoupon.type}
                onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value as 'percentage' | 'fixed' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="percentage">Porcentaje</option>
                <option value="fixed">Monto fijo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                {newCoupon.type === 'percentage' ? 'Porcentaje de descuento' : 'Monto de descuento (S/)'}
              </label>
              <input
                type="number"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount: Number(e.target.value) })}
                placeholder={newCoupon.type === 'percentage' ? '20' : '50'}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Válido hasta</label>
              <input
                type="date"
                value={newCoupon.validUntil}
                onChange={(e) => setNewCoupon({ ...newCoupon, validUntil: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Límite de usos</label>
              <input
                type="number"
                value={newCoupon.usageLimit}
                onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: Number(e.target.value) })}
                placeholder="100"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleCreateCoupon}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Crear cupón
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Coupons List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div key={coupon.code} className="bg-white rounded-xl shadow-md p-6 border-2 border-dashed border-gray-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCoupon(coupon.code)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mb-4">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-lg mb-2">
                {coupon.code}
              </div>
              <div className="flex items-center gap-2 text-2xl text-gray-900">
                {coupon.type === 'percentage' ? (
                  <>
                    <Percent className="w-6 h-6 text-blue-600" />
                    <span>{coupon.discount}% OFF</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    <span>S/ {coupon.discount} OFF</span>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Válido hasta
                </span>
                <span className="text-gray-900">{new Date(coupon.validUntil).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Usos
                </span>
                <span className="text-gray-900">
                  {coupon.usedCount} / {coupon.usageLimit}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${(coupon.usedCount / coupon.usageLimit) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {coupons.length === 0 && !showCreateForm && (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl text-gray-900 mb-2">No hay cupones creados</h3>
          <p className="text-gray-600 mb-6">Crea tu primer cupón promocional para atraer más clientes</p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Crear primer cupón
          </button>
        </div>
      )}
    </div>
  );
}
