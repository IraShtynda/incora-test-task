import React, { useState } from 'react';
import { Modal, Typography, Box, TextField, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Colors } from '../styles/theme';

type Props = {
  open: boolean;
  handleClose: (open: boolean) => void;
  addFeed: (title: string, body: string) => void;
};

const modalWrapperStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: Colors.light,
  boxShadow: 24,
  borderRadius: '5px',
  p: 4,
};

export const AddFeedModal: React.FC<Props> = ({ open, handleClose, addFeed }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    addFeed(title, body);

    setTitle('');
    setBody('');
    handleClose(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalWrapperStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton
            onClick={() => handleClose(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="h3" color='primary' sx={{marginBlock: '16px'}}>
          Add new Feed
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            multiline
            sx={{
              '& textarea': {
                resize: 'both',
                minHeight: '100px'
              }
            }}
            label="Body"
            variant="outlined"
            fullWidth
            margin="normal"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '30px' }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
