import { createFileRoute } from '@tanstack/react-router'
import Cancel from '../components/Cancel'

export const Route = createFileRoute('/cancel')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Cancel/>
}
