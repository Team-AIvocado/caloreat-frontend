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

  // 날짜 문자열 포맷 (렌더링용)
  const displayDate =
    date instanceof Date ? date.toISOString().split("T")[0] : date;

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex items-center gap-4 text-lg font-semibold">
        <button onClick={prevDay}>{"<"}</button>

        <div
          onClick={() => setOpenCal(true)}
          className="px-4 py-2 bg-sub_background rounded-lg cursor-pointer"
        >
          {displayDate}
        </div>

        <button onClick={nextDay}>{">"}</button>
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
