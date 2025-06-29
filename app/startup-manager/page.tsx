import React from 'react'
import Navbar from '../navbar/page'
import { StartupPrograms } from '@/components/ui/dashboard/StartupPrograms'
import Footer from '@/components/ui/dashboard/Footer'

const StartupManager = () => {
  return (
    <>
    
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
          <StartupPrograms />
        </div>
 
    </>

  )
}

export default StartupManager
