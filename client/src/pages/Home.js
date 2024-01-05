import esgGif from '../media/esg.gif'; 

const Home = () => {
  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const textOverlayStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '10px',
  };

  const imageStyle = {
    display: 'block',
    maxWidth: '100%', // Ensure the image fits within the container
    height: 'auto', // Maintain aspect ratio
  };

  return (
    <div style={containerStyle}>
      <img src={esgGif} alt="Your Image" style={imageStyle}/>
      <div style={textOverlayStyle}>
        <p>THE ESG MIRAGE IN FINANCE:</p>
        <p>WHAT YOU NEED TO KNOW?</p>
      </div>
    </div>
  );
};

export default Home;