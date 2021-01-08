export const greaterThanCurrentDate = (value: string): boolean | string => {
  const date = new Date(value);
  return (
    date.getTime() >= Date.now() ||
    "Date/time should be greater than current date/time"
  );
};
