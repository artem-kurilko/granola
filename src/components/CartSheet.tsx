"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";

const CartSheet = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Классическая гранола",
      price: 350,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Шоколадная гранола",
      price: 390,
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
  const shipping = subtotal >= 1000 ? 0 : 200;
  const total = subtotal + shipping;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-6 w-6 text-amber-800" />
          <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {items.reduce((sum, item) => sum + item.quantity, 0)}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Ваша корзина</SheetTitle>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-20">
            <ShoppingCart className="h-16 w-16 text-amber-300 mb-4" />
            <p className="text-amber-700">Ваша корзина пуста</p>
            <Button 
              className="mt-4 bg-amber-600 hover:bg-amber-700"
              onClick={() => setIsOpen(false)}
            >
              Продолжить покупки
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-200px)] py-6">
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="bg-amber-200 border-2 border-dashed rounded w-16 h-16" />
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-900">{item.name}</h3>
                      <p className="text-amber-700">{item.price} ₽</p>
                      <div className="flex items-center mt-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-8 w-8"
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
            
            <div className="mt-auto border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Подитог:</span>
                  <span>{subtotal} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{shipping === 0 ? 'Бесплатно' : `${shipping} ₽`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Итого:</span>
                  <span>{total} ₽</span>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <Button 
                  variant="outline" 
                  className="flex-1 border-amber-600 text-amber-600 hover:bg-amber-50"
                  onClick={() => setIsOpen(false)}
                >
                  Продолжить покупки
                </Button>
                <Button className="flex-1 bg-amber-600 hover:bg-amber-700">
                  Оформить заказ
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