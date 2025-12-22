import { useState } from "react";
import { CalendarModal } from "../../../components/Modal/CalendarModal";

export default function DateNavigator({ date, setDate }) {
  const [openCal, setOpenCal] = useState(false);

  const today = new Date();

  // 이전 날짜 이동 (Date 객체 유지)
  const prevDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d);
  };

  // 다음 날짜 이동 (미래 날짜 제한)
  const nextDay = () => {
    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    if (next > today) return;
    setDate(next);
  };

  // 날짜 문자열 포맷 (렌더링용 - Local Time)
  const displayDate =
    date instanceof Date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(date.getDate()).padStart(2, "0")}`
      : date;

  // 오늘 날짜인지 확인 (시간 제외하고 날짜만 비교)
  const isToday = date.toDateString() === today.toDateString();

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex items-center gap-4 text-lg font-semibold text-primary_text">
        <button
          onClick={prevDay}
          className="hover:opacity-70 transition-opacity"
        >
          {"<"}
        </button>

        <div
          onClick={() => setOpenCal(true)}
          className="px-4 py-2 bg-sub_background text-primary_text rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
        >
          {displayDate}
        </div>

        <button
          onClick={nextDay}
          disabled={isToday}
          className={`transition-opacity ${isToday
            ? "opacity-30 cursor-not-allowed"
            : "hover:opacity-70 cursor-pointer"
            }`}
        >
          {">"}
        </button>
      </div>

      <CalendarModal
        open={openCal}
        value={date}
        onClose={() => setOpenCal(false)}
        onSelect={(d) => {
          setDate(d);
          setOpenCal(false);
        }}
      />
    </div>
  );
}
