"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    amount: 0,
  });

  useEffect(() => {
    // Parse order details from URL or state
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('order_id') || `ORD-${Date.now()}`;
    const amount = searchParams.get('amount') || 0;
    
    setOrderDetails({
      orderId,
      amount: Number(amount),
    });
  }, [location]);

  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl mt-4">Оплата пройшла успішно!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-4">
                Дякуємо за ваше замовлення. Ми отримали оплату і почали підготовку вашого замовлення.
              </p>
              <div className="space-y-2 text-left bg-amber-50 p-4 rounded-lg">
                <p className="text-amber-800">
                  Номер замовлення: <span className="font-bold">{orderDetails.orderId}</span>
                </p>
                <p className="text-amber-800">
                  Сума оплати: <span className="font-bold">{orderDetails.amount} ₴</span>
                </p>
              </div>
              <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                <p className="text-sm text-amber-800">
                  Ми надішлемо вам email з підтвердженням та інформацією про доставку.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
                <Link to="/">Продовжити покупки</Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-amber-600 text-amber-600">
                <Link to="/orders">Переглянути замовлення</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;