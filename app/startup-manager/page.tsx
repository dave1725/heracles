import React from 'react'
import Navbar from '../navbar/page'
import { StartupPrograms } from '@/components/ui/dashboard/StartupPrograms'

const StartupManager = () => {
  return (
    <>
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
          <StartupPrograms />
        </div>
    </>

  )
}

export default StartupManager
