"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LiqPayWidgetProps {
  amount: number;
  description: string;
  orderId: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: () => void;
}

declare global {
  interface Window {
    LiqPayCheckout: any;
  }
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
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if script is already loaded
    if (typeof window.LiqPayCheckout !== 'undefined') {
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

  const handlePayment = async () => {
    if (!isScriptLoaded) {
      toast({
        title: "Платіжна система не завантажена",
        description: "Будь ласка, зачекайте або спробуйте оновити сторінку.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const publicKey = import.meta.env.VITE_LIQPAY_PUBLIC_KEY;
      const privateKey = import.meta.env.VITE_LIQPAY_PRIVATE_KEY;
      const sandbox = import.meta.env.VITE_LIQPAY_SANDBOX;

      if (!publicKey) {
        toast({
          title: "Помилка конфігурації",
          description: "Публічний ключ LiqPay не налаштований.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      // Prepare payment data
      const paymentData = {
        version: 3,
        public_key: publicKey,
        action: 'pay',
        amount: amount,
        currency: 'UAH',
        description: description,
        order_id: orderId,
        result_url: `${window.location.origin}/payment/success?order_id=${orderId}&amount=${amount}`,
        server_url: `${window.location.origin}/api/payment/callback`,
        language: 'uk',
        sandbox: sandbox || '0'
      };

      // Convert to base64
      const data = btoa(JSON.stringify(paymentData));
      
      // For demo purposes, we'll simulate the payment process
      // In production, signature should be generated on the server
      const signature = 'demo_signature';

      // Create form and submit to LiqPay
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.liqpay.ua/api/3/checkout';
      form.target = '_blank';
      form.style.display = 'none';

      const dataInput = document.createElement('input');
      dataInput.name = 'data';
      dataInput.value = data;
      form.appendChild(dataInput);

      const signatureInput = document.createElement('input');
      signatureInput.name = 'signature';
      signatureInput.value = signature;
      form.appendChild(signatureInput);

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Simulate success for demo
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Перенаправлення на оплату",
          description: "Ви будете перенаправлені на сторінку оплати LiqPay.",
        });
        
        // For demo purposes, redirect to success page after 3 seconds
        setTimeout(() => {
          navigate(`/payment/success?order_id=${orderId}&amount=${amount}`);
          onPaymentSuccess?.();
        }, 3000);
      }, 1000);

    } catch (error) {
      console.error('Payment initialization error:', error);
      setIsProcessing(false);
      toast({
        title: "Помилка",
        description: "Не вдалося ініціалізувати платіжну систему.",
        variant: "destructive",
      });
      onPaymentError?.();
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
        disabled={isScriptLoading || isProcessing}
        className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
      >
        {isScriptLoading 
          ? "Завантаження платіжної системи..." 
          : isProcessing 
          ? "Обробка платежу..." 
          : "Перейти до оплати"
        }
      </Button>
      
      <div className="text-center text-xs text-amber-600">
        <p>Після натискання ви будете перенаправлені на безпечну платіжну форму LiqPay</p>
        <div className="flex justify-center space-x-2 mt-2">
          <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Visa</div>
          <div className="bg-red-500 text-white px-2 py-1 rounded text-xs">MC</div>
          <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">LiqPay</div>
        </div>
      </div>
    </div>
  );
};

export default LiqPayWidget;