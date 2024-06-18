import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme, Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
import Drawer from './Drawer';
import { DRAWER_WIDTH } from 'config';
import { handlerComponentDrawer, useGetMenuMaster } from 'api/menu';

// components content
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }: { theme: Theme; open: boolean }) => ({
  minHeight: `calc(100vh - 188px)`,
  width: `calc(100% - ${DRAWER_WIDTH}px)`,
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0
  },
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

// ==============================|| COMPONENTS LAYOUT ||============================== //

export default function ComponentsLayout() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const { menuMaster } = useGetMenuMaster();

  useEffect(() => {
    handlerComponentDrawer(!matchDownMd);
  }, [matchDownMd]);

  return (
    <Box sx={{ display: 'flex', pt: menuMaster.isComponentDrawerOpened ? { xs: 0, md: 3, xl: 5.5 } : 0 }}>
      <Drawer />
      <Main theme={theme} open={menuMaster.isComponentDrawerOpened}>
        <Outlet />
      </Main>
    </Box>
  );
}
