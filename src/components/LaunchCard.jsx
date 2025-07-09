import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';

  function LaunchCard({ launch, onClick }) {
    const imageUrl = launch.links?.patch?.small || 'https://via.placeholder.com/150';
    console.log('Image URL for', launch.name, ':', imageUrl);

    return (
      <Card sx={{ maxWidth: 345, margin: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
            <Typography gutterBottom variant="h6" component="div" sx={{ color: '#000000' }}>
              {launch.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666666', mb: 1 }}>
              {new Date(launch.date_utc).toLocaleDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  export default LaunchCard;