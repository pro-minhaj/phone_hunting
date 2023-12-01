document.getElementById('flexSwitchCheckChecked').addEventListener('click', function (){
    const body = document.getElementById('body');
    body.classList.toggle('switchTheme');
});

const dataLoad = (phone) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
    .then(res => res.json())
    .then(data => displayPhones(data.data));
}

const displayPhones = (phone) =>{
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';

    const noFound = document.getElementById('no-found');
    if(phone.length === 0){
        noFound.classList.remove('d-none');
    }
    else{
        noFound.classList.add('d-none');
    }
    phone.forEach(data => {
        const newElement = document.createElement('div');
        newElement.classList.add('col-md-4');
        newElement.innerHTML = `
        <div class="card">
            <div class="d-flex justify-content-center align-content-center">
                <img class="p-4 d-block mw-100" src="${data.image}" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">${data.phone_name}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
        `;
        cardContainer.appendChild(newElement);
    });
}

document.getElementById('search-btn').addEventListener('click', function (){
    const searchFiled = document.getElementById('search-filed');
    const searchFiledValue = searchFiled.value;
    dataLoad(searchFiledValue);
})

dataLoad('phone');