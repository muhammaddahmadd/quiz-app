import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const localStorageDarkMode = localStorage.getItem("darkMode");
    if (localStorageDarkMode) {
      setIsDarkMode(JSON.parse(localStorageDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div>
      <button onClick={toggleDarkMode} className="btn btn-ui">
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>

      <style>
        {`
            /* Light Mode Styles */
            body, button {
              background-color: #f0f0f0;
              color: white;
            }
  
            button {
              background-color: #007bff;
              color: #fff;
              padding: 10px 20px;
              border: none;
              cursor: pointer;
            }
  
            /* Dark Mode Styles */
            body.dark-mode {
              background-color: #333;
              color: #fff;
            }
  
            body.dark-mode button {
              background-color: #555;
              color: #fff;
            
            }

            }
          `}
      </style>
    </div>
  );
};

export default DarkModeToggle;
