// ** MUI Imports
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  // const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >
      <Image src="/logo.png" unoptimized width={150} height={0} sizes='100vw' style={{ height: "auto" }} alt='Logo' />
      <CircularProgress disableShrink sx={{ mt: 6 }} />
    </Box>
  )
}

export default FallbackSpinner
