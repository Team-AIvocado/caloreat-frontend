import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * 보호된 라우트 컴포넌트입니다.
 * 인증된 사용자만 접근할 수 있는 라우트를 감싸는 데 사용됩니다.
 * 인증되지 않은 사용자는 로그인 페이지로 리다이렉트됩니다.
 *
 * @component
 * @returns {React.ReactElement} 인증된 경우 자식 라우트(Outlet), 그렇지 않은 경우 리다이렉트 컴포넌트
 */
export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  // 인증 상태 확인 중일 때 로딩 표시 (선택 사항)
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 인증된 경우 자식 라우트 렌더링
  return <Outlet />;
};
