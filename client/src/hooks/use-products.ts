import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number; // stored in paise
  image: string;
  category?: string;
};

const dummyProducts: Record<string, Product[]> = {
  // 🍽️ FOOD — expanded with categories
  food: [
    // 🍳 BREAKFAST
    {
      id: 1,
      name: "Masala Dosa",
      price: 9900,
      category: "breakfast",
      image:
        "https://images.unsplash.com/photo-1589301760014-d929f3979dbc",
    },
    {
      id: 2,
      name: "Idli Sambar",
      price: 7900,
      category: "breakfast",
      image:
        "https://images.unsplash.com/photo-1626200419199-391ae4be7a41",
    },
    {
      id: 3,
      name: "Poori Bhaji",
      price: 8900,
      category: "breakfast",
      image:
        "https://images.unsplash.com/photo-1625944525903-2d9e5b9d5fbd",
    },

    // 🍛 LUNCH
    {
      id: 4,
      name: "Chicken Biryani",
      price: 24900,
      category: "lunch",
      image:
        "https://images.unsplash.com/photo-1563379091339-03246963d3b9",
    },
    {
      id: 5,
      name: "Paneer Butter Masala",
      price: 22900,
      category: "lunch",
      image:
        "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
    },
    {
      id: 6,
      name: "Veg Meals",
      price: 19900,
      category: "lunch",
      image:
        "https://images.unsplash.com/photo-1604908176997-431221c2e0c3",
    },

    // 🍟 SNACKS
    {
      id: 7,
      name: "Samosa (2 pcs)",
      price: 4000,
      category: "snacks",
      image:
        "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    },
    {
      id: 8,
      name: "French Fries",
      price: 9900,
      category: "snacks",
      image:
        "https://images.unsplash.com/photo-1576107232684-1279f390859f",
    },
    {
      id: 9,
      name: "Veg Puff",
      price: 3500,
      category: "snacks",
      image:
        "https://images.unsplash.com/photo-1604909052743-94e838986d24",
    },

    // 🌙 DINNER
    {
      id: 10,
      name: "Butter Chicken",
      price: 27900,
      category: "dinner",
      image:
        "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    },
    {
      id: 11,
      name: "Veg Fried Rice",
      price: 15900,
      category: "dinner",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    },
  ],

  // 🛒 GROCERY — improved images
  grocery: [
    {
      id: 101,
      name: "Amul Milk 1L",
      price: 6500,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    },
    {
      id: 102,
      name: "Aashirvaad Atta 5kg",
      price: 32000,
      image:
        "https://images.unsplash.com/photo-1604908177522-4023c0f5d0c4",
    },
    {
      id: 103,
      name: "India Gate Basmati Rice 1kg",
      price: 14000,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c",
    },
  ],

  // 💊 MEDICINE — fixed
  medicine: [
    {
      id: 201,
      name: "Paracetamol Tablets",
      price: 4500,
      image:
        "https://images.unsplash.com/photo-1584362917165-526a968579e8",
    },
    {
      id: 202,
      name: "Cough Syrup",
      price: 8500,
      image:
        "https://images.unsplash.com/photo-1587854692152-cbe660dbde88",
    },
  ],

  // 📦 PARCEL
  parcel: [
    {
      id: 301,
      name: "Small Package Delivery",
      price: 5000,
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    },
    {
      id: 302,
      name: "Express Parcel Service",
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1553413077-190dd305871c",
    },
  ],
};

export function useProducts(serviceType: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    // simulate API delay
    const timer = setTimeout(() => {
      setProducts(dummyProducts[serviceType] || []);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [serviceType]);

  return { data: products, isLoading };
}
