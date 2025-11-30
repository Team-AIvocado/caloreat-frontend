import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BodyProfile } from "./layout/BodyProfile";
import { GoalSelector } from "./layout/GoalSelector";
import { ConditionSelector } from "./layout/ConditionSelector";
import { createUserInfo } from "../../services/users";

export const UserInfoPage = () => {
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

  const handleToggle = (btn, value) => {
    if (btn == value) {
      return "";
    } else {
      return value;
    }
  };

  const updateCondition = (key, value) => {
    setCondition((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const onMain = () => {
    if (userProfile.gender == "") {
      setError({ ...error, gender: "성별을 선택해주세요" });
      return;
    } else {
      setError({ ...error, gender: "" });
    }

    const now = new Date();
    const inputDate = userProfile.birthdate.split("-");

    if (!userProfile.birthdate) {
      setError({ ...error, birthdate: "생년월일을 입력해주세요" });
      return;
    } else if (
      inputDate[0] > now.getFullYear() ||
      (inputDate[0] == now.getFullYear() &&
        inputDate[1] > now.getMonth() + 1) ||
      (inputDate[0] == now.getFullYear() &&
        inputDate[1] == now.getMonth() + 1 &&
        inputDate[2] > now.getDate())
    ) {
      setError({ ...error, birthdate: "생년월일을 올바르게 입력해주세요" });
      return;
    } else {
      setError({ ...error, birthdate: "" });
    }

    if (!userProfile.height) {
      setError({ ...error, height: "키를 입력해주세요" });
      return;
    } else if (!numberRegex.test(userProfile.height.trim())) {
      setError({ ...error, height: "숫자만 입력가능합니다." });
      return;
    } else {
      setError({ ...error, height: "" });
    }

    if (!userProfile.weight) {
      setError({ ...error, weight: "몸무게를 입력해주세요" });
      return;
    } else if (!numberRegex.test(userProfile.weight.trim())) {
      setError({ ...error, weight: "숫자만 입력가능합니다." });
      return;
    } else {
      setError({ ...error, weight: "" });
    }

    const trueConditions = Object.keys(initialCondition).filter(
      (cond) => initialCondition[cond] === true
    );

    try {
      createUserInfo(userProfile, modeSelect, trueConditions);
    } catch {
      console.log("failed to create user info");
    }
    navigate("/main/dashboard");
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
          <BodyProfile
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            setError={setError}
            error={error}
          />

          <div className="border border-sub_color px-8 py-3 pb-7 mt-6 rounded-lg bg-white/60 ">
            <div className="text-sm text-secondary_text mb-3 font-semibold ">
              건강정보 입력 (선택){" "}
              <span
                className="underline text-xs cursor-pointer pl-4 text-gray-500"
                onClick={() => {
                  setModeSelect("");
                  setCondition(initialCondition);
                }}
              >
                초기화
              </span>
            </div>
            <div>
              <GoalSelector
                modeSelect={modeSelect}
                setModeSelect={setModeSelect}
                handleToggle={handleToggle}
              />

              <ConditionSelector
                condition={condition}
                updateCondition={updateCondition}
                handleToggle={handleToggle}
              />
            </div>
          </div>
          <button
            className="bg-main_color text-white rounded-lg px-8 py-2 mt-3 text-sm cursor-pointer"
            onClick={onMain}
          >
            시작하기
          </button>
        </div>
      </div>
    </>
  );
};
