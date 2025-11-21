import { useState } from "react";

export const LoginPage=()=>{

    const [username,setUsername]=useState('');
    const [password, setPassword] =useState('');

    return(
        <>
        <div className="flex flex-col justify-center items-center">
            <div className="text-main_color text-3xl">
                caloreat
                
            </div>
            <input className="border border-border_color" type="text" placeholder="아이디를 입력하세요" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <div>
                <input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button className="bg-main_color text-white rounded-xl">로그인</button>
            </div>
            <div>
                <span>아직 회원이 아니라면?</span> 
            </div>
        </div>
        </>
    );
}