document.addEventListener("DOMContentLoaded", () => {
    // Elementi principali
    const inputRicerca = document.getElementById("inputRicerca");
    const tastoRicerca = document.getElementById("iconaRicerca");
    const containerCard = document.getElementById("containerCard");
    const baseUrl = "https://striveschool-api.herokuapp.com/books?title=";

    // Funzione per mostrare i libri nella pagina principale
    function mostraLibri(data) {
        containerCard.innerHTML = ""; // Svuota il contenitore

        data.forEach((libro) => {
            // Creazione della card
            const card = document.createElement("div");
            card.classList.add("card", "col-lg-3", "col-md-4", "col-sm-6", "m-3");
            card.style.width = "18rem";

            // Contenuto della card
            card.innerHTML = `
                <img src="${libro.img}" class="card-img-top" alt="${libro.title}">
                <div class="card-body">
                    <h5 class="card-title">${libro.title}</h5>
                    <p class="card-text">Categoria: ${libro.category}</p>
                    <p class="card-text">Prezzo: €${libro.price.toFixed(2)}</p>
                    <button class="btn btn-primary dettagli-btn" data-asin="${libro.asin}">Più dettagli</button>
                </div>
            `;

            // Aggiungi evento "Più dettagli"
            const dettagliBtn = card.querySelector(".dettagli-btn");
            dettagliBtn.addEventListener("click", () => {
                window.location.href = `dettagli.html?id=${libro.asin}`;
            });

            containerCard.appendChild(card);
        });
    }

    // Evento per il tasto di ricerca
    tastoRicerca.addEventListener("click", () => {
        const query = inputRicerca.value.trim();

        if (query) {
            fetch(`${baseUrl}${query}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Errore nella richiesta");
                    }
                    return response.json();
                })
                .then((data) => {
                    mostraLibri(data);
                })
                .catch((err) => {
                    console.error("Errore durante la ricerca:", err);
                    containerCard.innerHTML = "<p>Errore nel caricamento dei libri.</p>";
                });
        } else {
            containerCard.innerHTML = "<p>Inserisci un termine di ricerca.</p>";
        }
    });

    // Parte per la pagina dettagli.html
    const params = new URLSearchParams(location.search);
    const id = params.get("id"); // Ottieni l'ASIN dalla query string

    if (id) {
        const contenitoreDettagli = document.getElementById("strutturaDettagli");

        fetch("https://striveschool-api.herokuapp.com/books")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Errore nella risposta");
                }
                return response.json();
            })
            .then((data) => {
                // Filtra il libro con l'ASIN specifico
                const libroSelezionato = data.filter((libro) => libro.asin === id);

                // Verifica se il libro esiste
                if (libroSelezionato.length === 0) {
                    contenitoreDettagli.innerHTML = "<p>Libro non trovato.</p>";
                    return;
                }

                // Genera l'HTML del libro selezionato
                const dettagliHTML = libroSelezionato.map((libro) => `
                    <div class="card" style="width: 18rem;">
                        <img src="${libro.img}" class="card-img-top" alt="${libro.title}">
                        <div class="card-body">
                            <h5 class="card-title">${libro.title}</h5>
                            <p class="card-text">Categoria: ${libro.category}</p>
                            <p class="card-text">Prezzo: €${libro.price}</p>
                            <p class="card-text">ASIN: ${libro.asin}</p>
                        </div>
                    </div>
                `).join("");

                contenitoreDettagli.innerHTML = dettagliHTML;
            })
            .catch((err) => {
                console.error("Errore durante il fetch:", err);
                const contenitoreDettagli = document.getElementById("strutturaDettagli");
                contenitoreDettagli.innerHTML = "<p>Errore nel caricamento dei dettagli del libro.</p>";
            });
    }
});
