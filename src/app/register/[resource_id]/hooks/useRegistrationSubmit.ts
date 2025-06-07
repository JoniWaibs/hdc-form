import { Subscriber, SubscriberWithHowDidYouHear } from "@/app/schema";
import { Resource } from "@/app/schema/resource";
import { toast } from "sonner";

interface UseRegistrationSubmitProps {
  resource: Resource;
  setLoading: (loading: boolean) => void;
  clearForm: () => void;
}

export function useRegistrationSubmit({
  resource,
  setLoading,
  clearForm,
}: UseRegistrationSubmitProps) {
  const onSubmit = async (values: SubscriberWithHowDidYouHear) => {
    setLoading(true);

    try {
      const { how_did_you_hear, why_you_are_interested, ...subscriber } =
        values;

      const createSuscriptionBody = {
        subscriber,
        resource_id: resource.id,
        how_did_you_hear,
        why_you_are_interested,
      };

      const suscriptionResponse = await fetch("/api/suscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createSuscriptionBody),
      });

      const suscriptionData = await suscriptionResponse.json();
      if (suscriptionData.error) {
        throw new Error(suscriptionData.error);
      }

      const subscriberData = suscriptionData.subscriber as Partial<Subscriber>;

      const createPaymentBody = {
        resource_id: resource.id,
        resource_name: resource.name,
        resource_description: resource.description || "",
        price: resource.price,
        subscriber_email: subscriberData.email,
        subscriber_name: subscriberData.name,
        subscriber_id: subscriberData.id,
      };

      const paymentResponse = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createPaymentBody),
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.error) {
        throw new Error(paymentData.error);
      }
      const checkoutUrl =
        process.env.NODE_ENV === "production"
          ? paymentData.data.initPoint
          : paymentData.data.sandboxInitPoint;

      console.log(
        "Se creo la preferencia de pago, redirigiendo a:",
        checkoutUrl
      );

      window.location.href = paymentData.data.initPoint;
    } catch (error) {
      toast.error(`${(error as Error).message}`, {
        duration: 5000,
      });
      setLoading(false);
      clearForm();
    }
  };

  return { onSubmit };
}
