(() => {
  document.querySelectorAll('[data-ppc-tabs]').forEach(group => {
    const tabs = [...group.querySelectorAll('[role="tab"]')];
    const select = tab => tabs.forEach(item => {
      const active = item === tab;
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
    });
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', event => {
        let next;
        if(event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if(event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
        if(event.key === 'Home') next = 0;
        if(event.key === 'End') next = tabs.length - 1;
        if(next === undefined) return;
        event.preventDefault(); select(tabs[next]); tabs[next].focus();
      });
    });
  });
  const dialog = document.querySelector('.ppc-lightbox');
  if(!dialog || !dialog.showModal) return;
  const image = dialog.querySelector('img');
  const title = dialog.querySelector('#ppc-zoom-title');
  let opener;
  document.querySelectorAll('[data-zoom]').forEach(link => link.addEventListener('click', event => {
    if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); opener = link;
    image.src = link.href; image.alt = link.querySelector('img').alt;
    title.textContent = image.alt; dialog.showModal();
    dialog.querySelector('.rc-lightbox-scroll').scrollTo(0,0);
  }));
  dialog.querySelector('.rc-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {if(event.target === dialog) dialog.close();});
  dialog.addEventListener('close', () => opener?.focus({preventScroll:true}));
})();
