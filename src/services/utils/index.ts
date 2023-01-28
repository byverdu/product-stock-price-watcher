const toNumber = (price: string): number | null => {
  if (!price || typeof price !== 'string') {
    return null;
  }

  const positiveNumber = 1;
  const validNumberDigits = /[.\d]/g;
  const filteredDigits = price
    .split('')
    .filter(digit => digit.match(validNumberDigits))
    .join('');
  const candidateNumber = Number(filteredDigits);

  return Math.sign(candidateNumber) === positiveNumber ? candidateNumber : null;
};

export { toNumber };
