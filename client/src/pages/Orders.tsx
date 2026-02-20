import { useOrders } from "@/hooks/use-orders";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, CheckCircle2, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// ✅ INR formatter (professional)
const formatINR = (paise: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(paise / 100);
};

export default function Orders() {
  const { data: orders, isLoading } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "confirmed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return CheckCircle2;
      case "confirmed":
        return Package;
      default:
        return Clock;
    }
  };

  return (
    <div className="container min-h-screen px-4 py-8 md:px-6">
      <div className="mb-8 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="font-display text-3xl font-bold">My Orders</h1>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-muted/50" />
          ))}
        </div>
      ) : orders?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-4 rounded-full bg-muted p-6">
            <Package className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No orders yet</h3>
          <p className="mb-6 text-muted-foreground">
            Start shopping to see your orders here.
          </p>
          <Link href="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders?.map((order) => {
            const StatusIcon = getStatusIcon(order.status);

            const itemCount = Array.isArray(order.items)
              ? order.items.reduce(
                  (acc: number, item: any) => acc + item.quantity,
                  0
                )
              : 0;

            return (
              <div
                key={order.id}
                className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-medium text-muted-foreground">
                        #{order.id.toString().padStart(6, "0")}
                      </span>
                      <div
                        className={cn(
                          "flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
                          getStatusColor(order.status)
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {order.status}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.createdAt
                        ? format(new Date(order.createdAt), "PPP 'at' p")
                        : "Just now"}
                    </p>
                  </div>

                  <div className="flex items-end justify-between gap-8 md:flex-col md:items-end md:gap-1">
                    <div className="text-right">
                      <p className="text-sm font-medium text-muted-foreground">
                        {itemCount} items
                      </p>
                      <p className="font-display text-xl font-bold text-foreground">
                        {formatINR(order.total)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-primary/10" />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
