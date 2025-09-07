"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface RealLiqPayButtonProps {
  amount: number;
  description: string;
  orderId: string;
  resultUrl: string;
  serverUrl: string;
  publicKey: string;
  privateKey: string;
}

const RealLiqPayButton = ({ 
  amount, 
  description, 
  orderId,
  resultUrl,
  serverUrl,
  publicKey,
  privateKey
}: RealLiqPayButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    setIsLoading(true);
    
    // Create form data for LiqPay
    const formData = new FormData();
    formData.append('public_key', publicKey);
    formData.append('version', '3');
    formData.append('action', 'pay');
    formData.append('amount', amount.toString());
    formData.append('currency', 'UAH');
    formData.append('description', description);
    formData.append('order_id', orderId);
    formData.append('result_url', resultUrl);
    formData.append('server_url', serverUrl);
    
    // In a real implementation, you would generate the signature on your server
    // This is just for demonstration - never expose private key in frontend code
    const data = {
      version: 3,
      public_key: publicKey,
      action: 'pay',
      amount: amount,
      currency: 'UAH',
      description: description,
      order_id: orderId,
      result_url: resultUrl,
      server_url: serverUrl
    };
    
    const dataStr = Buffer.from(JSON.stringify(data)).toString('base64');
    // Signature generation would normally happen on the server
    // const signature = require('crypto')
    //   .createHmac('sha1', privateKey)
    //   .update(dataStr)
    //   .digest('base64');
    
    // For demonstration, we'll use a mock signature
    const signature = 'mock_signature_for_demo';
    
    formData.append('data', dataStr);
    formData.append('signature', signature);
    
    // Create and submit form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.liqpay.ua/api/3/checkout';
    form.style.display = 'none';
    
    formData.forEach((value, key) => {
      const input = document.createElement('input');
      input.name = key;
      input.value = value as string;
      form.appendChild(input);
    });
    
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading}
      className="w-full bg-amber-600 hover:bg-amber-700 text-lg py-5"
    >
      {isLoading ? "Перенаправлення до оплати..." : `Сплатити ${amount} ₴`}
    </Button>
  );
};

export default RealLiqPayButton;