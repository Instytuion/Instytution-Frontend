import { lazy, Suspense } from 'react'
import Spinner from '../../component/Spinner/Spinner'
import { Route, Routes } from 'react-router-dom'
import PageNotFoundPage from '../../component/ErrorPages/PageNotFound'

const InstructorHome = lazy(()=> import("../../pages/instructor/instructorHomePage"))

function InstructorRoutes() {
  return (
    <Suspense fallback={<Spinner />}>
         <Routes>
            <Route path="home/" element={<InstructorHome />} />

            <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
    </Suspense>
  )
}

export default InstructorRoutes

