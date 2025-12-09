export default function LogCard({ food }) {
  const { name, kcal, amount, image_url, confidence, created_at } = food;

  const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          padding: "12px",
          background: "#FFFFFF",
          width: "70%",
          border: "1px solid #e0e0e0",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "12px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "8px",
            overflow: "hidden",
            background: "#f3f3f3",
          }}
        >
          <img
            src={image_url || "/placeholder-food.png"}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "4px",
            }}
          >
            <strong style={{ fontSize: "16px" }}>{name}</strong>

            {/* #TODO: 정확도 필요할 시 추가  */}
            {/* {confidence !== undefined && (
            <span style={{ fontSize: "13px", color: "#888" }}>
              {Math.round(confidence * 100)}%
            </span>
          )} */}
          </div>
          <div style={{ fontSize: "14px", color: "#555" }}>
            {kcal} kcal · {amount || "-"} 인분
          </div>
          {created_at && (
            <div
              style={{
                fontSize: "12px",
                color: "#999",
                marginTop: "4px",
              }}
            >
              섭취 시간: {formatTime(created_at)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
