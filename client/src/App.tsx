import Login from "./pages/Login";
import OTP from "@/pages/OTP";
import { Switch, Route, Redirect } from "wouter";
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

/**
 * 🔐 Simple auth check
 * (later you can replace with real JWT/session check)
 */
const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("user"); // or "token"
};

function Router() {
  const loggedIn = isAuthenticated();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <Switch>
          {/* ✅ Public Routes */}
          <Route path="/login" component={Login} />
          <Route path="/otp" component={OTP} />

          {/* 🔒 Protected Routes */}
          <Route path="/service/:serviceType">
            {loggedIn ? <ServicePage /> : <Redirect to="/login" />}
          </Route>

          <Route path="/cart">
            {loggedIn ? <Cart /> : <Redirect to="/login" />}
          </Route>

          <Route path="/orders">
            {loggedIn ? <Orders /> : <Redirect to="/login" />}
          </Route>

          {/* 🔥 Home Guard */}
          <Route path="/">
            {loggedIn ? <Home /> : <Redirect to="/login" />}
          </Route>

          {/* ❌ Fallback */}
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
