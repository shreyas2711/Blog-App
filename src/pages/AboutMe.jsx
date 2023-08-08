const AboutMe = () => {
    return (
      <div className="about-me">
        <h2>About Me</h2>
        <img src="path-to-your-image" alt="Profile" />
        <p>Your about me text goes here.</p>
        <div className="social-handles">
          <a href="your-social-link">Facebook</a>
          <a href="your-social-link">Twitter</a>
          <a href="your-social-link">Instagram</a>
          {/* Add more social handles as needed */}
        </div>
      </div>
    );
  };

  export default AboutMe;