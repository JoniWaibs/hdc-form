import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { handleInputType } from "@/lib/utils";
import {
  formLabel,
  formPlaceholder,
} from "@/app/register/[resource_id]/content/form";
import {
  SubscriberWithHowDidYouHear,
  SubscriberWithHowDidYouHearSchema,
} from "@/app/schema";

interface FormFieldRendererProps {
  fieldName: string;
  control: Control<SubscriberWithHowDidYouHear>;
}

export default function FormFieldRenderer({
  fieldName,
  control,
}: FormFieldRendererProps) {
  const field = fieldName as keyof z.infer<
    typeof SubscriberWithHowDidYouHearSchema
  >;
  const label = formLabel.get(field);
  const placeholder = formPlaceholder.get(field);

  return (
    <FormField
      key={field}
      control={control}
      name={fieldName as FieldPath<SubscriberWithHowDidYouHear>}
      render={({ field }) => (
        <FormItem>
          <div className="flex justify-between text-center">
            <FormLabel className="text-sm">
              {label!.charAt(0).toUpperCase() + label!.slice(1)}
              <FormMessage />
            </FormLabel>
            {field.name === "phone" && (
              <span className="text-xs text-muted-foreground"></span>
            )}
          </div>

          <FormControl>
            {handleInputType(field.name) ? (
              <Textarea
                rows={3}
                placeholder={`...`}
                {...field}
                className="h-12 text-base"
              />
            ) : (
              <Input
                placeholder={`${placeholder || `Ingresá tu ${label!.toLowerCase()}`}`}
                {...field}
                className="h-12 text-base"
              />
            )}
          </FormControl>
        </FormItem>
      )}
    />
  );
}
