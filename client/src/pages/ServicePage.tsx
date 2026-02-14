import { useRoute } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const serviceConfig: Record<string, { title: string; color: string; bg: string }> = {
  food: { title: "Food Delivery", color: "text-red-600", bg: "bg-red-50/50" },
  grocery: { title: "Grocery Store", color: "text-green-600", bg: "bg-green-50/50" },
  medicine: { title: "Pharmacy", color: "text-blue-600", bg: "bg-blue-50/50" },
  parcel: { title: "Parcel Service", color: "text-orange-600", bg: "bg-orange-50/50" },
};

export default function ServicePage() {
  const [match, params] = useRoute("/service/:serviceType");
  const serviceType = params?.serviceType || "food";
  const { data: products, isLoading } = useProducts(serviceType);
  const { itemCount, cartTotal } = useCart();
  
  const config = serviceConfig[serviceType] || serviceConfig.food;

  if (!match) return null;

  return (
    <div className={cn("min-h-screen pb-24", config.bg)}>
      <div className="container px-4 pt-8 md:px-6">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-background/80">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className={cn("font-display text-3xl font-bold", config.color)}>
                {config.title}
              </h1>
              <p className="text-muted-foreground">
                {products ? `${products.length} items available` : "Loading..."}
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="aspect-[4/3] rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="mt-auto h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : products?.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-background/50 text-center">
            <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground/30" />
            <h3 className="text-lg font-semibold text-muted-foreground">No products found</h3>
            <p className="text-sm text-muted-foreground/80">Try a different category.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Bar (Mobile/Desktop) */}
      {itemCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:bottom-8 md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2 md:rounded-2xl md:border md:shadow-2xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total</span>
              <span className="font-display text-xl font-bold text-foreground">
                ${(cartTotal / 100).toFixed(2)}
              </span>
            </div>
            <Link href="/cart">
              <Button size="lg" className="rounded-xl px-8 font-bold shadow-lg shadow-primary/25">
                View Cart ({itemCount})
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
