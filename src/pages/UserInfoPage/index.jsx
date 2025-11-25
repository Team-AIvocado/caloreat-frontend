import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BodyProfile } from "./layout/BodyProfile";
import { GoalSelector } from "./layout/GoalSelector";
import { DiseaseSelector } from "./layout/DiseaseSelector";
import { AllergySelector } from "./layout/AllergySelector";
import { getUser } from "../../services/users";

export const UserInfoPage = () => {
  const numberRegex = /^\d+(\.\d+)?$/;

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

  const navigate = useNavigate();

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

  const onMain = () => {
    if (userProfile.gender == "") {
      setError({ ...error, gender: "성별을 선택해주세요" });
      return;
    } else {
      setError({ ...error, gender: "" });
    }

    if (!userProfile.age) {
      setError({ ...error, age: "나이를 입력해주세요" });
      return;
    } else if (!numberRegex.test(userProfile.age.trim())) {
      setError({ ...error, age: "숫자만 입력가능합니다." });
      return;
    } else {
      setError({ ...error, age: "" });
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

    //TODO:user profile 정보 db에 저장
    //TODO:건강 선택 사항 있다면 db에 저장

    navigate("/main");
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

              <DiseaseSelector
                condition={condition}
                updateDisease={updateDisease}
                handleToggle={handleToggle}
              />

              <AllergySelector
                condition={condition}
                updateAllergy={updateAllergy}
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
