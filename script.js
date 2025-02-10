const $ = document.querySelector.bind(document);

const toggleBtn = $('toggle');

toggleBtn.addEventListener('click',e=>{
    if(toggleBtn.innerText=='DARK MODE'){
        document.documentElement.setAttribute('theme', 'dark');
        toggleBtn.innerText='LIGHT MODE';
    }
    else{
        document.documentElement.removeAttribute('theme');
        toggleBtn.innerText='DARK MODE';
    }
})
