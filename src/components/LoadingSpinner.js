import { CircularProgress, Box } from '@mui/material';

function LoadingSpinner() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;