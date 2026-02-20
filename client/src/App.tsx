import Login from "./pages/Login";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";
import { Navbar } from "@/components/Navbar";

// Pages
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Switch>
          {/* ✅ LOGIN ROUTE ADDED */}
          <Route path="/login" component={Login} />

          {/* existing routes */}
          <Route path="/" component={Home} />
          <Route path="/service/:serviceType" component={ServicePage} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />

          {/* fallback */}
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
