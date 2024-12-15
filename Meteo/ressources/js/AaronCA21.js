
    /*// Gestionnaire pour le bouton "Précédent"
    document.querySelector('.carousel-control-prev').addEventListener('click', function () {
        const container = document.querySelector('.card-scroll-container');
        const card = document.querySelector('.card');
        const cardWidth = card.offsetWidth;
        const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
        const totalCardWidth = cardWidth + margin;

        container.scrollLeft -= totalCardWidth;

        setTimeout(updateSelector, 300); // Temps pour attendre la fin de l'animation
    });

    // Gestionnaire pour le bouton "Suivant"
    document.querySelector('.carousel-control-next').addEventListener('click', function () {
        const container = document.querySelector('.card-scroll-container');
        const card = document.querySelector('.card');
        const cardWidth = card.offsetWidth;
        const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
        const totalCardWidth = cardWidth + margin;

        container.scrollLeft += totalCardWidth;

        setTimeout(updateSelector, 300); // Temps pour attendre la fin de l'animation
    }); */


    

async function getTempDetails(cityName) {
    const url = 'https://www.orange.mg/api/pratique/meteo/forecast/'+encodeURI((exception(location)));
 
    const weatherConditionsTranslation = {
        "Clear": "Clair",
        "Partly Cloudy": "Partiellement nuageux",
        "Partly cloudy": "Partiellement nuageux",
        "Heavy rain": "Forte pluie",
        "Cloudy": "Nuageux",
        "Overcast": "Couvert",
        "Mist": "Brume",
        "Patchy rain possible": "Pluie éparse possible",
        "Rain": "Pluie",
        "Thunderstorm": "Orage",
        "Snow": "Neige",
        "Hail": "Grêle",
        "Fog": "Brouillard",
        "Light rain shower": "Averse de pluie légère",
        "Patchy rain nearby": "Pluie éparse à proximité",
        "Sunny": "Ensoleillé",
        "Moderate rain": "Pluie modérée"
    };

    const weatherIcons = {
        "Clear": "temperature-outside",
        "Partly Cloudy": "weather-partly-cloudy",
        "Partly cloudy": "weather-partly-cloudy",
        "Heavy rain": "weather-rain-heavy",
        "Cloudy": "weather-cloudy",
        "Overcast": "weather-cloudy",
        "Mist": "weather-cloudy-storm",
        "Patchy rain possible": "weather-rain-light",
        "Rain": "weather-rain-medium",
        "Thunderstorm": "weather-thunder",
        "Snow": "weather-snow-medium",
        "Hail": "weather-snow-light",
        "Fog": "weather-cloudy-storm",
        "Light rain shower": "weather-rain-light-storm",
        "Patchy rain nearby": "weather-rain-light-storm",
        "Sunny": "sun",
        "Moderate rain": "weather-rain-medium-storm"
    };

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur API : ${response.status}`);
        }

        const data = await response.json();
        const hourlyData = data.forecast.forecastday[0].hour;

        const filteredHours = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "23:00"];
        const filteredData = hourlyData.filter(hour => {
            const time = hour.time.split(" ")[1];
            return filteredHours.includes(time);
        });

        const currentHour = new Date().getHours();
        const currentData = hourlyData.find(hour => {
            const hourOfDay = parseInt(hour.time.split(" ")[1].split(":")[0], 10);
            return hourOfDay === currentHour;
        });

        const humidity = currentData ? currentData.humidity : "N/A";
        const windSpeed = currentData ? currentData.wind_kph : "N/A";

        document.querySelector('.humidity-data').textContent = `${humidity}%`;
        document.querySelector('.wind-data').textContent = `${windSpeed} km/h`;

        const response2 = await fetch(url2);
        if (!response2.ok) {
            throw new Error(`Erreur API pour les prévisions : ${response2.status}`);
        }

        const forecastData = await response2.json();
        const forecastDays = forecastData.forecast.forecastday;

        const containerBas = document.querySelector('.container-bas');
        containerBas.innerHTML = '';

        forecastDays.forEach(day => {
            const { date, day: dayData } = day;
            const { maxtemp_c, mintemp_c, condition } = dayData;

            const dayOfWeek = new Date(date)
                .toLocaleString('fr-FR', { weekday: 'long' })
                .replace(/^\w/, c => c.toUpperCase()); // Majuscule à la première lettre

            const translatedCondition = weatherConditionsTranslation[condition.text] || condition.text;
            const iconName = weatherIcons[condition.text] || "weather-cloudy"; // Icône par défaut si non définie

            const dayElement = document.createElement('div');
            dayElement.classList.add('rowV2');

            dayElement.innerHTML = `
                <div class="columnV2Icone">
                    <img src="ressources/img/png/${iconName}.png" alt="${translatedCondition}" class="weather-icon">
                </div>
                <div class="columnV2Jour">
                    <div class="dayV2">${dayOfWeek}</div>
                    <div class="weatherV2">${translatedCondition}</div>
                </div>
                <div class="columnV2Temp">
                    <p class="temp">${mintemp_c} - ${maxtemp_c}°C</p>
                </div>
            `;

            containerBas.appendChild(dayElement);
        });

        return filteredData;
    } catch (error) {
        console.error(`Erreur lors de la récupération des données météo pour ${cityName}:`, error);
        return null;
    }
}



// Fonction pour déterminer la carte visible au centre ou aux extrémités
function getVisibleCard() {
    const container = document.querySelector('.card-scroll-container');
    const cards = document.querySelectorAll('.card');
    const containerCenter = container.scrollLeft + container.offsetWidth / 2;

    let closestCard = null;
    let minDistance = Infinity;

    // Vérifier si le conteneur est à l'extrémité gauche
    if (container.scrollLeft === 0) {
        return cards[0]; // Première carte
    }

    // Vérifier si le conteneur est à l'extrémité droite
    if (Math.ceil(container.scrollLeft + container.offsetWidth) >= container.scrollWidth) {
        return cards[cards.length - 1]; // Dernière carte
    }

    // Sinon, trouver la carte la plus proche du centre
    cards.forEach(card => {
        const cardLeft = card.offsetLeft;
        const cardRight = cardLeft + card.offsetWidth;
        const cardCenter = (cardLeft + cardRight) / 2;

        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
            minDistance = distance;
            closestCard = card;
        }
    });

    return closestCard;
}
let chartInstance = null; // Doit être global
const chartElement = document.getElementById("myChart"); // Récupération une fois pour toutes

// Fonction pour créer le graphique
function createWeatherChart(hourlyData) {
    const labels = hourlyData.map(hour => hour.time.split(" ")[1]); // Heures
    const temperatures = hourlyData.map(hour => hour.temp_c); // Températures

    const data = {
        labels,
        datasets: [{
            label: " ",
            data: temperatures,
            borderColor: 'rgba(75,180, 230, 1)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderWidth: 2,
            tension: 0.4 // Lisser les lignes
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false // Désactiver la légende
            },
            title: { display: false, text: '' } // Assurez-vous que `text` est une chaîne vide
        },
        scales: {
            x: { grid: { display: false } },
            y: {
                beginAtZero: true,
                title: { display: true, text: 'Température (°C)' }
            }
        }
    };

    if (chartInstance) {
        chartInstance.destroy(); // Détruire l'ancien graphique
    }

    // Créer un nouveau graphique
    chartInstance = new Chart(chartElement.getContext('2d'), {
        type: 'line',
        data,
        options
    });
}

// Fonction pour mettre à jour le sélecteur
async function updateSelector() {
    const visibleCard = getVisibleCard();
    const cityName = visibleCard ? visibleCard.getAttribute("data-city") : "Ville inconnue";

    // Récupérer ou créer le sélecteur
    let selector = document.querySelector(".city-selector");
    if (!selector) {
        const newSelector = document.createElement("div");
        newSelector.className = "city-selector";
        document.querySelector("#weather-cards-container").appendChild(newSelector);
        selector = newSelector;
    }

    console.log(`Sélecteur mis à jour pour la ville : ${cityName}`);

    // Récupérer les données horaires pour la ville sélectionnée
    const hourlyData = await getTempDetails(cityName);

    if (!hourlyData) {
        console.error("Impossible de récupérer les données horaires pour la ville :", cityName);
        return;
    }

    // Mettre à jour le graphique avec les données horaires
    createWeatherChart(hourlyData);
}

document.querySelector('.carousel-control-prev').addEventListener('click', function () {
    const container = document.querySelector('.card-scroll-container');
    const card = document.querySelector('.card');
    const cardWidth = card.offsetWidth;
    const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
    const totalCardWidth = cardWidth + margin;

    container.scrollBy({
        left: -totalCardWidth,
        behavior: "smooth"
    });

    setTimeout(updateSelector, 300); // Temps pour attendre la fin de l'animation
});

// Gestionnaire pour le bouton "Suivant"
document.querySelector('.carousel-control-next').addEventListener('click', function () {
    const container = document.querySelector('.card-scroll-container');
    const card = document.querySelector('.card');
    const cardWidth = card.offsetWidth;
    const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
    const totalCardWidth = cardWidth + margin;

    container.scrollBy({
        left: totalCardWidth,
        behavior: "smooth"
    });

    setTimeout(updateSelector, 300); // Temps pour attendre la fin de l'animation
});

*/

document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".card-scroll-container");
    const prevButton = document.querySelector(".carousel-control-prev");
    const nextButton = document.querySelector(".carousel-control-next");
    let isDragging = false;
    let isAnimating = false; // Verrouillage temporaire pour éviter les conflits
    let startX = 0;
    let scrollLeft = 0;

    // Fonction pour gérer le verrouillage
    const lockInteraction = (duration) => {
        isAnimating = true;
        setTimeout(() => (isAnimating = false), duration);
    };

    // Gestion du bouton "Précédent"
    prevButton.addEventListener("click", function () {
        if (isAnimating) return; // Ne pas agir si une animation est déjà en cours
        const card = document.querySelector(".card");
        const cardWidth = card.offsetWidth;
        const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
        const totalCardWidth = cardWidth + margin;

        container.scrollBy({
            left: -totalCardWidth,
            behavior: "smooth",
        });

        lockInteraction(500); // Bloquer d'autres interactions pendant l'animation
    });

    // Gestion du bouton "Suivant"
    nextButton.addEventListener("click", function () {
        if (isAnimating) return; // Ne pas agir si une animation est déjà en cours
        const card = document.querySelector(".card");
        const cardWidth = card.offsetWidth;
        const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
        const totalCardWidth = cardWidth + margin;

        container.scrollBy({
            left: totalCardWidth,
            behavior: "smooth",
        });

        lockInteraction(500); // Bloquer d'autres interactions pendant l'animation
    });

    // Début du glissement tactile
    container.addEventListener("touchstart", function (e) {
        if (isAnimating) return; // Ne pas agir si une animation est déjà en cours
        isDragging = true;
        startX = e.touches[0].pageX; // Position initiale du doigt
        scrollLeft = container.scrollLeft; // Position initiale du défilement
    });

    // Glissement tactile
    container.addEventListener("touchmove", function (e) {
        if (!isDragging || isAnimating) return; // Si on ne glisse pas ou si une animation est en cours, arrêter
        e.preventDefault(); // Empêcher le comportement par défaut
        const x = e.touches[0].pageX; // Position actuelle du doigt
        const distance = startX - x; // Distance parcourue
        container.scrollLeft = scrollLeft + distance; // Ajuster le défilement
    });

    // Fin du glissement tactile
    container.addEventListener("touchend", function () {
        if (isAnimating) return; // Ne rien faire si une animation est en cours
        isDragging = false; // Fin du glissement
    });
});



$(document).ready(function () {
    const API_KEY = "03d3ee4caa2b453888495813240906";
    const BASE_URL = "https://api.weatherapi.com/v1/current.json";
    const URL_DAILY_TEMP = "https://api.weatherapi.com/v1/forecast.json";  // Définition de la constante URL_DAILY_TEMP
    const chartElement = document.getElementById("myChart");
    let chartInstance = null;


    async function getTempDetails(cityName) {
        const API_KEY = "03d3ee4caa2b453888495813240906";
        const URL_DAILY_TEMP = "https://api.weatherapi.com/v1/forecast.json";
        const url = `${URL_DAILY_TEMP}?key=${API_KEY}&q=${encodeURIComponent(cityName)}&days=1&aqi=no&alerts=no`;
        const url2 = `${URL_DAILY_TEMP}?key=${API_KEY}&q=${encodeURIComponent(cityName)}&days=6&aqi=no&alerts=no`;

        // Dictionnaire de traduction des conditions météo et de leurs icônes locales
        const weatherConditionsTranslation = {
            "Clear": "Clair",
            "Partly Cloudy": "Partiellement nuageux",
            "Partly cloudy": "Partiellement nuageux",
            "Heavy rain": "Forte pluie",
            "Cloudy": "Nuageux",
            "Overcast": "Couvert",
            "Mist": "Brume",
            "Patchy rain possible": "Pluie éparse possible",
            "Rain": "Pluie",
            "Thunderstorm": "Orage",
            "Snow": "Neige",
            "Hail": "Grêle",
            "Fog": "Brouillard",
            "Light rain shower": "Averse de pluie légère",
            "Patchy rain nearby": "Pluie éparse à proximité",
            "Sunny": "Ensoleillé",
            "Moderate rain": "Pluie modérée"
        };

        const weatherIcons = {
            "Clear": "temperature-outside",
            "Partly Cloudy": "weather-partly-cloudy",
            "Partly cloudy": "weather-partly-cloudy",
            "Heavy rain": "weather-rain-heavy",
            "Cloudy": "weather-cloudy",
            "Overcast": "weather-cloudy",
            "Mist": "weather-cloudy-storm",
            "Patchy rain possible": "weather-rain-light",
            "Rain": "weather-rain-medium",
            "Thunderstorm": "weather-thunder",
            "Snow": "weather-snow-medium",
            "Hail": "weather-snow-light",
            "Fog": "weather-cloudy-storm",
            "Light rain shower": "weather-rain-light-storm",
            "Patchy rain nearby": "weather-rain-light-storm",
            "Sunny": "sun",
            "Moderate rain": "weather-rain-medium-storm"
        };

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur API : ${response.status}`);
            }

            const data = await response.json();
            const hourlyData = data.forecast.forecastday[0].hour;

            const filteredHours = ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00", "23:00"];
            const filteredData = hourlyData.filter(hour => {
                const time = hour.time.split(" ")[1];
                return filteredHours.includes(time);
            });

            const currentHour = new Date().getHours();
            const currentData = hourlyData.find(hour => {
                const hourOfDay = parseInt(hour.time.split(" ")[1].split(":")[0], 10);
                return hourOfDay === currentHour;
            });

            const humidity = currentData ? currentData.humidity : "N/A";
            const windSpeed = currentData ? currentData.wind_kph : "N/A";

            document.querySelector('.humidity-data').textContent = `${humidity}%`;
            document.querySelector('.wind-data').textContent = `${windSpeed} km/h`;

            const response2 = await fetch(url2);
            if (!response2.ok) {
                throw new Error(`Erreur API pour les prévisions : ${response2.status}`);
            }

            const forecastData = await response2.json();
            const forecastDays = forecastData.forecast.forecastday;

            const containerBas = document.querySelector('.container-bas');
            containerBas.innerHTML = '';

            forecastDays.forEach(day => {
                const { date, day: dayData } = day;
                const { maxtemp_c, mintemp_c, condition } = dayData;

                const dayOfWeek = new Date(date)
                    .toLocaleString('fr-FR', { weekday: 'long' })
                    .replace(/^\w/, c => c.toUpperCase()); // Majuscule à la première lettre

                const translatedCondition = weatherConditionsTranslation[condition.text] || condition.text;
                const iconName = weatherIcons[condition.text] || "weather-cloudy"; // Icône par défaut si non définie

                const dayElement = document.createElement('div');
                dayElement.classList.add('rowV2');

                dayElement.innerHTML = `
                <div class="columnV2Icone">
                    <img src="ressources/img/png/${iconName}.png" alt="${translatedCondition}" class="weather-icon">
                </div>
                <div class="columnV2Jour">
                    <div class="dayV2">${dayOfWeek}</div>
                    <div class="weatherV2">${translatedCondition}</div>
                </div>
                <div class="columnV2Temp">
                    <p class="temp">${mintemp_c} - ${maxtemp_c}°C</p>
                </div>
            `;

                containerBas.appendChild(dayElement);
            });

            return filteredData;
        } catch (error) {
            console.error(`Erreur lors de la récupération des données météo pour ${cityName}:`, error);
            return null;
        }
    }

    // Fonction pour déterminer la carte visible au centre ou aux extrémités
    function getVisibleCard() {
        const container = document.querySelector('.card-scroll-container');
        const cards = document.querySelectorAll('.card');
        const containerCenter = container.scrollLeft + container.offsetWidth / 2;

        let closestCard = null;
        let minDistance = Infinity;

        // Vérifier si le conteneur est à l'extrémité gauche
        if (container.scrollLeft === 0) {
            return cards[0]; // Première carte
        }

        // Vérifier si le conteneur est à l'extrémité droite
        if (Math.ceil(container.scrollLeft + container.offsetWidth) >= container.scrollWidth) {
            return cards[cards.length - 1]; // Dernière carte
        }

        // Sinon, trouver la carte la plus proche du centre
        cards.forEach(card => {
            const cardLeft = card.offsetLeft;
            const cardRight = cardLeft + card.offsetWidth;
            const cardCenter = (cardLeft + cardRight) / 2;

            const distance = Math.abs(containerCenter - cardCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestCard = card;
            }
        });

        return closestCard;
    }

    // Fonction pour mettre à jour le sélecteur
    async function updateSelector() {
        const visibleCard = getVisibleCard();
        const cityName = visibleCard ? visibleCard.getAttribute("data-city") : "Ville inconnue";

        // Récupérer ou créer le sélecteur
        let selector = document.querySelector(".city-selector");
        if (!selector) {
            const newSelector = document.createElement("div");
            newSelector.className = "city-selector";
            document.querySelector("#weather-cards-container").appendChild(newSelector);
            selector = newSelector;
        }

        console.log(`Sélecteur mis à jour pour la ville : ${cityName}`);

        // Récupérer les données horaires pour la ville sélectionnée
        const hourlyData = await getTempDetails(cityName);

        if (!hourlyData) {
            console.error("Impossible de récupérer les données horaires pour la ville :", cityName);
            return;
        }

        // Mettre à jour le graphique avec les données horaires
        createWeatherChart(hourlyData);
    }

    // Gestionnaire pour le bouton "Précédent"
    document.querySelector('.carousel-control-prev').addEventListener('click', function () {
        const container = document.querySelector('.card-scroll-container');
        const card = document.querySelector('.card');
        const cardWidth = card.offsetWidth;
        const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
        const totalCardWidth = cardWidth + margin;

        container.scrollLeft -= totalCardWidth;

        setTimeout(updateSelector, 300); // Temps pour attendre la fin de l'animation
    });

    // Gestionnaire pour le bouton "Suivant"
    document.querySelector('.carousel-control-next').addEventListener('click', function () {
        const container = document.querySelector('.card-scroll-container');
        const card = document.querySelector('.card');
        const cardWidth = card.offsetWidth;
        const margin = parseInt(window.getComputedStyle(card).marginRight, 10);
        const totalCardWidth = cardWidth + margin;

        container.scrollLeft += totalCardWidth;

        setTimeout(updateSelector, 300); // Temps pour attendre la fin de l'animation
    });



    // Tableau de villes à afficher
    const cities = [
        "Sambava", "Antananarivo", "Antalaha", "Antsirabe", "Diego Suarez",
        "Fianarantsoa", "Mahajanga", "Manakara", "Ambositra", "Morondava",
        "Nosy Be", "Toamasina", "Toliara", "Fort Dauphin"
    ];

    // Sélecteur de ville
    const citySelector = $("#citySelector");

    // Remplir le sélecteur avec les villes
    cities.sort().forEach(city => {
        citySelector.append(new Option(city, city));
    });

    // Initialisation du graphique
    function createWeatherChart(hourlyData) {
        const labels = hourlyData.map(hour => hour.time.split(" ")[1]); // Heures
        const temperatures = hourlyData.map(hour => hour.temp_c); // Températures

        const data = {
            labels,
            datasets: [{
                label: "",
                data: temperatures,
                borderColor: 'rgba(75,180, 230, 1)',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                borderWidth: 2,
                tension: 0.4 // Lisser les lignes
            }]
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    display: false // Désactiver la légende
                },
                title: { display: false, text: '' } // Assurez-vous que `text` est une chaîne vide
            },
            scales: {
                x: { grid: { display: false } },
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Température (°C)' }
                }
            }
        };

        if (chartInstance) {
            chartInstance.destroy(); // Détruire l'ancien graphique
        }

        // Créer un nouveau graphique
        chartInstance = new Chart(chartElement.getContext('2d'), {
            type: 'line',
            data,
            options
        });
    }




    // Créer les cartes des villes
    function createWeatherCard(weatherData) {
        const city = weatherData.location.name;
        const condition = weatherData.current.condition.text;
        const temp = Math.round(weatherData.current.temp_c);

        // Dictionnaire de traduction des conditions météorologiques
        const weatherConditionsTranslation = {
            "Clear": "Clair",
            "Partly Cloudy": "Partiellement nuageux",
            "Partly Cloudy": "Partiellement nuageux",
            "Partly cloudy": "Partiellement nuageux",
            "Heavy rain": "Forte pluie",
            "Cloudy": "Nuageux",
            "Overcast": "Couvert",
            "Mist": "Brume",
            "Patchy rain possible": "Pluie éparse possible",
            "Rain": "Pluie",
            "Thunderstorm": "Orage",
            "Snow": "Neige",
            "Hail": "Grêle",
            "Fog": "Brouillard",
            "Light rain shower": "Averse de pluie légère",
            "Patchy rain nearby": "Pluie éparse à proximité",
            "Sunny": "Ensoleillé",
            "Moderate rain": "Pluie modérée"
        };

        // Traduire la condition météorologique
        const translatedCondition = weatherConditionsTranslation[condition] || condition; // Utiliser l'original si non traduit

        const localImagePath = `ressources/img/jpg/${city}.jpg`;

        const card = document.createElement("div");
        card.className = "card";
        card.style.width = "18rem";
        card.setAttribute("data-city", city);
        card.innerHTML = `
        <img src="${localImagePath}" class="bd-placeholder-img card-img-top" alt="Image de ${city}" width="100%" height="180">
        <div class="card-body">
            <p class="card-text">
                <div class="detail-city">${city},</div>
                <div class="detail-weather">${translatedCondition}</div>
                <div class="detail-temp">${temp}°C</div>
            </p>
        </div>
    `;

        card.addEventListener("click", () => {
            citySelector.val(city); // Mettre à jour le sélecteur avec la ville sélectionnée
            updateWeatherChart(city); // Mettre à jour le graphique avec la ville
        });

        document.querySelector("#weather-cards-container").appendChild(card);
    }


    // Mettre à jour le graphique en fonction de la ville
    async function updateWeatherChart(cityName) {
        const hourlyData = await getTempDetails(cityName);
        if (!hourlyData) {
            console.error("Aucune donnée météo trouvée pour cette ville");
            return;
        }
        createWeatherChart(hourlyData);
    }

    // Initialiser les cartes des villes et le graphique
    cities.forEach(city => {
        const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                createWeatherCard(data);
            })
            .catch(error => console.error(`Erreur lors de la récupération des données pour ${city}:`, error));
    });

    // Event listener pour le sélecteur de ville
    citySelector.change(() => {
        const selectedCity = citySelector.val();
        if (selectedCity) {
            updateWeatherChart(selectedCity); // Mettre à jour le graphique
        }
    });

    // Initialiser le graphique avec la première ville si nécessaire
    setTimeout(() => {
        const firstCity = cities[0];
        updateWeatherChart(firstCity);
    }, 1000);
});
