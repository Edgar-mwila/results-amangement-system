import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { School } from '@/types';

const SYSTEM_ADMIN_ROLE = 'SystemAdmin';
interface Admin {
  email: string;
  passwordHash: string;
}

const SystemAdminDashboard = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState<Admin | null>(null);

  // Check login on mount
  useEffect(() => {
    const userString = localStorage.getItem('systemAdminUser');
    if (userString) {
      try {
        const parsed = JSON.parse(userString);
        if (parsed && parsed.role === SYSTEM_ADMIN_ROLE) {
          setUser(parsed);
          setShowLogin(false);
        } else {
          setShowLogin(true);
        }
      } catch {
        setShowLogin(true);
      }
    } else {
      setShowLogin(true);
    }
  }, []);

  // Fetch schools only if logged in
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetch('/api/schools/')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch schools');
        return res.json();
      })
      .then(data => {
        setSchools(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [user]);

  const handleStatusChange = async (schoolId: string, status: 'approved' | 'rejected') => {
    setActionLoading(`${schoolId}-${status}`);
    setError(null);
    try {
      const res = await fetch(`/api/schools/${schoolId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Failed to update school status');
      const updated = await res.json();
      setSchools(schools => schools.map(s => s.id === schoolId ? { ...s, ...updated } : s));
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      // Replace with your real system admin login API
      const res = await fetch(`/api/system-admins/email/${loginEmail}`);
      if (!res.ok) throw new Error('System admin not found');
      const admin = await res.json();
      if (loginPassword !== admin.passwordHash) {
        throw new Error('Incorrect password');
      }
      if (admin.role !== SYSTEM_ADMIN_ROLE) {
        throw new Error('Not a system admin');
      }
      localStorage.setItem('systemAdminUser', JSON.stringify(admin));
      setUser(admin);
      setShowLogin(false);
    } catch (err) {
      if (err instanceof Error) setLoginError(err.message);
      else setLoginError('Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('systemAdminUser');
    setUser(null);
    setShowLogin(true);
  };

  if (showLogin || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-2">
        <Card className="w-full max-w-md mx-auto p-4 sm:p-6 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">System Admin Login</h1>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="text"
                name="email"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Input
                type="password"
                name="password"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            {loginError && <div className="text-red-600 text-sm">{loginError}</div>}
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  if (loading) return <div className="flex justify-center items-center min-h-[40vh] text-lg">Loading schools...</div>;
  if (error) return <div className="text-red-600 text-center py-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-background px-2 py-4 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-2">
        <h1 className="text-lg sm:text-2xl font-bold text-foreground">System Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="w-full sm:w-auto min-h-[44px]">Logout</Button>
      </div>
      <Card className="p-2 sm:p-4">
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs sm:text-sm">Name</TableHead>
                <TableHead className="text-xs sm:text-sm">Subdomain</TableHead>
                <TableHead className="text-xs sm:text-sm">Status</TableHead>
                <TableHead className="text-xs sm:text-sm">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map(school => (
                <TableRow key={school.id} className="text-xs sm:text-sm">
                  <TableCell>{school.name}</TableCell>
                  <TableCell>{school.subdomain}</TableCell>
                  <TableCell className="capitalize">{school.status}</TableCell>
                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        disabled={school.status === 'approved' || actionLoading === `${school.id}-approved`}
                        onClick={() => handleStatusChange(school.id, 'approved')}
                        variant="default"
                        className="w-full sm:w-auto min-h-[40px] px-4"
                      >
                        {actionLoading === `${school.id}-approved` ? 'Approving...' : 'Approve'}
                      </Button>
                      <Button
                        disabled={school.status === 'rejected' || actionLoading === `${school.id}-rejected`}
                        onClick={() => handleStatusChange(school.id, 'rejected')}
                        variant="destructive"
                        className="w-full sm:w-auto min-h-[40px] px-4"
                      >
                        {actionLoading === `${school.id}-rejected` ? 'Rejecting...' : 'Reject'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default SystemAdminDashboard;

import { AnyRoute, createRoute } from '@tanstack/react-router';
import { Route as AdminRoute } from '../$school/dashboard/index';

export const Route = createRoute({
  path: '/system-admin/',
  component: SystemAdminDashboard,
  getParentRoute: () => AdminRoute as AnyRoute,
}); 