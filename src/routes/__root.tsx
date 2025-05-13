import {createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { type QueryClient } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner"
import { HelpCircleIcon } from 'lucide-react';

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function NavBar() {
  return (
    <div className='fixed top-0 left-0 right-0 flex justify-between m-auto items-baseline p-5 bg-green-600'>
      <Link to="/" className="text-3xl font-bold text-[#3D405B]">
        Edu-Track
      </Link>
      <div className="flex gap-2">
          <>
            <Link to="/help-desk" className="font-semibold [&.active]:font-bold mr-5 text-custom-text">
              <HelpCircleIcon className='h-8 w-auto' />
            </Link>
          </>
      </div>
    </div>
  );
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className='m-auto text-custom-text pt-[76px]'>
        <Outlet />
      </div>
      <Toaster />
    </>
  )
}