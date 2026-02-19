import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder();
  const [_, setLocation] = useLocation();

  const handleCheckout = () => {
    const orderData = {
      items: items.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price
      })),
      total: cartTotal
    };

    createOrder(orderData, {
      onSuccess: () => {
        clearCart();
        setLocation("/orders");
      }
    });
  };

  // 🇮🇳 Indian pricing (stored in paise)
  const deliveryFee = 4000; // ₹40 delivery
  const taxes = Math.round(cartTotal * 0.05); // 5% GST
  const grandTotal = cartTotal + deliveryFee + taxes;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
        <div className="mb-6 rounded-full bg-muted p-6">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="mb-2 font-display text-2xl font-bold">Your cart is empty</h2>
        <p className="mb-8 max-w-sm text-muted-foreground">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/">
          <Button size="lg" className="rounded-xl px-8">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container min-h-screen px-4 py-8 md:px-6">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-display text-3xl font-bold">Shopping Cart</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-card shadow-sm">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="flex gap-4 border-b p-4 last:border-0 sm:gap-6 sm:p-6"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-24">
                    <img
                      src={item.image || `https://placehold.co/200x200?text=${item.name}`}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {item.category}
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        ₹{((item.price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-lg border bg-background p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-md p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-4 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-md p-1 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-display text-xl font-bold">Order Summary</h2>

            <div className="space-y-3 border-b pb-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>₹{(cartTotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery Fee</span>
                <span>₹{(deliveryFee / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (5%)</span>
                <span>₹{(taxes / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between pb-6">
              <span className="text-lg font-bold">Total</span>
              <span className="text-lg font-bold text-primary">
                ₹{(grandTotal / 100).toFixed(2)}
              </span>
            </div>

            <Button
              className="w-full rounded-xl py-6 text-lg font-bold shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] hover:shadow-xl"
              onClick={handleCheckout}
              disabled={isPending}
            >
              {isPending ? "Placing Order..." : "Checkout Now"}
            </Button>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              Secure checkout powered by Swiftly 🇮🇳
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
