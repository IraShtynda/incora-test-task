import React from 'react';
import { Typography, Box, Card, CardContent } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { normalizedText } from '../utils/normilizedText';
import { Comment } from '../types/Comment';

type Props = {
  comment: Comment
}

export const CommentCard: React.FC<Props> = ({ comment }) => {
  return (
    <Card key={comment.id}
      sx={{
        marginBlock: '20px',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
        ':hover': {
          boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.6)',
        },
      }}>
      <CardContent>
        <Box
          sx={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}
        >
          <AccountCircle fontSize='large' color='primary' />

          <Box>
            <Typography variant='h5'>{normalizedText(comment.name)}</Typography>
            <Typography>{comment.email}</Typography>
          </Box>
        </Box>

        <Typography>{normalizedText(comment.body)}</Typography>
      </CardContent>
    </Card>
  );
};