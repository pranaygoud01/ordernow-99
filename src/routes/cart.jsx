import { createFileRoute } from '@tanstack/react-router'
import Cart from '../pages/Cart'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Cart/>
}
