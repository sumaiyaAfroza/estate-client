import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const Theme = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('mode') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('mode', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default Theme;