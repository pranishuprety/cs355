   
   
fetch('/hits'+ location.pathname+'-page')
.then(r=>r.text())
.then(txt=>{
    document.getElementById('hits').innerHTML =
    'Current hits for this page: ' + txt;
});
