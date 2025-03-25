const idField = document.getElementById('docIdField');
const dataField = document.getElementById('dataField');
const readAllBtn = document.getElementById('getallBtn');
const readBtn = document.getElementById('readBtn');
const createBtn = document.getElementById('createBtn');
const updateBtn = document.getElementById('updateBtn');
const deleteBtn = document.getElementById('deleteBtn');
const insertBtn = document.getElementById('insertBtn');
const searchBtn = document.getElementById('searchBtn');

const resultsDiv = document.getElementById('results');

insertBtn.addEventListener('click',() =>{
    fetch('/insert?doc=' +insertField.value)
    .then(r => r.text())
    .then(txt => {
            resultsDiv.innerText = txt;
        });
});

searchBtn.addEventListener('click', () => {
    const abc = { make: searchField.value };
    fetch('/search?find=' + JSON.stringify(abc))
    .then(r => r.text())
    .then(txt => resultsDiv.innerText = txt);
});

createBtn.addEventListener('click', () => {
    fetch('/data',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: dataField.value
    })
    .then(r => r.json())
    .then(doc => {
        resultsDiv.innerHTML = '';
        resultsDiv.innerText += JSON.stringify(doc, null, 2);
    });
});

updateBtn.addEventListener('click', () => {
    fetch('/data',{
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: dataField.value
    })
    .then(r => r.json())
    .then(doc => {
        resultsDiv.innerHTML = '';
        resultsDiv.innerText += JSON.stringify(doc, null, 2);
    });
});

//new

readAllBtn.addEventListener('click', () => {
    fetch('/data')
    .then(r => r.json())
    .then(docs=>{
        resultsDiv.innerHTML = '';
        docs.forEach(doc=>{
            resultsDiv.innerText += JSON.stringify(doc,null, 2);
        })
    });
});

readBtn.addEventListener('click', () => {
    fetch('/data/' + idField.value)
    .then(r => r.json())
    .then(doc => {
        resultsDiv.innerHTML = '';
        resultsDiv.innerText += JSON.stringify(doc, null, 2);
    });
});

deleteBtn.addEventListener('click', () => {
    fetch('/data/' + idField.value, { method: 'DELETE' })
    .then(r => r.json())
    .then(doc => {
        resultsDiv.innerHTML = '';
        resultsDiv.innerText += JSON.stringify(doc, null, 2);
    });
});
// // end of file   