import type {ChangeEvent, FormEvent} from 'react'
import React, {useState} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilUser} from '@coreui/icons'
import {useNavigate} from 'react-router-dom'
import '../styles/custom-color.css' // 스타일 파일 경로 확인
import {login} from '../apis/auth'

const Login: React.FC = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력하세요.')
            return
        }

        try {
            await login({email, password})
            navigate('/main') // 성공 시 메인으로 이동
        } catch (error) {
            console.error('로그인 실패:', error)
            alert('이메일 또는 비밀번호가 올바르지 않습니다.')
        }
    }

    return (
        <div className="bg-dawn-light min-vh-100 d-flex justify-content-center align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6} lg={5}>
                        <CCard className="p-4 rounded-4 shadow bg-dawn">
                            <CCardBody>
                                <h2 className="mb-4 text-center text-white">Login</h2>
                                <CForm onSubmit={handleSubmit}>
                                    {/* 이메일 입력 */}
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText className="bg-dawn-light border-gray text-white">
                                            <CIcon icon={cilUser}/>
                                        </CInputGroupText>
                                        <CFormInput
                                            type="email"
                                            placeholder="Email"
                                            autoComplete="email"
                                            value={email}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                            className="bg-dawn text-white border-gray gray-placeholder"
                                        />
                                    </CInputGroup>

                                    {/* 비밀번호 입력 */}
                                    <CInputGroup className="mb-4">
                                        <CInputGroupText className="bg-dawn-light border-gray text-white">
                                            <CIcon icon={cilLockLocked}/>
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="Password"
                                            autoComplete="current-password"
                                            value={password}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                            className="bg-dawn text-white border-gray gray-placeholder"
                                        />
                                    </CInputGroup>

                                    {/* 로그인 버튼 */}
                                    <CButton type="submit" color="primary" className="w-100">
                                        로그인
                                    </CButton>

                                    {/* 회원가입 이동 버튼 */}
                                    <div className="text-center mt-3">
                                        <span className="text-white">계정이 없으신가요?</span>
                                        <CButton
                                            color="link"
                                            className="px-1 text-decoration-none"
                                            onClick={() => navigate('/signup')}
                                        >
                                            회원가입
                                        </CButton>
                                    </div>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
