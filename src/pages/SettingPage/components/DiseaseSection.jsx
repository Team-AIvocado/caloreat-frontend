import React, { useState, useEffect } from 'react';
import { updateConditions } from '../../../services/users';

/* 선택 가능한 질환 목록 */
const DISEASE_OPTIONS = [
    { id: 'high_blood_pressure', label: '고혈압' },
    { id: 'diabetes', label: '당뇨' },
    { id: 'hyperlipidemia', label: '고지혈증' },
    { id: 'low_blood_pressure', label: '저혈압' },
];

export const DiseaseSection = ({ initialConditions }) => {
    /* 사용자가 선택한 질환 id 배열 */
    const [conditions, setConditions] = useState([]);
    /* 업데이트 성공/실패에 대한 메세지 */
    const [message, setMessage] = useState('');

    /* 부모 컴포넌트에서 내려준 초기 건강 정보 */
    useEffect(() => {
        if (initialConditions) {
            setConditions(initialConditions);
        }
    }, [initialConditions]);

    /* 체크 박스 클릭 시 질환 선택/해제 처리 */
    const toggleCondition = (id) => {
        setConditions(prev => {
            let newConditions;
            /* 이미 선택된 경우 -> 제거 */
            if (prev.includes(id)) {
                newConditions = prev.filter(c => c !== id);
            } 
            /* 선택되지 않은 경우 -> 추가 */
            else {
                newConditions = [...prev, id];
            }

            /* 고혈압과 저혈합은 의학적으로 상반되는 개념이기에 상호 베타 처리 */
            if (id === 'high_blood_pressure' && newConditions.includes('high_blood_pressure')) {
                newConditions = newConditions.filter(c => c !== 'low_blood_pressure');
            } else if (id === 'low_blood_pressure' && newConditions.includes('low_blood_pressure')) {
                newConditions = newConditions.filter(c => c !== 'high_blood_pressure');
            }

            return newConditions;
        });
    };

    /* "건강 정보 수정" 클릭 시 실행 */
    const handleUpdate = async () => {
        try {
            await updateConditions(conditions);
            setMessage('건강 정보가 업데이트되었습니다.');
        } catch (error) {
            setMessage('건강 정보 업데이트에 실패했습니다.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4 border border-gray-100">
            <h3 className="text-lg font-bold mb-4 text-gray-800">건강 정보</h3>
            <div className="flex flex-col gap-2 mb-4">
                {DISEASE_OPTIONS.map((disease) => (
                    <label
                        key={disease.id}
                        className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${conditions.includes(disease.id)
                            ? 'border-main_color bg-green-50 text-main_color font-bold shadow-sm'
                            : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                            }`}
                    >
                        <input
                            type="checkbox"
                            checked={conditions.includes(disease.id)}
                            onChange={() => toggleCondition(disease.id)}
                            className="hidden"
                        />
                        <span className="flex-1">{disease.label}</span>
                        {conditions.includes(disease.id) && (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        )}
                    </label>
                ))}
            </div>
            <button
                onClick={handleUpdate}
                className="w-full py-2 bg-main_color text-white rounded-md hover:bg-main_color_hover transition-colors font-bold shadow-sm"
            >
                건강 정보 수정
            </button>
            {message && <p className="text-sm text-blue-600 mt-2 text-center animate-fade-in">{message}</p>}
        </div>
    );
};
