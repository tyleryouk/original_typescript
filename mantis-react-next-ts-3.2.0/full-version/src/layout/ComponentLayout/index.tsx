'use client';

import { lazy, ReactNode } from 'react';

// material-ui
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// project import
import Loader from 'components/Loader';
import ComponentLayoutPage from './ComponentLayout';
import { useGetMenuMaster } from 'api/menu';

const Header = lazy(() => import('./Header'));

// ==============================|| COMPONENTS LAYOUT ||============================== //

interface Props {
  children: ReactNode;
}

export default function ComponentLayout({ children }: Props) {
  const { menuMasterLoading } = useGetMenuMaster();
  if (menuMasterLoading) return <Loader />;

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
      <Header />
      <Toolbar sx={{ my: 2 }} />
      <ComponentLayoutPage>{children}</ComponentLayoutPage>
    </Container>
  );
}
