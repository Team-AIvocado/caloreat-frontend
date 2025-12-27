import React, { useState, useEffect } from 'react';
import { updateNickname } from '../../../services/users';
import { useAuth } from '../../../context/AuthContext';


export const NicknameSection = ({ initialNickname, onUpdate }) => {
    /* 입력창에 바인딩되는 닉네임 상태 */
    const [nickname, setNickname] = useState(initialNickname || '');
    /* 닉네임 변경 성공/실패시 메세지 */
    const [message, setMessage] = useState('');
    /* 입력한 닉네임과 기존 닉네임이 동일한지 검증 */
    const isSame = nickname === initialNickname;
    /* 버튼 비활성화 조건 - 기존과 동일하거나 비어있을 시 */
    const isDisabled = isSame || !nickname;
    /* 닉네임 변경 후 전역 사용자 정보 즉시 갱신 */
    const { checkAuth } = useAuth();

    /* 서버에서 받아온 닉네임을 입력창에 자동으로 채워넣음 */
    useEffect(() => {
        if (initialNickname) {
            setNickname(initialNickname);
        }
    }, [initialNickname]);

    /* "수정"버튼 클릭 시 실행 */
    const handleUpdate = async () => {
        /* 비활성화 상태에서는 실행 방지 */
        if (isDisabled) return;

        try {/* 서버에 닉네임 변경 요청 */
            await updateNickname(nickname);
            /* 변경 즉시 전역 사용자 정보 재조회 */
            await checkAuth();
            /* 부모 컴포넌트 정보 갱신 */
            if (onUpdate) await onUpdate();
            setMessage('닉네임이 변경되었습니다.');
        } catch (error) {
            setMessage('닉네임 변경에 실패했습니다.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4 border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800">닉네임 변경</h3>
            <div className="flex flex-col gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">닉네임</label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="새 닉네임"
                            value={nickname}
                            onChange={(e) => {
                                setNickname(e.target.value);
                                setMessage('');
                            }}
                            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main_color"
                        />
                        <button
                            onClick={handleUpdate}
                            disabled={isDisabled}
                            className={`px-4 py-2 rounded-md transition-colors font-medium border ${isDisabled
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                : 'bg-main_color text-white border-transparent hover:bg-main_color_hover'
                                }`}
                        >
                            수정
                        </button>
                    </div>
                </div>

                {message && <p className={`text-sm ${message.includes('실패') ? 'text-red-500' : 'text-blue-600'} animate-fade-in`}>{message}</p>}
                {!message && isSame && nickname && (
                    <p className="text-sm text-gray-400 font-medium">현재 사용 중인 닉네임입니다.</p>
                )}
            </div>
        </div>
    );
};
