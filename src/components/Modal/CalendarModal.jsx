import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";

const MONTHS = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const CalendarModal = ({ open, value, onClose, onSelect }) => {
  const [viewDate, setViewDate] = useState(value || new Date());

  // 모달이 열릴 때마다 viewDate를 value로 초기화
  useEffect(() => {
    if (open) {
      setViewDate(value || new Date());
    }
  }, [open, value]);

  if (!open) return null;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i);

  return (
    <div
      className="pl-52 fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/90 rounded-2xl shadow-xl w-96 border border-border_color overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-center">
          <DatePicker
            inline
            locale={ko}
            selected={value}
            openToDate={viewDate}
            maxDate={new Date()}
            onChange={onSelect}
            onMonthChange={setViewDate}
            onYearChange={setViewDate}
            dayClassName={(date) => {
              const day = date.getDay();
              if (day === 0) return "custom-sun";
              if (day === 6) return "custom-sat";
              return "";
            }}
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
            }) => (
              <div className="rounded-t-xl pb-2 bg-sub_background ">
                <div className="flex justify-center gap-2.5 pt-2.5 pb-1.5">
                  <select
                    value={date.getFullYear()}
                    onChange={(e) => {
                      const newYear = Number(e.target.value);
                      changeYear(newYear);
                      setViewDate(new Date(newYear, date.getMonth(), 1));
                    }}
                    className="text-sm border border-border_color rounded-md px-1 py-1 bg-white"
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}년
                      </option>
                    ))}
                  </select>

                  <select
                    value={date.getMonth()}
                    onChange={(e) => {
                      const newMonth = Number(e.target.value);
                      changeMonth(newMonth);
                      setViewDate(new Date(date.getFullYear(), newMonth, 1));
                    }}
                    className="text-sm border border-border_color rounded-md px-1 py-1 bg-white"
                  >
                    {MONTHS.map((m, idx) => (
                      <option key={idx} value={idx}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between px-5 mt-2">
                  <button
                    onClick={decreaseMonth}
                    className="border-none bg-transparent text-lg cursor-pointer text-primary_text"
                  >
                    ←
                  </button>
                  <button
                    onClick={increaseMonth}
                    className="border-none bg-transparent text-lg cursor-pointer text-primary_text"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};
