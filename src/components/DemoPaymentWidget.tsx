"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Smartphone, Wallet } from "lucide-react";

interface DemoPaymentWidgetProps {
  amount: number;
  description: string;
  orderId: string;
  onPaymentSuccess?: () => void;
  onPaymentError?: () => void;
}

const DemoPaymentWidget = ({ 
  amount, 
  description, 
  orderId,
  onPaymentSuccess,
  onPaymentError
}: DemoPaymentWidgetProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<'success' | 'error' | null>(null);
  const navigate = useNavigate();

  const handlePayment = (simulateSuccess: boolean = true) => {
    setIsProcessing(true);

    toast({
      title: "Обробка демо-платежу",
      description: "Симуляція платіжного процесу...",
    });

    setTimeout(() => {
      setIsProcessing(false);
      
      if (simulateSuccess) {
        toast({
          title: "Демо-оплата успішна!",
          description: "Це демонстрація успішного платежу.",
        });
        onPaymentSuccess?.();
        navigate(`/payment/success?order_id=${orderId}&amount=${amount}`);
      } else {
        toast({
          title: "Демо-помилка оплати",
          description: "Це демонстрація помилки платежу.",
          variant: "destructive",
        });
        onPaymentError?.();
        navigate(`/payment/error?error_code=DEMO_ERROR&error_message=Демонстрація помилки платежу`);
      }
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 p-4 rounded-lg">
        <h3 className="font-medium text-amber-900 mb-2">До оплати: {amount} ₴</h3>
        <p className="text-sm text-amber-700">Опис: {description}</p>
        <p className="text-sm text-amber-700">Номер замовлення: {orderId}</p>
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">Демо режим</h4>
          <p className="text-sm text-blue-700 mb-3">
            Виберіть результат для демонстрації:
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant="outline"
              className="justify-start border-green-200 hover:bg-green-50"
              onClick={() => handlePayment(true)}
              disabled={isProcessing}
            >
              <CreditCard className="mr-2 h-4 w-4 text-green-600" />
              Успішна оплата
            </Button>
            
            <Button
              variant="outline"
              className="justify-start border-red-200 hover:bg-red-50"
              onClick={() => handlePayment(false)}
              disabled={isProcessing}
            >
              <Smartphone className="mr-2 h-4 w-4 text-red-600" />
              Помилка оплати
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Button
        onClick={() => handlePayment(true)}
        disabled={isProcessing}
        className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
      >
        {isProcessing 
          ? "Обробка демо-платежу..." 
          : `Демо-оплата ${amount} ₴`
        }
      </Button>
      
      <div className="text-center text-xs text-amber-600">
        <p>Це демонстраційний режим. Реальні платежі не обробляються.</p>
      </div>
    </div>
  );
};

export default DemoPaymentWidget;