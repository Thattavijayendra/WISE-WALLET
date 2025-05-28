import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUserStats } from '../hooks/useUserStats';
import Layout from '../components/Layout';
import { Award, Lock } from 'lucide-react';

const Achievements: React.FC = () => {
  const { currentUser } = useAuth();
  const { stats, loading } = useUserStats(currentUser?.uid || '');
  
  return (
    <Layout title="Achievements">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <Award className="text-emerald-400 mr-2" size={24} />
            <h2 className="text-xl font-semibold text-white">Your Achievements</h2>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse bg-gray-700 p-6 rounded-lg">
                  <div className="h-10 w-10 bg-gray-600 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-600 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-600 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : stats?.achievements && stats.achievements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-lg ${
                    achievement.isUnlocked
                      ? 'bg-gradient-to-br from-emerald-900 to-gray-800 border border-emerald-700'
                      : 'bg-gray-700 opacity-75'
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`p-3 rounded-full mr-4 ${
                        achievement.isUnlocked ? 'bg-emerald-500' : 'bg-gray-600'
                      }`}
                    >
                      {achievement.isUnlocked ? (
                        <Award size={24} className="text-white" />
                      ) : (
                        <Lock size={24} className="text-gray-400" />
                      )}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-2">
                        {achievement.description}
                      </p>
                      
                      {achievement.isUnlocked && achievement.unlockedAt && (
                        <p className="text-emerald-400 text-xs">
                          Unlocked on {achievement.unlockedAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Award size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-300 mb-2">No achievements found</p>
              <p className="text-gray-400 text-sm">Start tracking your expenses to earn achievements!</p>
            </div>
          )}
        </div>
        
        {/* Current Streak */}
        {stats && (
          <div className="mt-6 bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-white mb-1">Current Streak</h3>
                <p className="text-gray-300 text-sm">Log expenses daily to build your streak</p>
              </div>
              <div className="bg-emerald-500 bg-opacity-20 text-emerald-400 px-4 py-2 rounded-lg font-bold text-xl">
                {stats.streak} days
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Achievements;