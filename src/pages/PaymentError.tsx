"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentError = () => {
  return (
    <div className="min-h-screen bg-amber-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto bg-red-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
              <CardTitle className="text-2xl mt-4">Помилка оплати</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-amber-700 mb-4">
                Сталася помилка при обробці вашого платежу. Будь ласка, спробуйте ще раз.
              </p>
              <p className="text-amber-700 text-sm">
                Якщо проблема зберігається, зв'яжіться з нашою службою підтримки.
              </p>
              <div className="mt-6 p-4 bg-amber-100 rounded-lg">
                <p className="text-sm text-amber-800">
                  Номер помилки: <span className="font-mono">ERR-{Date.now()}</span>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button asChild className="w-full bg-amber-600 hover:bg-amber-700">
                <Link to="/checkout">Повторити оплату</Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-amber-600 text-amber-600">
                <Link to="/">Повернутись до магазину</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentError;