import { useEffect, useState } from "react";

const dummyProducts: Record<string, any[]> = {
  food: [
    {
      id: 1,
      name: "Chicken Biryani",
      price: 24900, // ₹249.00 (stored in paise)
      image: "https://images.unsplash.com/photo-1604908176997-431e3b43b1f3",
    },
    {
      id: 2,
      name: "Masala Dosa",
      price: 9900,
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
    },
    {
      id: 3,
      name: "Paneer Butter Masala",
      price: 22900,
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    },
    {
      id: 4,
      name: "Veg Fried Rice",
      price: 15900,
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    },
  ],

  grocery: [
    {
      id: 5,
      name: "Amul Milk 1L",
      price: 6500,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
    {
      id: 6,
      name: "Aashirvaad Atta 5kg",
      price: 32000,
      image: "https://images.unsplash.com/photo-1604909053194-8f6b7e7a8f1b",
    },
    {
      id: 7,
      name: "India Gate Basmati Rice 1kg",
      price: 14000,
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    },
  ],

  medicine: [
    {
      id: 8,
      name: "Paracetamol Tablets",
      price: 4500,
      image: "https://images.unsplash.com/photo-1584362917165-526a968579e8",
    },
    {
      id: 9,
      name: "Cough Syrup",
      price: 8500,
      image: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0",
    },
  ],

  parcel: [
    {
      id: 10,
      name: "Small Package Delivery",
      price: 5000,
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    },
    {
      id: 11,
      name: "Express Parcel Service",
      price: 12000,
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c",
    },
  ],
};

export function useProducts(serviceType: string) {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // simulate API delay
    setTimeout(() => {
      setProducts(dummyProducts[serviceType] || []);
      setIsLoading(false); // ✅ VERY IMPORTANT
    }, 500);
  }, [serviceType]);

  return { data: products, isLoading };
}
