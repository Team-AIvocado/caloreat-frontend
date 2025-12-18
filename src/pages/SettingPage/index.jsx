// SettingPage 전용 섹션 컴포넌트들 import
import DarkModeSection from "./components/DarkModeSection";
import NicknameSection from "./components/NicknameSection";
import PasswordSection from "./components/PasswordSection";
import PhysicalInfoSection from "./components/PhysicalInfoSection";
import GoalSection from "./components/GoalSection";
import DiseaseSection from "./components/DiseaseSection";

/* SettingPage 섹션 조합만 담당 */
export const SettingPage = () => {
  return (
    // 전체 페이지 컨테이너
    <div className="flex flex-col items-center min-h-screen bg-main_background dark:bg-gray-900 p-6">
      
      {/* 내부 감싸는 Wrapper */}
      <div className="w-full max-w-150 space-y-6">
        {/* 페이지 제목 */}
        <h1 className="text-2xl font-bold text-primary_text dark:text-white mb-8">
          설정 
        </h1>
        {/* 섹션 컴포넌트들이 렌더링되는 부분 */}
        <div className="w-full space-y-6">
          <DarkModeSection />
          <NicknameSection />
          <PasswordSection />
          <PhysicalInfoSection />
          <GoalSection />
          <DiseaseSection />
        </div>
        
      </div>
    </div>
  );
};
