import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, IconButton, Chip, Table, TableBody, TableRow, TableCell, Box, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function LaunchModal({ open, handleClose, launch }) {
  if (!launch) return null;

  const {
    links,
    name,
    success,
    details,
    date_utc,
    rocket,
    payloads,
    launchpad,
    flight_number
  } = launch;

  const generatedDescription = details || `This mission, ${name}, was launched by SpaceX using the ${rocket?.name || 'rocket'} from ${launchpad?.name || 'an unknown launchpad'} on ${new Date(date_utc).toLocaleDateString()}. The mission's primary objective was to deploy payloads into ${payloads?.[0]?.orbit || 'their designated orbit'}.`;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            {links.patch.small && (
              <img src={links.patch.small} alt={name} style={{ width: 50, height: 50, borderRadius: 8 }} />
            )}
            <Box>
              <Typography variant="h6" fontWeight="bold">{name}</Typography>
              <Chip
                label={success ? 'Success' : launch.upcoming ? 'Upcoming' : 'Failed'}
                color={success ? 'success' : launch.upcoming ? 'warning' : 'error'}
                size="small"
              />
            </Box>
          </Box>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
          {generatedDescription}{' '}
          {links.wikipedia && (
            <a href={links.wikipedia} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', textDecoration: 'underline' }}>
              Learn more
            </a>
          )}
        </Typography>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Flight Number</TableCell>
              <TableCell>{flight_number}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mission Name</TableCell>
              <TableCell>{name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Rocket</TableCell>
              <TableCell>{rocket?.name || rocket}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Payloads</TableCell>
              <TableCell>{payloads?.map(p => p.name).join(', ') || '-'}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Launchpad</TableCell>
              <TableCell>{launchpad?.name || launchpad}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Launch Date</TableCell>
              <TableCell>{new Date(date_utc).toUTCString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>{success ? 'Success' : launch.upcoming ? 'Upcoming' : 'Failed'}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}

export default LaunchModal;
