import { createFileRoute, useRouter, useParams } from '@tanstack/react-router'
import { useState } from 'react'

const Login = () => {
  const navigate = useRouter()
  const { school } = useParams({ strict: false })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/${school}/users/email/${email}`)
      if (!res.ok) throw new Error('User not found')
      const user = await res.json()
      // Plainly compare entered password to password hash
      if (password !== user.passwordHash) {
        throw new Error('Incorrect password');
      }
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('isAuthenticated', 'true')
      if (user.role?.name === 'Administrator') {
        navigate.navigate({
          to: '/$school/dashboard/school',
          params: { school },
        })
      } else {
        navigate.navigate({
          to: '/$school/dashboard/classes',
          params: { school },
        })
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed')
      } else {
        setError('Login failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-600">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </a>
          </div>
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/$school/auth/login')({
  component: Login,
})
