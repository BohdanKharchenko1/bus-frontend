export const statusStyles: Record<string, string> = {
  created: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  canceled: 'bg-slate-200 text-slate-600',
  paid: 'bg-purple-100 text-purple-700',
};

export const formatDateParts = (value?: string | null) => {
  if (!value) return { date: '-', time: '-' };
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return { date: '-', time: '-' };
  return {
    date: date.toLocaleDateString(),
    time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
};

export const getTimeValue = (value?: string | null) => {
  if (!value) return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
};
