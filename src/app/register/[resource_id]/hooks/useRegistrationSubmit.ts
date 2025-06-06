import { SubscriberWithHowDidYouHear } from "@/app/schema";
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

      const suscriptionResponse = await fetch("/api/suscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriber,
          resource_id: Array.isArray(resource) ? resource[0].id : resource.id,
          how_did_you_hear,
          why_you_are_interested,
        }),
      });

      const suscriptionData = await suscriptionResponse.json();

      if (suscriptionData.error) {
        throw new Error(suscriptionData.error);
      }

      const paymentResponse = await fetch("/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resourceId: Array.isArray(resource) ? resource[0].id : resource.id,
          subscriberEmail: subscriber.email,
          subscriberName: subscriber.name,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.error) {
        throw new Error(paymentData.error);
      }

      const checkoutUrl =
        process.env.NODE_ENV === "production"
          ? paymentData.data.initPoint
          : paymentData.data.sandboxInitPoint;

      window.location.href = checkoutUrl;
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
