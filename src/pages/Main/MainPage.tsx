import React from 'react'
import {CButton, CCard, CCardBody, CCol, CContainer, CRow} from '@coreui/react'
import {useNavigate} from 'react-router-dom'
import '../../styles/custom-color.css'
import {signout} from '../../apis/auth'

const MainPage: React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const response = await signout()
            console.log('로그아웃 성공:', response)
            navigate('/login')
        } catch (error) {
            console.error('로그아웃 실패:', error)
            // 에러 처리 추가 (예: alert 등)
        }
    }

    const handleEnterBucket = () => {
        navigate('/bucket/my-storage')
    }

    return (
        <div className="d-flex min-vh-100 text-white bg-dawn-light">
            {/* 왼쪽 사이드 로그아웃 버튼 */}
            <div className="d-flex flex-column justify-content-between p-3" style={{width: '100px'}}>
                <div></div>
                <CButton
                    color="light"
                    className="text-dark fw-bold px-4 py-2"
                    style={{
                        fontSize: '1rem',
                        borderRadius: '10px',
                        width: '120px',         // 넓이 확보
                        height: '48px',         // 높이 확보
                    }}
                    onClick={handleLogout}
                >
                    Sign Out
                </CButton>
            </div>

            {/* 버킷 영역 */}
            <div className="flex-grow-1 p-5">
                <h2 className="fw-bold mb-4">📂 Buckets</h2>
                <CContainer>
                    <CRow className="justify-content-center">
                        <CCol xs={12} md={10} lg={8}>
                            <CCard
                                className="bg-dawn border border-gray clickable hover-shadow transition-all"
                                onClick={handleEnterBucket}
                                style={{cursor: 'pointer'}}
                            >
                                <CCardBody>
                                    <h4 className="text-white fw-bold mb-3">나의 오브젝트 스토리지</h4>
                                    <p className="text-light mb-1">
                                        <strong>📅 Created:</strong> 2025-06-01 00:00:00 GMT+0900 (KST)
                                    </p>
                                    <p className="text-light mb-0">
                                        <strong>🔐 Access:</strong> R/W
                                    </p>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    </CRow>
                </CContainer>
            </div>
        </div>
    )
}

export default MainPage
