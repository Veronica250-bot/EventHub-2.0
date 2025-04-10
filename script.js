const events = [
    { id: "1", sport: "Jalkapallo", name: "Jalkapallo: HJK vs Inter", date: "15.5.2025", location: "Helsinki", description: "Kauden avausottelu HJK:n kotikentällä.", url: "https://www.hjk.fi" },
    { id: "2", sport: "Jääkiekko", name: "Jääkiekko: HIFK vs Kärpät", date: "20.5.2025", location: "Helsinki", description: "Kiihkeä paikallisottelu jäähallissa.", url: "https://www.hifk.fi" },
    { id: "3", sport: "Koripallo", name: "Koripallo: Espoo Basket vs Vantaa Stars", date: "18.5.2025", location: "Espoo", description: "Paikallinen korismatsi.", url: "https://www.ebt.fi" },
    { id: "4", sport: "Jalkapallo", name: "Jalkapallo: PK-35 vs Gnistan", date: "22.5.2025", location: "Vantaa", description: "Kiihkeä derby Vantaalla.", url: "https://www.pk-35.fi" },
    { id: "5", sport: "Jalkapallo", name: "Jalkapallo: HJK vs KuPS", date: "10.6.2025", location: "Helsinki", description: "Kesäkauden huippuottelu.", url: "https://www.hjk.fi" },
    { id: "6", sport: "Jääkiekko", name: "Jääkiekko: Jokerit vs Tappara", date: "15.9.2025", location: "Helsinki", description: "Syyskauden avaus.", url: "https://www.jokerit.fi" },
    { id: "7", sport: "Koripallo", name: "Koripallo: Helsinki Seagulls vs Espoo United", date: "25.9.2025", location: "Helsinki", description: "Syksyn korisderby.", url: "https://www.seagulls.fi" },
    { id: "8", sport: "Jalkapallo", name: "Jalkapallo: Gnistan vs FC Lahti", date: "5.10.2025", location: "Vantaa", description: "Kauden loppuhuipennus.", url: "https://www.gnistan.fi" },
    { id: "9", sport: "Jääkiekko", name: "Jääkiekko: HIFK vs Ilves", date: "20.11.2025", location: "Helsinki", description: "Talven klassikko.", url: "https://www.hifk.fi" },
    { id: "10", sport: "Koripallo", name: "Koripallo: Vantaa Stars vs Nokia BC", date: "15.12.2025", location: "Vantaa", description: "Joulukuun koristurnaus.", url: "https://www.vantaastars.fi" }
];

// Etusivun suodatus ja pitäis näkyä tapatumat:)
if (document.getElementById("eventList")) {
    function displayEvents(sportFilter, monthFilter) {
        const eventList = document.getElementById("eventList");
        eventList.innerHTML = "";
        let filteredEvents = events;

        // Lajeille suodatus
        if (sportFilter !== "all") {
            filteredEvents = filteredEvents.filter(event => event.sport === sportFilter);
        }

        // myös kuukausille
        if (monthFilter !== "all") {
            filteredEvents = filteredEvents.filter(event => event.date.includes(monthFilter));
        }
        
        filteredEvents.forEach(event => {
            eventList.innerHTML += `
                <div class="event-item list-group-item">
                    <a href="event.html?id=${event.id}" class="text-decoration-none text-dark">${event.name} – ${event.date}, ${event.location}</a>
                </div>
            `;
        });
    }
    displayEvents("all", "all"); // oletuksia
}

function filterEvents(sport, month) {
    displayEvents(sport, month);
}

// Lisäpage projektissa
if (document.getElementById("eventDetails")) {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get("id");
    const event = events.find(e => e.id === eventId);

    if (event) {
        document.getElementById("eventDetails").innerHTML = `
            <h2>${event.name}</h2>
            <p><strong>Päivämäärä:</strong> ${event.date}</p>
            <p><strong>Paikka:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <a href="${event.url}" target="_blank" class="btn btn-primary">Lisätietoja</a>
        `;
    } else {
        document.getElementById("eventDetails").innerHTML = "<p>Tapahtumaa ei löydy.</p>";
    }
}
