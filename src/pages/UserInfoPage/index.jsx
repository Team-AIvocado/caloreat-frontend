import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserInfoPage = () => {
  //성별 스타일
  const sty = [
    "bg-white text-secondary_text text-xs px-10 py-2 rounded-lg mr-3 mb-3 border border-border_color",
    "bg-white text-secondary_text text-xs px-10 py-2 rounded-lg mr-3 mb-3 border border-main_color",
  ];

  const sty1 = [
    "bg-white text-secondary_text text-xs px-4 py-1 rounded-lg mr-2 border border-border_color",
    "bg-white text-secondary_text text-xs px-4 py-1 rounded-lg mr-2 border border-main_color",
  ];

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

  //man : 0 woman : 1
  const [userProfile, setUserProfile] = useState({
    height: null,
    weight: null,
    age: null,
    gender: null,
  });

  const [error, setError] = useState({
    height: "",
    weight: "",
    gender: "",
    age: "",
  });

  //mode : 0: loss 1 : maintain 2 : gain
  const [modeSelect, setModeSelect] = useState(null);
  const [condition, setCondition] = useState(initialCondition);

  const handleToggle = (btn, value) => {
    if (btn == value) {
      return null;
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
    if (userProfile.gender == null) {
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
          <div className="text-sm text-secondary_text mb-1.5 font-semibold">
            신체 정보
          </div>

          <div className="pl-7">
            <button
              className={userProfile.gender == 0 ? sty[1] : sty[0]}
              onClick={() => {
                setUserProfile({ ...userProfile, gender: 0 });
                setError({ ...error, gender: "" });
              }}
            >
              남성
            </button>
            <button
              className={userProfile.gender == 1 ? sty[1] : sty[0]}
              onClick={() => {
                setUserProfile({ ...userProfile, gender: 1 });
                setError({ ...error, gender: "" });
              }}
            >
              여성
            </button>
          </div>
          {error.gender && (
            <div className="text-red-400 text-xs mb-1">{error.gender}</div>
          )}
          <label className="text-xs text-secondary_text pl-6">
            나이{" "}
            <input
              className="rounded-lg border w-36 pl-3 py-2 ml-1 mr-4 mb-1.5 text-sm bg-white focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
              placeholder="나이를 입력하세요"
              value={userProfile.age}
              onChange={(e) => {
                setUserProfile({ ...userProfile, age: e.target.value });
                setError({ ...error, age: "" });
              }}
              type="text"
            />
            {error.age && (
              <div className="text-red-400 text-xs mb-1 pl-10">{error.age}</div>
            )}
          </label>

          <label className="text-xs text-secondary_text pl-6 ">
            키{" "}
            <input
              className="rounded-lg border w-36 pl-3 py-2 ml-2.5 mr-4 mb-1.5 text-sm bg-white focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
              placeholder="키(cm)를 입력하세요"
              value={userProfile.height}
              onChange={(e) => {
                setUserProfile({ ...userProfile, height: e.target.value });
                setError({ ...error, height: "" });
              }}
              type="text"
            />
            {error.height && (
              <div className="text-red-400 text-xs mb-1 pl-10">
                {error.height}
              </div>
            )}
          </label>

          <label className="text-xs text-secondary_text ">
            몸무게{" "}
            <input
              className="rounded-lg border w-40 ml-2.5 pl-3 py-2 mb-1.5 text-sm bg-white focus:ring-1 focus:ring-main_color/50 focus:outline-none focus:border-main_color border-border_color"
              placeholder="몸무게(kg)를 입력하세요"
              value={userProfile.weight}
              onChange={(e) => {
                setUserProfile({ ...userProfile, weight: e.target.value });
                setError({ ...error, weight: "" });
              }}
              type="text"
            />
            {error.weight && (
              <div className="text-red-400 text-xs mp-1 pl-14">
                {error.weight}
              </div>
            )}
          </label>

          <div className="border border-sub_color px-8 py-3 pb-7 mt-6 rounded-lg bg-white/60 ">
            <div className="text-sm text-secondary_text mb-3 font-semibold ">
              건강정보 입력 (선택){" "}
              <span
                className="underline text-xs cursor-pointer pl-4 text-gray-500"
                onClick={() => {
                  setModeSelect(null);
                  setCondition(initialCondition);
                }}
              >
                초기화
              </span>
            </div>
            <div>
              <label className="text-xs text-secondary_text pl-3">
                현재 목표{" "}
                <div className="mt-2 mb-2 pl-5">
                  <button
                    className={modeSelect == 0 ? sty1[1] : sty1[0]}
                    onClick={() => {
                      setModeSelect(handleToggle(modeSelect, 0));
                    }}
                  >
                    체중 감량
                  </button>
                  <button
                    className={modeSelect == 1 ? sty1[1] : sty1[0]}
                    onClick={() => {
                      setModeSelect(handleToggle(modeSelect, 1));
                    }}
                  >
                    유지
                  </button>
                  <button
                    className={modeSelect == 2 ? sty1[1] : sty1[0]}
                    onClick={() => {
                      setModeSelect(handleToggle(modeSelect, 2));
                    }}
                  >
                    체중 증량
                  </button>
                </div>
              </label>

              <label className="text-xs text-secondary_text pl-3">
                건강 고려 사항{" "}
                <div className="mt-3">
                  <button
                    className={
                      condition.disease.diabetes == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateDisease(
                        "diabetes",
                        handleToggle(condition.disease.diabetes, true)
                      )
                    }
                  >
                    당뇨
                  </button>
                  <button
                    className={
                      condition.disease.high_blood_pressure == true
                        ? sty1[1]
                        : sty1[0]
                    }
                    onClick={() =>
                      updateDisease(
                        "high_blood_pressure",
                        handleToggle(
                          condition.disease.high_blood_pressure,
                          true
                        )
                      )
                    }
                  >
                    고혈압
                  </button>
                  <button
                    className={
                      condition.disease.low_blood_pressure == true
                        ? sty1[1]
                        : sty1[0]
                    }
                    onClick={() =>
                      updateDisease(
                        "low_blood_pressure",
                        handleToggle(condition.disease.low_blood_pressure, true)
                      )
                    }
                  >
                    저혈압
                  </button>
                  <button
                    className={
                      condition.disease.hyperlipidemia == true
                        ? sty1[1]
                        : sty1[0]
                    }
                    onClick={() =>
                      updateDisease(
                        "hyperlipidemia",
                        handleToggle(condition.disease.hyperlipidemia, true)
                      )
                    }
                  >
                    고지혈증
                  </button>
                </div>
              </label>
              <label className="text-xs text-secondary_text pl-3">
                알레르기 정보
                <div className="mt-1.5 pl-9">
                  <button
                    className={
                      condition.allergy.milk == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "milk",
                        handleToggle(condition.allergy.milk, true)
                      )
                    }
                  >
                    우유
                  </button>
                  <button
                    className={
                      condition.allergy.eggs == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "eggs",
                        handleToggle(condition.allergy.eggs, true)
                      )
                    }
                  >
                    계란
                  </button>
                  <button
                    className={
                      condition.allergy.peanuts == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "peanuts",
                        handleToggle(condition.allergy.peanuts, true)
                      )
                    }
                  >
                    땅콩
                  </button>
                  <button
                    className={
                      condition.allergy.tree_nuts == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "tree_nuts",
                        handleToggle(condition.allergy.tree_nuts, true)
                      )
                    }
                  >
                    견과류
                  </button>
                </div>
                <div className="mt-1.5">
                  <button
                    className={
                      condition.allergy.soy == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "soy",
                        handleToggle(condition.allergy.soy, true)
                      )
                    }
                  >
                    콩
                  </button>
                  <button
                    className={
                      condition.allergy.wheat == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "wheat",
                        handleToggle(condition.allergy.wheat, true)
                      )
                    }
                  >
                    밀
                  </button>
                  <button
                    className={
                      condition.allergy.fish == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "fish",
                        handleToggle(condition.allergy.fish, true)
                      )
                    }
                  >
                    생선류
                  </button>
                  <button
                    className={
                      condition.allergy.shellfish == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "shellfish",
                        handleToggle(condition.allergy.shellfish, true)
                      )
                    }
                  >
                    조개류
                  </button>
                  <button
                    className={
                      condition.allergy.sesame == true ? sty1[1] : sty1[0]
                    }
                    onClick={() =>
                      updateAllergy(
                        "sesame",
                        handleToggle(condition.allergy.sesame, true)
                      )
                    }
                  >
                    참깨
                  </button>
                </div>
              </label>
            </div>
          </div>
          <button
            className="bg-main_color text-white rounded-lg ml-7 px-8 py-2 mt-3 text-sm cursor-pointer"
            onClick={onMain}
          >
            시작하기
          </button>
        </div>
      </div>
    </>
  );
};
