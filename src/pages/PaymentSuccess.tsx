"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
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
              <p className="text-amber-700">
                Номер замовлення: <span className="font-bold">ORD-{Date.now()}</span>
              </p>
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