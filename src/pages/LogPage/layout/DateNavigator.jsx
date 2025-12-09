import React from "react";

export default function DateNavigator({ date, setDate }) {
  const changeDate = (days) => {
    const current = new Date(date);
    current.setDate(current.getDate() + days);

    const yyyy = current.getFullYear();
    const mm = String(current.getMonth() + 1).padStart(2, "0");
    const dd = String(current.getDate()).padStart(2, "0");

    setDate(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px 0",
      }}
    >
      <button
        onClick={() => changeDate(-1)}
        style={{
          fontSize: "20px",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      >
        {"<"}
      </button>
      <span style={{ fontSize: "18px", fontWeight: "600" }}>{date}</span>
      <button
        onClick={() => changeDate(1)}
        style={{
          fontSize: "20px",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #ddd",
        }}
      >
        {">"}
      </button>
    </div>
  );
}
