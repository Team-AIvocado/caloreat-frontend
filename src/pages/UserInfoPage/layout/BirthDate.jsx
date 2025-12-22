import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useDarkMode } from "../../../hooks/useDarkMode";

const getLocalTheme = (mode) => {
  return createTheme({
    palette: {
      mode: mode,
      text: {
        primary: mode === "dark" ? "#ffffff" : "#000000",
      },
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3b82f6", // Main Color Blue
              borderWidth: "2px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3b82f6",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#3b82f6",
            },
            "& input": {
              color: mode === "dark" ? "#ffffff !important" : "#000000 !important",
              caretColor: mode === "dark" ? "#ffffff !important" : "#000000 !important",
              WebkitTextFillColor: mode === "dark" ? "#ffffff !important" : "#000000 !important",
            },
          },
        },
      },
    },
  });
};

export const BirthDate = ({
  userProfile,
  setUserProfile,
  setError,
  error,
  onNext,
  onPrev,
}) => {
  const isDarkMode = useDarkMode();

  const currentTheme = getLocalTheme(isDarkMode ? "dark" : "light");

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-lg text-secondary_text mb-3 font-semibold w-full text-center">
        생년월일 입력
      </div>

      <div className="flex flex-col items-center w-full space-y-4">
        {/* Tailwind handles the Container background & Border */}
        <div className="
            flex flex-col w-2/3
            [&_.MuiOutlinedInput-root]:!bg-gray-800
            [&_fieldset]:!border-main_color
            [&_fieldset]:!border-2
            [&_.MuiInputLabel-root]:!text-gray-400
            [&_.MuiInputLabel-root.Mui-focused]:!text-blue-500
          ">
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
            <ThemeProvider theme={currentTheme}>
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
                    size: "small",
                    // InputLabelProps needs to be manually styled or themed if needed, 
                    // but focusing on the input text per user request.
                    InputLabelProps: {
                      sx: { color: '#9ca3af', '&.Mui-focused': { color: '#3b82f6' } }
                    }
                  },
                }}
              />
            </ThemeProvider>
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
          className="bg-white dark:bg-gray-800 border border-border_color text-secondary_text dark:text-white rounded-lg px-8 py-2 text-sm cursor-pointer w-[48%]"
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
