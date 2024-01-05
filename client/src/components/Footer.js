import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    function handleScroll() {
      const isBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight;
      setIsVisible(isBottom);
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = isVisible ? 'hidden' : 'auto';
  }, [isVisible]);

  const footerStyles = {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '20px',
    width: '100%',
    position: 'absolute',
    bottom: isVisible ? '0' : '-100px',
    transition: 'bottom 0.3s ease-in-out',
  };

  return (
    <Box sx={{ width: '100%', position: 'relative', paddingBottom: isVisible ? '80px' : '0' }}>
      {/* Add paddingBottom to account for the footer space */}
      <BottomNavigation sx={footerStyles}>
        <Typography variant="body2" align="center">
          &copy; 2024 alephNull. All Rights Reserved.
        </Typography>
      </BottomNavigation>
    </Box>
  );
};

export default Footer;
