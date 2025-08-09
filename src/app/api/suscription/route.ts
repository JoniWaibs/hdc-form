import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import { SubscriberResourcePostSchema } from "@/app/schema";
import { DataSource } from "@/services/datasource";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json();

    const body = SubscriberResourcePostSchema.parse(rawBody);

    const datasource = new DataSource();

    let subscriber = await datasource.findSubscriberByEmailOrDocument(
      body.subscriber.email,
      body.subscriber.identity_document,
    );

    if (!subscriber.length) {
      const { data: createdSubscriber, status } =
        await datasource.createSubscriber(body.subscriber);
      if (
        status !== 201 ||
        !createdSubscriber ||
        createdSubscriber.length === 0
      ) {
        return NextResponse.json(
          { error: "No se pudo registrar el suscriptor" },
          { status: 400 },
        );
      }
      subscriber = createdSubscriber;
    }

    const createSubscriberResourceBody = {
      subscriber_id: subscriber[0].id,
      resource_id: body.resource_id,
      how_did_you_hear: body.how_did_you_hear,
      why_you_are_interested: body.why_you_are_interested,
      payment_confirmed: false,
    };

    try {
      await datasource.createSubscriberResource(createSubscriberResourceBody);
    } catch (err) {
      throw err;
    }

    return NextResponse.json(
      {
        message: "Inscripción exitosa",
        subscriber: subscriber[0],
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Input validator error", issues: error.errors },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: `No se pudo completar el registro. Error: ${(error as Error).message}`,
      },
      { status: 500 },
    );
  }
}
