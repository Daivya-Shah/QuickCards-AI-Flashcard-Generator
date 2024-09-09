'use client';

import { Box, Container, Typography, Button, Grid, Paper, Card, CardContent, CardActions } from '@mui/material';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import getStripe from '@/utils/get-stripe';

export default function QuickCardsHomePage() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push('/generate'); // Navigate to the flashcard generation page
    } else {
      router.push('/sign-up'); // Navigate to the login page if not signed in
    }
  };

  const handleLogin = () => {
    router.push('/sign-in'); // Navigate to the login page
  };

  const handleChooseProPlan = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const session = await checkoutSession.json();
    const stripe = await getStripe();

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  const primaryColor = '#00BFA5';
  const secondaryColor = '#00ACC1';
  const backgroundColor = '#243B55';
  const textColor = '#FFFFFF';

  return (
    <>
      <Head>
        <title>QuickCards - Simplify Your Learning</title>
        <meta name="description" content="QuickCards helps you simplify your learning by creating flashcards easily." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          backgroundColor: backgroundColor,
          backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: textColor,
          textAlign: 'center',
          flexDirection: 'column',
          gap: 4,
          overflow: 'hidden',
          paddingTop: '60px',  
          paddingBottom: '60px', 
        }}
      >
        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        />

        {/* User Profile Button in Top Right */}
        <Box
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 3,
          }}
        >
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Box>

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              letterSpacing: '0.05em',
              background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${primaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: {
                xs: '3rem',  // Mobile devices
                sm: '4rem',  // Tablets
                md: '5rem',  // Small laptops
                lg: '6rem',  // Desktops
              },
            }}
          >
            QuickCards AI
          </Typography>
          <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                color: textColor,
                fontSize: {
                  xs: '1.5rem', // Mobile devices
                  sm: '2rem',   // Tablets
                  md: '2.5rem', // Small laptops
                },
              }}
            >
            Simplify Your Learning with Easy Flashcard Creation
          </Typography>

          {/* Key Features Section */}
          <Grid container spacing={4}>
            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: textColor,
                  borderRadius: '16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: `1px solid ${primaryColor}`,
                  transition: 'transform 0.3s ease, background 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    background: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                  Easy Text Input
                </Typography>
                <Typography variant="body2">
                  Effortlessly input text, and let our system generate flashcards for you.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: textColor,
                  borderRadius: '16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: `1px solid ${primaryColor}`,
                  transition: 'transform 0.3s ease, background 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    background: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                  Automated Organization
                </Typography>
                <Typography variant="body2">
                  Our system organizes your input into flashcards, ready for study.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Paper
                elevation={3}
                sx={{
                  padding: 3,
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: textColor,
                  borderRadius: '16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: `1px solid ${primaryColor}`,
                  transition: 'transform 0.3s ease, background 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    background: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                  Secure and Simple Login
                </Typography>
                <Typography variant="body2">
                  Easily access your flashcards with a secure login experience.
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Pricing Plans Section */}
          <Box sx={{ mt: 10 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: textColor,
              fontSize: {
                xs: '1.25rem',  // Mobile devices
                sm: '1.5rem',   // Tablets
                md: '2rem',     // Small laptops
              },
            }}
          >
              Choose Your Plan
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                <Card
                  elevation={3}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: textColor,
                    borderRadius: '16px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                    border: `1px solid ${primaryColor}`,
                    transition: 'transform 0.3s ease, background 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      background: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                      Basic Plan
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Free - Core Flashcard Features
                    </Typography>
                    <Typography variant="body2">
                      Create and manage basic flashcards with essential features.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: primaryColor,
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '16px',
                        padding: '10px 20px',
                        '&:hover': {
                          background: secondaryColor,
                        },
                      }}
                      onClick={handleGetStarted}
                    >
                      Choose Basic
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Card
                  elevation={3}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: textColor,
                    borderRadius: '16px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 3,
                    border: `1px solid ${primaryColor}`,
                    transition: 'transform 0.3s ease, background 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      background: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                      Pro Plan
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      $5 / Month - Advanced Features
                    </Typography>
                    <Typography variant="body2">
                      Unlock unlimited flashcards, advanced features, and priority support.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{
                        background: primaryColor,
                        color: 'white',
                        fontWeight: 'bold',
                        borderRadius: '16px',
                        padding: '10px 20px',
                        '&:hover': {
                          background: secondaryColor,
                        },
                      }}
                      onClick={handleChooseProPlan}
                    >
                      Choose Pro
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Flashcard Generation Process Section */}
          <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 4,
              fontWeight: 'bold',
              color: textColor,
              fontSize: {
                xs: '1.25rem',  // Mobile devices
                sm: '1.5rem',   // Tablets
                md: '2rem',     // Small laptops
              },
            }}
          >
              Start Generating Flashcards!
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{
                    padding: 3,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    color: textColor,
                    borderRadius: '16px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: `1px solid ${primaryColor}`,
                    transition: 'transform 0.3s ease, background 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      background: 'rgba(255, 255, 255, 0.2)',
                    },
                  }}
                >
                  <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
                    Flashcard Generation Process
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    1. Input your topic, and our AI will generate flashcards.
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    2. Review and edit the generated flashcards.
                  </Typography>
                  <Typography variant="body2">
                    3. Save the study set for future use.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          {/* Get Started and Login Buttons */}
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                background: primaryColor,
                color: 'white',
                fontWeight: 'bold',
                borderRadius: '16px',
                padding: '10px 20px',
                boxShadow: '0 3px 5px 2px rgba(0, 229, 255, 0.3)',
                '&:hover': {
                  background: secondaryColor,
                },
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              onClick={handleLogin}
              sx={{
                borderColor: primaryColor,
                color: primaryColor,
                borderRadius: '16px',
                padding: '10px 20px',
                boxShadow: '0 3px 5px 2px rgba(0, 229, 255, 0.3)',
                '&:hover': {
                  borderColor: secondaryColor,
                  color: secondaryColor,
                },
              }}
            >
              Login
            </Button>
          </Box>

        </Container>
      </Box>
    </>
  );
}
