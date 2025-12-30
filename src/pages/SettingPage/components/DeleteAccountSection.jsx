import React, { useState } from "react";
import { deleteAccount } from "../../../services/users";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useAlert } from "../../../context/AlertContext";
import { alertBtn } from "../../../utils/styles";

export const DeleteAccountSection = ({ currentUser }) => {
  /* 기본 화면에서 "탈퇴하기" 버튼만 보이게 하기 위한 State */
  const [isExpanded, setIsExpanded] = useState(false);
  /* 실수 방지를 위해 아이디 또는 이메일 2차 검증 */
  const [verificationId, setVerificationId] = useState("");
  /* 실제 서버에 전달되는 계쩡 삭제 인증 정보 (일반 회원만 사용) */
  const [password, setPassword] = useState("");
  /* 성공/실패 메세지를 UI에 띄우기 위한 State */
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  /* 회원 탈퇴 후 메인 로그인 페이지로 강제 이동 */
  const navigate = useNavigate();
  /* 계정 삭제 즉시 프론트 인증 State 제거 + 쿠키 삭제 */
  const { logout } = useAuth();
  /* 탈퇴 최종 확인을 위한 알람 */
  const { showAlert, closeAlert } = useAlert();

  /* 소셜 로그인 여부 확인 */
  const isSocialLogin =
    currentUser?.provider && currentUser.provider !== "local";

  /* 알람에서 "확인"을 눌렀을 때 실행 */
  const handleConfirm = async () => {
    try {
      // 소셜 로그인은 비밀번호 없이, 일반 회원은 비밀번호와 함께 요청
      await deleteAccount(isSocialLogin ? null : password);
      closeAlert(); // 알람 닫기
      await logout(); // 인증 state + 쿠키 삭제
      navigate("/"); // 로그인 페이지로 이동
    } catch (err) {
      closeAlert(); // 실패 시에도 닫아서 혼란 방지
      setError(
        isSocialLogin
          ? "계정 삭제에 실패했습니다."
          : "계정 삭제에 실패했습니다. 비밀번호를 확인해주세요."
      );
    }
  };

  /* "회원 탈퇴 확인"버튼 클릭 시 실행 */
  const handleDelete = async () => {
    setMessage("");
    setError("");

    /* 필수 입력값 검증 - 소셜 로그인은 이메일만, 일반 회원은 이메일+비밀번호 */
    if (isSocialLogin) {
      if (!verificationId) {
        setError("이메일을 입력해주세요.");
        return;
      }
    } else {
      if (!verificationId || !password) {
        setError("아이디(이메일)와 비밀번호를 모두 입력해주세요.");
        return;
      }
    }

    /* currentUser 있는 경우 사고 방지 목적 검증 */
    if (currentUser) {
      // 소셜 로그인은 이메일만 확인, 일반 회원은 아이디 또는 이메일 확인
      const isMatch = isSocialLogin
        ? verificationId === currentUser.email
        : verificationId === currentUser.username ||
          verificationId === currentUser.email;
      if (!isMatch) {
        setError(
          isSocialLogin
            ? "입력하신 이메일이 일치하지 않습니다."
            : "입력하신 아이디(이메일)가 일치하지 않습니다."
        );
        return;
      }
    }

    /* 알람을 띄워서 한 번 더 사용자 의사를 확인 */
    showAlert({
      msg: "정말로 탈퇴하시겠습니까? 삭제된 계정은 복구할 수 없습니다.",
      footer: (
        <div className="flex gap-2">
          <button className={alertBtn} onClick={closeAlert}>
            취소
          </button>
          <button
            className="bg-red-500 rounded-xl text-sm px-6 py-1 text-white border border-red-500 hover:bg-red-600 font-bold"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      ),
    });
  };

  /* 위험한 액션이므로 최소 UI만 노출 */
  if (!isExpanded) {
    return (
      <div className="bg-[#FFD7D7] p-6 rounded-lg mb-4 border border-red-300 flex justify-between items-center">
        <h3 className="text-lg font-bold text-red-600">회원 탈퇴</h3>
        <button
          onClick={() => setIsExpanded(true)}
          className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors font-medium border-transparent"
        >
          탈퇴하기
        </button>
      </div>
    );
  }

  /* 위험 안내 문구 표시 */
  return (
    <div className="bg-white p-6 rounded-lg mb-4 border border-red-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-red-600">회원 탈퇴</h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        {isSocialLogin ? (
          <>
            계정을 삭제하려면 아래 이메일을 입력해주세요.
            <br />
            <span className="font-semibold text-gray-700">
              {currentUser?.email}
            </span>
            <br />
            삭제된 데이터는 복구할 수 없습니다.
          </>
        ) : (
          <>
            계정을 삭제하려면 아이디(또는 이메일)와 비밀번호를 입력해주세요.
            <br />
            삭제된 데이터는 복구할 수 없습니다.
          </>
        )}
      </p>
      <div className="flex flex-col gap-3">
        <input
          type="text"
          placeholder={
            isSocialLogin ? "이메일 입력" : "아이디 또는 이메일 입력"
          }
          value={verificationId}
          onChange={(e) => setVerificationId(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        {!isSocialLogin && (
          <input
            type="password"
            placeholder="비밀번호 입력"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        )}
        <button
          onClick={handleDelete}
          className="mt-2 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors font-bold"
        >
          회원 탈퇴 확인
        </button>
        {message && (
          <p className="text-sm text-green-600 text-center font-medium">
            {message}
          </p>
        )}
        {error && (
          <p className="text-sm text-red-500 text-center font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
