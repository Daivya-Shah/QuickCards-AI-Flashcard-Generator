'use client'

import React from 'react';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { SignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const primaryColor = '#00BFA5';
  const secondaryColor = '#00ACC1';

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
          }}
        >
          QuickCards AI
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'grey', 
            marginBottom: 4,
          }}
        >
          Sign in to access your flashcards and continue learning.
        </Typography>

        {/* Wrapper around SignIn component */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <SignIn />
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Button
            variant="contained"
            onClick={() => router.push('/')}
            sx={{
              backgroundColor: primaryColor,
              color: '#FFFFFF',
              fontWeight: 'bold',
              padding: '10px 16px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                backgroundColor: secondaryColor,
              },
            }}
          >
            Home
          </Button>
          <Button
            variant="outlined"
            onClick={() => router.push('/sign-up')}
            sx={{
              borderColor: primaryColor,
              color: primaryColor,
              fontWeight: 'bold',
              padding: '10px 16px',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#E3F2FD',
                borderColor: secondaryColor,
                color: secondaryColor,
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
