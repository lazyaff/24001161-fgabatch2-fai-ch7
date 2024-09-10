import { useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import FormPage from './components/FormPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      {isAuthenticated ? (
        <LandingPage />
      ) : (
        <FormPage setIsAuthenticated={() => setIsAuthenticated(true)} />
      )}
    </>
  );
}

export default App;
