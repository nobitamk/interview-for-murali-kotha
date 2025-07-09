import { Typography, Box } from '@mui/material';

function EmptyState({ message }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <Typography variant="h6" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
}

export default EmptyState;