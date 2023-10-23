import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Typography, Container, CircularProgress, Box, Button } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { getFeed } from '../api/feeds';
import { getComments } from '../api/comments';
import { Feed } from '../types/Feed';
import { Comment } from '../types/Comment';
import { normalizedText } from '../utils/normilizedText';
import { Header } from '../components/Header';
import { CommentCard } from '../components/CommentCard';
import { getUser } from '../utils/getUser';
import { Colors } from '../styles/theme';

export const FeedDetailsPage: React.FC = () => {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const name = getUser().name;

  useEffect(() => {
    setLoading(true);

    getFeed(Number(id))
      .then((response) => setFeed(response.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));

    getComments(Number(id))
      .then((response) => setComments(response.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (<>
    <Header name={name} />

    <Container 
      maxWidth="md" 
      sx={{ position: 'relative', top: '84px', paddingBlock: '80px' }}
    >
      <Button
        variant="text"
        startIcon={<ArrowBackIosIcon style={{ color: Colors.dark }} />}
      >
        <Link 
          to="/feeds" 
          style={{ textDecoration: 'none', color: Colors.dark, fontWeight: '600' }}
        >
            Back to Last Feeds
        </Link>
      </Button>

      {loading && <CircularProgress color='primary' />}
      {error && <Typography>Something went wrong</Typography>}

      {!loading && !error && feed && (<>
        <Typography
          variant='h2'
          color='primary'
          sx={{ marginBlock: '20px' }}>
          {normalizedText(feed.title)}
        </Typography>
        <Typography sx={{ fontSize: '18px' }}>
          {normalizedText(feed.body)}
        </Typography>

        <Typography variant='h4' sx={{ marginTop: '40px' }}>
          <CommentIcon /> Comments
        </Typography>

        {comments.length > 0 ? (<Box>
          {comments.map((comment =>
            <CommentCard comment={comment} key={comment.id}/>
          ))}
        </Box>
        ) : (
          <Typography>No comments yet</Typography>
        )}
      </>)
      }
    </Container >
  </>
  );
};