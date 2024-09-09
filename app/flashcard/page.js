'use client'

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { useSearchParams, useRouter } from 'next/navigation';
import { Container, Box, Typography, Grid, Card, CardContent, CardActionArea, Paper, Button } from '@mui/material';
import { styled } from '@mui/system';

const primaryColor = '#00BFA5';
const secondaryColor = '#00ACC1';
const fontFamily = 'Roboto, sans-serif'; // Ensure this matches the font used on your home, sign-in, and sign-up pages.

const StyledTypography = styled(Typography)({
  fontFamily: fontFamily,
});

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

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const router = useRouter();  // Add this line to define the router variable

  useEffect(() => {
    async function getFlashcards() {
      if (!search || !user) return;
      try {
        const colRef = collection(doc(collection(db, 'users'), user.id), search);
        const docs = await getDocs(colRef);
        const flashcards = [];

        docs.forEach((doc) => {
          flashcards.push({ id: doc.id, ...doc.data() });
        });
        setFlashcards(flashcards);
      } catch (err) {
        setError('Failed to load flashcards.');
        console.error(err);
      }
    }
    getFlashcards();
  }, [search, user]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!isLoaded || !isSignedIn) {
    return null;
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
        <StyledTypography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: 2,
            fontSize: '2.5rem',
            letterSpacing: '0.05em',
            background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          QuickCards AI
        </StyledTypography>

        {/* Buttons below the heading */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
          <StyledButton onClick={() => router.push('/')}>
            Home
          </StyledButton>
          <StyledButton onClick={() => router.push('/flashcards')}>
            My Decks
          </StyledButton>
          <StyledButton onClick={() => router.push('/generate')}>
            Create a New Deck of Flashcards
          </StyledButton>
        </Box>

        <Grid container spacing={3} sx={{ mt: 4 }}>
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
                          <StyledTypography variant="h5" component="div" sx={{ fontSize: '1.25rem' }}>
                            {flashcard.front}
                          </StyledTypography>
                        </div>
                        <div>
                          <StyledTypography variant="h5" component="div" sx={{ fontSize: '1.25rem' }}>
                            {flashcard.back}
                          </StyledTypography>
                        </div>
                      </div>
                    </Box>
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
