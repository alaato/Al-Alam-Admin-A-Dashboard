import { isAdminLoggedIn, logoutAdmin	 } from '@/lib/PocketBaseApi'
import { useState, useEffect } from 'react'
import { redirect } from 'react-router-dom'

export default function IndexRoute() {
	const handleLogout = async () => {
		const res = await logoutAdmin()
		if (res.status === 'success') redirect('/login')
	}

  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <button onClick={handleLogout}>Logout</button>
      </div>
    ) 
  
}
