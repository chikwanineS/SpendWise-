// SpendWise - JavaScript foundation
// Collects budget and expense data with prompts, calculates the remaining
// balance, and prints labeled results to the browser console.

// ---------- 1. Application data (variables and data types) ----------
const appName = "SpendWise";        // string
const currency = "$";               // string - change to your own currency symbol
let monthlyBudget = 0;              // number
let savingsGoal = 0;                // number
let expenseNames = [];              // array of strings
let expenseAmounts = [];            // array of numbers
let isOverBudget = false;           // boolean

// ---------- 2. Input helpers ----------

// Ask for a number. Keeps asking until the user gives a valid, non-negative number.
// Returns null if the user presses Cancel.
function askForNumber(message) {
  while (true) {
    const answer = prompt(message);
    if (answer === null) return null;

    const value = Number(answer);
    if (answer.trim() !== "" && !isNaN(value) && value >= 0) {
      return value;
    }
    alert("Please enter a valid number (0 or higher).");
  }
}

// Collect the monthly budget and savings goal.
function collectBudgetInfo() {
  const budget = askForNumber("Enter your total budget for this month:");
  if (budget === null) return false;

  const savings = askForNumber("How much do you want to save this month? (enter 0 for none)");
  if (savings === null) return false;

  monthlyBudget = budget;
  savingsGoal = savings;
  return true;
}

// Collect expenses one at a time until the user stops.
function collectExpenses() {
  expenseNames = [];
  expenseAmounts = [];

  const count = askForNumber("How many expenses do you want to enter?");
  if (count === null) return;

  for (let i = 1; i <= Math.floor(count); i++) {
    const name = prompt("Expense " + i + " - what is it for? (e.g. Rent, Food)");
    if (name === null) break;

    const amount = askForNumber("How much was \"" + (name.trim() || "Expense " + i) + "\"?");
    if (amount === null) break;

    expenseNames.push(name.trim() || "Expense " + i);
    expenseAmounts.push(amount);
  }
}

// ---------- 3. Budget calculations ----------

// Add up every expense amount.
function calculateTotalExpenses(amounts) {
  let total = 0;
  for (let i = 0; i < amounts.length; i++) {
    total += amounts[i];
  }
  return total;
}

// Budget minus expenses.
function calculateRemainingBalance(budget, totalExpenses) {
  return budget - totalExpenses;
}

// Percentage of the budget already spent (0 if there is no budget).
function calculatePercentSpent(budget, totalExpenses) {
  if (budget === 0) return 0;
  return (totalExpenses / budget) * 100;
}

// Money left after setting the savings goal aside (never below 0).
function calculateSpendableAfterSavings(remaining, savings) {
  return Math.max(remaining - savings, 0);
}

// Short message describing the user's situation.
function getBudgetStatus(remaining, savings) {
  if (remaining < 0) return "Over budget. Review your expenses.";
  if (remaining < savings) return "Within budget, but short of your savings goal.";
  return "On track. You are within budget and meeting your savings goal.";
}

// Format a number as money, e.g. $1,250.50
function formatMoney(amount) {
  return currency + amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// ---------- 4. Display results in the console ----------
function displayResults() {
  const totalExpenses = calculateTotalExpenses(expenseAmounts);
  const remaining = calculateRemainingBalance(monthlyBudget, totalExpenses);
  const percentSpent = calculatePercentSpent(monthlyBudget, totalExpenses);
  const spendable = calculateSpendableAfterSavings(remaining, savingsGoal);
  isOverBudget = remaining < 0;

  console.log("========== " + appName + " Summary ==========");
  console.log("Monthly budget:        " + formatMoney(monthlyBudget));
  console.log("Savings goal:          " + formatMoney(savingsGoal));
  console.log("Number of expenses:    " + expenseAmounts.length);

  if (expenseAmounts.length > 0) {
    console.log("Your expenses:");
    for (let i = 0; i < expenseAmounts.length; i++) {
      console.log("  " + (i + 1) + ". " + expenseNames[i] + ": " + formatMoney(expenseAmounts[i]));
    }
  }

  console.log("----------------------------------------");
  console.log("Total expenses:        " + formatMoney(totalExpenses));
  console.log("Remaining balance:     " + formatMoney(remaining));
  console.log("Budget spent:          " + percentSpent.toFixed(1) + "%");
  console.log("Spendable after saving:" + " " + formatMoney(spendable));
  console.log("Over budget?           " + (isOverBudget ? "Yes" : "No"));
  console.log("Status:                " + getBudgetStatus(remaining, savingsGoal));
  console.log("========================================");
}

// ---------- 5. Run the app ----------
function runSpendWise() {
  console.clear();
  console.log("Welcome to " + appName + "!");

  const gotBudget = collectBudgetInfo();
  if (!gotBudget) {
    console.log("Setup cancelled. Press \"Run SpendWise again\" to start over.");
    return;
  }

  collectExpenses();
  displayResults();
}

document.getElementById("run-btn").addEventListener("click", runSpendWise);

// Start once the page has finished rendering.
window.addEventListener("load", function () {
  setTimeout(runSpendWise, 100);
});