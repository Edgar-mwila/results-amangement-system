import { Button } from '@/components/ui/button';
import { createFileRoute, useNavigate } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})
function HomePage() {
  const navigate = useNavigate();
  return (
    <div className='p-0 m-0 flex flex-col flex-1'>
      <div className="text-custom-text px-20 py-8 bg-[#F2CC8F] p-10 space-y-8 min-h-[50vh]">
        <h1 className='text-4xl font-semibold'>Transform your results management</h1>
        <p>Comprehensive solution for schools to manage academics,<br/> staff, students and communication.</p>
        <Button className='bg-green-400 hover:bg-green-600 text-white font-bold'onClick={() => navigate({to: '/admin/dashboard'})}>Get Started</Button>
      </div>
      <div className='grid grid-cols-3 p-5 m-10 gap-10'>
        <div className='border border-custom-text p-5'>
          <h1 className='font-bold'>Academic Management</h1>
          <p className='mb-5'>complete solution for curriculum and assesment management.</p>
        </div>
        <div className='border border-custom-text p-5'>
          <h1 className='font-bold'>Staff Management</h1>
          <p className='mb-5'>Effeicient tools for managing teachers and staff.</p>
        </div>
        <div className='border border-custom-text p-5'>
          <h1 className='font-bold'>Parent Portal</h1>
          <p className='mb-5'>Keep parents informed and engaged in real time</p>
        </div>
      </div>
    </div>
  );
};