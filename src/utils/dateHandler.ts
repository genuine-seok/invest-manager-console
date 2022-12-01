const getFormattedTwoDecimals = (n: number) => {
  return n < 10 ? `0${n}` : `${n}`;
};

const getCleansedDate = (str: string) => {
  const cleansed = str.replace(/[a-zA-Z]/g, " ");
  return new Date(cleansed);
};

const useDate = (date: Date) => {
  const YYYY = getFormattedTwoDecimals(date.getFullYear());
  const MM = getFormattedTwoDecimals(date.getMonth() + 1);
  const DD = getFormattedTwoDecimals(date.getDate());
  const hh = getFormattedTwoDecimals(date.getHours());
  const mm = getFormattedTwoDecimals(date.getMinutes());
  return { YYYY, MM, DD, hh, mm };
};

export const getFormattedDate = (str: string) => {
  const date = getCleansedDate(str);
  const { YYYY, MM, DD, hh, mm } = useDate(date);
  return `${YYYY}-${MM}-${DD} ${hh}:${mm}`;
};

export const getFormattedBirthDate = (str: string) => {
  const date = getCleansedDate(str);
  const { YYYY, MM, DD } = useDate(date);
  return `${YYYY}-${MM}-${DD}`;
};
