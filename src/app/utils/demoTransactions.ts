export type DemoTransaction = {
  label: string;
  merchant: string;
  amount: number;
  category: string;
  budgetLimit: number;
  budgetSpent: number;
  savingsGoal: string;
  emoji: string;
};

export const DEMO_TRANSACTIONS: DemoTransaction[] = [
  {
    label: "Tealive RM 18",
    merchant: "Tealive",
    amount: 18,
    category: "drinks",
    budgetLimit: 50,
    budgetSpent: 40,
    savingsGoal: "Raya Fund",
    emoji: "\u{1F9CB}",
  },
  {
    label: "GrabFood RM 35",
    merchant: "GrabFood",
    amount: 35,
    category: "food",
    budgetLimit: 350,
    budgetSpent: 300,
    savingsGoal: "Emergency Fund",
    emoji: "\u{1F371}",
  },
  {
    label: "Shopee RM 120",
    merchant: "Shopee",
    amount: 120,
    category: "shopping",
    budgetLimit: 100,
    budgetSpent: 80,
    savingsGoal: "Travel Fund",
    emoji: "\u{1F6CD}\uFE0F",
  },
];
