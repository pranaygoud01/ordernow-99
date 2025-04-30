import { createFileRoute } from '@tanstack/react-router'
import Success from '../components/Success'

export const Route = createFileRoute('/success')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Success/>
}
