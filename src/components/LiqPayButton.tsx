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
    
    // In a real implementation, this would:
    // 1. Call your backend to generate LiqPay signature and data
    // 2. Redirect to LiqPay payment page
    // 3. Handle success/error callbacks
    
    // Simulate API call to backend
    setTimeout(() => {
      setIsLoading(false);
      
      // Simulate successful payment
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo
      
      if (isSuccess) {
        toast({
          title: "Оплата прошла успешно!",
          description: "Ваш заказ оформлен. Мы свяжемся с вами в ближайшее время.",
        });
        onSuccess?.();
        // Navigate to success page
        navigate('/payment/success');
      } else {
        toast({
          title: "Ошибка оплаты",
          description: "Произошла ошибка при обработке платежа. Пожалуйста, попробуйте снова.",
          variant: "destructive",
        });
        onError?.();
        // Navigate to error page
        navigate('/payment/error');
      }
    }, 1500);
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
    >
      {isLoading ? "Обработка платежа..." : `Оплатить ${amount} ₽`}
    </Button>
  );
};

export default LiqPayButton;