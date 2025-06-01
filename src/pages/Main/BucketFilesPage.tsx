import React, { useEffect, useState } from 'react'
import { getFileList, getFileDetail, deleteFile, updateFilePermission } from '../../apis/files'
import { CButton, CCard, CCardBody, CFormInput, CInputGroup, CInputGroupText } from '@coreui/react'
import { cilReload } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import FileTable from '../../components/FileTable'
import FileDetailModal from '../../components/FileDetailModal'
import PasswordPromptModal from '../../components/PasswordPromptModal'
import UploadModal from '../../components/UploadModal'

const BucketFilesPage: React.FC = () => {
    const [files, setFiles] = useState<any[]>([])
    const [search, setSearch] = useState('')
    const [visible, setVisible] = useState(false)
    const [detail, setDetail] = useState<any>(null)

    const [newPermission, setNewPermission] = useState('PUBLIC')
    const [changePassword, setChangePassword] = useState('')

    const [downloadPassword, setDownloadPassword] = useState('')
    const [downloadTarget, setDownloadTarget] = useState<'inline' | 'attachment' | null>(null)

    const [uploadVisible, setUploadVisible] = useState(false)

    const fetchFiles = async () => {
        try {
            const data = await getFileList()
            setFiles(data.result ?? [])
        } catch (e) {
            console.error('파일 목록 불러오기 실패', e)
        }
    }

    const openDetailModal = async (id: string) => {
        try {
            const res = await getFileDetail(id)
            setDetail(res.result)
            setNewPermission(res.result.permission)
            setVisible(true)
        } catch (e) {
            console.error('파일 상세 실패', e)
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            try {
                await deleteFile(id)
                alert('삭제되었습니다.')
                setVisible(false)
                fetchFiles()
            } catch (e) {
                console.error('삭제 실패', e)
                alert('삭제 중 오류 발생')
            }
        }
    }

    const handlePermissionUpdate = async () => {
        try {
            await updateFilePermission(detail.id, newPermission, changePassword)
            alert('권한 변경 완료')
            fetchFiles()
        } catch (e) {
            console.error('권한 변경 실패', e)
            alert('권한 변경 실패')
        }
    }

    const handleSecureDownload = (type: 'inline' | 'attachment') => {
        if (detail.permission === 'SECRET') {
            setDownloadTarget(type)
        } else {
            const url = `http://localhost:8080/api/v1/download/${detail.id}?disposition=${type}`
            window.open(url, '_blank')
        }
    }

    const triggerDownload = () => {
        const url = `http://localhost:8080/api/v1/download/${detail.id}?disposition=${downloadTarget}&password=${downloadPassword}`
        window.open(url, '_blank')
        setDownloadTarget(null)
        setDownloadPassword('')
    }

    const getPermissionIcon = (perm: string) => {
        switch (perm) {
            case 'PUBLIC':
                return <CIcon icon="cil-lock-unlocked" className="me-1 text-success" />
            case 'PRIVATE':
                return <CIcon icon="cil-lock-locked" className="me-1 text-warning" />
            case 'SECRET':
                return <CIcon icon="cil-shield-alt" className="me-1 text-danger" />
            default:
                return null
        }
    }

    useEffect(() => {
        fetchFiles()
    }, [])

    const filtered = files.filter((file) =>
        file.originalName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="bg-dawn-light min-vh-100 p-4 text-white">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">🗂️ 나의 오브젝트 파일</h3>
                <div className="d-flex gap-2">
                    <CInputGroup size="sm">
                        <CInputGroupText className="bg-dark border-gray text-white">🔍</CInputGroupText>
                        <CFormInput
                            placeholder="파일 이름 검색"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-dawn text-white border-gray"
                        />
                    </CInputGroup>
                    <CButton color="light" variant="outline" size="sm" onClick={fetchFiles}>
                        <CIcon icon={cilReload} className="me-1" />
                    </CButton>
                </div>
            </div>

            <CCard className="bg-dawn border border-gray">
                <CCardBody className="p-0">
                    {filtered.length === 0 ? (
                        <>
                            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                                <p className="text-white mb-3">📁 현재 저장된 파일이 없습니다.</p>
                                <CButton color="primary" size="lg" onClick={() => setUploadVisible(true)}>
                                    업로드
                                </CButton>
                            </div>
                        </>
                    ) : (
                        <>
                            <FileTable files={filtered} onSelect={openDetailModal}/>

                            {/* 👇 여기에 버튼 배치 */}
                            <div className="d-flex justify-content-end p-3">
                            <CButton color="primary" size="sm" onClick={() => setUploadVisible(true)}>
                                    업로드
                                </CButton>
                            </div>
                        </>
                    )}
                </CCardBody>
            </CCard>

            {/* 상세보기 모달 */}
            <FileDetailModal
                visible={visible}
                detail={detail}
                newPermission={newPermission}
                changePassword={changePassword}
                setVisible={setVisible}
                setNewPermission={setNewPermission}
                setChangePassword={setChangePassword}
                handleDelete={handleDelete}
                handlePermissionUpdate={handlePermissionUpdate}
                handleSecureDownload={handleSecureDownload}
                getPermissionIcon={getPermissionIcon}
            />

            {/* 비밀번호 입력 모달 */}
            <PasswordPromptModal
                visible={!!downloadTarget}
                password={downloadPassword}
                setPassword={setDownloadPassword}
                onConfirm={triggerDownload}
                onCancel={() => setDownloadTarget(null)}
            />

            <UploadModal
                visible={uploadVisible}
                onClose={() => setUploadVisible(false)}
                onUploaded={fetchFiles}
            />
        </div>
    )
}

export default BucketFilesPage
