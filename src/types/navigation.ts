export type AppScreen =
  | 'onboarding'
  | 'signin'
  | 'signup'
  | 'home'
  | 'wallet'
  | 'transactions'
  | 'transaction-detail'
  | 'budgets'
  | 'analytics'
  | 'goals'
  | 'cards'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'add-transaction';

export type TransactionItem = {
  id: string;
  title: string;
  category: string;
  amount: string;
  subtitle: string;
  type: 'income' | 'expense';
  tint: string;
};