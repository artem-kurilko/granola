// LiqPay utility functions
import crypto from 'crypto';

interface LiqPayParams {
  public_key: string;
  amount: number;
  currency: string;
  description: string;
  order_id: string;
  result_url?: string;
  server_url?: string;
  [key: string]: any;
}

export const generateLiqPaySignature = (params: LiqPayParams, privateKey: string): string => {
  // Prepare data object
  const dataObj = {
    version: 3,
    ...params
  };
  
  // Convert to JSON and encode in base64
  const dataStr = Buffer.from(JSON.stringify(dataObj)).toString('base64');
  
  // Generate signature
  const signature = crypto
    .createHmac('sha1', privateKey)
    .update(dataStr)
    .digest('base64');
  
  return signature;
};

export const createLiqPayFormData = (params: LiqPayParams, privateKey: string) => {
  // Prepare data object
  const dataObj = {
    version: 3,
    ...params
  };
  
  // Convert to JSON and encode in base64
  const dataStr = Buffer.from(JSON.stringify(dataObj)).toString('base64');
  
  // Generate signature
  const signature = generateLiqPaySignature(params, privateKey);
  
  return {
    data: dataStr,
    signature: signature
  };
};