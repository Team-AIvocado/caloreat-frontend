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
    <div className="flex flex-col items-center min-h-screen bg-main_background p-6">
      <div className="w-full max-w-150 space-y-6">
        {/* 페이지 제목 */}
        <h1 className="text-2xl font-bold text-primary_text">설정 페이지</h1>

        {/* 설정 섹션들 (w-full로 꽉 차게) */}
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
