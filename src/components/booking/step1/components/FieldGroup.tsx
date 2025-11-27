import { ReactNode } from 'react';
import { Label } from '../../../../components/ui/label';
import { cn } from '../../../../lib/utils';

type FieldGroupProps = {
  label: string;
  className?: string;
  children: ReactNode;
};

const FieldGroup = ({ label, children, className }: FieldGroupProps) => (
  <div className={cn('flex flex-col gap-2', className)}>
    <Label className="text-sm font-medium text-muted-foreground md:text-base">{label}</Label>
    {children}
  </div>
);

export default FieldGroup;
