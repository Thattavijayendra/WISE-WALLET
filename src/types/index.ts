export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isOnboarded: boolean;
  createdAt: Date;
}

export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
  userId: string;
}

export interface Budget {
  userId: string;
  monthlyIncome: number;
  fixedExpenses: number;
  savingGoals: number;
  suggestedMonthlyBudget: number;
  dailyLimit: number;
  categories: {
    [key: string]: number; // category name to budget amount
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  isUnlocked: boolean;
}

export interface UserStats {
  userId: string;
  streak: number;
  lastLoginDate: Date;
  achievements: Achievement[];
  savedAmount: number;
  totalSpent: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  isCustom: boolean;
}

export interface OnboardingStep {
  title: string;
  description: string;
  image: string;
}