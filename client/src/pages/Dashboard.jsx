import React from 'react'
import { UserContext } from '../context/usercontext';
import { useContext } from 'react';

export default function Dashboard() {
    const{user} = useContext(UserContext)
  return (
    <div>
        <h1>Dashboard</h1>
        {!!user && (<h2>Hi {user.name}!</h2>)}
    </div>
  )
}
