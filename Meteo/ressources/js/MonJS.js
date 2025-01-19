// URL de l'API pour les localisations des villes
const API_URL = "https://www.orange.mg/api/pratique/meteo/locations";

// Variable globale pour stocker les villes filtrées
let villesFiltrees = [];

// Fonction pour récupérer et filtrer les villes
async function getVillesFiltrees() {
  try {
    console.log("Début de la fonction de récupération des villes");

    // Récupération des données depuis l'API
    const response = await fetch(API_URL);
    const villes = await response.json();
    console.log("Villes reçues :", villes);

    // Filtrage des doublons en ignorant les majuscules/minuscules
    villesFiltrees = Array.from(
      new Set(villes.map((ville) => ville.toLowerCase())) // Supprimer les doublons et tout mettre en minuscule
    )
      .map((ville) => ville.charAt(0).toUpperCase() + ville.slice(1)) // Capitaliser la première lettre de chaque ville
      .sort(); // Trier par ordre alphabétique

    console.log("Liste des villes filtrées et triées :", villesFiltrees);
  } catch (error) {
    console.error("Erreur lors de la récupération des villes :", error);
  }
}

// Fonction pour récupérer les prévisions météo actuelles d'une ville
async function getMeteoActuelle(ville) {
  try {
    const API_URL_CURRENT = `https://www.orange.mg/api/pratique/meteo/forecast/${ville}`;

    // Vérifier si les villes ont été chargées avant de procéder
    if (villesFiltrees.length === 0) {
      console.log("Les villes ne sont pas encore chargées.");
      return;
    }

    // Récupérer les données de l'API
    const response = await fetch(API_URL_CURRENT);
    const meteoData = await response.json();

    // Vérifier la réponse de l'API
    if (meteoData.cod !== "200") {
      throw new Error(`Erreur API: Code ${meteoData.cod}`);
    }

    // Filtrer les prévisions pour la ville actuelle
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const meteoActuelle = meteoData.list.find((forecast) => forecast.dt >= currentTimestamp);

    if (!meteoActuelle) {
      console.log(`Aucune donnée disponible pour ${ville} à l'heure actuelle.`);
      return;
    }

    // Obtenir les données météo nécessaires
    const { temp } = meteoActuelle.main;
    const { description, icon } = meteoActuelle.weather[0];
    const { humidity } = meteoActuelle.main;
    const { speed: windSpeed } = meteoActuelle.wind;

    // Correspondance des icônes
    const customIconName = getCustomIconName(icon);

    // Construction de l'objet avec les données météo
    const result = {
      ville,
      date: meteoActuelle.dt_txt,
      temperature: Math.round(temp),
      description: capitalizeFirstLetter(description),
      icon: `ressources/img/png/${customIconName}.png`, // Utilisation de ton icône personnalisé
      humidity,
      windSpeed
    };
    // Fonction pour mettre la première lettre en majuscule
    function capitalizeFirstLetter(text) {
      if (!text) return '';  // Si la description est vide ou nulle
      return text.charAt(0).toUpperCase() + text.slice(1);  // Majuscule sur la première lettre et garde le reste du texte inchangé
    }

    console.log(result);
    console.log(`Météo actuelle pour ${ville}: ${result.description}, ${result.temperature}°C`);

    // Créer un élément de carte pour cette ville
    const localImagePath = `ressources/img/jpg/${ville}.jpg`;

    // Vérification pour éviter les doublons dans le conteneur
    if (!document.querySelector(`[data-city="${ville}"]`)) {
      createWeatherCard(result, localImagePath);
    } else {
      console.log(`Carte météo pour ${ville} déjà présente.`);
    }

  } catch (error) {
    console.error(`Erreur lors de la récupération des données météo pour ${ville}:`, error);
  }
}

// Fonction pour obtenir le nom d'icône personnalisé
function getCustomIconName(iconCode) {
  const iconMapping = {
    "01d": "sunny",
    "02d": "partly-cloudy",
    "03d": "cloudy",
    "04d": "overcast",
    "09d": "rain",
    "10d": "rainy",
    "11d": "storm",
    "13d": "snow",
    "50d": "fog"
  };

  return iconMapping[iconCode] || "default"; // Retourne "default" si l'icône n'est pas trouvée
}

// Fonction pour créer et ajouter la carte météo
function createWeatherCard(result, localImagePath) {
  const card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";
  card.setAttribute("data-city", result.ville); // Associer la carte à la ville

  card.innerHTML = `
    <img src="${localImagePath}" class="bd-placeholder-img card-img-top" alt="Image de ${result.ville}" width="100%" height="180">
    <div class="card-body">
        <p class="card-text">
            <div class="detail-city">${result.ville},</div>
            <div class="detail-weather">${result.description}</div>
            <div class="detail-temp">${result.temperature}°C</div>
        </p>
    </div>
  `;

  // Ajouter la carte dans le conteneur
  const container = document.getElementById('weather-cards-container');
  container.appendChild(card);
}

// Fonction pour gérer les gestes de glissement (swipe)
let startX;
let endX;

document.getElementById('weather-cards-container').addEventListener('touchstart', (e) => {
  startX = e.changedTouches[0].screenX;
});

document.getElementById('weather-cards-container').addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].screenX;

  if (startX > endX) {
    // Glissement vers la gauche -> Aller à l'élément suivant
    $('#carouselCitiesContainer').carousel('next');
  } else if (startX < endX) {
    // Glissement vers la droite -> Aller à l'élément précédent
    $('#carouselCitiesContainer').carousel('prev');
  }
});
// Fonction pour récupérer la météo de toutes les villes
async function getMeteoPourToutesLesVilles() {
  try {
    // Vérifier si les villes sont déjà chargées, sinon appeler getVillesFiltrees
    if (villesFiltrees.length === 0) {
      await getVillesFiltrees();
    }

    // Parcourir les villes triées et récupérer la météo pour chacune
    for (const ville of villesFiltrees) {
      // Appeler la fonction pour chaque ville et récupérer la météo
      await getMeteoActuelle(ville);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo pour toutes les villes :", error);
  }
}

// Appel de la fonction pour récupérer la météo pour toutes les villes
getMeteoPourToutesLesVilles();

