import { sty1 } from "../../../utils/styles";

export const AllergySelector = ({ condition, updateAllergy, handleToggle }) => {
  return (
    <label className="text-xs text-secondary_text pl-3">
      알레르기 정보
      <div className="mt-1.5 pl-9">
        <button
          className={condition.allergy.milk == true ? sty1[1] : sty1[0]}
          onClick={() =>
            updateAllergy("milk", handleToggle(condition.allergy.milk, true))
          }
        >
          우유
        </button>
        <button
          className={condition.allergy.eggs == true ? sty1[1] : sty1[0]}
          onClick={() =>
            updateAllergy("eggs", handleToggle(condition.allergy.eggs, true))
          }
        >
          계란
        </button>
        <button
          className={condition.allergy.peanuts == true ? sty1[1] : sty1[0]}
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
          className={condition.allergy.tree_nuts == true ? sty1[1] : sty1[0]}
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
          className={condition.allergy.soy == true ? sty1[1] : sty1[0]}
          onClick={() =>
            updateAllergy("soy", handleToggle(condition.allergy.soy, true))
          }
        >
          콩
        </button>
        <button
          className={condition.allergy.wheat == true ? sty1[1] : sty1[0]}
          onClick={() =>
            updateAllergy("wheat", handleToggle(condition.allergy.wheat, true))
          }
        >
          밀
        </button>
        <button
          className={condition.allergy.fish == true ? sty1[1] : sty1[0]}
          onClick={() =>
            updateAllergy("fish", handleToggle(condition.allergy.fish, true))
          }
        >
          생선류
        </button>
        <button
          className={condition.allergy.shellfish == true ? sty1[1] : sty1[0]}
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
          className={condition.allergy.sesame == true ? sty1[1] : sty1[0]}
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
  );
};
