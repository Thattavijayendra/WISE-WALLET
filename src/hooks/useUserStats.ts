

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { UserStats, Achievement } from '../types';

// Default achievements
const defaultAchievements: Achievement[] = [
  {
    id: 'first-login',
    title: 'First Steps',
    description: 'Log into the app for the first time',
    icon: 'award',
    isUnlocked: true,
    unlockedAt: new Date()
  },
  {
    id: 'week-streak',
    title: 'Week Warrior',
    description: 'Log expenses for 7 consecutive days',
    icon: 'calendar',
    isUnlocked: false
  },
  {
    id: 'budget-champ',
    title: 'Budget Champ',
    description: 'Stay within budget for a full month',
    icon: 'trophy',
    isUnlocked: false
  },
  {
    id: 'saver',
    title: 'Super Saver',
    description: 'Save ₹5000 or more in a month',
    icon: 'piggy-bank',
    isUnlocked: false
  },
  {
    id: 'tracker',
    title: 'Expense Tracker',
    description: 'Track 50 expenses',
    icon: 'list',
    isUnlocked: false
  }
];

export const useUserStats = (userId: string) => {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setStats(null);
      setLoading(false);
      return;
    }

    const fetchUserStats = async () => {
      try {
        const statsRef = doc(db, 'users', userId, 'userStats');
        const statsDoc = await getDoc(statsRef);
        
        if (statsDoc.exists()) {
          const statsData = statsDoc.data();
          
          setStats({
            ...statsData,
            lastLoginDate: statsData.lastLoginDate.toDate(),
            achievements: statsData.achievements.map((achievement: any) => ({
              ...achievement,
              unlockedAt: achievement.unlockedAt ? achievement.unlockedAt.toDate() : undefined
            })),
            userId
          } as UserStats);
        } else {
          const newStats: UserStats = {
            userId,
            streak: 1,
            lastLoginDate: new Date(),
            achievements: defaultAchievements,
            savedAmount: 0,
            totalSpent: 0
          };
          
          await setDoc(statsRef, {
            ...newStats,
            achievements: newStats.achievements.map(a => ({
              ...a,
              unlockedAt: a.unlockedAt || null
            }))
          });
          
          setStats(newStats);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user stats:', err);
        setError('Failed to load user stats. Please try again.');
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [userId]);

  const updateUserStreak = async () => {
    if (!stats) return { success: false, error: 'No stats found' };
    
    try {
      const today = new Date();
      const lastLogin = stats.lastLoginDate;
      
      // Check if last login was yesterday (handle month boundary too)
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);

      const isConsecutiveDay = lastLogin.toDateString() === yesterday.toDateString();

      const newStreak = isConsecutiveDay ? stats.streak + 1 : 1;
      
      const statsRef = doc(db, 'users', userId, 'userStats');
      await updateDoc(statsRef, { 
        streak: newStreak,
        lastLoginDate: today
      });
      
      setStats({
        ...stats,
        streak: newStreak,
        lastLoginDate: today
      });
      
      return { success: true, streak: newStreak };
    } catch (err) {
      console.error('Error updating streak:', err);
      setError('Failed to update streak. Please try again.');
      return { success: false, error: 'Failed to update streak' };
    }
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!stats) return { success: false, error: 'No stats found' };
    
    const achievement = stats.achievements.find(a => a.id === achievementId);
    if (!achievement || achievement.isUnlocked) {
      return { success: false, error: 'Achievement not found or already unlocked' };
    }
    
    try {
      const updatedAchievements = stats.achievements.map(a => 
        a.id === achievementId 
          ? { ...a, isUnlocked: true, unlockedAt: new Date() } 
          : a
      );
      
      const statsRef = doc(db, 'users', userId, 'userStats');
      await updateDoc(statsRef, { 
        achievements: updatedAchievements.map(a => ({
          ...a,
          unlockedAt: a.unlockedAt || null
        }))
      });
      
      setStats({
        ...stats,
        achievements: updatedAchievements
      });
      
      return { 
        success: true, 
        achievement: updatedAchievements.find(a => a.id === achievementId) 
      };
    } catch (err) {
      console.error('Error unlocking achievement:', err);
      setError('Failed to unlock achievement. Please try again.');
      return { success: false, error: 'Failed to unlock achievement' };
    }
  };

  const updateFinancialStats = async (newExpenseAmount: number, savedAmount: number) => {
    if (!stats) return { success: false, error: 'No stats found' };
    
    try {
      const updatedTotalSpent = stats.totalSpent + newExpenseAmount;
      const updatedSavedAmount = stats.savedAmount + savedAmount;
      
      const statsRef = doc(db, 'users', userId, 'userStats');
      await updateDoc(statsRef, { 
        totalSpent: updatedTotalSpent,
        savedAmount: updatedSavedAmount
      });
      
      setStats({
        ...stats,
        totalSpent: updatedTotalSpent,
        savedAmount: updatedSavedAmount
      });
      
      return { success: true };
    } catch (err) {
      console.error('Error updating financial stats:', err);
      setError('Failed to update financial stats. Please try again.');
      return { success: false, error: 'Failed to update financial stats' };
    }
  };

  return { 
    stats, 
    loading, 
    error, 
    updateUserStreak,
    unlockAchievement,
    updateFinancialStats
  };
};
