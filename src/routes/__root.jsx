import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import NavBar from '../components/NavBar'
import {Toaster} from "react-hot-toast"
export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Toaster position="top-center" />
      <NavBar/>
      <Outlet />
    </React.Fragment>
  )
}
