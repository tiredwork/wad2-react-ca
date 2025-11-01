import React, { useState, useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null); // mobile menu
  const [moreAnchor, setMoreAnchor] = useState(null); // overflow menu
  const open = Boolean(anchorEl);
  const moreOpen = Boolean(moreAnchor);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef(null);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Playlists", path: "/playlists" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/popular" },
    { label: "Trending", path: "/trending" },
    { label: "Top Rated", path: "/top_rated" },
    { label: "Now Playing", path: "/now_playing" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    setMoreAnchor(null);
    navigate(pageURL);
  };

  const handleMobileMenu = (event) => setAnchorEl(event.currentTarget);
  const handleMobileClose = () => setAnchorEl(null);

  const handleMoreOpen = (e) => setMoreAnchor(e.currentTarget);
  const handleMoreClose = () => setMoreAnchor(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = (searchQuery || "").trim();
    if (q.length > 0) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    } else {
      navigate('/');
    }
    setSearchOpen(false);
  };

  const openSearch = () => {
    setSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 150);
  };
  const closeSearch = () => setSearchOpen(false);

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Box sx={{ display: 'flex', flexDirection: 'column', flexShrink: 0, mr: 2 }}>
            <Typography variant="h6">TMDB Client</Typography>
            <Typography variant="caption">All you ever wanted to know about Movies!</Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton aria-label="open search" color="inherit" onClick={openSearch}>
              <SearchIcon />
            </IconButton>
            <Collapse in={searchOpen} orientation="horizontal">
              <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  size="small"
                  placeholder="Search movies..."
                  inputRef={inputRef}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" edge="end" aria-label="search">
                          <SearchIcon />
                        </IconButton>
                        <IconButton onClick={closeSearch} edge="end" aria-label="close-search">
                          <CloseIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: 'white', borderRadius: 1, ml: 1, minWidth: 200 }}
                />
              </form>
            </Collapse>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMobileMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleMobileClose}
              >
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>{opt.label}</MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.slice(0, 3).map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}

              {menuOptions.length > 3 && (
                <>
                  <IconButton
                    color="inherit"
                    onClick={handleMoreOpen}
                    aria-label="more"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={moreAnchor}
                    open={moreOpen}
                    onClose={handleMoreClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    {menuOptions.slice(3).map((opt) => (
                      <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
