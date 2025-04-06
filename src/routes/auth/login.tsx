import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { createFileRoute } from '@tanstack/react-router'

const Login = () => {
  return (
    <div>
      <Tabs defaultValue='admin'>
        <TabsList className='min-w-full justify-between bg-[#F2CC8F] '>
          <TabsTrigger value='admin'>Admin</TabsTrigger>
          <TabsTrigger value='teacher'>Teacher</TabsTrigger>
          <TabsTrigger value='parent'>Parent/Guardian</TabsTrigger>
        </TabsList>

        <TabsContent value='admin'>
          <form>
            <div className='flex flex-col'>
              <label>Email/Username</label>
              <input type="text" name="admin-username" className='border w-full m-2 rounded-lg' />
            </div>
            <div  className='flex flex-col'>
              <label>Password</label>
              <input type="password" name="admin-password" className='border w-full m-2 rounded-lg' />
            </div>
            <button type="submit" className='bg-green-500 rounded-lg p-2'>Login as Admin</button>
          </form>
        </TabsContent>
        <TabsContent value='teacher'>
          <form>
          <div className='flex flex-col'>
              <label>Email/Username</label>
              <input type="text" name="admin-username" className='border w-full m-2 rounded-lg' />
            </div>
            <div  className='flex flex-col'>
              <label>Password</label>
              <input type="password" name="admin-password" className='border w-full m-2 rounded-lg' />
            </div>
            <button type="submit" className='bg-green-500 rounded-lg p-2'>Login as Teacher</button>
          </form>
        </TabsContent>
        <TabsContent value='parent'>
          <form>
          <div className='flex flex-col'>
              <label>Email/Username</label>
              <input type="text" name="admin-username" className='border w-full m-2 rounded-lg' />
            </div>
            <div  className='flex flex-col'>
              <label>Password</label>
              <input type="password" name="admin-password" className='border w-full m-2 rounded-lg' />
            </div>
            <button type="submit" className='bg-green-500 rounded-lg p-2'>Login as Parent/Guardian</button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export const Route = createFileRoute('/auth/login')({
  component: Login,
})
