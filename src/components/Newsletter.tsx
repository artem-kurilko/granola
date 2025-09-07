"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Спасибо за подписку!",
        description: "Теперь вы будете получать наши лучшие предложения.",
      });
      setEmail("");
    }, 1000);
  };

  return (
    <div className="bg-amber-100 rounded-xl p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-amber-900 mb-2">Подпишитесь на наши новости</h3>
        <p className="text-amber-700 mb-6">
          Получайте информацию о новых продуктах, скидках и специальных предложениях
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <div className="flex-1">
            <Label htmlFor="email" className="sr-only">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-amber-600 hover:bg-amber-700 whitespace-nowrap"
          >
            {isLoading ? "Отправка..." : "Подписаться"}
          </Button>
        </form>
        
        <p className="text-xs text-amber-600 mt-4">
          Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
        </p>
      </div>
    </div>
  );
};

export default Newsletter;