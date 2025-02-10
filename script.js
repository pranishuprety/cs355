const $ = document.querySelector.bind(document);

const toggleBtn = $('#toggle');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.setAttribute('theme', 'dark');
    toggleBtn.innerText = 'LIGHT MODE';
}

toggleBtn.addEventListener('click', e => {
    if (toggleBtn.innerText === 'DARK MODE') {
        document.documentElement.setAttribute('theme', 'dark');
        toggleBtn.innerText = 'LIGHT MODE';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.documentElement.removeAttribute('theme');
        toggleBtn.innerText = 'DARK MODE';
        localStorage.setItem('darkMode', 'disabled');
    }
});
