import React from 'react';
import { Card, Typography, CardContent, CardActions, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Feed } from '../types/Feed';
import { normalizedText } from '../utils/normilizedText';
import { Colors } from '../styles/theme';

type Props = {
  feeds: Feed[],
  deleteFeed: (feedId: number) => void
}

export const FeedsList: React.FC<Props> = ({ feeds, deleteFeed }) => {
  return (<>
    {
      feeds.map(feed =>
        <Card
          key={feed.id}
          sx={{
            marginBlock: '20px',
            boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
            ':hover': {
              boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.6)',
            },
          }}
        >
          <CardContent>
            <Typography variant="h4" sx={{ marginBottom: '16px' }}>
              {normalizedText(feed.title)}
            </Typography>
            <Typography>
              {normalizedText(feed.body)}
            </Typography>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to={`/feeds/${feed.id}`}>
              <Button size="small" sx={{ fontWeight: '700', marginInline: '6px' }}>
                Read more
              </Button>
            </Link>
            <IconButton
              size="small"
              onClick={() => deleteFeed(feed.id)}
              sx={{color: Colors.dark}}
            >
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card >
      )
    }
  </>
  );
};