import { ApiError } from "@/app/api/v1/core/errors/ApiError";
import { DatabaseError } from "@/app/api/v1/core/errors/DatabaseError";
import { Email } from "@/app/schema/common/email";
import {
  CreateSubscriberNewsletter,
  SubscriberNewsletter,
  UnsubscribeToken,
} from "@/app/schema/subscriptions/newsletter";
import { SubscriptionsDataSourceV1 } from "@/services/datasource/v1/subscriptions";

export class SubscriptionService {
  constructor(private dataSource: SubscriptionsDataSourceV1) {}

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
    subscriber: SubscriberNewsletter,
    unsubscribe_token: UnsubscribeToken,
  ): Promise<SubscriberNewsletter> {
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
    payload: CreateSubscriberNewsletter,
  ): Promise<SubscriberNewsletter> {
    const { email, unsubscribe_token } = payload;

    const existingSubscribers = await this.getSubscribersNewsletter({ email });
    if (!!existingSubscribers?.length) {
      const subscriber = existingSubscribers[0];
      if (!subscriber?.is_active) {
        return this.handleReactivateSubscription(subscriber, unsubscribe_token);
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

  async getSubscribersNewsletter({
    email,
    token,
  }: {
    email?: Email;
    token?: UnsubscribeToken;
  }): Promise<SubscriberNewsletter[]> {
    const { data, error, status } =
      await this.dataSource.getSubscribersNewsletter({
        ...(email && { email }),
        ...(token && { token }),
      });

    if (error) {
      this.handleDatabaseError(error, status);
    }

    return (Array.isArray(data) ? data.flat() : []) as SubscriberNewsletter[];
  }

  async unsubscribeNewsletter(
    token: UnsubscribeToken,
  ): Promise<SubscriberNewsletter> {
    const existingSubscribers = await this.getSubscribersNewsletter({ token });

    if (!existingSubscribers?.length) {
      throw ApiError.notFound("Invalid or expired unsubscribe token");
    }

    const subscriber = existingSubscribers[0];

    await this.dataSource.updateSubscriberNewsletter(subscriber.id, {
      is_active: false,
      unsubscribe_token: token,
      unsubscribed_at: new Date().toISOString(),
    });

    return subscriber;
  }

  async subscribeToResource() {}

  async getSubscribersResources() {}

  async updateSubscriberResource() {}
}
