let balance = 0;
let income = 0;
let expense = 0;
let transactions = [];

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");
const transactionList = document.getElementById("transaction-list");

const salaryForm = document.getElementById("salary-form");
const transactionForm = document.getElementById("transaction-form");

// Salary input
salaryForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const salary = parseFloat(document.getElementById("salary").value);
  balance = salary;

  // Add salary as an initial income transaction
  const salaryTransaction = { id: Date.now(), description: "Salary", amount: salary, type: "income" };
  transactions.push(salaryTransaction);
  income += salary;

  // Show sections
  document.getElementById("salary-section").classList.add("d-none");
  document.getElementById("transaction-section").classList.remove("d-none");
  document.getElementById("balance-section").classList.remove("d-none");
  document.getElementById("history-section").classList.remove("d-none");

  updateUI();
  renderTransaction(salaryTransaction);
});

// Add transaction
transactionForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  const transaction = { id: Date.now(), description, amount, type };
  transactions.push(transaction);

  if (type === "income") {
    income += amount;
    balance += amount;
  } else {
    expense += amount;
    balance -= amount;
  }

  updateUI();
  renderTransaction(transaction);

  transactionForm.reset();
});

function updateUI() {
  balanceElement.textContent = balance;
  incomeElement.textContent = income;
  expenseElement.textContent = expense;
}

function renderTransaction(transaction) {
  const li = document.createElement("li");
  li.className = `list-group-item d-flex justify-content-between align-items-center ${transaction.type}`;
  li.innerHTML = `
    ${transaction.description} <span>₹${transaction.amount}</span>
    <button class="btn btn-sm btn-outline-secondary ms-2" onclick="editTransaction(${transaction.id})">Edit</button>
  `;
  transactionList.appendChild(li);
}

// Edit transaction
function editTransaction(id) {
  const transaction = transactions.find(t => t.id === id);
  if (!transaction) return;

  // Pre-fill form with transaction details
  document.getElementById("description").value = transaction.description;
  document.getElementById("amount").value = transaction.amount;
  document.getElementById("type").value = transaction.type;

  // Remove old transaction from list and recalc
  transactions = transactions.filter(t => t.id !== id);
  recalcTotals();

  // Refresh list
  transactionList.innerHTML = "";
  transactions.forEach(renderTransaction);
}

function recalcTotals() {
  balance = 0;
  income = 0;
  expense = 0;

  transactions.forEach(t => {
    if (t.type === "income") {
      income += t.amount;
      balance += t.amount;
    } else {
      expense += t.amount;
      balance -= t.amount;
    }
  });

  updateUI();
}

// Download CSV
function downloadCSV() {
  let csvContent = "Description,Amount,Type\n";
  transactions.forEach(t => {
    csvContent += `${t.description},${t.amount},${t.type}\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "expense_statement.csv";
  a.click();
}

// Download PDF (simple text-based)
function downloadPDF() {
  const pdfContent = `
    Expense Statement\n\n
    Balance: ₹${balance}\n
    Income: ₹${income}\n
    Expense: ₹${expense}\n\n
    Transactions:\n
    ${transactions.map(t => `${t.description} - ₹${t.amount} (${t.type})`).join("\n")}
  `;

  const blob = new Blob([pdfContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "expense_statement.pdf";
  a.click();
}
