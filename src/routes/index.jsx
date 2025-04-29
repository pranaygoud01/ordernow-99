import { createFileRoute } from '@tanstack/react-router'
import Menu from '../pages/Menu'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Menu/>
}
