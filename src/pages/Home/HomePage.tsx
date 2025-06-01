import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CContainer } from '@coreui/react'
import '../../styles/custom-color.css'
import '../../styles/HomePage.css'

const HomePage: React.FC = () => {
    const navigate = useNavigate()

    return (
        <div className="homepage-container d-flex align-items-center justify-content-center min-vh-100 text-white">
            <CContainer className="text-center">
                <h1 className="display-3 fw-bold mb-4">Object Storage</h1>
                <p className="fs-5 mb-4 text-light">
                    빠르고 안전한 파일 저장 서비스를 경험해보세요. <br />
                    이미지, 영상, 문서를 저장하고 공유할 수 있습니다.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <CButton color="primary" size="lg" onClick={() => navigate('/login')}>
                        로그인
                    </CButton>
                    <CButton color="success" size="lg" className="text-white" onClick={() => navigate('/signup')}>
                        회원가입
                    </CButton>
                </div>
            </CContainer>
        </div>
    )
}

export default HomePage
