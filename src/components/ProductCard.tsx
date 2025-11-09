import { Product } from '../types/product';
import { formatPrice, hasDiscount } from '../utils/formatters';
import { Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const showDiscount = hasDiscount(product.price, product.msrp);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group card-hover bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-rose-50">
        <img
          src={product.thumbnailImageUrl}
          alt={product.name}
          className="w-full h-full object-contain mx-auto my-auto max-h-full max-w-full block transition-transform duration-500 bg-white"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300"%3E%3Crect fill="%23f3e8ff" width="300" height="300"/%3E%3Ctext x="50%25" y="50%25" font-family="system-ui" font-size="14" fill="%23d8b4fe" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
          }}
        />

        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10 active:scale-90"
          aria-label="Add to wishlist"
        >
          <Heart
            size={20}
            className={`transition-all ${
              isLiked
                ? 'fill-rose-500 text-rose-500'
                : 'text-gray-400 hover:text-rose-400'
            }`}
          />
        </button>

        {showDiscount && product.msrp && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            Save {Math.round(((product.msrp - product.price) / product.msrp) * 100)}%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[2.5rem] group-hover:text-pink-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            {formatPrice(product.price)}
          </span>
          {showDiscount && product.msrp && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.msrp)}
            </span>
          )}
        </div>

        <button className="w-full btn-primary py-2.5 text-sm">
          Shop Now
        </button>
      </div>
    </div>
  );
};
