import { useNavigate, useParams } from "react-router-dom"
import { mockLogs } from "../LogPage/mocks/mockData";
import SummaryBox from "./layout/SummaryBox";
import FoodItem from "./layout/FoodItem";


export const LogDetailPage = () => {
    const {mealId} = useParams();
    const navigate = useNavigate();

    // mealId로 mock데이터에서 해당 로그 찾기
    const meal = mockLogs.find((m)=>m.meal_id ===Number(mealId));

    if(!meal) {
        return (
            <div style={{padding:"20px", textAlign:"center"}}>
                <p>해당 로그를 찾을 수 없습니다.</p>
                <button onClick={() => navigate(-1)}>back</button>
            </div>
        );
    }

    const totalKcal = meal.foods.reduce((acc, cur)=> acc+cur.kcal, 0);

    return (
        <div>
            <button onClick={()=> navigate(-1)} style={{marginBottom:"20px"}}>
                back
            </button>

            <h2>식단 상세 보기</h2>
            <SummaryBox totalKcal={totalKcal} />

            <div>{meal.foods.map((food, idx) => (
                <FoodItem key={idx} food={food} />
            ))}</div>
        </div>
    )
}