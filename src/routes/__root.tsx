import {createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { type QueryClient } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}


interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function NavBar() {
  return (
      <div className='p-2 flex justify-between max-w-3xl m-auto items-baseline'>
        <Link to="/" className="text-2xl font-bold">
          Results Management System
        </Link>
        <div className="flex gap-2">
          <Link to="/about" className="[&.active]:font-bold">
            About
          </Link>
        </div>
      </div>
  )
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className='max-w-2xl m-auto'>
        <Outlet />
      </div>
      <Toaster />
    </>
  )
}