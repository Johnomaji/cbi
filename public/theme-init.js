try {
  var t = localStorage.getItem('cbi-theme');
  if (t === 'dark') document.documentElement.classList.add('dark');
} catch(e) {}
