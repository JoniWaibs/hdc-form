import { ApiError } from "@/app/api/v1/core/errors/ApiError";
import { DatabaseError } from "@/app/api/v1/core/errors/DatabaseError";
import { Email } from "@/app/schema/common/email";
import {
  CreateNewsletterSubscriber,
  DDBBNewsletterSubscriber,
  UnsubscribeToken,
} from "@/app/schema/subscriptions/newsletter";
import { NewsletterDataSourceV1 } from "@/services/datasource/v1/newsletter";

export class SubscriptionService {
  constructor(private dataSource: NewsletterDataSourceV1) {}

  private handleDatabaseError(error: DatabaseError, status: number) {
    if (status === 409 || error.code === "23505") {
      throw ApiError.conflict(
        "Email is already active to receive the newsletter",
      );
    }

    if (status === 403) {
      throw ApiError.forbidden(
        "You don't have permission to perform this action",
      );
    }

    if (error.code === "23503") {
      throw ApiError.badRequest("Invalid reference in the database");
    }

    console.error("Database error:", {
      code: error.code,
      status,
      message: error.message,
      details: error.details,
    });

    throw ApiError.internal(
      "An unexpected error occurred while accessing the database",
    );
  }

  private async handleReactivateSubscription(
    subscriber: DDBBNewsletterSubscriber,
    unsubscribe_token: UnsubscribeToken,
  ): Promise<DDBBNewsletterSubscriber> {
    const { data, error, status } =
      await this.dataSource.updateSubscriberNewsletter(subscriber.id, {
        is_active: true,
        unsubscribe_token,
        unsubscribed_at: null,
      });

    if (error) {
      this.handleDatabaseError(error, status);
    }

    if (!data) {
      throw ApiError.internal("Failed to reactivate newsletter subscription");
    }

    return data;
  }

  async subscribeToNewsletter(
    payload: CreateNewsletterSubscriber,
  ): Promise<DDBBNewsletterSubscriber> {
    const { data: existingSubscribers } =
      await this.dataSource.getSubscribersNewsletter(payload.email);
    if (!!existingSubscribers?.length) {
      const subscriber =
        existingSubscribers[0] as unknown as DDBBNewsletterSubscriber;
      if (!subscriber?.is_active) {
        return this.handleReactivateSubscription(
          subscriber,
          payload.unsubscribe_token,
        );
      }
    }

    const { data, error, status } =
      await this.dataSource.createSubscriberNewsletter(payload);

    if (error) {
      this.handleDatabaseError(error, status);
    }

    if (!data) {
      throw ApiError.internal("Failed to create newsletter subscription");
    }

    return data;
  }

  async getSubscribersNewsletter(
    email?: Email,
  ): Promise<DDBBNewsletterSubscriber[]> {
    const { data, error, status } =
      await this.dataSource.getSubscribersNewsletter(email);

    if (error) {
      this.handleDatabaseError(error, status);
    }

    return (
      Array.isArray(data) ? data.flat() : []
    ) as DDBBNewsletterSubscriber[];
  }

  async unsubscribeNewsletter(
    token: UnsubscribeToken,
  ): Promise<DDBBNewsletterSubscriber> {
    const { data, error, status } =
      await this.dataSource.unsubscribeNewsletterByToken(token);

    if (error) {
      this.handleDatabaseError(error, status);
    }

    if (!data) {
      throw ApiError.notFound("Invalid or expired unsubscribe token");
    }

    return data;
  }
}
