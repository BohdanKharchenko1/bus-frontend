export function parseUtcPlus1(time: string): Date {
  return new Date(time.replace(' ', 'T') + '+01:00');
}
