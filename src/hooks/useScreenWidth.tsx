'use client'

import { useEffect, useState } from 'react'

export const useScreenWidth = () => {
  const [width, setWidth] = useState<number | null>(null)

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    handleWindowSizeChange()

    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])
  return width
}
