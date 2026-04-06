import { TransactionItem } from '../types/navigation';

export const insights = [
  { label: 'Income', value: '$8,450', delta: '+12%' },
  { label: 'Expenses', value: '$4,890', delta: '-4%' },
  { label: 'Saved', value: '$2,130', delta: '+18%' },
];

export const transactions: TransactionItem[] = [
  {
    id: 'tx-1',
    title: 'Drift Coffee',
    category: 'Food & Drink',
    amount: '-$8.60',
    subtitle: 'Today, 08:45',
    type: 'expense',
    tint: '#ef7f5a',
  },
  {
    id: 'tx-2',
    title: 'Salary Deposit',
    category: 'Income',
    amount: '+$4,200',
    subtitle: 'Apr 4, 09:10',
    type: 'income',
    tint: '#1d7c6d',
  },
  {
    id: 'tx-3',
    title: 'Cloud Store',
    category: 'Subscriptions',
    amount: '-$18.99',
    subtitle: 'Apr 3, 22:14',
    type: 'expense',
    tint: '#e7b868',
  },
  {
    id: 'tx-4',
    title: 'Ava Johnson',
    category: 'Transfer',
    amount: '-$240',
    subtitle: 'Apr 2, 16:00',
    type: 'expense',
    tint: '#c98bff',
  },
  {
    id: 'tx-5',
    title: 'Stock Dividend',
    category: 'Investments',
    amount: '+$126',
    subtitle: 'Apr 1, 07:20',
    type: 'income',
    tint: '#4f8cff',
  },
];

export const budgets = [
  { name: 'Groceries', spent: '$420', total: '$600', progress: 0.7, color: '#1d7c6d' },
  { name: 'Transport', spent: '$110', total: '$180', progress: 0.61, color: '#ef7f5a' },
  { name: 'Entertainment', spent: '$280', total: '$300', progress: 0.93, color: '#e7b868' },
  { name: 'Shopping', spent: '$360', total: '$500', progress: 0.72, color: '#5c8f84' },
];

export const goals = [
  { name: 'Emergency Fund', saved: '$8,200', target: '$12,000', progress: 0.68 },
  { name: 'Summer Trip', saved: '$1,950', target: '$3,000', progress: 0.65 },
  { name: 'New Laptop', saved: '$840', target: '$2,200', progress: 0.38 },
];

export const alerts = [
  'Budget alert: Entertainment reached 93% of monthly limit.',
  'Your electricity bill is due tomorrow.',
  'You saved 18% more than last month.',
  'Card ending in 4821 was used for a $18.99 subscription.',
];

export const cards = [
  { name: 'Fluyo Black', number: '**** 4821', balance: '$12,840', accent: '#173133' },
  { name: 'Travel Debit', number: '**** 1943', balance: '$4,230', accent: '#1d7c6d' },
];

export const weeklySpending = [42, 61, 36, 78, 54, 90, 65];

export function getTransactionById(id: string) {
  return transactions.find((item) => item.id === id);
}