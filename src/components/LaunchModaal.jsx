import Modal from 'react-modal';
  import { Box, Typography, Button, Link } from '@mui/material';

  Modal.setAppElement('#root');

  function LaunchModal({ isOpen, onRequestClose, launch }) {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
            maxWidth: '90%',
            width: '600px',
            background: '#2e2e2e', // Modal keeps dark for contrast
            borderRadius: '8px',
            padding: '24px',
            border: 'none',
            maxHeight: '80vh',
            overflowY: 'auto',
          },
          overlay: {
            backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.75)' : 'transparent', // Black overlay only when open
            zIndex: 1000,
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#ffffff' }}>
            {launch.name}
          </Typography>
          <img
            src={launch.links?.patch?.small || 'https://via.placeholder.com/150'}
            alt={launch.name}
            style={{ width: '100%', height: 'auto', borderRadius: '4px', objectFit: 'contain' }}
          />
          <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
            <strong>Date:</strong> {new Date(launch.date_utc).toLocaleString()}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#e0e0e0', maxHeight: '200px', overflowY: 'auto' }}
          >
            <strong>Details:</strong> {launch.details || 'No details available.'}
          </Typography>
          {launch.links?.webcast && (
            <Typography variant="body1" sx={{ color: '#e0e0e0' }}>
              <strong>Webcast:</strong>{' '}
              <Link href={launch.links.webcast} target="_blank" color="primary">
                Watch
              </Link>
            </Typography>
          )}
          <Button
            variant="contained"
            onClick={onRequestClose}
            sx={{ mt: 2, alignSelf: 'center', width: '200px', backgroundColor: '#bb86fc', color: '#000000' }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    );
  }

  export default LaunchModal;