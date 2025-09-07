"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  onAddToCart: (id: number) => void;
}

const ProductCard = ({ 
  id, 
  name, 
  description, 
  price, 
  image, 
  rating,
  onAddToCart
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="bg-amber-200 border-2 border-dashed w-full h-48" />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <Button 
              className="bg-amber-600 hover:bg-amber-700 text-white"
              onClick={() => onAddToCart(id)}
            >
              В корзину
            </Button>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-900">{name}</CardTitle>
        <div className="flex items-center mt-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="text-sm text-amber-700 ml-2">{rating}</span>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow pb-4">
        <p className="text-amber-700 mb-4">{description}</p>
        <p className="text-2xl font-bold text-amber-900">{price} ₽</p>
      </CardContent>
      
      {!isHovered && (
        <CardFooter className="pt-0">
          <Button 
            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            onClick={() => onAddToCart(id)}
          >
            В корзину
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;