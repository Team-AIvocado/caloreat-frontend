import React, { useState } from 'react';
import { updatePassword } from '../../../services/users';

export const PasswordSection = () => {
    /* 사용자가 입력한 현재 비밀번호 */
    const [currentPassword, setCurrentPassword] = useState('');
    /* 변경하려는 새 비밀번호 */
    const [newPassword, setNewPassword] = useState('');
    /* 새 비밀번호 재입력 값 */
    const [confirmPassword, setConfirmPassword] = useState('');
    /* 비밀번호 변경 성공/실패 시 메세지 */
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    /* "비밀번호 변경" 버튼 클릭 시 실행 */
    const handleChangePassword = async () => {
        setError('');
        setMessage('');

        /* 새 비밀번호/확인 비밀번호 일치 여부 검사 */
        if (newPassword !== confirmPassword) {
            setError('새 비밀번호가 일치하지 않습니다.');
            return;
        }

        /* 비밀번호 형식 : 영어+숫자 5자 이상 검증 */
        const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        if (!validPassword.test(newPassword)) {
            setError('비밀번호는 영문, 숫자 포함 5자 이상이어야 합니다.');
            return;
        }
        
        /* 기존 비밀번호와 동일 여부 검사 */
        if (currentPassword === newPassword) {
            setError('비밀번호를 다르게 설정해주세요.');
            return;
        }

        try {
            /* 서버에 비밀번호 변경 요청 */
            await updatePassword(currentPassword, newPassword);
            setMessage('비밀번호가 성공적으로 변경되었습니다.');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError('비밀번호 변경에 실패했습니다. 현재 비밀번호를 확인해주세요.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4 border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800">비밀번호 변경</h3>
            <div className="flex flex-col gap-3">
                <input
                    type="password"
                    placeholder="현재 비밀번호"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main_color"
                />
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main_color"
                />
                <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-main_color"
                />
                <button
                    onClick={handleChangePassword}
                    className="mt-2 w-full py-2 bg-main_color text-white rounded-md hover:bg-main_color_hover transition-colors font-bold shadow-sm"
                >
                    비밀번호 변경
                </button>
                {message && <p className="text-sm text-green-600 text-center font-medium">{message}</p>}
                {error && <p className="text-sm text-red-500 text-center font-medium">{error}</p>}
            </div>
        </div>
    );
};
