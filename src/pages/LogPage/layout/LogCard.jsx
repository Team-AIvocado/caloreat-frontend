export default function LogCard({ food }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "12px",
        borderRadius: "8px",
        marginBottom: "10px",
      }}
    >
      <h3>{food.name}</h3>
      <p>칼로리: {food.kcal} kcal</p>
      {food.amount && <p>섭취량: {food.amount}</p>}
      {food.created_at && <p>시간: {food.created_at}</p>}
    </div>
  );
}
