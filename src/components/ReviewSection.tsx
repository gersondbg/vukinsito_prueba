import { Star, CheckCircle } from 'lucide-react';
import type { Review } from '../data/mockData';

interface ReviewSectionProps {
  reviews: Review[];
  averageRating: number;
}

export function ReviewSection({ reviews, averageRating }: ReviewSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl text-gray-900">Reseñas de huéspedes</h2>
        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="text-gray-900">{averageRating}</span>
          <span className="text-gray-600 text-sm">({reviews.length} reseñas)</span>
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-gray-900">{review.userName}</span>
                  {review.verified && (
                    <div className="flex items-center gap-1 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verificado</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString('es-ES')}</p>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          <CheckCircle className="w-4 h-4 inline mr-1 text-green-600" />
          Solo los huéspedes con reserva confirmada pueden dejar reseñas
        </p>
      </div>
    </div>
  );
}
