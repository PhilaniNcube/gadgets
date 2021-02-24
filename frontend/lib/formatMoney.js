export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 2,
  };

  // check if it is a clean amount
  if (amount % 100 === 0) {
    options.minimumFractionDigits = 0;
  }

  const formatter = new Intl.NumberFormat('en-ZA', options);

  return formatter.format(amount / 100);
}
