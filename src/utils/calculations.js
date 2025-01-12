export function calculateNetAmount(rate, discount) {
  return ((1 - discount / 100) * rate).toFixed(2);
}

export function calculateTotalAmount(netAmount, qty) {
  return (netAmount * qty).toFixed(2);
}
