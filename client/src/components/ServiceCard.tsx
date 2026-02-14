import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: "red" | "green" | "blue" | "orange";
}

export function ServiceCard({ title, description, icon: Icon, href, color }: ServiceCardProps) {
  const colorMap = {
    red: "bg-red-50 hover:bg-red-100 text-red-600 border-red-100",
    green: "bg-green-50 hover:bg-green-100 text-green-600 border-green-100",
    blue: "bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-100",
    orange: "bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-100",
  };

  const iconColorMap = {
    red: "bg-red-100 text-red-600 group-hover:bg-red-200",
    green: "bg-green-100 text-green-600 group-hover:bg-green-200",
    blue: "bg-blue-100 text-blue-600 group-hover:bg-blue-200",
    orange: "bg-orange-100 text-orange-600 group-hover:bg-orange-200",
  };

  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "relative h-full overflow-hidden rounded-3xl border p-8 transition-colors",
          colorMap[color]
        )}
      >
        <div className={cn(
          "mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-colors",
          iconColorMap[color]
        )}>
          <Icon className="h-7 w-7" />
        </div>
        
        <h3 className="mb-2 font-display text-2xl font-bold text-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground/80 leading-relaxed">
          {description}
        </p>

        <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-current opacity-[0.03] transition-transform group-hover:scale-150" />
      </motion.div>
    </Link>
  );
}
