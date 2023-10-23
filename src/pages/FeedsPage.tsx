import React, { useState, useEffect } from 'react';
import { Typography, Container, CircularProgress, Button, Box, Snackbar} from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import AddIcon from '@mui/icons-material/Add';
import * as feedsService from '../api/feeds';
import { Header } from '../components/Header';
import { FeedsList } from '../components/FeedsList';
import { Feed } from '../types/Feed';
import { AddFeedModal } from '../components/AddFeedModal';
import { getUser } from '../utils/getUser';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const FeedsPage: React.FC = () => {
  const [feeds, setFeeds] = useState<Feed[] | []>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showAddFeedModal, setShowAddFeedModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const userId = Number(getUser().id);
  const name = getUser().name;

  useEffect(() => {
    setLoading(true);

    feedsService.getFeeds(userId)
      .then((response) => setFeeds(response.data))
      .catch(() => {
        setError(true);
        setSnackbarMessage('Unable to load feeds. Please try again later');
        setSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const addFeed = (title: string, body: string) => {
    const newFeed: Feed = {
      userId,
      title,
      body,
      id: 0
    };

    feedsService.addFeed(newFeed)
      .then(response => {
        setFeeds(currentFeeds => [response.data, ...currentFeeds,]);
        setSnackbarOpen(true);
      })
      .catch(() => {
        setError(true);
        setSnackbarMessage('Unable to add a feed');
        setSnackbarOpen(true);
      })
      .finally(() => {
        setSnackbarMessage('Feed successfully added');
        setSnackbarOpen(true);
      });
  };

  const deleteFeed = (id: number) => {
    feedsService.deleteFeed(id)
      .then(() => {
        setFeeds(currentFeeds => currentFeeds
          .filter((currentFeed) => id !== currentFeed.id));
        setSnackbarMessage('Feed successfully deleted');
        setSnackbarOpen(true);
      })
      .catch(() => {
        setError(true);
        setSnackbarMessage('Unable to delete a feed');
        setSnackbarOpen(true);
      })
      .finally(() => {
        setSnackbarMessage('Feed successfully deleted');
        setSnackbarOpen(true);
      });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Header name={name} />

      <Container
        maxWidth="md"
        sx={{ position: 'relative', top: '84px', paddingBlock: '80px' }}
      >
        <Typography variant='h1'>Last Feeds</Typography>
        {loading && <CircularProgress color='primary' />}

        {feeds.length === 0 && !loading && !error && (
          <Typography>
            Not feeds yet
          </Typography>
        )}

        {!loading && !error && <>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setShowAddFeedModal(true)}
            >
              Add Feed
            </Button>
          </Box>

          <AddFeedModal
            open={showAddFeedModal}
            handleClose={setShowAddFeedModal}
            addFeed={addFeed}
          />

          <FeedsList
            feeds={showAll ? feeds : feeds.slice(0, 3)}
            deleteFeed={deleteFeed}
          />

          {!showAll && (
            <Button
              variant="contained"
              sx={{ display: 'block', marginInline: 'auto' }}
              onClick={() => setShowAll(true)}
            >
              Show All
            </Button>)}
        </>}

        <Snackbar 
          open={snackbarOpen} 
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={error ? 'error' : 'success'}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};
