export interface PaymentInfo {
  id: string;
  status: string;
  external_reference: string;
}

export interface PaymentProcessingResult {
  success: boolean;
  subscriberResourceId?: string;
  error?: string;
}

export interface NotificationResult {
  success: boolean;
  recipientEmail?: string;
  error?: string;
}
