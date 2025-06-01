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
import {cilEnvelopeClosed, cilLockLocked, cilUser} from '@coreui/icons'
import {useNavigate} from 'react-router-dom'
import {signup} from '../apis/auth'
import '../styles/custom-color.css'

const SignUpPage: React.FC = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!name || !email || !password) {
            alert('모든 필드를 입력하세요.')
            return
        }
        try {
            await signup({email, password, userName: name})
            alert('회원가입 성공')
            navigate('/login')
        } catch (err) {
            alert('회원가입 실패')
        }
    }

    return (
        <div className="bg-dawn-light min-vh-100 d-flex justify-content-center align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6} lg={5}>
                        <CCard className="p-4 rounded-4 shadow bg-dawn">
                            <CCardBody>
                                <h2 className="mb-4 text-center text-white">회원가입</h2>
                                <CForm onSubmit={handleSubmit}>
                                    <CInputGroup className="mb-3">
                                        <CInputGroupText className="bg-dawn-light border-gray text-white">
                                            <CIcon icon={cilUser}/>
                                        </CInputGroupText>
                                        <CFormInput
                                            placeholder="이름"
                                            value={name}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                            className="bg-dawn text-white border-gray gray-placeholder"
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-3">
                                        <CInputGroupText className="bg-dawn-light border-gray text-white">
                                            <CIcon icon={cilEnvelopeClosed}/>
                                        </CInputGroupText>
                                        <CFormInput
                                            type="email"
                                            placeholder="이메일"
                                            value={email}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                            className="bg-dawn text-white border-gray gray-placeholder"
                                        />
                                    </CInputGroup>

                                    <CInputGroup className="mb-4">
                                        <CInputGroupText className="bg-dawn-light border-gray text-white">
                                            <CIcon icon={cilLockLocked}/>
                                        </CInputGroupText>
                                        <CFormInput
                                            type="password"
                                            placeholder="비밀번호"
                                            value={password}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                            className="bg-dawn text-white border-gray gray-placeholder"
                                        />
                                    </CInputGroup>

                                    <CButton type="submit" color="success" className="w-100 text-white">
                                        회원가입
                                    </CButton>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default SignUpPage
