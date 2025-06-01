import {useState} from 'react'
import {
    CButton,
    CFormInput,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from '@coreui/react'
import {uploadFile} from '../apis/upload'

const UploadModal = ({visible, onClose, onUploaded}: {
    visible: boolean
    onClose: () => void
    onUploaded: () => void
}) => {
    const [file, setFile] = useState<File | null>(null)
    const [permission, setPermission] = useState('PUBLIC')
    const [password, setPassword] = useState('')

    const handleUpload = async () => {
        if (!file) {
            alert('파일을 선택해주세요.')
            return
        }
        try {
            await uploadFile(file, permission, password)
            alert('업로드 성공!')
            onUploaded()
            onClose()
            setFile(null)
            setPassword('')
        } catch (e) {
            alert('업로드 실패')
            console.error(e)
        }
    }

    return (
        <CModal visible={visible} onClose={onClose}>
            <CModalHeader>
                <CModalTitle>📤 파일 업로드</CModalTitle>
            </CModalHeader>
            <CModalBody>
                <CFormInput type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)}/>
                <CFormSelect
                    className="mt-3"
                    value={permission}
                    onChange={(e) => setPermission(e.target.value)}
                >
                    <option value="PUBLIC">PUBLIC</option>
                    <option value="PRIVATE">PRIVATE</option>
                    <option value="SECRET">SECRET</option>
                </CFormSelect>
                {permission === 'SECRET' && (
                    <CFormInput
                        className="mt-3"
                        placeholder="비밀번호 입력"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                )}
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" variant="outline" onClick={onClose}>취소</CButton>
                <CButton color="primary" onClick={handleUpload}>업로드</CButton>
            </CModalFooter>
        </CModal>
    )
}

export default UploadModal
