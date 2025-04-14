import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import { createFileRoute, useRouter } from '@tanstack/react-router';

const Login = () => {
  const navigate = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h1>
        
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

          {['admin', 'teacher', 'parent'].map((role) => (
            <TabsContent key={role} value={role}>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email/Username</label>
                  <input
                    type="text"
                    name={`${role}-username`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your email or username"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    name={`${role}-password`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => navigate.navigate({ to: role === 'admin' ? '/admin/dashboard' : role === 'teacher' ? '/teacher/dashboard' : '/parent/dashboard' })} // Adjust the navigation based on role
                >
                  Login as {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              </form>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/auth/login')({
  component: Login,
});
