import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Gender } from "./layout/Gender";
import { BirthDate } from "./layout/BirthDate";
import { BodyProfile } from "./layout/BodyProfile";
import { GoalSelector } from "./layout/GoalSelector";
import { ConditionSelector } from "./layout/ConditionSelector";
import { createUserInfo } from "../../services/users";
import { useAuth } from "../../context/AuthContext";

export const UserInfoPage = () => {
  const { checkPreInfo } = useAuth();
  const numberRegex = /^\d+(\.\d+)?$/;

  const initialCondition = {
    diabetes: false,
    high_blood_pressure: false,
    low_blood_pressure: false,
    hyperlipidemia: false,
  };

  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState({
    height: "",
    weight: "",
    birthdate: "",
    gender: "",
  });

  const [error, setError] = useState({
    height: "",
    weight: "",
    gender: "",
    birthdate: "",
  });

  const [modeSelect, setModeSelect] = useState("");
  const [condition, setCondition] = useState(initialCondition);
  const [step, setStep] = useState(1);

  const handleToggle = (btn, value) => {
    if (btn == value) {
      return "";
    } else {
      return value;
    }
  };

  const updateCondition = (key, value) => {
    setCondition((prev) => {
      const newCondition = { ...prev, [key]: value };
      if (key === "high_blood_pressure" && value === true) {
        newCondition.low_blood_pressure = false;
      } else if (key === "low_blood_pressure" && value === true) {
        newCondition.high_blood_pressure = false;
      }
      return newCondition;
    });
  };

  const onNext = () => {
    if (step === 1) {
      if (userProfile.gender == "") {
        setError({ ...error, gender: "성별을 선택해주세요" });
        return;
      } else {
        setError({ ...error, gender: "" });
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!userProfile.birthdate) {
        setError({ ...error, birthdate: "생년월일을 입력해주세요" });
        return;
      } else {
        setError({ ...error, birthdate: "" });
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!userProfile.height) {
        setError({ ...error, height: "키를 입력해주세요" });
        return;
      } else if (!numberRegex.test(userProfile.height.trim())) {
        setError({ ...error, height: "숫자만 입력가능합니다." });
        return;
      } else {
        const h = parseFloat(userProfile.height.trim());
        if (h < 110 || h > 250) {
          setError({
            ...error,
            height: "올바른 키 값을 입력해주세요",
          });
          return;
        }
        setError({ ...error, height: "" });
      }

      if (!userProfile.weight) {
        setError({ ...error, weight: "몸무게를 입력해주세요" });
        return;
      } else if (!numberRegex.test(userProfile.weight.trim())) {
        setError({ ...error, weight: "숫자만 입력가능합니다." });
        return;
      } else {
        const w = parseFloat(userProfile.weight.trim());
        if (w < 40 || w > 160) {
          setError({
            ...error,
            weight: "올바른 몸무게 값을 입력해주세요",
          });
          return;
        }
        setError({ ...error, weight: "" });
      }
      setStep(4);
      return;
    }

    if (step === 4) {
      setStep(5);
      return;
    }
  };

  const onPrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const onMain = async () => {
    const trueConditions = Object.keys(condition).filter(
      (cond) => condition[cond] === true
    );

    try {
      await createUserInfo(userProfile, modeSelect, trueConditions);
      await checkPreInfo();
      navigate("/main/dashboard");
    } catch (e) {
      console.error("failed to create user info", e);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-main_background py-10">
        <div className="flex flex-col items-center justify-center h-[30vh]">
          <div className="text-main_color text-3xl">
            <div className=" pb-5 font-bold">caloreat</div>
          </div>
          <div className="bg-white border border-sub_color px-4 py-4 rounded-lg text-sm mb-4 text-secondary_text font-light w-72 md:w-96">
            당신의 맞춤 분석을 위해 몇 가지만 알려주세요!
            <div className="text-xs font-extralight text-center pt-2">
              정확하지 않아도 괜찮아요!
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          <div className="w-72 md:w-96">
            {step === 1 && (
              <Gender
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                setError={setError}
                error={error}
                onNext={onNext}
                onPrev={() => navigate(-1)}
              />
            )}

            {step === 2 && (
              <BirthDate
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                setError={setError}
                error={error}
                onNext={onNext}
                onPrev={onPrev}
              />
            )}

            {step === 3 && (
              <BodyProfile
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                setError={setError}
                error={error}
                onNext={onNext}
                onPrev={onPrev}
              />
            )}

            {step === 4 && (
              <div className="flex flex-col w-full">
                <div className="flex flex-col items-center w-full mb-3">
                  <div className="text-lg text-secondary_text mb-3 font-semibold w-full text-center">
                    목표 설정 (선택사항)
                  </div>
                  <div className="flex justify-end w-full">
                    <button
                      className="text-xs text-secondary_text underline cursor-pointer"
                      onClick={() => setModeSelect("")}
                    >
                      초기화
                    </button>
                  </div>
                </div>
                <GoalSelector
                  modeSelect={modeSelect}
                  setModeSelect={setModeSelect}
                  handleToggle={handleToggle}
                />
                <div className="flex flex-row justify-between w-full mt-6">
                  <button
                    className="bg-white border border-border_color text-secondary_text rounded-lg px-8 py-2 text-sm cursor-pointer w-[48%]"
                    onClick={onPrev}
                  >
                    이전
                  </button>
                  <button
                    className="bg-main_color text-white rounded-lg px-8 py-2 text-sm cursor-pointer w-[48%]"
                    onClick={onNext}
                  >
                    다음
                  </button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="flex flex-col w-full">
                <div className="flex flex-col items-center w-full mb-3">
                  <div className="text-lg text-secondary_text mb-3 font-semibold w-full text-center">
                    건강 정보 (선택사항)
                  </div>
                  <div className="flex justify-end w-full">
                    <button
                      className="text-xs text-secondary_text underline cursor-pointer"
                      onClick={() => setCondition(initialCondition)}
                    >
                      초기화
                    </button>
                  </div>
                </div>
                <ConditionSelector
                  condition={condition}
                  updateCondition={updateCondition}
                  handleToggle={handleToggle}
                />
                <div className="flex flex-row justify-between w-full mt-6">
                  <button
                    className="bg-white border border-border_color text-secondary_text rounded-lg px-8 py-2 text-sm cursor-pointer w-[48%]"
                    onClick={onPrev}
                  >
                    이전
                  </button>
                  <button
                    className="bg-main_color text-white rounded-lg px-8 py-2 text-sm cursor-pointer w-[48%]"
                    onClick={onMain}
                  >
                    완료
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
