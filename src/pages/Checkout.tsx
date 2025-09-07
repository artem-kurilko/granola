"use client";

import { useState, useEffect } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
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
  const [isFormValid, setIsFormValid] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: "Класична гранола",
      price: 150,
      quantity: 2,
    },
    {
      id: 2,
      name: "Шоколадна гранола",
      price: 170,
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 500 ? 0 : 100;
  const total = subtotal + shipping;

  // Check form validity
  useEffect(() => {
    const requiredFields = [
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.address,
      formData.city,
      formData.zip
    ];
    
    const allFieldsFilled = requiredFields.every(field => field.trim() !== "");
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const phoneValid = /^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone);
    
    setIsFormValid(allFieldsFilled && emailValid && phoneValid);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast({
        title: "Помилка оформлення",
        description: "Будь ласка, заповніть всі обов'язкові поля правильно.",
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
          title: "Замовлення оформлено!",
          description: "Ми зв'яжемося з вами для підтвердження замовлення.",
        });
        // Navigate to success page
        navigate('/payment/success');
      }, 1500);
    }
  };

  const handleLiqPayPayment = () => {
    if (!isFormValid) {
      toast({
        title: "Помилка оформлення",
        description: "Будь ласка, заповніть всі обов'язкові поля правильно.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // In a real implementation, this would:
    // 1. Submit order details to your backend
    // 2. Get LiqPay payment parameters from backend
    // 3. Redirect to LiqPay payment page
    
    // Simulate API call to backend
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simulate successful payment (80% success rate for demo)
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        toast({
          title: "Оплата прйшла успішно!",
          description: "Ваше замовлення оформлено. Ми зв'яжемося з вами найближчим часом.",
        });
        // Navigate to success page
        navigate('/payment/success');
      } else {
        toast({
          title: "Помилка оплати",
          description: "Сталася помилка при обробці платежу. Будь ласка, спробуйте ще раз.",
          variant: "destructive",
        });
        // Navigate to error page
        navigate('/payment/error');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-6">
          <Link to="/">
            <Button variant="ghost" className="text-amber-800">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Повернутись до покупок
            </Button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Ваше замовлення</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-amber-700">Кількість: {item.quantity}</p>
                      </div>
                      <p className="font-medium">{item.price * item.quantity} ₴</p>
                    </div>
                  ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Підсумок:</span>
                    <span>{subtotal} ₴</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Доставка:</span>
                    <span>{shipping === 0 ? (
                      <Badge variant="secondary">Безкоштовно</Badge>
                    ) : (
                      `${shipping} ₴`
                    )}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Разом:</span>
                    <span>{total} ₴</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 bg-amber-100 rounded-lg p-3">
              <div className="flex items-start">
                <Shield className="h-5 w-5 text-amber-700 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Ваші дані захищені. Ми не передаємо інформацію третім особам.
                </p>
              </div>
            </div>
          </div>
          
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Інформація для доставки</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Ім'я *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Прізвище *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="address">Адреса доставки *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">Місто *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">Індекс *</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Країна</Label>
                      <Input
                        id="country"
                        name="country"
                        value="Україна"
                        disabled
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="comment">Коментар до замовлення</Label>
                    <Textarea
                      id="comment"
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Особливі побажання щодо доставки..."
                    />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Спосіб доставки</h3>
                    <RadioGroup defaultValue="courier">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="courier" id="courier" />
                        <Label htmlFor="courier" className="flex items-center">
                          <Truck className="mr-2 h-4 w-4" />
                          Кур'єрська доставка - 1-2 дні
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Спосіб оплати</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="liqpay" id="liqpay" />
                        <Label htmlFor="liqpay" className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Онлайн оплата (LiqPay)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Готівка при отриманні</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="digital" id="digital" />
                        <Label htmlFor="digital">Електронний гаманець</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-sm">
                      Я погоджуюсь з <a href="#" className="text-amber-600 hover:underline">умовами замовлення</a> та <a href="#" className="text-amber-600 hover:underline">політикою конфіденційності</a> *
                    </Label>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                {paymentMethod === "liqpay" ? (
                  <Button
                    onClick={handleLiqPayPayment}
                    disabled={isProcessing || !isFormValid}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-5"
                  >
                    {isProcessing ? "Обробка платежу..." : `Сплатити ${total} ₴`}
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isProcessing || !isFormValid}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-5"
                    onClick={handleSubmit}
                  >
                    {isProcessing ? "Обробка..." : `Оформити замовлення на суму ${total} ₴`}
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