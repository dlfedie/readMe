import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        ReadMe is a web-based app that helps track your book library, list of books you want to read, and what you're currently reading!
      </p>
    </div>
  </div>
);

export default AboutPage;
