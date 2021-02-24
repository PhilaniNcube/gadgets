const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'ZAR',
});

export default function formatMoney(cents: number) {
  const rands = cents / 100;
  return formatter.format(rands);
}
