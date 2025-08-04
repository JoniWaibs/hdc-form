export interface PaymentInfo {
  id: string;
  status: string;
  external_reference: string;
}

export interface PaymentApprovalResult {
  message: string;
}

export interface PaymentProcessingResult {
  success: boolean;
  subscriberResourceId?: string;
  error?: string;
}
