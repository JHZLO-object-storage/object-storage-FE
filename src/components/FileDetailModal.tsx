import React from 'react'
import {
    CButton,
    CFormInput,
    CFormSelect,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHeaderCell,
    CTableRow
} from '@coreui/react'
import {
    cilCloudDownload,
    cilMediaPlay,
    cilTrash
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

interface FileDetailModalProps {
    visible: boolean
    detail: any
    newPermission: string
    changePassword: string
    setVisible: (v: boolean) => void
    setNewPermission: (v: string) => void
    setChangePassword: (v: string) => void
    handleDelete: (id: string) => void
    handlePermissionUpdate: () => void
    handleSecureDownload: (type: 'inline' | 'attachment') => void
    getPermissionIcon: (perm: string) => React.ReactNode
}

const FileDetailModal: React.FC<FileDetailModalProps> = ({
                                                             visible,
                                                             detail,
                                                             newPermission,
                                                             changePassword,
                                                             setVisible,
                                                             setNewPermission,
                                                             setChangePassword,
                                                             handleDelete,
                                                             handlePermissionUpdate,
                                                             handleSecureDownload,
                                                             getPermissionIcon
                                                         }) => {
    const closeModal = () => {
        setVisible(false)
        const FRONT_BASE_URL = import.meta.env.VITE_FRONT_BASE_URL
        window.location.href = `${FRONT_BASE_URL}/bucket/my-storage`
    }


    return (
        <CModal visible={visible} onClose={closeModal}>
            <CModalHeader>
                <CModalTitle>📄 파일 상세 정보</CModalTitle>
            </CModalHeader>
            <CModalBody>
                {detail && (
                    <CTable className="text-white">
                        <CTableBody>
                            <CTableRow>
                                <CTableHeaderCell>파일명</CTableHeaderCell>
                                <CTableDataCell>{detail.originalName}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>파일 유형</CTableHeaderCell>
                                <CTableDataCell>{detail.contentType}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>크기</CTableHeaderCell>
                                <CTableDataCell>{(detail.size / 1024).toFixed(1)} KB</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>업로드일</CTableHeaderCell>
                                <CTableDataCell>{detail.uploadedAt}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>권한</CTableHeaderCell>
                                <CTableDataCell>
                                    <div className="d-flex align-items-center gap-2">
                                        <span>{getPermissionIcon(detail.permission)}</span>
                                        <CFormSelect
                                            size="sm"
                                            value={newPermission}
                                            onChange={(e) => setNewPermission(e.target.value)}
                                            className="bg-white text-black border-secondary"
                                            style={{ width: '130px' }}
                                        >
                                            <option value="PUBLIC">PUBLIC</option>
                                            <option value="PRIVATE">PRIVATE</option>
                                            <option value="SECRET">SECRET</option>
                                        </CFormSelect>

                                        {newPermission === 'SECRET' && (
                                            <CFormInput
                                                type="password"
                                                size="sm"
                                                placeholder="비밀번호"
                                                value={changePassword}
                                                onChange={(e) => setChangePassword(e.target.value)}
                                                style={{ width: '140px' }}
                                                className="bg-dark text-white border-secondary"
                                            />
                                        )}

                                        <CButton
                                            size="sm"
                                            color="warning"
                                            variant="outline"
                                            onClick={handlePermissionUpdate}
                                            disabled={newPermission === detail.permission && (newPermission !== 'SECRET' || changePassword  === '')}
                                        >
                                            변경
                                        </CButton>
                                    </div>
                                </CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                )}
            </CModalBody>
            <CModalFooter className="justify-content-between">
                <CButton color="danger" variant="outline" onClick={() => handleDelete(detail.id)}>
                    <CIcon icon={cilTrash} className="me-2" />
                    삭제
                </CButton>

                {detail && (
                    <div className="d-flex gap-2">
                        <CButton
                            color="info"
                            variant="outline"
                            onClick={() => handleSecureDownload('inline')}
                        >
                            <CIcon icon={cilMediaPlay} className="me-2" />
                            미리보기
                        </CButton>

                        <CButton
                            color="primary"
                            variant="outline"
                            onClick={() => handleSecureDownload('attachment')}
                        >
                            <CIcon icon={cilCloudDownload} className="me-2" />
                            다운로드
                        </CButton>
                    </div>
                )}
            </CModalFooter>
        </CModal>
    )
}

export default FileDetailModal
