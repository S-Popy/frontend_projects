const getCategories = () => {
    fetch("https://openapi.programming-hero.com/api/videos/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data));
};

getCategories();

const displayCategories = (data) => {
    let tabContainer = document.getElementById("tabs");
    let cardContainer = document.getElementById("cards");
    let firstTab = true;

    data.forEach((value, index) => {
        let tab = document.createElement("div");
        tab.classList.add("tab");
        tab.textContent = value.category;
        tab.dataset.index = index;

        if(firstTab){
            tab.classList.add("selected");
            getCards(value.category_id);
            firstTab = false;
        }

        tab.addEventListener("click", () => {
            let prevSelectedTab = tabContainer.querySelector(".selected");
            if (prevSelectedTab) {
                prevSelectedTab.classList.remove("selected");
            }
            tab.classList.add("selected");
            cardContainer.innerHTML = '';
            getCards(value.category_id);
        });
        
        tabContainer.appendChild(tab);
    });

};


const getCards = (categoryId) => {
    fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => {
        const cardsContainer = document.getElementById("cards");

        if(data.data.length === 0) {
            cardsContainer.innerHTML = `
            <div class = "justify-content-center align-items-center vh-200 m-10 p-5">
                <img class = "img-fluid p-3 text-center" src="PHero-Tube-main/icon1.png" alt="Empty Category" style="width: 100%; max-width: 300px;">
                <h4>Oops!! Sorry, There is no content here</h4>
            </div>
        `;
        } else {

        data.data.forEach((cardData) => {
            console.log(cardData);
            const cardContainer = document.createElement("div");
            cardContainer.classList.add("col-sm-12", "col-lg-3","px-2", "py-2");

            const card = document.createElement("div");
            card.classList.add("card", "border-white");

            card.innerHTML = `
            <div class = "card-bd"> 
                    <div class="position-relative">
                    <img class="card-img-top" src="${cardData.thumbnail}">
                    <p class="position-absolute text-white bg-dark p-1" style="bottom: 0; right: 0; font-size: smaller; border-radius: 5px">
                        ${cardData.others.posted_date ? `${getTime(cardData.others.posted_date).hours}hr ${getTime(cardData.others.posted_date).minutes}min ago` : ''}
                    </p>
                </div>
        
                <div class="row">
                    <div class="col-4 p-3">
                        <img class="author-img img-fluid rounded-circle d-block m-auto" src ="${cardData.authors[0].profile_picture}">
                    </div>
                    <div class="col-8 p-2">
                        <h5 class="card-title">${cardData.title}</h5>
                        <div class = "d-flex">
                                <p class="author-name">${cardData.authors[0].profile_name}</p>
                                ${cardData.authors[0].verified ? `<img class="logo-image" src="PHero-Tube-main/verify.png" />` : ''}
                        </div>
                        <p class="views">${cardData.others.views} views</p>
                        </div> 
                    </div>
                </div>
            </div>
            `;
            cardContainer.appendChild(card);
            cardsContainer.appendChild(cardContainer);
        });
        }
    });
};

const getTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remaining = seconds % 3600;
    const minutes = Math.floor(remaining / 60);
    return { hours, minutes };
};


const sorting = () => {
    const sortButton = document.getElementById('sortButton');
    sortButton.addEventListener('click', displayCards);
};

sorting();

function displayCards() {
    const cardsContainer = document.getElementById("cards");
    const cards = Array.from(cardsContainer.children);
    cards.sort((a, b) => {
        const viewCountA = parseInt(a.querySelector('.views').textContent);
        const viewCountB = parseInt(b.querySelector('.views').textContent);
        return viewCountB - viewCountA;
    });
    
    cards.forEach(card => {
        cardsContainer.appendChild(card);
    });
};












