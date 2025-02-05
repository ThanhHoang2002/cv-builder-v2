import { Outlet } from 'react-router'

import CvBuilderLayout from '@/components/layout/cv-builder-layout'
const CvBuilder = () => {
  return (
    <CvBuilderLayout>
      <Outlet/>
    </CvBuilderLayout>
  )
}

export default CvBuilder