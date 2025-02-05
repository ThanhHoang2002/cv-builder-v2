import { useNavigate } from 'react-router'

import { MainLayout } from '@/components/layout/main-layout/MainLayout'
import { Button } from '@/components/ui/button'

const home = () => {
  const navigate = useNavigate()
  return (
    <MainLayout>
      <Button onClick={() => navigate('/cv-builder/1')}>Click me</Button>
    </MainLayout>
  )
}

export default home
