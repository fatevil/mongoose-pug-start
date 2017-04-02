'use strict';

document.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log(evt.target);
    const formData = new FormData(evt.target);
    console.log(formData);
    const url = '/cats';
    fetch(url, {
        method: 'post',
        body: formData
        }
    ).then((resp) => {
        return resp.json();
    }).then((json) => {
        console.log(json);
    });
});