import { lazy, Suspense } from 'react'
import Spinner from '../../component/Spinner/Spinner'
import { Route, Routes } from 'react-router-dom'
import PageNotFoundPage from '../../component/ErrorPages/PageNotFound'

const InstructorHome = lazy(()=> import("../../pages/instructor/InstructorHomePage"))
const InstructorClassRoom = lazy(()=> import("../../pages/instructor/InstructorClassRoom"))

function InstructorRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
         <Routes>
            <Route path="home/" element={<InstructorHome />} />
            <Route path="class-room/:batchName/" element={<InstructorClassRoom />} />

            <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
    </Suspense>
  )
}

export default InstructorRoutes

