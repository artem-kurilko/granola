"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const CartSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Класична гранола",
      price: 150,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Шоколадна гранола",
      price: 170,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 500 ? 0 : 100;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          data-cart-sheet-trigger
        >
          <ShoppingCart className="h-6 w-6 text-amber-800" />
          <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Ваш кошик</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow py-20">
            <ShoppingCart className="h-16 w-16 text-amber-300 mb-4" />
            <p className="text-amber-700 mb-4">Ваш кошик порожній</p>
            <Button 
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => setIsOpen(false)}
            >
              Продовжити покупки
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="bg-amber-200 border-2 border-dashed rounded w-16 h-16" />
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-900">{item.name}</h3>
                      <p className="text-amber-700">{item.price} ₴</p>
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8 rounded-full border-amber-200"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8 rounded-full border-amber-200"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem(item.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Підсумок:</span>
                  <span>{subtotal} ₴</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{shipping === 0 ? 'Безкоштовно' : `${shipping} ₴`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Разом:</span>
                  <span>{total} ₴</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button 
                  variant="outline" 
                  className="w-full border-amber-600 text-amber-600 hover:bg-amber-50"
                  onClick={() => setIsOpen(false)}
                >
                  Продовжити покупки
                </Button>
                <Button 
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  asChild
                >
                  <Link to="/checkout">Оформити замовлення</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;