"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Truck, CreditCard, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import LiqPayButton from "@/components/LiqPayButton";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    comment: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("liqpay");
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: "Классическая гранола",
      price: 350,
      quantity: 2,
    },
    {
      id: 2,
      name: "Шоколадная гранола",
      price: 390,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 1000 ? 0 : 200;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.address || !formData.city || !formData.zip) {
      toast({
        title: "Ошибка оформления",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }
    
    // If payment method is not LiqPay, proceed with regular order submission
    if (paymentMethod !== "liqpay") {
      setIsProcessing(true);
      // Simulate order submission
      setTimeout(() => {
        setIsProcessing(false);
        toast({
          title: "Заказ оформлен!",
          description: "Мы свяжемся с вами для подтверждения заказа.",
        });
      }, 1500);
    }
  };

  const handlePaymentSuccess = () => {
    // In a real app, this would redirect to a success page or update order status
    toast({
      title: "Заказ успешно оформлен!",
      description: "Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.",
    });
  };

  const handlePaymentError = () => {
    // In a real app, this would show an error message
    toast({
      title: "Ошибка оплаты",
      description: "Произошла ошибка при обработке платежа. Пожалуйста, попробуйте снова.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-amber-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link to="/">
            <Button variant="ghost" className="text-amber-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Вернуться к покупкам
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-amber-700">Количество: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{item.price * item.quantity} ₽</p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Подитог:</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span>{shipping === 0 ? (
                      <Badge variant="success">Бесплатно</Badge>
                    ) : (
                      `${shipping} ₽`
                    )}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Итого:</span>
                    <span>{total} ₽</span>
                  </div>
                </div>
<|im_start|>
<|im_start|>
<|im_start|>
<dyad-write path="src/pages/Checkout.tsx" description="Completing the checkout page fixes">
              </CardContent>
            </Card>
            
            <div className="mt-6 bg-amber-100 rounded-lg p-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-amber-700 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Ваши данные защищены. Мы не передаем информацию третьим лицам.
                </p>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Информация для доставки</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Адрес доставки *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="city">Город *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">Индекс *</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Страна</Label>
                      <Input
                        id="country"
                        name="country"
                        value="Россия"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="comment">Комментарий к заказу</Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Особые пожелания по доставке..."
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Способ доставки</h3>
                    <RadioGroup defaultValue="courier">
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="courier" id="courier" />
                        <Label htmlFor="courier" className="flex items-center">
                          <Truck className="mr-2 h-4 w-4" />
                          Курьерская доставка - 1-2 дня
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup">Самовывоз из магазина</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Способ оплаты</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="liqpay" id="liqpay" />
                        <Label htmlFor="liqpay" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Онлайн оплата (LiqPay)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-3">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Наличные при получении</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="digital" id="digital" />
                        <Label htmlFor="digital">Электронный кошелек</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      Я согласен с <a href="#" className="text-amber-600 hover:underline">условиями заказа</a> и <a href="#" className="text-amber-600 hover:underline">политикой конфиденциальности</a> *
                    </Label>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                {paymentMethod === "liqpay" ? (
                  <LiqPayButton
                    amount={total}
                    description="Покупка гранолы"
                    orderId={`ORDER-${Date.now()}`}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isProcessing}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-6"
                    onClick={handleSubmit}
                  >
                    {isProcessing ? "Обработка..." : `Оформить заказ на сумму ${total} ₽`}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;