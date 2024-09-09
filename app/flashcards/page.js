'use client'

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Typography, CardActionArea, Grid, Card, CardContent, Box, Button, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';

const primaryColor = '#00BFA5';
const secondaryColor = '#00ACC1';
const fontFamily = 'Roboto, sans-serif';

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

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getFlashcards() {
      if (!user) return;
      const docRef = doc(collection(db, 'users'), user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || [];
        setFlashcards(collections);
      } else {
        await setDoc(docRef, { flashcards: [] });
      }
    }
    getFlashcards();
  }, [user]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  const handleCardClick = (id) => {
    router.push(`/flashcard?id=${id}`);
  };

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
          maxWidth: 1200,
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

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <StyledButton onClick={() => router.push('/')}>
            Home
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
          My Decks
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <StyledButton onClick={() => router.push('/generate')}>
            Create a New Deck of Flashcards
          </StyledButton>
        </Box>

        <Grid container spacing={3}>
          {flashcards.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                  <CardContent>
                  <Typography variant="h5" component="div" sx={{ fontFamily: fontFamily, fontSize: '1.25rem' }}>
                      {flashcard.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}
