import { lazy, Suspense } from 'react'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router'

import Test from './pages/home/Test'

import {paths} from '@/config/paths'


const NotFoundPage = lazy(() => import('@/components/errors/NotFoundPage'))
const Home = lazy(() => import('@/app/pages/home/Home'))
const CvBuilder = lazy(() => import('@/app/pages/cv-builder/CvBuilder'))
const Infor = lazy(() => import('@/app/pages/cv-builder/Infor'))
const Layout = lazy(() => import('@/app/pages/cv-builder/Layout'))
const Theme = lazy(() => import('@/app/pages/cv-builder/Theme'))
export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      children: [
        {
          path: paths.home,
          element: <Home />,
        },
        {
          element: <CvBuilder/>,
          path: '/cv-builder/:id',
          children: [
            {
              index: true,
              element: <Navigate to="infor" replace />
            },
            {
              path: 'infor',
              element: <Infor />
            },
            {
              path: 'layout',
              element: <Layout />
            },
            {
              path: 'theme',
              element: <Theme />
            }
          ],
        } 
        ,{
          path: '/test',
          element: <Test/>
        }       
      ],
      errorElement: <NotFoundPage/>,
    },
    
  ])
  return <Suspense fallback={<div>loading...</div>}><RouterProvider router={router}/></Suspense>
}