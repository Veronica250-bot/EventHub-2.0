const events = [
    { id: "1", sport: "Jalkapallo", name: "Jalkapallo: HJK vs Inter", date: "15.5.2025", location: "Helsinki", description: "Kauden avausottelu HJK:n kotikentällä.", url: "https://www.hjk.fi", image: "https://picsum.photos/200/150?random=1" },
    { id: "2", sport: "Jääkiekko", name: "Jääkiekko: HIFK vs Kärpät", date: "20.5.2025", location: "Helsinki", description: "Kiihkeä paikallisottelu jäähallissa.", url: "https://www.hifk.fi", image: "https://picsum.photos/200/150?random=2" },
    { id: "3", sport: "Koripallo", name: "Koripallo: Espoo Basket vs Vantaa Stars", date: "18.5.2025", location: "Espoo", description: "Paikallinen korismatsi.", url: "http://www.ebt.fi", image: "https://picsum.photos/200/150?random=3" },
    { id: "4", sport: "Jalkapallo", name: "Jalkapallo: PK-35 vs Gnistan", date: "22.5.2025", location: "Vantaa", description: "Kiihkeä derby Vantaalla.", url: "https://www.pk-35.fi", image: "https://picsum.photos/200/150?random=4" },
    { id: "5", sport: "Jalkapallo", name: "Jalkapallo: HJK vs KuPS", date: "10.6.2025", location: "Helsinki", description: "Kesäkauden huippuottelu.", url: "https://www.hjk.fi", image: "https://picsum.photos/200/150?random=5" },
    { id: "6", sport: "Jääkiekko", name: "Jääkiekko: Jokerit vs Tappara", date: "15.9.2025", location: "Helsinki", description: "Syyskauden avaus.", url: "https://www.jokerit.fi", image: "https://picsum.photos/200/150?random=6" },
    { id: "7", sport: "Koripallo", name: "Koripallo: Helsinki Seagulls vs Espoo United", date: "25.9.2025", location: "Helsinki", description: "Syksyn korisderby.", url: "http://www.seagulls.fi", image: "https://picsum.photos/200/150?random=7" },
    { id: "8", sport: "Jalkapallo", name: "Jalkapallo: Gnistan vs FC Lahti", date: "5.10.2025", location: "Vantaa", description: "Kauden loppuhuipennus.", url: "https://www.gnistan.fi", image: "https://picsum.photos/200/150?random=8" },
    { id: "9", sport: "Jääkiekko", name: "Jääkiekko: HIFK vs Ilves", date: "20.11.2025", location: "Helsinki", description: "Talven klassikko.", url: "https://www.hifk.fi", image: "https://picsum.photos/200/150?random=9" },
    { id: "10", sport: "Koripallo", name: "Koripallo: Vantaa Stars vs Nokia BC", date: "15.12.2025", location: "Vantaa", description: "Joulukuun koristurnaus.", url: "http://www.vantaastars.fi", image: "https://picsum.photos/200/150?random=10" },
    { id: "11", sport: "Jalkapallo", name: "Jalkapallo: HJK vs SJK", date: "15.7.2025", location: "Helsinki", description: "Kesän huippuottelu.", url: "https://www.hjk.fi", image: "https://picsum.photos/200/150?random=11" },
    { id: "12", sport: "Jääkiekko", name: "Jääkiekko: Kärpät vs TPS", date: "10.10.2025", location: "Helsinki", description: "Vieraspeli Helsingissä.", url: "https://www.karpat.fi", image: "https://picsum.photos/200/150?random=12" },
    { id: "13", sport: "Koripallo", name: "Koripallo: Seagulls vs Kataja", date: "5.11.2025", location: "Helsinki", description: "Korisliigan klassikko.", url: "http://www.seagulls.fi", image: "https://picsum.photos/200/150?random=13" },
    { id: "14", sport: "Jalkapallo", name: "Jalkapallo: Gnistan vs VPS", date: "20.11.2025", location: "Vantaa", description: "Syyskauden päätös.", url: "https://www.gnistan.fi", image: "https://picsum.photos/200/150?random=14" },
    { id: "15", sport: "Jääkiekko", name: "Jääkiekko: Jokerit vs Lukko", date: "25.12.2025", location: "Helsinki", description: "Joulun peli.", url: "https://www.jokerit.fi", image: "https://picsum.photos/200/150?random=15" }
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
            <img src="${event.image}" alt="${event.name}" class="img-fluid mb-3" style="max-width: 200px;" onerror="this.src='https://picsum.photos/200/150?random=1';">
            <h2>${event.name}</h2>
            <p><strong>Päivämäärä:</strong> ${event.date}</p>
            <p><strong>Paikka:</strong> ${event.location}</p>
            <p>${event.description}</p>
            <a href="${event.url}" target="_blank" class="btn btn-primary">Lisätietoja</a>
        `;
        // Päivitä takaisin-linkki säilyttämään suodatus
        document.getElementById("backLink").href = `index.html?sport=${sportFilter}&month=${monthFilter}`;
    } else {
        document.getElementById("eventDetails").innerHTML = "<p>Tapahtumaa ei löydy.</p>";
    }
}
