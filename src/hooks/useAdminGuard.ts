import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export function useAdminGuard() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error || !session) {
        navigate('/admin/login')
        return
      }

      // Verify admin role
      const { data: adminCheck } = await supabase
        .from('admins')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (!adminCheck) {
        await supabase.auth.signOut()
        navigate('/admin/login')
      }
    }

    checkSession()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/admin/login')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [navigate])
} 