import {Step} from "@/types/step.ts";


type StepperProps = {
    steps: Step[];
    current: number;
    onStepChange?: (index: number) => void;
    allowJumpToFuture?: boolean;
};

export function Stepper({
                            steps,
                            current,
                            onStepChange,
                            allowJumpToFuture = false,
                        }: StepperProps) {
    return (
        <nav aria-label="Steps" className="w-full">
    <ol className=" flex max-w-7xl items-center justify-between gap-3">
        {steps.map((step, index) => {
                const isCurrent = index === current;
                const isCompleted = index < current;
                const isUpcoming = index > current;

                // Decide if this item should be interactive
                const canClick =
                    typeof onStepChange === "function" &&
                    (isCompleted || (allowJumpToFuture && isUpcoming));

                // Shared circle content (numbers 1..n)
                const circle = (
                    <span
                        className={[
                            "flex h-10 w-10 items-center justify-center rounded-full font-bold",
                        isCurrent
                        ? "bg-yellow-400 text-black"
                        : "bg-gray-200 text-gray-800",
            ].join(" ")}
            >
                {index + 1}
                </span>
            );

                const label = (
                    <span
                        className={[
                            "whitespace-nowrap font-semibold",
                        isCurrent ? "text-gray-900" : "text-gray-500",
            ].join(" ")}
            >
                {step.label}
                {isCurrent && (
                    <span className="sr-only"> — текущий шаг</span>
                )}
                </span>
            );

                const content = (
                    <div className="flex items-center gap-2">
                        {circle}
                {label}
                </div>
            );

                return (
                    <li key={step.id} className="flex-1">
                    {canClick ? (
                                <button
                                    type="button"
                            onClick={() => onStepChange?.(index)}
                className="w-full text-left focus:outline-none focus-visible:ring"
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`${index + 1}. ${step.label}${
                    isCurrent ? ", текущий" : isCompleted ? ", выполнен" : ""
                }`}
            >
                {content}
                </button>
            ) : (
                    <div
                        aria-current={isCurrent ? "step" : undefined}
                aria-label={`${index + 1}. ${step.label}${
                    isCurrent ? ", текущий" : isCompleted ? ", выполнен" : ""
                }`}
            >
                {content}
                </div>
            )}
                </li>
            );
            })}
        </ol>
        </nav>
);
}
