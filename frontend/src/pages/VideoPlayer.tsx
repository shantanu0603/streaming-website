import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  Box,
  Paper,
  Divider,
  Avatar,
  Grid,
  CircularProgress,
  Alert,
  Button,
  IconButton,
  Tooltip,
  Fade,
  useTheme,
  alpha,
} from '@mui/material'
import { localVideos, type Video } from '../data/videos'
import RefreshIcon from '@mui/icons-material/Refresh'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShareIcon from '@mui/icons-material/Share'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import BookmarkIcon from '@mui/icons-material/Bookmark'
import FullscreenIcon from '@mui/icons-material/Fullscreen'

const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const theme = useTheme()
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const videoData = localVideos.find(v => v.id === id)
    if (videoData) {
      setVideo(videoData)
      setError(null)
    } else {
      navigate('/')
    }
    setLoading(false)
  }, [id, navigate])

  useEffect(() => {
    const handleContextMenu = (e: Event) => {
      e.preventDefault()
    }

    const handleError = (e: Event) => {
      const videoElement = e.target as HTMLVideoElement
      console.error('Video error:', videoElement.error)
      setError(`Error playing video: ${videoElement.error?.message || 'Unknown error'}`)
      setIsBuffering(false)
    }

    const handleWaiting = () => {
      console.log('Video is buffering...')
      setIsBuffering(true)
    }

    const handlePlaying = () => {
      console.log('Video is playing')
      setIsBuffering(false)
      setError(null)
    }

    const handleCanPlay = () => {
      console.log('Video can play')
      setIsBuffering(false)
    }

    const videoElement = videoRef.current
    if (videoElement) {
      videoElement.addEventListener('contextmenu', handleContextMenu)
      videoElement.addEventListener('error', handleError)
      videoElement.addEventListener('waiting', handleWaiting)
      videoElement.addEventListener('playing', handlePlaying)
      videoElement.addEventListener('canplay', handleCanPlay)
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('contextmenu', handleContextMenu)
        videoElement.removeEventListener('error', handleError)
        videoElement.removeEventListener('waiting', handleWaiting)
        videoElement.removeEventListener('playing', handlePlaying)
        videoElement.removeEventListener('canplay', handleCanPlay)
      }
    }
  }, [])

  const handleRetry = () => {
    if (videoRef.current) {
      setError(null)
      videoRef.current.load()
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: video?.title,
        text: video?.description,
        url: window.location.href,
      }).catch(console.error)
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(console.error)
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const getEmbedUrl = (url: string) => {
    const fileId = url.match(/id=([^&]+)/)?.[1]
    if (!fileId) return url
    return `https://drive.google.com/file/d/${fileId}/preview`
  }

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (!video) {
    return (
      <Container>
        <Alert severity="error">Video not found</Alert>
      </Container>
    )
  }

  return (
    <Fade in timeout={500}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 3 }}>
          <IconButton
            onClick={() => navigate('/')}
            sx={{
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ mb: 2 }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    startIcon={<RefreshIcon />}
                    onClick={handleRetry}
                  >
                    Retry
                  </Button>
                }
              >
                {error}
              </Alert>
            )}
            <Box
              ref={containerRef}
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
                bgcolor: 'black',
                overflow: 'hidden',
                borderRadius: 2,
                boxShadow: theme.shadows[8],
              }}
            >
              <iframe
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                src={getEmbedUrl(video.videoUrl)}
                allowFullScreen
              />
              {isBuffering && !error && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    p: 2,
                    borderRadius: '50%',
                  }}
                >
                  <CircularProgress size={60} color="primary" />
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Paper 
              sx={{ 
                p: 3,
                background: `linear-gradient(to bottom right, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`,
                backdropFilter: 'blur(10px)',
                borderRadius: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography 
                  variant="h4" 
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  {video.title}
                </Typography>
                <Box>
                  <Tooltip title="Toggle Fullscreen">
                    <IconButton onClick={toggleFullscreen} color="primary">
                      <FullscreenIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Share">
                    <IconButton onClick={handleShare} color="primary">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={liked ? "Unlike" : "Like"}>
                    <IconButton 
                      onClick={() => setLiked(!liked)} 
                      color={liked ? "primary" : "default"}
                    >
                      <ThumbUpIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={bookmarked ? "Remove Bookmark" : "Bookmark"}>
                    <IconButton 
                      onClick={() => setBookmarked(!bookmarked)}
                      color={bookmarked ? "primary" : "default"}
                    >
                      <BookmarkIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              <Typography 
                variant="body2" 
                color="text.secondary" 
                gutterBottom
                sx={{ mb: 2 }}
              >
                Added on {new Date(video.uploadDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    mr: 2,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  }}
                >
                  A
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Admin</Typography>
              </Box>
              <Typography 
                variant="body1"
                sx={{
                  lineHeight: 1.7,
                  color: alpha(theme.palette.text.primary, 0.9),
                }}
              >
                {video.description}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fade>
  )
}

export default VideoPlayer 