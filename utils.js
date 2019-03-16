const formatCurrency = currency =>
  Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'symbol' }).format(currency);

module.exports = { formatCurrency };
