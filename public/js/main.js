'use strict';

document.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    console.log(evt.target);
    const formData = new FormData(evt.target);
    const url = '/cats';
    fetch(url, {
            method: 'post',
            body: formData
        }
    ).then((resp) => {
        return resp.json();
    }).then((json) => {
        console.log(json);
        getCats();
    });
});

const getCats = () => {
    const url = '/cats';
    fetch(url)
        .then((resp) => {
            return resp.json();
        })
        .then((cats) => {
            const catDiv = document.querySelector('#cats');
            for (const cat of cats) {
                const article = document.createElement('article');
                article.innerHTML = `
                                     <p>${cat.name}
                                     <br>${cat.gender}</p>
                                     <p>${cat.age} years</p>
                                     <p>${cat.weight} kg</p>
                                     <hr>
                                     `;
                catDiv.appendChild(article);
            }
        })
};

getCats();