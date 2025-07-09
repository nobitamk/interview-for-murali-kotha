import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

  function LaunchCard({ launch, onClick }) {
    const imageUrl = launch.links?.patch?.small || 'https://via.placeholder.com/150';
    console.log('Image URL for', launch.name, ':', imageUrl);

    return (
      <Card sx={{ maxWidth: 345, backgroundColor: '#1e1e1e', color: 'white', margin: '8px' }}>
        <CardActionArea onClick={() => onClick(launch)}>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={launch.name}
            sx={{ objectFit: 'contain' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {launch.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {new Date(launch.date_utc).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {launch.details || 'No details available.'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  export default LaunchCard;