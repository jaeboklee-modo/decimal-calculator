const decimalsData = {
  "Ethereum": {
    "ETH": 18,
    "USDT": 6,
    "USDC": 6,
    "DAI": 18,
    "LINK": 18,
    "AAVE": 18
  },
  "BNB Chain": {
    "BNB": 8,
    "USDT": 18,
    "USDC": 18,
    "BUSD": 18,
    "LINK": 18
  },
  "Avalanche": {
    "AVAX": 9,
    "USDT": 6,
    "USDC": 6,
    "DAI": 18,
    "LINK": 18
  },
  "Polygon": {
    "MATIC": 18,
    "USDT": 6,
    "USDC": 6,
    "DAI": 18,
    "LINK": 18,
    "AAVE": 18
  },
  "Arbitrum": {
    "ARB": 18,
    "USDT": 6,
    "USDC": 6,
    "DAI": 18,
    "LINK": 18
  },
  "Optimism": {
    "OP": 18,
    "USDC": 6,
    "DAI": 18,
    "LINK": 18
  },
  "Solana": {
    "SOL": 9,
    "USDT": 6,
    "USDC": 6,
    "SRM": 6
  },
  "Aptos": {
    "APT": 8,
    "USDC": 6
  },
  "Sui": {
    "SUI": 9
  },
  "TON": {
    "TON": 9
  },
  "Cardano": {
    "ADA": 6,
    "DJED": 6
  },
  "Bitcoin": {
    "BTC": 8,
    "USDT": 8
  }
};

const chainSelect = document.getElementById('chainSelect');
const tokenSelect = document.getElementById('tokenSelect');
const rawInput = document.getElementById('rawInput');
const formattedInput = document.getElementById('formattedInput');
const decimalsDisplay = document.getElementById('decimalsDisplay');
const toggleButton = document.getElementById('toggleTable');
const tableContainer = document.getElementById('tableContainer');
const toggleRefButton = document.getElementById('toggleRefTable');
const refTableContainer = document.getElementById('refTableContainer');
const toggleFaqButton = document.getElementById('toggleFaq');
const faqContainer = document.getElementById('faqContainer');

function scaleDown(value, decimals) {
  const str = value.toString();
  const d = Number(decimals);
  if (d === 0) return str;
  const pad = str.padStart(d + 1, '0');
  const intPart = pad.slice(0, -d);
  const fracPart = pad.slice(-d).replace(/0+$/, '');
  return fracPart ? intPart + '.' + fracPart : intPart;
}

function scaleUp(str, decimals) {
  const [intPart, fracPart = ''] = str.split('.');
  const d = Number(decimals);
  const frac = (fracPart + '0'.repeat(d)).slice(0, d);
  return BigInt(intPart + frac);
}

function populateChains() {
  const chains = Object.keys(decimalsData);
  chains.forEach(chain => {
    const option = document.createElement('option');
    option.value = chain;
    option.textContent = chain;
    chainSelect.appendChild(option);
  });
  chainSelect.value = chains[0];
}

function populateTokens(chain) {
  tokenSelect.innerHTML = '';
  const tokens = decimalsData[chain];
  Object.keys(tokens).forEach(token => {
    const option = document.createElement('option');
    option.value = token;
    option.textContent = token;
    tokenSelect.appendChild(option);
  });
  updateDecimals();
}

function updateDecimals() {
  const chain = chainSelect.value;
  const token = tokenSelect.value;
  const decimals = decimalsData[chain][token];
  decimalsDisplay.textContent = String(decimals);
  updateValues();
}

function updateValues() {
  const decimals = BigInt(decimalsDisplay.textContent);
  const rawStr = rawInput.value.trim();
  const fmtStr = formattedInput.value.trim();
  const scale = 10n ** decimals;

  if (document.activeElement === rawInput) {
    if (!rawStr) {
      formattedInput.value = '';
      return;
    }
    try {
      const value = BigInt(rawStr);
      formattedInput.value = scaleDown(value, decimals).toString();
    } catch (e) {
      formattedInput.value = 'invalid';
    }
  } else if (document.activeElement === formattedInput) {
    if (!fmtStr) {
      rawInput.value = '';
      return;
    }
    try {
      rawInput.value = scaleUp(fmtStr, decimals).toString();
    } catch (e) {
      rawInput.value = 'invalid';
    }
  }
}

function buildTable() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  ['Chain', 'Token', 'Decimals'].forEach(text => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  Object.keys(decimalsData).forEach(chain => {
    const tokens = decimalsData[chain];
    Object.keys(tokens).forEach(token => {
      const tr = document.createElement('tr');
      [chain, token, tokens[token]].forEach(val => {
        const td = document.createElement('td');
        td.textContent = String(val);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  });
  table.appendChild(tbody);
  tableContainer.appendChild(table);
}

populateChains();
populateTokens(chainSelect.value);
buildTable();

chainSelect.addEventListener('change', () => populateTokens(chainSelect.value));
tokenSelect.addEventListener('change', updateDecimals);
rawInput.addEventListener('input', updateValues);
formattedInput.addEventListener('input', updateValues);

toggleButton.addEventListener('click', () => {
  tableContainer.classList.toggle('hidden');
  toggleButton.textContent = tableContainer.classList.contains('hidden') ? 'Show Decimals Table' : 'Hide Decimals Table';
});

toggleRefButton.addEventListener('click', () => {
  refTableContainer.classList.toggle('hidden');
  toggleRefButton.textContent = refTableContainer.classList.contains('hidden') ? 'Show Official Reference Table' : 'Hide Official Reference Table';
});

toggleFaqButton.addEventListener('click', () => {
  faqContainer.classList.toggle('hidden');
  toggleFaqButton.textContent = faqContainer.classList.contains('hidden') ? 'Show FAQ' : 'Hide FAQ';
});
