'use strict';

document.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const url = '/cats';
    let request;
    console.log(formData.get('updateCheckBox'));
    if (formData.get('updateCheckBox') === 'on') {
        request = {
            method: 'PATCH',
            body: formData
        };
    } else {
        request = {
            method: 'POST',
            body: formData
        };
    }
    fetch(url, request).then((resp) => {
        return resp.json();
    }).then((json) => {
        console.log(json);
        getCats();
    });
});

const loadCat = (name, gender, age, color, weight, _id) => {
    console.log(`loading ${name} ${gender} ${age} ${color} ${weight} ${_id} `);
    document.querySelector('input[name=name]').value = name;
    document.querySelector('select[name=gender]').value = gender;
    document.querySelector('input[name=age]').value = age;
    document.querySelector('input[name=color]').value = color;
    document.querySelector('input[name=weight]').value = weight;
    document.querySelector('input[name=updateCheckBox]').checked = true;
    document.querySelector('input[name=_id]').value = _id;
};

const sendDelete = (id) => {
    const url = `/cats/${id}`;
    let request;
    request = {
        method: 'DELETE'
    };
    fetch(url, request).then((resp) => {
        return resp;
    }).then((json) => {
        console.log(json);
        //window.location.href = "index.html";
    });
};

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
                                     <p>${cat._id}</p>
                                     <p>${cat.name}
                                     <br>${cat.gender}</p>
                                     <p>${cat.age} years</p>
                                     <p>${cat.weight} kg</p>
                                     `;
                catDiv.appendChild(article);

                const deleteButton = document.createElement('BUTTON');
                deleteButton.textContent = "delete";
                deleteButton.addEventListener('click', () => sendDelete(cat._id));
                const updateButton = document.createElement('BUTTON');
                updateButton.textContent = "update";
                updateButton.addEventListener('click', () => loadCat(cat.name, cat.gender, cat.age, cat.color, cat.weight, cat._id));
                article.appendChild(updateButton);
                article.appendChild(deleteButton);
                article.appendChild(document.createElement('HR'));


            }
        })
};

getCats();