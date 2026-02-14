import { Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const handleIncrement = () => {
    addToCart(product);
  };

  const handleDecrement = () => {
    if (quantity === 1) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image || `https://placehold.co/400x300?text=${product.name}`}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-bold leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-lg font-bold text-primary">
            ${(product.price / 100).toFixed(2)}
          </span>

          {quantity > 0 ? (
            <div className="flex items-center gap-3 rounded-lg bg-secondary px-2 py-1">
              <button
                onClick={handleDecrement}
                className="rounded-md p-1 hover:bg-background hover:text-destructive transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-[1.5rem] text-center font-bold text-sm">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="rounded-md p-1 hover:bg-background hover:text-primary transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <Button size="sm" onClick={handleIncrement} className="rounded-xl px-6 font-semibold">
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
