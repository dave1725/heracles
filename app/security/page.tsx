import React from 'react'
import Navbar from '../navbar/page'
import { SecurityCenter } from '@/components/ui/dashboard/SecurityCenter';
import { WindowsUpdates } from '@/components/ui/dashboard/WindowsUpdates';

const Security = () => {
  return (
    <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
            <WindowsUpdates />
            <SecurityCenter />
        </div>
    </>
  )
}

export default Security;
