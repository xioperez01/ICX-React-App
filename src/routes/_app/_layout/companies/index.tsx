import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/_layout/companies/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/_layout/companies/"!</div>
}
