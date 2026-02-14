import { ServiceCard } from "@/components/ServiceCard";
import { Utensils, ShoppingBasket, Pill, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="container px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Everything you need, <br className="hidden sm:inline" />
              <span className="text-primary">Delivered Instantly</span>
            </h1>
            <p className="mx-auto mb-8 max-w-[600px] text-lg text-muted-foreground md:text-xl">
              From fresh food to pharmacy essentials, get everything delivered to your doorstep in minutes.
            </p>
          </motion.div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 left-1/4 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </section>

      {/* Services Grid */}
      <section className="container px-4 pb-20 md:px-6">
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={item}>
            <ServiceCard
              title="Food Delivery"
              description="Hungry? Order from top restaurants near you."
              icon={Utensils}
              href="/service/food"
              color="red"
            />
          </motion.div>
          <motion.div variants={item}>
            <ServiceCard
              title="Grocery"
              description="Fresh fruits, vegetables & daily essentials."
              icon={ShoppingBasket}
              href="/service/grocery"
              color="green"
            />
          </motion.div>
          <motion.div variants={item}>
            <ServiceCard
              title="Medicine"
              description="Pharmacy needs delivered with care."
              icon={Pill}
              href="/service/medicine"
              color="blue"
            />
          </motion.div>
          <motion.div variants={item}>
            <ServiceCard
              title="Parcel"
              description="Send packages anywhere in the city."
              icon={Package}
              href="/service/parcel"
              color="orange"
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
