import React, { useState, useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Box,
  TextField,
  InputAdornment,
  Fade,
  CircularProgress,
  useTheme,
  alpha,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import SearchIcon from '@mui/icons-material/Search'
import { localVideos, type Video } from '../data/videos'

const Home = () => {
  const theme = useTheme()
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setVideos(localVideos)
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filter videos based on search term
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          mb: 3
        }}>
          India's Got Latent
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: alpha(theme.palette.background.paper, 0.6),
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  },
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Videos Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredVideos.map((video) => (
            <Grid item xs={12} sm={6} md={4} key={video.id}>
              <Fade in timeout={500}>
                <Card
                  component={RouterLink}
                  to={`/video/${video.id}`}
                  onMouseEnter={() => setHoveredCard(video.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: hoveredCard === video.id ? 'translateY(-8px)' : 'none',
                    boxShadow: hoveredCard === video.id ? theme.shadows[8] : theme.shadows[1],
                    '&:hover': {
                      '& .playIcon': {
                        transform: 'scale(1.2)',
                        color: theme.palette.primary.main,
                      },
                      '& .videoTitle': {
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: 200,
                      position: 'relative',
                      overflow: 'hidden',
                      bgcolor: alpha(theme.palette.primary.dark, 0.8),
                      borderRadius: '4px 4px 0 0',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(45deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.secondary.dark, 0.8)})`,
                      }}
                    >
                      <PlayCircleOutlineIcon
                        className="playIcon"
                        sx={{
                          fontSize: 80,
                          color: 'white',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography
                      className="videoTitle"
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{
                        transition: 'color 0.2s',
                        fontWeight: 'bold',
                        fontSize: '1.1rem',
                      }}
                    >
                      {video.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      Added on {new Date(video.uploadDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {video.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}

      {/* No Results Message */}
      {!loading && filteredVideos.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No videos found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search
          </Typography>
        </Box>
      )}
    </Container>
  )
}

export default Home 