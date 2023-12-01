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
                <button onclick="cardDetailsData('${data.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#card-details-btn">
                    Details
                </button>
            </div>
        </div>
        `;
        cardContainer.appendChild(newElement);
    });

    spinnerPro(false);
}

const searchArea = () =>{
    spinnerPro(true);
    const searchFiled = document.getElementById('search-filed');
    const searchFiledValue = searchFiled.value;
    dataLoad(searchFiledValue);
}

document.getElementById('search-btn').addEventListener('click', function (){
    searchArea();
})

document.getElementById('search-filed').addEventListener('input', function(){
    searchArea();
})

const spinnerPro = (condetion) =>{
    const spinnerProssegeBar = document.getElementById('spinner-prosege');
    if(condetion === true){
        spinnerProssegeBar.classList.remove('d-none');
    }
    else{
        spinnerProssegeBar.classList.add('d-none')
    }
}

const cardDetailsData = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => cardDetails(data))
}

const cardDetails = (data) =>{
    const cardDetalisTitle = document.getElementById('card-details-body-title');
    cardDetalisTitle.innerText = data.data.name;
    const cardDetailsBody = document.getElementById('card-details-body');
    cardDetailsBody.innerHTML = `
        <p>Released: ${data.data.releaseDate ? data.data.releaseDate : 'No Release Date'}</p>
        <p>Storage: ${data.data.mainFeatures.storage}</p>
        <p>DisplaySize: ${data.data.mainFeatures.displaySize}</p>
        <p>Sensors: ${data.data.mainFeatures ? data.data.mainFeatures.sensors[0] : 'No Face ID' }</p>
    `;
}

dataLoad('phone');