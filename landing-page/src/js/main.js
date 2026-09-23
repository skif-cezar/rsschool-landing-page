import { initThemeSwitch } from '../components/theme-switch/theme-switch.js';
import { initTabSwitch } from '../components/tab-item/tab-item.js';
import { initSlider } from '../components/slider/slider.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitch();
  initTabSwitch();
  initSlider();
});