import React, { useEffect } from 'react'
import { Box } from '@mui/material'

interface AdUnitProps {
  slot: string
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical'
  style?: React.CSSProperties
}

const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', style }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('Error loading ad:', error)
    }
  }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        my: 2,
        ...style,
      }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          ...(format === 'rectangle' && {
            width: '300px',
            height: '250px',
          }),
          ...(format === 'vertical' && {
            width: '160px',
            height: '600px',
          }),
        }}
        data-ad-client="pub-7031683187222835"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </Box>
  )
}

export default AdUnit 