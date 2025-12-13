export default function FoodItem({ food }) {
  const { name, kcal, amount, image_url, created_at } = food;

  const formatTime = (time) => {
    if (!time) return "";
    const d = new Date(time);
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  };

  return (
    <div>
      <img
        src={image_url}
        alt={name}
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "8px",
          objectFit: "cover",
        }}
      />
      <div>
        <h3 style={{ margin: 0 }}>{name}</h3>
        <p>
          {kcal} kcal · {amount} 인분
        </p>
        <p>섭취 시간 | {formatTime(created_at)}</p>
      </div>
    </div>
  );
}
