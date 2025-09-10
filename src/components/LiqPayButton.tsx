"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LiqPayButtonProps {
  amount: number;
  description: string;
  orderId: string;
  onSuccess?: () => void;
  onError?: () => void;
}

const LiqPayButton = ({ 
  amount, 
  description, 
  orderId,
  onSuccess,
  onError
}: LiqPayButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    toast({
      title: "Обробка платежу",
      description: "Ваш платіж обробляється...",
    });
    
    // Simulate API call to backend
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful payment
      toast({
        title: "Оплата пройшла успішно!",
        description: "Ваше замовлення оформлено. Ми зв'яжемося з вами найближчим часом.",
      });
      onSuccess?.();
      // Navigate to success page
      navigate(`/payment/success?order_id=${orderId}&amount=${amount}`);
    }, 2000);
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-5"
    >
      {isLoading ? "Обробка платежу..." : `Сплатити ${amount} ₴`}
    </Button>
  );
};

export default LiqPayButton;