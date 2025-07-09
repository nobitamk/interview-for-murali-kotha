import { LaunchProvider } from './context/LaunchContext';
import LaunchTable from './components/LaunchTable';
import LaunchList from './components/LaunchList';
import FilterControls from './components/FilterControls';
import { Container, Typography, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <LaunchProvider>
      <Container
        sx={{
          py: 4,
          backgroundColor: '#ffffff',
          color: '#000000',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          px: { xs: 0.25, sm: 0.25, md: 0.25 },
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: '24px 0',
            borderBottom: '1px solid #ccc',
            mb: 4,
          }}
        >
          <img
            src="/assets/space-logo.png"
            alt="SpaceX Logo"
            style={{
              maxWidth: '220px',
              width: '60%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={() => setShowGrid(!showGrid)}
            sx={{ backgroundColor: '#1976d2', color: '#ffffff' }}
          >
            {showGrid ? 'Switch to Table View' : 'Switch to Grid View'}
          </Button>
        </Box>

        {showGrid && (
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              mb: 6,
              px: { xs: 0, sm: 0, md: 0 },
            }}
          >
            <FilterControls />
          </Box>
        )}

        <Box
          sx={{
            width: '100%',
            px: { xs: 0, sm: 0, md: 0 },
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {showGrid ? <LaunchList /> : <LaunchTable />}
        </Box>
      </Container>
    </LaunchProvider>
  );
}

export default App;
