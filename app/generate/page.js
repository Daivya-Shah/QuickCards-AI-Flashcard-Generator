'use client'

import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, Grid, Card, CardContent, CardActionArea } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { collection, doc, getDoc, writeBatch } from 'firebase/firestore';
import { db } from '@/firebase';

const primaryColor = '#00BFA5';
const secondaryColor = '#00ACC1';
const fontFamily = 'Roboto, sans-serif'; // Ensure this matches the font used on your home, sign-in, and sign-up pages.

const StyledButton = styled(Button)({
  borderRadius: '8px',
  textTransform: 'none',
  padding: '10px 16px',
  backgroundColor: primaryColor,
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontFamily: fontFamily,
  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
  '&:hover': {
    backgroundColor: secondaryColor,
  },
});

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.');
      return;
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate flashcards');
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      console.error('Error generating flashcards:', error);
      alert('An error occurred while generating flashcards. Please try again.');
    }
  };

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const saveFlashcards = async () => {
    if (!name.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }

    try {
      const batch = writeBatch(db)
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)

      if (userDocSnap.exists()) {
        const collections = userDocSnap.data().flashcards || []
        if (collections.find((f) => f.name === name)) {
          alert('Flashcard collection with the same name already exists.')
          return
        } else {
          collections.push({ name })
          batch.set(userDocRef, { flashcards: collections }, { merge: true })
        }
      } else {
        batch.set(userDocRef, { flashcards: [{ name }] })
      }
      
      const colRef = collection(userDocRef, name)
      flashcards.forEach((flashcard) => {
        const cardDocRef = doc(colRef)
        batch.set(cardDocRef, flashcard)
      })

      await batch.commit()
      alert('Flashcards saved successfully!')
      handleClose()
      setName('')
      router.push('/flashcards')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f4f8', // Light greyish-blue background
        padding: 2,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          borderRadius: '16px',
          maxWidth: 800,
          width: '100%',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          backgroundColor: '#ffffff', // White background for the card
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: 2,
            fontSize: '2.5rem',
            letterSpacing: '0.05em',
            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: fontFamily,
          }}
        >
          QuickCards AI
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <StyledButton onClick={() => router.push('/')}>
            Home
          </StyledButton>
          <StyledButton onClick={() => router.push('/flashcards')}>
            My Decks
          </StyledButton>
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 'normal',
            marginBottom: 2,
            fontSize: '1.5rem',
            fontFamily: fontFamily,
            color: '#6c757d', // Grey color for subheading
          }}
        >
          Enter your text to generate flashcards.
        </Typography>

        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
          InputLabelProps={{
            sx: {
              fontFamily: fontFamily,
            },
          }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton onClick={handleSubmit}>
            Generate Flashcards
          </StyledButton>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <CardContent>
                        <Box
                          sx={{
                            perspective: '1000px',
                            '& > div': {
                              transition: 'transform 0.6s',
                              transformStyle: 'preserve-3d',
                              position: 'relative',
                              width: '100%',
                              height: '200px',
                              boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                              transform: flipped[index]
                                ? 'rotateY(180deg)'
                                : 'rotateY(0deg)',
                            },
                            '& > div > div': {
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 2,
                              boxSizing: 'border-box',
                            },
                            '& > div > div:nth-of-type(2)': {
                              transform: 'rotateY(180deg)',
                            },
                          }}
                        >
                          <div>
                            <div>
                              <Typography variant="h5" component="div" sx={{ fontFamily: fontFamily, fontSize: '1.25rem' }}>
                                {flashcard.front}
                              </Typography>
                            </div>
                            <div>
                              <Typography variant="h5" component="div" sx={{ fontFamily: fontFamily, fontSize: '1.25rem' }}>
                                {flashcard.back}
                              </Typography>
                            </div>
                          </div>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'center' }}>
              <StyledButton onClick={handleOpen}>
                Save
              </StyledButton>
            </Box>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ fontFamily: fontFamily }}>Save Flashcards</DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: fontFamily }}>
              Please enter a name for your flashcard collection.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Collection Name"
              type="text"
              InputLabelProps={{
                style: { fontFamily: fontFamily, fontSize: '1rem' },
              }}
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ fontFamily: fontFamily }}>
              Cancel
            </Button>
            <Button onClick={saveFlashcards} color="primary" sx={{ fontFamily: fontFamily }}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
}
