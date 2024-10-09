// get transactions
export async function getTransactions() {
  const response = await fetch('https://api.example.com/transactions');
  const data = await response.json();
  return data;
}
