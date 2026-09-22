export const initThemeSwitch = () => {
  const themeSwitch = document.querySelector('.theme-switch');

  if (!themeSwitch) {
    console.warn('[ThemeSwitch] Element not found in DOM.');
    return;
  }

  const inputs = themeSwitch.querySelectorAll('.theme-switch__input');

  const getSavedTheme = () => {
    try {
      return localStorage.getItem('theme');
    } catch (e) {
      console.error('[ThemeSwitch] Error localStorage:', e);
      return null;
    }
  };

  // Save in localStorage
  const saveTheme = (theme) => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error('[ThemeSwitch] Erorr localStorage:', e);
    }
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);

    inputs.forEach((input) => {
      input.checked = input.value === theme;
    });
  };

  const savedTheme = getSavedTheme();
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  themeSwitch.addEventListener('change', (event) => {
    const { target } = event;

    if (target && target.name === 'theme-choice') {
      const selectedTheme = target.value;
      
      applyTheme(selectedTheme);
      saveTheme(selectedTheme);
    }
  });
};