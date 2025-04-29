import { createFileRoute } from '@tanstack/react-router'
import Customerdetails from '../pages/Customerdetails'
export const Route = createFileRoute('/customerdeatils')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Customerdetails/>
}
