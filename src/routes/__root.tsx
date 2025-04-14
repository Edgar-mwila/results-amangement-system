import {createRootRouteWithContext, Link, Outlet, useRouter } from '@tanstack/react-router'
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { type QueryClient } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/sonner"
import { HelpCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root,
})

function NavBar() {
  const router = useRouter()
  const location = router.state.location.pathname;
  const [showAuthLinks, setShowAuthLinks] = useState(location === '/' || location.startsWith('/auth'));

  useEffect(() => {
    setShowAuthLinks(location === '/' || location.startsWith('/auth'));
  }, [location]);

  return (
    <div className='flex justify-between m-auto items-baseline p-5 bg-[#E07A5F]'>
      <Link to="/" className="text-3xl font-bold text-[#3D405B]">
        Results Management System
      </Link>
      <div className="flex gap-2">
        {showAuthLinks ? (
          <>
            <Link to="/auth/login" className="font-semibold [&.active]:font-bold mr-5 text-2xl text-custom-text">
              Login
            </Link>
            <Link to="/auth/register" className="font-semibold [&.active]:font-bold mr-5 text-2xl text-custom-text">
              Register
            </Link>
            <Link to="/about" className="font-semibold [&.active]:font-bold mr-5 text-2xl text-custom-text">
              About
            </Link>
            <Link to="/help-desk" className="font-semibold [&.active]:font-bold mr-5 text-custom-text">
              <HelpCircleIcon className='h-8 w-auto' />
            </Link>
          </>
        ) : (
          <>
            <Link to="/about" className="font-semibold [&.active]:font-bold mr-5 text-2xl text-custom-text">
              About
            </Link>
            <Link to="/help-desk" className="font-semibold [&.active]:font-bold mr-5 text-custom-text">
              <HelpCircleIcon className='h-8 w-auto' />
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

function Root() {
  return (
    <>
      <NavBar />
      <hr />
      <div className='m-auto text-custom-text '>
        <Outlet />
      </div>
      <Toaster />
    </>
  )
}