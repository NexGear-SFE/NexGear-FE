import { ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  brand: string;
  name: string;
  price: number;
  icon?: React.ReactNode;
  onAddToCart?: () => void;
};

export function ProductCard({ brand, name, price, icon, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-[8px] border border-[#E0E0E0] p-4 flex flex-col justify-between space-y-3 relative group transition-mechanical hover:border-[#E30019]">
      <div className="w-full aspect-square bg-[#F4F5F7] rounded-[4px] flex items-center justify-center">
        {icon}
      </div>

      <div className="space-y-1.5">
        <span className="text-[11px] text-gray-500 font-mono uppercase">{brand}</span>
        <h3 className="font-semibold text-sm text-[#040004] line-clamp-2 m-0">{name}</h3>
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-[#E30019]">
            {price.toLocaleString('vi-VN')} ₫
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddToCart}
        className="w-full bg-[#040004] hover:bg-[#E30019] text-white text-xs font-semibold py-2.5 rounded-[4px] transition-mechanical flex items-center justify-center gap-1.5 cursor-pointer"
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        <span>Thêm giỏ hàng</span>
      </button>
    </div>
  );
}
