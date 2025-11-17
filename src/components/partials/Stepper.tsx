import { Step } from '@/types/step.ts';

type StepperProps = {
  steps: Step[];
  current: number;
  onStepChange?: (index: number) => void;
  allowJumpToFuture?: boolean;
};

export function Stepper({ steps, current, onStepChange, allowJumpToFuture = false }: StepperProps) {
  return (
    <nav aria-label="Steps" className="w-full min-w-0">
      <ol className="flex w-full items-center justify-between gap-1 sm:gap-3 min-w-0">
        {steps.map((step, index) => {
          const isCurrent = index === current;
          const isCompleted = index < current;
          const isUpcoming = index > current;

          const canClick =
            typeof onStepChange === 'function' &&
            (isCompleted || (allowJumpToFuture && isUpcoming));

          // Compact circle on mobile, full size on desktop
          const circle = (
            <span
              className={[
                'flex items-center justify-center rounded-full font-bold shrink-0',
                'h-7 w-7 text-xs', // mobile compact
                'sm:h-10 sm:w-10 sm:text-base', // normal size on sm+
                isCurrent ? 'bg-yellow-400 text-black' : 'bg-gray-200 text-gray-800',
              ].join(' ')}
            >
              {index + 1}
            </span>
          );

          // Smaller label text on mobile
          const label = (
            <span
              className={[
                'hidden sm:inline font-medium whitespace-nowrap',
                'text-sm',
                isCurrent ? 'text-gray-900' : 'text-gray-500',
              ].join(' ')}
            >
              {step.label}
              {isCurrent && <span className="sr-only"> — текущий шаг</span>}
            </span>
          );

          const content = (
            <div className="flex items-center gap-1 sm:gap-2 min-w-0 justify-center">
              {circle}
              {label}
            </div>
          );

          return (
            <li key={step.id} className="flex-1 min-w-[50px] sm:min-w-[100px]">
              {canClick ? (
                <button
                  type="button"
                  onClick={() => onStepChange?.(index)}
                  className="w-full text-left focus:outline-none focus-visible:ring"
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {content}
                </button>
              ) : (
                <div aria-current={isCurrent ? 'step' : undefined}>{content}</div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
