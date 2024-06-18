'use client';

// next
import NextLink from 'next/link';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

// project import
import AnimateButton from 'components/@extended/AnimateButton';
import AuthWrapper from 'sections/auth/AuthWrapper';
import FirebaseSocial from 'sections/auth/auth-forms/FirebaseSocial';

// ================================|| CHECK MAIL ||================================ //

export default function CheckMail() {
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Hi, Check Your Mail</Typography>
            <Typography color="secondary" sx={{ mb: 0.5, mt: 1.25 }}>
              We have sent a password recover instructions to your email.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <AnimateButton>
            <NextLink href="/login" passHref legacyBehavior>
              <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                Sign in
              </Button>
            </NextLink>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Divider>
            <Typography variant={downSM ? 'subtitle1' : 'h5'}>Sign up with</Typography>
          </Divider>
        </Grid>
        <Grid item xs={12}>
          <FirebaseSocial />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
