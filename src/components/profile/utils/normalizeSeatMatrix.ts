export const normalizeSeatMatrix = (value: unknown): string[][] => {
  if (!Array.isArray(value)) return [[]];
  const normalized = value.map((row) =>
    Array.isArray(row) ? row.map((seat) => String(seat)) : [],
  );
  return normalized.length > 0 ? normalized : [[]];
};
