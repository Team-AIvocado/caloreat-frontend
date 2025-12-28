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
    <div className="flex items-center gap-3">
      <img
        src={image_url}
        alt={name}
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div>
        <h3 className="m-0">{name}</h3>
        <p>
          {kcal} kcal · {amount} 인분
        </p>
        <p>섭취 시간 | {formatTime(created_at)}</p>
      </div>
    </div>
  );
}
