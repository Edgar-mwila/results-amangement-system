import { createFileRoute, useRouter } from '@tanstack/react-router'
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

const Register = () => {
  const navigate = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h1>
        
        <Tabs defaultValue="admin" className="space-y-6">
          <TabsList className="grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-1">
            <TabsTrigger 
              value="admin"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2"
            >
              Admin
            </TabsTrigger>
            <TabsTrigger 
              value="teacher"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2"
            >
              Teacher
            </TabsTrigger>
            <TabsTrigger 
              value="parent"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md py-2"
            >
              Parent
            </TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="admin-name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="admin-email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="admin-password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" name="admin-confirm-password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => navigate.navigate({ to: '/admin/dashboard'})}
              >
                Register as Admin
              </button>
            </form>
          </TabsContent>

          <TabsContent value="teacher">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="teacher-name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="teacher-email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <input type="text" name="teacher-subject" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="teacher-password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" name="teacher-confirm-password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => navigate.navigate({ to: '/teacher/dashboard'})}
              >
                Register as Teacher
              </button>
            </form>
          </TabsContent>

          <TabsContent value="parent">
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="parent-name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="parent-email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Student's Name</label>
                <input type="text" name="student-name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="parent-password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" name="parent-confirm-password" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors" />
              </div>
              <button 
                type="submit" 
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => navigate.navigate({ to: '/parent/dashboard'})}
              >
                Register as Parent/Guardian
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/auth/register')({
  component: Register
})
