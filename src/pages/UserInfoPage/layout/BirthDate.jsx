import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/ko";
import dayjs from "dayjs";

export const BirthDate = ({
  userProfile,
  setUserProfile,
  setError,
  error,
  onNext,
  onPrev,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-lg text-secondary_text mb-3 font-semibold w-full text-center">
        생년월일 입력
      </div>

      <div className="flex flex-col items-center w-full space-y-4">
        <div className="flex flex-col w-2/3">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <DatePicker
              label="생년월일"
              value={
                userProfile.birthdate ? dayjs(userProfile.birthdate) : null
              }
              onChange={(newValue) => {
                setUserProfile({
                  ...userProfile,
                  birthdate: newValue ? newValue.format("YYYY-MM-DD") : "",
                });
                setError({ ...error, birthdate: "" });
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  size: "small",
                  sx: {
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "white",
                      borderRadius: "8px",
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
          {error.birthdate && (
            <div className="text-red-400 text-xs mt-1 ml-1 text-center">
              {error.birthdate}
            </div>
          )}
        </div>
      </div>

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
  );
};
