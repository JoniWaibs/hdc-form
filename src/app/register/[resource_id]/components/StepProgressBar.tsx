interface StepProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

export default function StepProgressBar({
  currentStep,
  totalSteps,
  stepTitle,
}: StepProgressBarProps) {
  return (
    <div className="border-b py-3 flex-shrink-0">
      <h2 className="text-xl font-semibold py-1">{stepTitle}</h2>
      <div className="mt-1 flex w-full gap-1">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full ${index <= currentStep ? "bg-primary" : "bg-gray-200"}`}
          />
        ))}
      </div>
    </div>
  );
}
