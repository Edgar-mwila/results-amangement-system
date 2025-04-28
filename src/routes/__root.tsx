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
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.state.location.pathname);
  const [showAboutLinks, setShowAboutLinks] = useState(
    currentPath === '/' || currentPath.startsWith('/auth')
  );
  
  // Subscribe to router changes
  useEffect(() => {
    // Create a subscription to router navigation events
    const unsubscribe = router.history.subscribe(() => {
      const newPath = router.state.location.pathname;
      setCurrentPath(newPath);
      setShowAboutLinks(newPath === '/');
    });
    
    // Clean up subscription when component unmounts
    return () => {
      unsubscribe();
    };
  }, [router]);
  
  return (
    <div className='fixed top-0 left-0 right-0 flex justify-between m-auto items-baseline p-5 bg-[#E07A5F]'>
      <Link to="/" className="text-3xl font-bold text-[#3D405B]">
        Results Management System
      </Link>
      <div className="flex gap-2">
        {showAboutLinks ? (
          <>
            <Link to="/about" className="font-semibold [&.active]:font-bold mr-5 text-2xl text-custom-text">
              About
            </Link>
            <Link to="/help-desk" className="font-semibold [&.active]:font-bold mr-5 text-custom-text">
              <HelpCircleIcon className='h-8 w-auto' />
            </Link>
          </>
        ) : (
          <>
            <Link to="/help-desk" className="font-semibold [&.active]:font-bold mr-5 text-custom-text">
              <HelpCircleIcon className='h-8 w-auto' />
            </Link>
          </>
        )}
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