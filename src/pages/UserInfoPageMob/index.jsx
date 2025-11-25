import { useEffect, useState } from "react";
import { UserBasicInfo } from "./layout/UserBasicInfo";
import { UserBodyInfo } from "./layout/UserBodyInfo";
import { UserSelectGoal } from "./layout/UserSelectGoal";
import { UserDiseaseInfo } from "./layout/UserDiseaseInfo";
import { UserAllergyInfo } from "./layout/UserAllergyInfo";
import { getUser } from "../../services/users";

export const UserInfoPageMob = () => {
  const [step, setStep] = useState(1);

  const initialCondition = {
    disease: {
      diabetes: false,
      high_blood_pressure: false,
      low_blood_pressure: false,
      hyperlipidemia: false,
    },
    allergy: {
      milk: false,
      eggs: false,
      peanuts: false,
      tree_nuts: false, //견과류 (아몬드, 호두, 피칸,..)
      soy: false, //콩
      wheat: false,
      fish: false,
      shellfish: false,
      sesame: false, //참깨
    },
  };

  //man : 1 woman : 2
  const [userProfile, setUserProfile] = useState({
    height: "",
    weight: "",
    age: "",
    gender: "",
  });

  const [error, setError] = useState({
    height: "",
    weight: "",
    gender: "",
    age: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const loginUser = await getUser();
        console.log("success to fetch user", loginUser);
      } catch (e) {
        console.log("failed to fetch user", e);
      }
    };

    fetchUser();
  }, []);

  //mode : 0: loss 1 : maintain 2 : gain
  const [modeSelect, setModeSelect] = useState(null);
  const [condition, setCondition] = useState(initialCondition);

  const handleToggle = (btn, value) => {
    if (btn == value) {
      return "";
    } else {
      return value;
    }
  };

  const updateDisease = (key, value) => {
    setCondition((prev) => ({
      ...prev,
      disease: {
        ...prev.disease,
        [key]: value,
      },
    }));
  };

  const updateAllergy = (key, value) => {
    setCondition((prev) => ({
      ...prev,
      allergy: {
        ...prev.allergy,
        [key]: value,
      },
    }));
  };

  return (
    <>
      <div className="flex h-screen flex-col justify-center items-center">
        <div className="text-main_color text-3xl">
          <div className=" pb-5 font-bold">caloreat</div>
        </div>
        <div className="bg-white border border-sub_color px-7 py-2 rounded-lg text-sm mb-4 text-secondary_text font-light">
          당신의 맞춤 분석을 위해 몇 가지만 알려주세요!
          <div className="text-xs font-extralight text-center pt-2">
            정확하지 않아도 괜찮아요!
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          {step === 1 && (
            <UserBasicInfo
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              setError={setError}
              error={error}
              setStep={setStep}
            />
          )}
          {step === 2 && (
            <UserBodyInfo
              setStep={setStep}
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              setError={setError}
              error={error}
            />
          )}
          {step === 3 && (
            <UserSelectGoal
              setStep={setStep}
              modeSelect={modeSelect}
              setModeSelect={setModeSelect}
              handleToggle={handleToggle}
            />
          )}
          {step === 4 && (
            <UserDiseaseInfo
              setStep={setStep}
              condition={condition}
              updateDisease={updateDisease}
              handleToggle={handleToggle}
            />
          )}
          {step === 5 && (
            <UserAllergyInfo
              setStep={setStep}
              condition={condition}
              updateAllergy={updateAllergy}
              handleToggle={handleToggle}
            />
          )}
        </div>
      </div>
    </>
  );
};
