$(document).ready(function () {
    const containerToMove = document.querySelector('.card-scroll-container');
    const showInfoPlus = document.querySelector('div.push-type-A.meteo-type.showcontent');
    const pre = document.querySelector('#pre');
    const next = document.querySelector('#next');
    const size = 232;  // Width of each card
    let output = "";
    let outputPlus = "";
    let imgBCK = document.querySelector('#reference');
    let localForChart = $('.container-item-city.active').attr("data_city");
    let identifier = 1;
    let tab = [];
    let counter = 0;
    let tabId = [];
    let tabContent = [];

    // Add event listeners for the carousel controls
    document.querySelector('.carousel-control-prev').addEventListener('click', function () {
        const card = document.querySelector('.card');
        const cardWidth = card.offsetWidth;
        const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
        const totalCardWidth = cardWidth + margin;
        containerToMove.scrollLeft -= totalCardWidth; // Scroll to the left
    });

    document.querySelector('.carousel-control-next').addEventListener('click', function () {
        const card = document.querySelector('.card');
        const cardWidth = card.offsetWidth;
        const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
        const totalCardWidth = cardWidth + margin;
        containerToMove.scrollLeft += totalCardWidth; // Scroll to the right
    });

    // Sample function to dynamically load data for cards
    function loadCards(data) {
        data.forEach(city => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '18rem';
            card.style.flexShrink = 0;

            card.innerHTML = `
            <img src="${city.imgSrc}" class="bd-placeholder-img card-img-top" alt="Image Placeholder" width="100%" height="180">
            <div class="card-body-V2">
                <p class="card-text">
                    <div class="detail-city">${city.name}</div>
                    <div class="detail-weather">${city.weather}</div>
                    <div class="detail-temp">${city.temp}</div>
                </p>
            </div>
        `;

            containerToMove.appendChild(card);
        });
    }

    // Example usage of loading data
    loadCards([
        { name: 'Antalaha', weather: 'peu nuageux', temp: 'NaN°C', imgSrc: 'ressources/img/jpg/Antalaha.jpg' },
        { name: 'Antananarivo', weather: 'peu nuageux', temp: 'NaN°C', imgSrc: 'ressources/img/jpg/Antananarivo.jpg' },
        { name: 'Antsirabe', weather: 'peu nuageux', temp: 'NaN°C', imgSrc: 'ressources/img/jpg/Antsirabe.jpg' },
        { name: 'Diego-Suarez', weather: 'peu nuageux', temp: 'NaN°C', imgSrc: 'ressources/img/jpg/Diego.jpg' }
    ]);

    // Assuming you want to handle some city-related data
    console.log("Current City Data:", localForChart);
    console.log("Tab Content:", tabContent);

})