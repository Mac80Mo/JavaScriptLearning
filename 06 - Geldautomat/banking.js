// Variablen - Start
// Komponenten
const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expensesElement = document.getElementById("expenses");
const transactionListElement = document.getElementById("transactionList");
// Buttons
const depositeButton = document.getElementById("depositButton");
const withdrawButton = document.getElementById("withdrawButton");
// Variablen Ende

// EVENT-LISTENER
// Einzahlen-Button
depositeButton.addEventListener("click", function() {
    const amount = prompt("Welcher Betrag (in EUR) soll eingezahlt werden?", "0");
    updateUI(amount, true);
});

// Auszahlen-Button
withdrawButton.addEventListener("click", function() {
    const amount = prompt("Welcher Betrag (in EUR) soll abgehoben werden?", "0");
    updateUI(amount, false);
})

// Event-Listener - ENDE

// Funktionen - START
// Update - UI
function updateUI(amount, isDeposit) {
    const convertedAmount = Number(amount);

    updateBalance(convertedAmount, isDeposit);
    updateSums(amount, isDeposit);
    updateTransactions(convertedAmount, isDeposit);
}

// Update Kontostand
function updateBalance(amount, isDeposit) {
    const currentBalance = Number(balanceElement.textContent);
    const newBalance = isDeposit 
        ? currentBalance + amount 
        : currentBalance - amount;
    balanceElement.textContent = newBalance;
}
// Update - Einnahmen
function updateIncome(amount) {
    const currentIncome = Number(incomeElement.textContent);
    const newIncome = currentIncome + Number(amount);
    incomeElement.textContent = newIncome;
}
// Update - Ausgaben
function updateExpenses(amount) {
    const currentExpenses = Number(expensesElement.textContent);
    const newExpenses = currentExpenses + Number(amount);
    expensesElement.textContent = newExpenses;
}
// Update - Summen (Einnahmen/Summen)
function updateSums(amount, isDeposite) {
    if (isDeposite) {
        updateIncome(amount);
    } else {
        updateExpenses(amount);
    }
}
// Update - Buchunge
function updateTransactions(amount, isDeposit) {
    const transactionElement = document.createElement("div");
    transactionElement.classList.add("transaction");

    const columnType = document.createElement("div");
    columnType.classList.add("column");

    const typeElement = document.createElement("span");
    typeElement.classList.add("type");

    typeElement.textContent = isDeposit ? "Einzahlung" : "Auszahlung";

    const columnAmount = document.createElement("div");
    columnAmount.classList.add("column");

    const amountElement = document.createElement("span");
    amountElement.classList.add("amount")

    amountElement.textContent = amount;

    columnType.appendChild(typeElement);
    columnAmount.appendChild(amountElement);
    transactionElement.append(columnType, columnAmount);
    transactionListElement.prepend(transactionElement);


}


// Funktionen - ENDE

