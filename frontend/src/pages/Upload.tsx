import { useState, useCallback } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Container,
  LinearProgress,
} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const Upload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith('video/')) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !title) return

    setUploading(true)
    // TODO: Implement actual upload logic
    // Simulating upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setUploading(false)
        // Reset form
        setFile(null)
        setTitle('')
        setUploadProgress(0)
      }
    }, 500)
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Upload Video
      </Typography>
      <Paper
        sx={{
          p: 3,
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          sx={{
            border: '2px dashed',
            borderColor: 'primary.main',
            borderRadius: 1,
            p: 3,
            textAlign: 'center',
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            type="file"
            id="file-input"
            hidden
            accept="video/*"
            onChange={handleFileSelect}
          />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant="h6" mt={2}>
            {file ? file.name : 'Drag and drop a video or click to browse'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supported formats: MP4, WebM, MOV
          </Typography>
        </Box>

        <TextField
          label="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
        />

        {uploading && (
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={uploadProgress} />
            <Typography variant="body2" color="text.secondary" mt={1}>
              Uploading... {uploadProgress}%
            </Typography>
          </Box>
        )}

        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={!file || !title || uploading}
          size="large"
        >
          Upload Video
        </Button>
      </Paper>
    </Container>
  )
}

export default Upload 