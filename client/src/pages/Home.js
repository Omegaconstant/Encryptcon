import esgGif from '../media/esg.gif';

const Home = () => {
  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    '*::-webkit-scrollbar': {
      display: 'none',
    },
    '*': {
      '-ms-overflow-style': 'none',
    },
  };

  const textOverlayStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: '5vw',
    color: 'white',
    fontSize: '5vw',
    textAlign: 'center',
    maxWidth: '90%',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const imageStyle = {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
  };

  const blogSectionStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    marginTop: '20px',
  };

  const blogTitleStyle = {
    textAlign: 'center',
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  };

  const blogContentStyle = {
    lineHeight: '1.6',
    color: '#555',
  };

  return (
    <div>
      <div style={containerStyle}>
        <img src={esgGif} alt="Your Image" style={imageStyle} />
        <div style={textOverlayStyle}>
          <p>AI and ML for Predictive Analytics in Green Finance </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
