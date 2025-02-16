import { AppBar, Toolbar, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <VideoLibraryIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          Video Stream
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar 