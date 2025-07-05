export interface WebhookPayload {
  action: string;
  api_version: string;
  data: {
    id: string;
  };
  date_created: string;
  id: number;
  live_mode: boolean;
  type: "payment";
  user_id: string;
}

export interface ExternalReference {
  resourceId: string;
  subscriberId: string;
}

export interface WebhookResponse {
  message: string;
}

export interface WebhookError {
  error: string;
  status: number;
}
