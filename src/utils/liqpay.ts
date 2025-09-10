// LiqPay utility functions
interface LiqPayParams {
  public_key: string;
  amount: number;
  currency: string;
  description: string;
  order_id: string;
  result_url?: string;
  server_url?: string;
  version: number;
  action: string;
  language?: string;
  sandbox?: string;
}

// Simple base64 encoding for browser
const base64Encode = (str: string): string => {
  return btoa(unescape(encodeURIComponent(str)));
};

// Simple SHA1 HMAC implementation for browser (for demo purposes only)
// In production, signature should be generated on the server
const sha1HMAC = async (key: string, message: string): Promise<string> => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  const hashBase64 = btoa(String.fromCharCode.apply(null, hashArray));
  
  return hashBase64;
};

export const createLiqPayFormData = async (params: LiqPayParams, privateKey: string) => {
  // Prepare data object
  const dataObj = {
    version: 3,
    ...params
  };
  
  // Convert to JSON and encode in base64
  const dataStr = base64Encode(JSON.stringify(dataObj));
  
  // Generate signature
  const signatureString = privateKey + dataStr + privateKey;
  const signature = await sha1HMAC(privateKey, signatureString);
  
  return {
    data: dataStr,
    signature: signature
  };
};

export const submitLiqPayForm = (data: string, signature: string) => {
  // Create form and submit to LiqPay
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://www.liqpay.ua/api/3/checkout';
  form.target = '_self'; // Open in same window
  form.style.display = 'none';

  const dataInput = document.createElement('input');
  dataInput.name = 'data';
  dataInput.value = data;
  form.appendChild(dataInput);

  const signatureInput = document.createElement('input');
  signatureInput.name = 'signature';
  signatureInput.value = signature;
  form.appendChild(signatureInput);

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};