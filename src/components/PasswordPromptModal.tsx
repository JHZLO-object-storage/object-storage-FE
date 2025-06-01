import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CFormInput, CModalTitle } from '@coreui/react'

const PasswordPromptModal = ({ visible, password, setPassword, onConfirm, onCancel }: {
    visible: boolean
    password: string
    setPassword: (v: string) => void
    onConfirm: () => void
    onCancel: () => void
}) => {
    return (
        <CModal visible={visible} onClose={onCancel}>
            <CModalHeader closeButton>
                <CModalTitle>🔒 비밀번호 입력</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormInput
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </CModalBody>
            <CModalFooter>
                <CButton variant="outline" color="secondary" onClick={onCancel}>취소</CButton>
                <CButton color="primary" onClick={onConfirm} disabled={!password}>확인</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default PasswordPromptModal
