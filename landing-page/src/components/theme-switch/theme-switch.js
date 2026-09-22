export function initThemeSwitch() {
    const themeSwitch = document.querySelector('.theme-switch');
    if (!themeSwitch) return;
  
    function setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  
    const savedTheme = localStorage.getItem('theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
    setTheme(savedTheme);
  
    const activeInput = themeSwitch.querySelector(`input[value="${savedTheme}"]`);
    if (activeInput) activeInput.checked = true;
  
    themeSwitch.addEventListener('change', (e) => {
      if (e.target.name === 'theme-choice') {
        setTheme(e.target.value);
      }
    });
  }