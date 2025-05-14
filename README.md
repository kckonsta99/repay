# Recurring Expenses Reminder

A React and Firebase-based web app for manage and track recurring expenses. Sends automatic email reminders for expenses like rent, utilities, or any other monthly or periodic costs.

## Features

- **User Sign Up**: Creates an account with email and password.
- **Expense Management**: Add recurring expenses such as rent, subscriptions, utilities, and more.
- **Email Reminders**: Automatic reminder emails every month for the expenses users have added.
- **Statistics**: Provides statistics on recurring expenses, including total monthly costs and the percentage breakdown of each expense category.
- **Firebase Backend**: Data is stored in Firebase, with cloud functions sending reminder emails.

## Technologies Used

- **React**: Frontend framework to build the user interface.
- **Firebase**: Backend services for authentication, real-time database, and cloud functions.
- **Cloud Functions**: A Firebase cloud function is used to send monthly email reminders for each user's recurring expenses.