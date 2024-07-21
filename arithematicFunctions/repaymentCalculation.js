// function to calculate user monthly repayment after borrowing certain amount
exports.calculateMonthlyRepayment = (
  principal,
  monthlyInterestRate,
  tenure
) => {
  const r = monthlyInterestRate / 100; // Convert percentage to decimal
  const numerator = principal * r;
  const denominator = 1 - Math.pow(1 + r, -tenure);
  return numerator / denominator;
};
