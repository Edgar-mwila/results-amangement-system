import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { School } from '@/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const SYSTEM_ADMIN_ROLE = 'system-admin';
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
  const [reviewOpen, setReviewOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [credsEmail, setCredsEmail] = useState<string | null>(null);
  const [credsPassword, setCredsPassword] = useState<string | null>(null);

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

  const callAction = async (school: School, action: 'approve' | 'reject' | 'revoke') => {
    const actionKey = `${school.id}-${action}`;
    setActionLoading(actionKey);
    setError(null);
    try {
      const res = await fetch(`/api/schools/${school.id}/${action}`, { method: 'PUT' });
      if (!res.ok) throw new Error(`Failed to ${action} school`);
      const data = await res.json();
      if (action === 'approve') {
        const updatedSchool: School = data.school ?? school;
        setSchools(prev => prev.map(s => (s.id === school.id ? { ...s, ...updatedSchool } : s)));
        setSelectedSchool({ ...school, ...updatedSchool });
        // capture credentials for UI (may be null if admin already existed)
        setCredsEmail(data.adminEmail ?? null);
        setCredsPassword(data.tempPassword ?? null);
      } else {
        // reject/revoke endpoints return the updated School directly
        const updated: Partial<School> = data;
        setSchools(prev => prev.map(s => (s.id === school.id ? { ...s, ...updated } : s)));
        setSelectedSchool({ ...school, ...updated });
        setCredsEmail(null);
        setCredsPassword(null);
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const buildMailtoHref = (email: string, schoolName?: string | null, subdomain?: string | null, password?: string | null) => {
    const subject = `Your School Administrator Account`;
    const nameOrSub = schoolName && schoolName.trim().length > 0 ? schoolName : (subdomain ?? 'your school');
    const body = `Hello,%0D%0A%0D%0A` +
      `Your school (${encodeURIComponent(nameOrSub)}) has been approved.%0D%0A` +
      `An administrator account has been created for you.%0D%0A%0D%0A` +
      `Email: ${encodeURIComponent(email)}%0D%0A` +
      (password ? `Temporary Password: ${encodeURIComponent(password)}%0D%0A%0D%0A` : '') +
      `Please log in and change your password immediately.`;
    return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch(`/api/system-admins/email/${loginEmail}`);
      if (!res.ok) throw new Error('System admin not found');
      const admin = await res.json();
      if (loginPassword !== admin.passwordHash) {
        throw new Error('Incorrect password');
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
                    <Button
                      onClick={async () => {
                        setSelectedSchool(school);
                        setReviewOpen(true);
                        try {
                          if (!school.contacts || school.contacts.length === 0) {
                            const res = await fetch(`/api/schools/${school.id}`);
                            if (res.ok) {
                              const data = await res.json();
                              // support either raw School or { data: School }
                              const full = (data && data.data) ? data.data : data;
                              if (full && full.id) {
                                setSelectedSchool((prev) => ({ ...(prev ?? school), ...full }));
                              }
                            }
                          }
                        } catch { /* ignore */ }
                      }}
                      className="w-full sm:w-auto min-h-[40px] px-4"
                      variant="outline"
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Review School</DialogTitle>
            <DialogDescription>
              Review the school details and take action.
            </DialogDescription>
          </DialogHeader>
          {selectedSchool && (
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Name:</span> {selectedSchool.name}</div>
              <div><span className="font-medium">Subdomain:</span> {selectedSchool.subdomain}</div>
              <div><span className="font-medium">Registration #:</span> {selectedSchool.registrationNumber}</div>
              {selectedSchool.address && (<div><span className="font-medium">Address:</span> {selectedSchool.address}</div>)}
              {selectedSchool.city && (<div><span className="font-medium">City:</span> {selectedSchool.city}</div>)}
              {selectedSchool.stateProvince && (<div><span className="font-medium">State/Province:</span> {selectedSchool.stateProvince}</div>)}
              {selectedSchool.category && (<div><span className="font-medium">Category:</span> {selectedSchool.category}</div>)}
              {selectedSchool.ownership && (<div><span className="font-medium">Ownership:</span> {selectedSchool.ownership}</div>)}
              {selectedSchool.curriculum && (<div><span className="font-medium">Curriculum:</span> {selectedSchool.curriculum}</div>)}
              <div><span className="font-medium">Status:</span> <span className="capitalize">{selectedSchool.status}</span></div>
              <div className="mt-3">
                <div className="font-medium mb-1">Contacts</div>
                {selectedSchool.contacts && selectedSchool.contacts.length > 0 ? (
                  <ul className="list-disc ml-5 space-y-1">
                    {selectedSchool.contacts.map((c, idx) => (
                      <li key={c.id ?? idx}>
                        {c.email ? (<span className="mr-2"><span className="font-medium">Email:</span> {c.email}</span>) : null}
                        {c.phone ? (<span><span className="font-medium">Phone:</span> {c.phone}</span>) : null}
                        {!c.email && !c.phone ? (<span className="text-muted-foreground">No details</span>) : null}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-muted-foreground text-xs">No contacts found.</div>
                )}
              </div>
              {(credsEmail || credsPassword) && (
                <div className="mt-4 p-3 rounded border bg-muted/30">
                  <div className="font-medium mb-1">Generated Credentials</div>
                  {credsEmail && (<div><span className="font-medium">Email:</span> {credsEmail}</div>)}
                  {credsPassword && (<div><span className="font-medium">Temporary Password:</span> {credsPassword}</div>)}
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const text = `Email: ${credsEmail ?? ''}\nTemporary Password: ${credsPassword ?? ''}`.trim();
                        navigator.clipboard?.writeText(text).catch(() => {});
                      }}
                    >
                      Copy
                    </Button>
                    {credsEmail && (
                      <a
                        href={buildMailtoHref(credsEmail, selectedSchool.name, selectedSchool.subdomain, credsPassword)}
                        className="inline-flex items-center"
                      >
                        <Button type="button">Send Email</Button>
                      </a>
                    )}
                  </div>
                  {!credsEmail && (
                    <div className="text-xs text-muted-foreground mt-2">
                      No new administrator was created (one already exists), so no credentials were generated.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          <DialogFooter className="gap-2">
            {selectedSchool && selectedSchool.status === 'approved' ? (
              // Already accepted: show Revoke (wording change only, backend sets suspended)
              <Button
                variant="destructive"
                disabled={actionLoading === `${selectedSchool.id}-revoke`}
                onClick={() => callAction(selectedSchool, 'revoke')}
              >
                {actionLoading === `${selectedSchool.id}-revoke` ? 'Revoking...' : 'Revoke Access'}
              </Button>
            ) : (
              <>
                <Button
                  variant="default"
                  disabled={!!selectedSchool && actionLoading === `${selectedSchool.id}-approve`}
                  onClick={() => selectedSchool && callAction(selectedSchool, 'approve')}
                >
                  {selectedSchool && actionLoading === `${selectedSchool.id}-approve` ? 'Approving...' : 'Approve'}
                </Button>
                <Button
                  variant="destructive"
                  disabled={!!selectedSchool && actionLoading === `${selectedSchool.id}-reject`}
                  onClick={() => selectedSchool && callAction(selectedSchool, 'reject')}
                >
                  {selectedSchool && actionLoading === `${selectedSchool.id}-reject` ? 'Rejecting...' : 'Reject'}
                </Button>
              </>
            )}
            <Button variant="outline" onClick={() => setReviewOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const Route = createFileRoute('/system-admin')({
  component: () => <SystemAdminDashboard />,
})
