"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

declare global {
  interface Window {
    LiqPay: any;
  }
}

interface LiqPayWidgetProps {
  amount: number;
  description: string;
  orderId: string;
  publicKey: string;
  privateKey: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: () => void;
}

const LiqPayWidget = ({ 
  amount, 
  description, 
  orderId,
  publicKey,
  privateKey,
  onPaymentSuccess,
  onPaymentError
}: LiqPayWidgetProps) => {
  useEffect(() => {
    // Dynamically load LiqPay script
    const script = document.createElement('script');
    script.src = 'https://static.liqpay.ua/libjs/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = () => {
    if (typeof window.LiqPay === 'undefined') {
      toast({
        title: "Помилка",
        description: "Не вдалося завантажити платіжну систему. Будь ласка, оновіть сторінку.",
        variant: "destructive",
      });
      return;
    }

    try {
      const liqpay = new window.LiqPay(
        publicKey,
        privateKey
      );

      liqpay.checkout({
        amount: amount,
        currency: 'UAH',
        description: description,
        order_id: orderId,
        version: 3,
        result_url: `${window.location.origin}/payment/success`,
        server_url: `${window.location.origin}/api/payment/callback`,
        language: 'uk',
        sandbox: '1', // Remove in production
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
        className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
      >
        Перейти до оплати
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