(async () => {
  let queryOptions = { active: true, currentWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)
  const btn = document.getElementById('btn');
  const logo = document.getElementById('logo');
  
  logo.addEventListener('click', async () => {
    const url = new URL(tab.url)
    const hostnames = url.hostname.split('.')
    let domain = ''
    if (hostnames.length >= 3) {
      domain = hostnames[hostnames.length-2]+'.'+hostnames[hostnames.length-1]
    } else {
      domain = tab.hostname
    }
    const cookies = await chrome.cookies.getAll({ domain })

    const textarea = document.createElement('textarea');
    textarea.value = cookies.map(i => `${i.name}=${i.value}`).join(';');
    textarea.setSelectionRange(0, textarea.value.length);
    textarea.style.visibility = 'none';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
   
    btn.style.backgroundColor = 'rgba(144, 238, 144, 0.5)';
    btn.innerHTML = '<div id="cookiePhoto"><img id="logo" src="logo.png" alt="Cookie Photo"><p>Copy Cookies ✅!</p></div>';
    
    setTimeout(() => {
      btn.style.backgroundColor = '';
      btn.innerHTML = '<div id="cookiePhoto"><img id="logo" src="logo.png" alt="Cookie Photo"><p>Copy Cookies ✅!</p></div>';
    }, 2000);
  });
})();
