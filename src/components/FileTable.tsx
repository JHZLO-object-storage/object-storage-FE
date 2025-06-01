import {CTable, CTableBody, CTableDataCell, CTableRow} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilLockUnlocked, cilShieldAlt} from '@coreui/icons'

const getPermissionIcon = (perm: string) => {
    switch (perm) {
        case 'PUBLIC':
            return <CIcon icon={cilLockUnlocked} className="me-1 text-success"/>
        case 'PRIVATE':
            return <CIcon icon={cilLockLocked} className="me-1 text-warning"/>
        case 'SECRET':
            return <CIcon icon={cilShieldAlt} className="me-1 text-danger"/>
        default:
            return null
    }
}

const FileTable = ({files, onSelect}: { files: any[], onSelect: (id: string) => void }) => {
    return (
        <CTable hover className="table-dark text-white">
            <thead>
            <tr>
                <th>파일명</th>
                <th>업로드일</th>
                <th>크기</th>
                <th>권한</th>
            </tr>
            </thead>
            <CTableBody>
                {files.map(file => (
                    <CTableRow key={file.id} onClick={() => onSelect(file.id)} style={{cursor: 'pointer'}}>
                        <CTableDataCell className="text-break">{file.originalName}</CTableDataCell>
                        <CTableDataCell>{file.uploadedAt}</CTableDataCell>
                        <CTableDataCell>{(file.size / 1024).toFixed(1)} KB</CTableDataCell>
                        <CTableDataCell>{getPermissionIcon(file.permission)} {file.permission}</CTableDataCell>
                    </CTableRow>
                ))}
            </CTableBody>
        </CTable>
    )
}

export default FileTable
