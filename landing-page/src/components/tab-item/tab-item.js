export const initTabSwitch = () => {
    const tabList = document.querySelector('.tabs__list');
    const tabs = tabList.querySelectorAll('.tab-item');
  
    tabList.addEventListener('click', (event) => {
      const clickedTab = event.target.closest('.tab-item');
      if (!clickedTab || clickedTab.classList.contains('tab-item--active')) return;
  
      tabs.forEach((tab) => {
        tab.classList.remove('tab-item--active');
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('tabindex', '-1');
      });
  
      clickedTab.classList.add('tab-item--active');
      clickedTab.setAttribute('aria-selected', 'true');
      clickedTab.removeAttribute('tabindex');
    });
}