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
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const docHeight = getDocumentHeight();

      // Calculate the distance from the bottom of the window to the bottom of the document
      const distanceFromBottom = docHeight - (scrollTop + windowHeight);

      // Define a threshold (e.g., 50 pixels) for when the footer becomes visible
      const threshold = 50;

      setIsVisible(distanceFromBottom < threshold);
    }

    function getDocumentHeight() {
      const body = document.body;
      const html = document.documentElement;

      return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
      );
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const footerStyles = {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: '20px',
    margin: '0',
    width: '100%',
    position: 'fixed',
    bottom: isVisible ? '0' : '-100px',
    left: 0,
    transition: 'bottom 0.3s ease-in-out',
  };

  const contentContainerStyle = {
    paddingBottom: isVisible ? '80px' : '0',
  };

  return (
    <div style={contentContainerStyle}>
      {/* Add your content here */}
      <div style={{ height: '2000px' }}>
        {/* Example content (replace this with your actual content) */}
      </div>

      {/* Footer */}
      <BottomNavigation sx={footerStyles}>
        <Typography variant="body2" align="center">
          &copy; 2024 alephNull. All Rights Reserved.
        </Typography>
      </BottomNavigation>
    </div>
  );
};

export default Footer;


