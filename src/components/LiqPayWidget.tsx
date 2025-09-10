"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { createLiqPayFormData, submitLiqPayForm } from "@/utils/liqpay";

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
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      const publicKey = import.meta.env.VITE_LIQPAY_PUBLIC_KEY;
      const privateKey = import.meta.env.VITE_LIQPAY_PRIVATE_KEY;
      const sandbox = import.meta.env.VITE_LIQPAY_SANDBOX;

      if (!publicKey || !privateKey) {
        toast({
          title: "Помилка конфігурації",
          description: "Ключі LiqPay не налаштовані.",
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

      // Generate form data with signature
      const formData = await createLiqPayFormData(paymentData, privateKey);

      toast({
        title: "Перенаправлення на оплату",
        description: "Ви будете перенаправлені на сторінку оплати LiqPay.",
      });

      // Submit form to LiqPay
      setTimeout(() => {
        submitLiqPayForm(formData.data, formData.signature);
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
        disabled={isProcessing}
        className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
      >
        {isProcessing 
          ? "Перенаправлення на оплату..." 
          : "Перейти до оплати LiqPay"
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