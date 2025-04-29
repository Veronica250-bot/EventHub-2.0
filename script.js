const events = [
    { id: "1", sport: "Jalkapallo", name: "Jalkapallo: HJK vs Inter", date: "15.5.2025", location: "Helsinki", description: "Kauden avausottelu HJK:n kotikentällä.", url: "https://www.hjk.fi" },
    { id: "2", sport: "Jääkiekko", name: "Jääkiekko: HIFK vs Kärpät", date: "20.5.2025", location: "Helsinki", description: "Kiihkeä paikallisottelu jäähallissa.", url: "https://www.hifk.fi" },
    { id: "3", sport: "Lentopallo", name: "Lentopallo: Vuosaaren Viikingit vs Korson Veto", date: "18.5.2025", location: "Helsinki", description: "Paikallinen lentopalloderby Kallahden palloiluhallissa.", url: "https://www.lentopallo.fi" },
    { id: "4", sport: "Jalkapallo", name: "Jalkapallo: PK-35 vs Gnistan", date: "22.5.2025", location: "Vantaa", description: "Kiihkeä derby Vantaalla.", url: "https://www.pk-35.fi" },
    { id: "5", sport: "Jalkapallo", name: "Jalkapallo: HJK vs KuPS", date: "10.6.2025", location: "Helsinki", description: "Kesäkauden huippuottelu.", url: "https://www.hjk.fi" },
    { id: "6", sport: "Lentopallo", name: "Lentopallo: Helsinki Volley vs Vantaan Lentis", date: "12.6.2025", location: "Helsinki", description: "Kesäkauden lentopalloturnaus Myllypuron hallissa.", url: "https://www.lentopallo.fi" },
    { id: "7", sport: "Jääkiekko", name: "Jääkiekko: Jokerit vs Tappara", date: "15.9.2025", location: "Helsinki", description: "Syyskauden avaus.", url: "https://www.jokerit.fi" },
    { id: "8", sport: "Lentopallo", name: "Lentopallo: Beach Club Tournament", date: "25.9.2025", location: "Helsinki", description: "Rantalentopalloturnaus Biitsillä, Pasilassa.", url: "https://www.biitsi.fi" },
    { id: "9", sport: "Jalkapallo", name: "Jalkapallo: Gnistan vs FC Lahti", date: "5.10.2025", location: "Vantaa", description: "Kauden loppuhuipennus.", url: "https://www.gnistan.fi" },
    { id: "10", sport: "Jääkiekko", name: "Jääkiekko: HIFK vs Ilves", date: "20.11.2025", location: "Helsinki", description: "Talven klassikko.", url: "https://www.hifk.fi" },
    { id: "11", sport: "Lentopallo", name: "Lentopallo: Korson Veto vs Rekolan Raikas", date: "15.12.2025", location: "Vantaa", description: "Joulukuun lentopalloturnaus Kaivokselan koululla.", url: "https://www.lentopallo.fi" },
    { id: "12", sport: "Jalkapallo", name: "Jalkapallo: HJK vs SJK", date: "15.7.2025", location: "Helsinki", description: "Kesän huippuottelu.", url: "https://www.hjk.fi" },
    { id: "13", sport: "Jääkiekko", name: "Jääkiekko: Kärpät vs TPS", date: "10.10.2025", location: "Helsinki", description: "Vieraspeli Helsingissä.", url: "https://www.karpat.fi" },
    { id: "14", sport: "Lentopallo", name: "Lentopallo: PKS Höntsäpelit Turnaus", date: "5.11.2025", location: "Vantaa", description: "Harrastelijoiden lentopalloturnaus Länsi-Vantaalla.", url: "https://www.lentopallo.fi" },
    { id: "15", sport: "Jalkapallo", name: "Jalkapallo: Gnistan vs VPS", date: "20.11.2025", location: "Vantaa", description: "Syyskauden päätös.", url: "https://www.gnistan.fi" },
    { id: "16", sport: "Jääkiekko", name: "Jääkiekko: Jokerit vs Lukko", date: "25.12.2025", location: "Helsinki", description: "Joulun peli.", url: "https://www.jokerit.fi" }
];

// Etusivun tapahtumalista ja suodatus
let currentSport = "all"; // Säilytetään nykyinen lajisuodatus

function getCurrentSport() {
    return currentSport;
}

if (document.getElementById("eventList")) {
    function displayEvents(sportFilter, monthFilter) {
        const eventList = document.getElementById("eventList");
        eventList.innerHTML = "";
        let filteredEvents = events;

        currentSport = sportFilter; // Päivitetään nykyinen laji

        if (sportFilter !== "all") {
            filteredEvents = filteredEvents.filter(event => event.sport === sportFilter);
        }

        if (monthFilter !== "all") {
            filteredEvents = filteredEvents.filter(event => event.date.includes(monthFilter));
        }
        
        filteredEvents.forEach(event => {
            eventList.innerHTML += `
                <div class="event-item list-group-item">
                    <a href="event.html?id=${event.id}&sport=${sportFilter}&month=${monthFilter}" class="text-decoration-none text-dark">${event.name} – ${event.date}, ${event.location}</a>
                </div>
            `;
        });

        // Päivitetään URL-parametrit
        const newUrl = `${window.location.pathname}?sport=${sportFilter}&month=${monthFilter}`;
        window.history.pushState({}, '', newUrl);
    }

    // Lue URL-parametrit sivun latautuessa
    const urlParams = new URLSearchParams(window.location.search);
const initialSport = urlParams.get("sport") || "all";  
const initialMonth = urlParams.get("month") || "all"; 
currentSport = initialSport;

    // Aseta kuukausivalikko
    const monthFilter = document.getElementById("monthFilter");
    monthFilter.value = initialMonth;

    displayEvents(initialSport, initialMonth);
}

function filterEvents(sport, month) {
    displayEvents(sport, month);
}

// Lisätietosivu
if (document.getElementById("eventDetails")) {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    const sportFilter = urlParams.get("sport") || "all";
    const monthFilter = urlParams.get("month") || "all";
    const event = events.find(e => e.id === eventId);

    if (event) {
        document.getElementById("eventDetails").innerHTML = `
            <h2>${event.name}</h2>
            <p><strong>Päivämäärä:</strong> ${event.date}</p>
            <p><strong>Paikka:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <a href="${event.url}" target="_blank" class="btn btn-primary">Lisätietoja</a>
        `;
        // Päivitä takaisin-linkki säilyttämään suodatus
        document.getElementById("backLink").href = `index.html?sport=${sportFilter}&month=${monthFilter}`;
    } else {
        document.getElementById("eventDetails").innerHTML = "<p>Tapahtumaa ei löydy. <a href='index.html'>Palaa etusivulle</a>.</p>";
    }
}
