export const getValidParams = (params: Record<string, any>) => {
  const filtered = Object.entries(params).filter(([_, value]) => !!value);
  const newParams = filtered.reduce((accum, [key, value]) => {
    accum[key] = value;
    return accum;
  }, {} as { [key: string]: number | string });
  return newParams;
};
