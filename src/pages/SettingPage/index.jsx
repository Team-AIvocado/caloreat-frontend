import React, { useEffect, useState } from 'react';
import { getUserInfo, getUser } from '../../services/users';
import { NicknameSection } from './components/NicknameSection';
import { PasswordSection } from './components/PasswordSection';
import { PhysicalInfoSection } from './components/PhysicalInfoSection';
import { GoalSection } from './components/GoalSection';
import { DiseaseSection } from './components/DiseaseSection';
import { DeleteAccountSection } from './components/DeleteAccountSection';
import { useNavigate } from 'react-router-dom';

export const SettingPage = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, basicInfo] = await Promise.all([
          getUserInfo(),
          getUser()
        ]);
        setUserData({ ...profileData, ...basicInfo });
      } catch (error) {
        console.error("Failed to load user settings", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main_color"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 pb-20">
      <header className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-4 text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">설정</h1>
      </header>

      <div className="space-y-6">
        <NicknameSection initialNickname={userData?.nickname} />
        <PasswordSection />
        <PhysicalInfoSection initialData={userData} />
        <GoalSection initialGoal={userData?.goal_type} />
        <DiseaseSection initialConditions={userData?.conditions || []} />
        <DeleteAccountSection currentUser={userData} />
      </div>
    </div>
  );
};
