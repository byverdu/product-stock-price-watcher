const toNumber = (price: string): number | null => {
  if (!price || typeof price !== 'string') {
    return null;
  }

  const currency =
    ['£', '$', '€'].filter(currency => price.includes(currency)).pop() ?? '£';

  const result = price
    .split(currency)
    .map(words => {
      if (!words) {
        return null;
      }

      const withoutComma = words.trim().replace(',', '');

      return !isNaN(Number(withoutComma)) ? Number(withoutComma) : null;
    })
    .filter((num: number | null) => typeof num === 'number')
    .pop();

  return result ?? null;
};

export { toNumber };
