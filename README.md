# SpendWise

## What the project does

SpendWise is a small budgeting app. You enter your monthly budget, a savings goal and your expenses. SpendWise adds up your spending, works out your remaining balance and prints a clearly labeled summary in the browser console.

### How to run it

1. Open `index.html` in a browser.
2. Open the developer console (`F12`, then the **Console** tab).
3. Answer the prompts. Your results appear in the console.
4. Press **Run SpendWise again** to start over.

## JavaScript concepts implemented

- Linking an external script with `<script src="script.js">`
- Variables with `const` and `let`
- Data types: strings, numbers, booleans and arrays
- User input with `prompt()` and `alert()`
- Input validation with `Number()`, `isNaN()` and a `while` loop
- Arithmetic operators and `Math.max()`
- Conditionals (`if`) and loops (`for`, `while`)
- Functions with parameters and return values
- Output with `console.log()`, plus basic DOM use (`getElementById`, `addEventListener`)

## How variables are used

- `const` holds values that never change, such as `appName` and `currency`.
- `let` holds values that change as the user answers: `monthlyBudget`, `savingsGoal` and `isOverBudget`.
- `expenseNames` and `expenseAmounts` are arrays that store each expense and its cost. Both arrays use the same index, so `expenseNames[0]` matches `expenseAmounts[0]`.
- Variables inside functions, such as `totalExpenses` and `remaining`, store intermediate results.

## How user input is collected

- `collectBudgetInfo()` asks for the monthly budget and the savings goal.
- `collectExpenses()` asks how many expenses there are, then asks for a name and an amount for each one.
- `askForNumber()` is a helper that wraps `prompt()`. It converts the answer with `Number()` and keeps asking until the value is a valid number of 0 or higher.
- Pressing Cancel stops the current step without crashing.

## How calculations are performed

- Total expenses: `calculateTotalExpenses()` loops through `expenseAmounts` and adds each amount.
- Remaining balance: `calculateRemainingBalance()` returns `budget - totalExpenses`.
- Percent spent: `calculatePercentSpent()` returns `(totalExpenses / budget) * 100`, and 0 if the budget is 0.
- Spendable after savings: `calculateSpendableAfterSavings()` subtracts the savings goal from the remaining balance, never going below 0.
- Status: `getBudgetStatus()` checks whether the user is over budget, short of their savings goal, or on track.

## How functions help organize the code

Each function does one job, so the code is easier to read, test and reuse.

| Function | Job |
| --- | --- |
| `askForNumber` | Prompt for a valid number |
| `collectBudgetInfo` | Gather budget and savings goal |
| `collectExpenses` | Gather expense names and amounts |
| `calculateTotalExpenses` | Sum the expenses |
| `calculateRemainingBalance` | Budget minus expenses |
| `calculatePercentSpent` | Share of the budget used |
| `calculateSpendableAfterSavings` | Money left after the savings goal |
| `getBudgetStatus` | Plain-language status message |
| `formatMoney` | Format numbers as currency |
| `displayResults` | Print the labeled summary to the console |
| `runSpendWise` | Run the whole flow in order |

## Files

- `index.html`: page structure and instructions
- `style.css`: styling
- `script.js`: all application logic
- `README.md`: this file

## Notes

To change the currency symbol, edit the `currency` constant at the top of `script.js`.