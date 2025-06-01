import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/Home/HomePage.tsx'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import MainPage from './pages/Main/MainPage.tsx'
import BucketFilesPage from './pages/Main/BucketFilesPage.tsx'
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/main" element={<PrivateRoute element={<MainPage />} />} />
                <Route path="/bucket/:bucketName" element={<PrivateRoute element={<BucketFilesPage />} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
