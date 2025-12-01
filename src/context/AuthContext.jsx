import { createContext, useContext, useState, useEffect } from "react";
import { getUser, login as loginService, logout as logoutService } from "../services/users";

const AuthContext = createContext(null);

/**
 * 인증 컨텍스트
 * 사용자 인증정보 관리
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * 현재 세션의 유효성 확인 & 사용자 정보 관리
   * 인증이 필요한 페이지 로딩시 실행
   */
  const checkAuth = async () => {
    try {
      const userData = await getUser();
      setUser(userData);
    } catch (error) {
      console.error("인증 확인 실패:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * 사용자 로그인을 처리합니다.
   *
   * @param {string} account - ID (이메일 or account ID)
   * @param {string} password - 비밀번호
   * @returns {Promise<Object>} 로그인 응답 데이터
   */
  const login = async (account, password) => {
    try {
      const data = await loginService(account, password);
      // get User로 이중 확인 
      // TODO: 추후 getUser 없앨 수 있는지 확인
      const userData = await getUser();
      setUser(userData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  /**
   * 사용자 로그아웃을 처리합니다.
   * 상태를 초기화합니다.
   */
  const logout = async () => {
    try {
      await logoutService();
      setUser(null);
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * 인증 컨텍스트를 사용하기 위한 커스텀 훅입니다.
 * AuthProvider 내부에서만 사용해야 합니다.
 *
 * @returns {Object} 인증 컨텍스트 값 (user, login, logout, loading, checkAuth)
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용되어야 합니다.");
  }
  return context;
};
