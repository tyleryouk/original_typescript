import React, { useEffect, useState, useMemo } from 'react';
// next
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';

// project import
import NavItem from './NavItem';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import Transitions from 'components/@extended/Transitions';

import { MenuOrientation, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// assets
import BorderOutlined from '@ant-design/icons/BorderOutlined';
import DownOutlined from '@ant-design/icons/DownOutlined';
import UpOutlined from '@ant-design/icons/UpOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';

// types
import { NavItemType } from 'types/menu';

type VirtualElement = {
  getBoundingClientRect: () => ClientRect | DOMRect;
  contextElement?: Element;
};

type ListItemClick =
  | React.MouseEvent<HTMLButtonElement>
  | React.MouseEvent<HTMLAnchorElement>
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | undefined;

// mini-menu - wrapper
const PopperStyled = styled(Popper)(({ theme }) => ({
  overflow: 'visible',
  zIndex: 1202,
  minWidth: 180,
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 38,
    left: -5,
    width: 10,
    height: 10,
    background: theme.palette.background.paper,
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 120,
    borderLeft: '2px solid',
    borderLeftColor: theme.palette.divider,
    borderBottom: '2px solid',
    borderBottomColor: theme.palette.divider
  },
  '&[data-popper-placement="right-end"]': {
    '.MuiPaper-root': {
      marginBottom: -8
    },
    '&:before': {
      top: 'auto',
      bottom: 5
    }
  }
}));

// ==============================|| NAVIGATION - LIST COLLAPSE ||============================== //

interface Props {
  menu: NavItemType;
  level: number;
  parentId: string;
  setSelectedItems: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedItems: string | undefined;
  setSelectedLevel: React.Dispatch<React.SetStateAction<number>>;
  selectedLevel: number;
}

export default function NavCollapse({ menu, level, parentId, setSelectedItems, selectedItems, setSelectedLevel, selectedLevel }: Props) {
  const theme = useTheme();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { mode, menuOrientation } = useConfig();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null | undefined>(null);
  const [anchorEl, setAnchorEl] = useState<VirtualElement | (() => VirtualElement) | null | undefined>(null);

  const [anchorElCollapse, setAnchorElCollapse] = React.useState<null | HTMLElement>(null);

  const openCollapse = Boolean(anchorElCollapse);
  const handleClickCollapse = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorElCollapse(event.currentTarget);
  };
  const handleCloseCollapse = () => {
    setAnchorElCollapse(null);
  };

  const handleClick = (event: ListItemClick, isRedirect: boolean) => {
    setAnchorEl(null);
    setSelectedLevel(level);
    if (drawerOpen) {
      setOpen(!open);
      setSelected(!selected ? menu.id : null);
      setSelectedItems(!selected ? menu.id : '');
      if (menu.url && isRedirect) router.push(`${menu.url}`);
    } else {
      setAnchorEl(event?.currentTarget);
    }
  };

  const handlerIconLink = () => {
    if (!drawerOpen) {
      if (menu.url) router.push(`${menu.url}`);
      setSelected(menu.id);
    }
  };

  const handleHover = (event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement, MouseEvent> | undefined) => {
    setAnchorEl(event?.currentTarget);
    if (!drawerOpen) {
      setSelected(menu.id);
    }
  };

  const miniMenuOpened = Boolean(anchorEl);

  const handleClose = () => {
    setOpen(false);
    if (!miniMenuOpened) {
      if (!menu.url) {
        setSelected(null);
      }
    }
    setAnchorEl(null);
  };

  useMemo(() => {
    if (selected === selectedItems) {
      if (level === 1) {
        setOpen(true);
      }
    } else {
      if (level === selectedLevel) {
        setOpen(false);
        if (!miniMenuOpened && !drawerOpen && !selected) {
          setSelected(null);
        }
        if (drawerOpen) {
          setSelected(null);
        }
      }
    }
  }, [selectedItems, level, selected, miniMenuOpened, drawerOpen, selectedLevel]);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname === menu.url) {
      setSelected(menu.id);
    }
    // eslint-disable-next-line
  }, [pathname]);

  const checkOpenForParent = (child: NavItemType[], id: string) => {
    child.forEach((item: NavItemType) => {
      if (item.url === pathname) {
        setOpen(true);
        setSelected(id);
      }
    });
  };

  // menu collapse for sub-levels
  useEffect(() => {
    setOpen(false);
    !miniMenuOpened ? setSelected(null) : setAnchorEl(null);
    if (menu.children) {
      menu.children.forEach((item: NavItemType) => {
        if (item.children?.length) {
          checkOpenForParent(item.children, menu.id!);
        }

        if (pathname && pathname.includes('product-details')) {
          if (item.url && item.url.includes('product-details')) {
            setSelected(menu.id);
            setOpen(true);
          }
        }

        if (pathname && pathname.includes('invoice')) {
          if (item.url && item.url.includes('invoice')) {
            setSelected(menu.id);
            setOpen(true);
          }
        }

        if (pathname && pathname.includes('profiles')) {
          if (item.url && item.url.includes('profiles')) {
            setSelected(menu.id);
            setOpen(true);
          }
        }

        if (item.url === pathname) {
          setSelected(menu.id);
          setOpen(true);
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menu.children]);

  useEffect(() => {
    if (menu.url === pathname) {
      handlerActiveItem(menu.id!);
      setSelected(menu.id);
      setAnchorEl(null);
      setOpen(true);
    }
  }, [pathname, menu]);

  const navCollapse = menu.children?.map((item) => {
    switch (item.type) {
      case 'collapse':
        return (
          <NavCollapse
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            menu={item}
            level={level + 1}
            parentId={parentId}
          />
        );
      case 'item':
        return <NavItem key={item.id} item={item} level={level + 1} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Collapse or Item
          </Typography>
        );
    }
  });
  const isSelected = selected === menu.id;
  const borderIcon = level === 1 ? <BorderOutlined style={{ fontSize: '1rem' }} /> : false;
  const Icon = menu.icon!;
  const menuIcon = menu.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : borderIcon;
  const textColor = mode === ThemeMode.DARK ? 'grey.400' : 'text.primary';
  const iconSelectedColor = mode === ThemeMode.DARK && drawerOpen ? 'text.primary' : 'primary.main';
  const popperId = miniMenuOpened ? `collapse-pop-${menu.id}` : undefined;
  const FlexBox = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' };
  return (
    <>
      {menuOrientation === MenuOrientation.VERTICAL || downLG ? (
        <>
          <ListItemButton
            id={`${menu.id}-button`}
            selected={selected === menu.id}
            {...(!drawerOpen && { onMouseEnter: (e: ListItemClick) => handleClick(e, true), onMouseLeave: handleClose })}
            onClick={(e: ListItemClick) => handleClick(e, true)}
            sx={{
              pl: drawerOpen ? `${level * 28}px` : 1.5,
              py: !drawerOpen && level === 1 ? 1.25 : 1,
              ...(drawerOpen && {
                '&:hover': {
                  bgcolor: mode === ThemeMode.DARK ? 'divider' : 'primary.lighter'
                },
                '&.Mui-selected': {
                  bgcolor: 'transparent',
                  color: iconSelectedColor,
                  '&:hover': { color: iconSelectedColor, bgcolor: mode === ThemeMode.DARK ? 'divider' : 'transparent' }
                }
              }),
              ...(!drawerOpen && {
                '&:hover': {
                  bgcolor: 'transparent'
                },
                '&.Mui-selected': {
                  '&:hover': {
                    bgcolor: 'transparent'
                  },
                  bgcolor: 'transparent'
                }
              })
            }}
            {...((drawerOpen &&
              menu.isDropdown && {
                'aria-controls': openCollapse ? `${menu.id}-menu` : undefined,
                'aria-haspopup': true,
                'aria-expanded': openCollapse ? 'true' : undefined,
                onClick: handleClickCollapse
              }) as any)}
          >
            {menuIcon && (
              <ListItemIcon
                onClick={handlerIconLink}
                sx={{
                  minWidth: 28,
                  color: selected === menu.id ? 'primary.main' : textColor,
                  ...(!drawerOpen && {
                    borderRadius: 1.5,
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor: mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter'
                    }
                  }),
                  ...(!drawerOpen &&
                    selected === menu.id && {
                      bgcolor: mode === ThemeMode.DARK ? 'primary.900' : 'primary.lighter',
                      '&:hover': {
                        bgcolor: mode === ThemeMode.DARK ? 'primary.darker' : 'primary.lighter'
                      }
                    })
                }}
              >
                {menuIcon}
              </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
              <ListItemText
                primary={
                  <Typography variant="h6" color={selected === menu.id ? 'primary' : textColor}>
                    {menu.title}
                  </Typography>
                }
                secondary={
                  menu.caption && (
                    <Typography variant="caption" color="secondary">
                      {menu.caption}
                    </Typography>
                  )
                }
              />
            )}

            {(drawerOpen || (!drawerOpen && level !== 1)) &&
              (menu?.url ? (
                <IconButton
                  onClick={(event: ListItemClick) => {
                    event?.stopPropagation();
                    handleClick(event, false);
                  }}
                  color="secondary"
                  variant="outlined"
                  sx={{
                    width: 20,
                    height: 20,
                    mr: '-5px',
                    color: 'secondary.dark',
                    borderColor: open ? 'primary.light' : 'secondary.light',
                    '&:hover': { borderColor: open ? 'primary.main' : 'secondary.main' }
                  }}
                >
                  {miniMenuOpened || open ? (
                    <UpOutlined style={{ fontSize: '0.625rem', color: theme.palette.primary.main }} />
                  ) : (
                    <DownOutlined style={{ fontSize: '0.625rem' }} />
                  )}
                </IconButton>
              ) : (
                <>
                  {miniMenuOpened || open ? (
                    <UpOutlined style={{ fontSize: '0.625rem', marginLeft: 1, color: theme.palette.primary.main }} />
                  ) : (
                    <DownOutlined style={{ fontSize: '0.625rem', marginLeft: 1 }} />
                  )}
                </>
              ))}

            {!drawerOpen && (
              <PopperStyled
                open={miniMenuOpened}
                anchorEl={anchorEl}
                placement="right-start"
                style={{ zIndex: 2001 }}
                popperOptions={{
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [-12, 1]
                      }
                    }
                  ]
                }}
              >
                {({ TransitionProps }) => (
                  <Transitions in={miniMenuOpened} {...TransitionProps}>
                    <Paper
                      sx={{
                        overflow: 'hidden',
                        mt: 1.5,
                        boxShadow: theme.customShadows.z1,
                        backgroundImage: 'none',
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <>
                          <SimpleBar
                            sx={{
                              overflowX: 'hidden',
                              overflowY: 'auto',
                              maxHeight: '50vh'
                            }}
                          >
                            {navCollapse}
                          </SimpleBar>
                        </>
                      </ClickAwayListener>
                    </Paper>
                  </Transitions>
                )}
              </PopperStyled>
            )}
          </ListItemButton>
          {drawerOpen && !menu?.isDropdown && (
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List sx={{ p: 0 }}>{navCollapse}</List>
            </Collapse>
          )}

          {drawerOpen && menu?.isDropdown && (
            <Menu
              id={`${menu.id}-menu`}
              aria-labelledby={`${menu.id}-button`}
              anchorEl={anchorElCollapse}
              open={openCollapse}
              onClose={handleCloseCollapse}
              onClick={handleCloseCollapse}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              sx={{ '& .MuiPaper-root': { boxShadow: theme.shadows[2] }, '& .MuiListItemButton-root': { pl: 2 } }}
            >
              {navCollapse}
            </Menu>
          )}
        </>
      ) : (
        <ListItemButton
          {...(menu?.url && { component: Link, href: menu.url })}
          id={`boundary-${popperId}`}
          disableRipple
          selected={isSelected}
          onMouseEnter={handleHover}
          onMouseLeave={handleClose}
          onClick={handleHover}
          aria-describedby={popperId}
          sx={{
            '&.Mui-selected': {
              bgcolor: 'transparent'
            }
          }}
        >
          <Box onClick={handlerIconLink} sx={FlexBox}>
            {menuIcon && (
              <ListItemIcon sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 28, color: 'secondary.dark' }}>{menuIcon}</ListItemIcon>
            )}
            {!menuIcon && level !== 1 && (
              <ListItemIcon
                sx={{ my: 'auto', minWidth: !menu.icon ? 18 : 28, bgcolor: 'transparent', '&:hover': { bgcolor: 'transparent' } }}
              >
                <Dot size={4} color={isSelected ? 'primary' : 'secondary'} />
              </ListItemIcon>
            )}
            <ListItemText
              primary={
                <Typography variant="body1" color="inherit" sx={{ my: 'auto' }}>
                  {menu.title}
                </Typography>
              }
            />
            {miniMenuOpened ? <RightOutlined /> : <DownOutlined />}
          </Box>

          {anchorEl && (
            <PopperStyled
              id={popperId}
              open={miniMenuOpened}
              anchorEl={anchorEl}
              placement="right-start"
              style={{ zIndex: 2001 }}
              modifiers={[
                {
                  name: 'offset',
                  options: {
                    offset: [-10, 0]
                  }
                }
              ]}
            >
              {({ TransitionProps }) => (
                <Transitions in={miniMenuOpened} {...TransitionProps}>
                  <Paper
                    sx={{
                      overflow: 'hidden',
                      mt: 1.5,
                      py: 0.5,
                      boxShadow: theme.shadows[8],
                      backgroundImage: 'none'
                    }}
                  >
                    <ClickAwayListener onClickAway={handleClose}>
                      <>
                        <SimpleBar
                          sx={{
                            overflowX: 'hidden',
                            overflowY: 'auto',
                            maxHeight: '50vh'
                          }}
                        >
                          {navCollapse}
                        </SimpleBar>
                      </>
                    </ClickAwayListener>
                  </Paper>
                </Transitions>
              )}
            </PopperStyled>
          )}
        </ListItemButton>
      )}
    </>
  );
}
