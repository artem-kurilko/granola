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
    
    // Simulate LiqPay payment process
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simulate successful payment (80% success rate for demo)
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        toast({
          title: "Оплата пройшла успішно!",
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
                        <<dyad-write path="src/App.tsx" description="Adding public offer route">
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentError from "./pages/PaymentError";
import NotFound from "./pages/NotFound";
import PublicOffer from "./pages/PublicOffer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/error" element={<PaymentError />} />
          <Route path="/public-offer" element={<PublicOffer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;