import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [allowed, setAllowed] = useState(false)
  const navigate = useNavigate()

  // Verify session on component mount
  useEffect(() => {
    const verifySession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session verification error:', error)
          navigate('/admin/login')
          return
        }

        if (data?.session?.user) {
          setAllowed(true)
        } else {
          navigate('/admin/login')
        }
      } catch (err) {
        console.error('Unexpected error during session verification:', err)
        navigate('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [navigate])

  const handleReset = async () => {
    // Reset previous messages
    setMessage('')

    // Validate password
    if (!password) {
      setMessage("Password can't be empty")
      return
    }

    // Validate password confirmation
    if (password !== confirmPassword) {
      setMessage("Passwords don't match")
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setMessage('Password must be at least 8 characters long')
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        setMessage(error.message)
        return
      }

      setMessage('✅ Password updated successfully! Redirecting to login...')
      
      // Sign out the user after successful password reset
      await supabase.auth.signOut()
      
      // Redirect to login page after a short delay
      setTimeout(() => navigate('/admin/login'), 2500)
    } catch (err) {
      console.error('Password reset error:', err)
      setMessage('An unexpected error occurred')
    }
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forge-black">
        <div className="flex items-center space-x-3 text-cool-cyan">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Verifying access...</span>
        </div>
      </div>
    )
  }

  // Don't render anything if not allowed
  if (!allowed) return null

  return (
    <div className="min-h-screen flex items-center justify-center bg-forge-black text-white px-4">
      <div className="bg-gunmetal-gray p-8 rounded-xl space-y-6 w-full max-w-md shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-cool-cyan">Reset Password</h1>
          <p className="text-steel-blue mt-2">Enter your new password below</p>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-chrome-silver mb-1">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-lg bg-forge-black border border-cool-cyan/30 text-chrome-silver placeholder-steel-blue focus:outline-none focus:ring-2 focus:ring-cool-cyan"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-chrome-silver mb-1">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-lg bg-forge-black border border-cool-cyan/30 text-chrome-silver placeholder-steel-blue focus:outline-none focus:ring-2 focus:ring-cool-cyan"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('✅') 
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500' 
              : 'bg-ember-red/10 border border-ember-red/30 text-ember-red'
          }`}>
            {message}
          </div>
        )}

        <button
          onClick={handleReset}
          className="w-full py-3 px-4 rounded-lg bg-cool-cyan text-white font-medium hover:bg-cool-cyan/90 transition"
        >
          Update Password
        </button>

        <div className="text-center">
          <button
            onClick={() => navigate('/admin/login')}
            className="text-steel-blue hover:text-cool-cyan transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
} 