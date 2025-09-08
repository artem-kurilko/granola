"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface LiqPayWidgetProps {
  amount: number;
  description: string;
  orderId: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: () => void;
}

const LiqPayWidget = ({ 
  amount, 
  description, 
  orderId,
  onPaymentSuccess,
  onPaymentError
}: LiqPayWidgetProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isScriptLoading, setIsScriptLoading] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    if (typeof window.LiqPay !== 'undefined') {
      setIsScriptLoaded(true);
      return;
    }

    // Function to load script
    const loadScript = () => {
      setIsScriptLoading(true);
      
      // Create script element
      const script = document.createElement('script');
      script.src = 'https://static.liqpay.ua/libjs/checkout.js';
      script.async = true;
      
      script.onload = () => {
        setIsScriptLoaded(true);
        setIsScriptLoading(false);
      };
      
      script.onerror = () => {
        setIsScriptLoading(false);
        toast({
          title: "Помилка",
          description: "Не вдалося завантажити платіжну систему. Будь ласка, спробуйте пізніше.",
          variant: "destructive",
        });
      };
      
      document.head.appendChild(script);
    };

    loadScript();

    // Cleanup function
    return () => {
      const script = document.querySelector('script[src="https://static.liqpay.ua/libjs/checkout.js"]');
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const handlePayment = () => {
    if (!isScriptLoaded) {
      toast({
        title: "Платіжна система не завантажена",
        description: "Будь ласка, зачекайте або спробуйте оновити сторінку.",
        variant: "destructive",
      });
      return;
    }

    try {
      const publicKey = import.meta.env.VITE_LIQPAY_PUBLIC_KEY;
      // Note: Private key should never be exposed in frontend code in production
      // This is only for sandbox testing purposes
      const privateKey = import.meta.env.VITE_LIQPAY_PRIVATE_KEY;

      if (!publicKey || !privateKey) {
        toast({
          title: "Помилка конфігурації",
          description: "Платіжна система не налаштована.",
          variant: "destructive",
        });
        return;
      }

      // Create LiqPay instance
      const liqpay = new window.LiqPay(publicKey, privateKey);
      
      // Open checkout
      liqpay.checkout({
        amount: amount,
        currency: 'UAH',
        description: description,
        order_id: orderId,
        version: 3,
        result_url: `${window.location.origin}/payment/success?order_id=${orderId}&amount=${amount}`,
        server_url: `${window.location.origin}/api/payment/callback`,
        language: 'uk',
        sandbox: '1', // Sandbox mode for testing
      })
      .on('success', (data: any) => {
        console.log('Payment successful:', data);
        toast({
          title: "Оплата пройшла успішно!",
          description: "Ваше замовлення оформлено.",
        });
        onPaymentSuccess?.();
      })
      .on('error', (error: any) => {
        console.error('Payment error:', error);
        toast({
          title: "Помилка оплати",
          description: "Сталася помилка при обробці платежу.",
          variant: "destructive",
        });
        onPaymentError?.();
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      toast({
        title: "Помилка",
        description: "Не вдалося ініціалізувати платіжну систему.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 p-4 rounded-lg">
        <h3 className="font-medium text-amber-900 mb-2">До оплати: {amount} ₴</h3>
        <p className="text-sm text-amber-700">Опис: {description}</p>
        <p className="text-sm text-amber-700">Номер замовлення: {orderId}</p>
      </div>
      
      <Button
        onClick={handlePayment}
        disabled={isScriptLoading}
        className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
      >
        {isScriptLoading ? "Завантаження платіжної системи..." : "Перейти до оплати"}
      </Button>
      
      <div className="text-center text-xs text-amber-600">
        <p>Після натискання ви будете перенаправлені на безпечну платіжну форму LiqPay</p>
        <div className="flex justify-center space-x-2 mt-2">
          <div className="bg-gray-200 border-2 border-dashed rounded w-8 h-5" />
          <div className="bg-gray-200 border-2 border-dashed rounded w-8 h-5" />
          <div className="bg-gray-200 border-2 border-dashed rounded w-8 h-5" />
        </div>
      </div>
    </div>
  );
};

export default LiqPayWidget;