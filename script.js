document.addEventListener("DOMContentLoaded", () => {
let inputRicerca = document.getElementById("inputRicerca");
let tastoRicerca = document.getElementById("iconaRicerca");
let baseUrl = "https://striveschool-api.herokuapp.com/books?title=";
let containerCard = document.getElementById("containerCard");
let containerItemCarrello = document.getElementById("containerItemCarrello");
let modale = document.getElementById("modale")
let chiudiCarrello = document.getElementById("chiudiCarrello")

/* function mostraLibri(data,) {

    let contatoreCard = 0
    let rowCard = document.createElement("div")
    rowCard.classList.add("row", "d-flex", "flex-wrap", "gap-3")
    containerCard.appendChild(rowCard)

    let cardGroups = document.createElement("div")
    cardGroups.classList.add("card-group", "d-flex", "flex-wrap", "gap-3")

    data.forEach((libro, index) => {
        

        let card = document.createElement("div")
        card.classList.add("card", "flex-grow-1", "col-lg-3", "col-md-4" , "col-sm-6", "h-100")

        let titoloCard = document.createElement("p")
        titoloCard.classList.add("titolo-card")
        titoloCard.innerText = libro.title

        let containerImgCard = document.createElement("div")
        containerImgCard.classList.add("container-img-card", "col-lg-12", )

        let imgCard = document.createElement("img")
        imgCard.classList.add("card-img-top")
        imgCard.src = libro.img
        imgCard.alt = libro.title

        let containerInfoCard = document.createElement("div")
        containerInfoCard.classList.add("card-body")

        let prezzoCard = document.createElement("p")
        prezzoCard.classList.add("prezzo-card")
        prezzoCard.innerText = parseFloat(libro.price.toFixed(2))

        let categoriaCard = document.createElement("p")
        categoriaCard.classList.add("categoria-card")
        categoriaCard.innerText = libro.category

        contatoreCard++
        containerInfoCard.appendChild(titoloCard)
        containerInfoCard.appendChild(categoriaCard)
        containerInfoCard.appendChild(prezzoCard)

        card.appendChild(imgCard)
        card.appendChild(containerInfoCard)

        rowCard.appendChild(cardGroups)
        cardGroups.appendChild(card)
        
        if (contatoreCard % 4 === 0 && index < data.length - 1) {
            cardGroups = document.createElement("div")
            cardGroups.classList.add("card-group")
            rowCard = document.createElement("div")
            rowCard.classList.add("row", "d-flex", "flex-wrap", "gap-3")
            containerCard.appendChild(rowCard)
            rowCard.appendChild(cardGroups)
        }

        console.log(imgCard, " ", titoloCard, " ", categoriaCard, " ", prezzoCard);
    });

} */

function mostraLibri(data) {
  containerCard.innerHTML = "";

  let rowCard = document.createElement("div");
  rowCard.classList.add(
    "d-flex",
    "flex-row",
    "flex-wrap",
    "justify-content-start",
    "align-items-stretch",
    "gap-3"
  );
  containerCard.appendChild(rowCard);

  data.forEach((libro) => {
    //CARD
    let card = document.createElement("div");
    card.classList.add(
      "card",
      "flex-grow-1",
      "col-lg-3",
      "col-md-4",
      "col-sm-6",
      "h-100"
    );

    //TITOLO CARD
    let titoloCard = document.createElement("p");
    titoloCard.classList.add("titolo-card");
    titoloCard.innerText = libro.title;
    titoloCard.title = libro.title;
    //CONTAINER IMG
    let containerImgCard = document.createElement("div");
    containerImgCard.classList.add("container-img-card");
    //IMG
    let imgCard = document.createElement("img");
    imgCard.classList.add("card-img-top");
    imgCard.src = libro.img;
    imgCard.alt = libro.title;
    //ASIN
    let asin = document.createElement("p");
    asin.innerText = "Asin: " + libro.asin;
    asin.classList.add("asin")
    //CONTAINER INFO CARD
    let containerInfoCard = document.createElement("div");
    containerInfoCard.classList.add("card-body");
    //CONTAINER PREZZO E CATEGORIA
    let containerPrezzoCategoria = document.createElement("div");
    containerPrezzoCategoria.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "mt-2"
    );
    //PREZZO
    let prezzoCard = document.createElement("p");
    prezzoCard.classList.add("prezzo-card");
    prezzoCard.innerText = `€ ${libro.price.toFixed(2)}`;
    //CATEGORIA
    let categoriaCard = document.createElement("p");
    categoriaCard.classList.add("categoria-card");
    categoriaCard.innerText = libro.category;

    let containerAsinCarrello = document.createElement("div");
    containerAsinCarrello.classList.add(
      "d-flex",
      "justify-content-between",
      "align-items-center",
      "mt-4",
      "position-relative"
    );

    let aggiungiCarrello = document.createElement("ion-icon");
    aggiungiCarrello.name = "cart";
    aggiungiCarrello.classList.add("fs-3", "cursor-pointer");
    aggiungiCarrello.id = "aggiungiCarrello";

    aggiungiCarrello.addEventListener("click", () => {
      // Chiama la funzione `aggiungiAlCarrello` e le passa l'oggetto libro.

      aggiungiAlCarrello(libro);
      modale.style.display = "block"
      // Mostra il badge "checked-carrello" relativo alla card.
    let parentCard = aggiungiCarrello.closest(".card");
    let badge = parentCard.querySelector(".checked-carrello");

    if (badge) {
        badge.style.display = "block"; // Mostra il badge
    }
    modale.style.display = "block";
    });

    let checkedItemAggiunto = document.createElement("ion-icon")
    checkedItemAggiunto.name = "checkmark"
    checkedItemAggiunto.classList.add("checked-carrello")

    //CREAZIONE CARTA
    containerInfoCard.appendChild(titoloCard);
    containerPrezzoCategoria.appendChild(prezzoCard);
    containerPrezzoCategoria.appendChild(categoriaCard);

    card.appendChild(imgCard);
    card.appendChild(containerInfoCard);
    containerInfoCard.appendChild(containerPrezzoCategoria);
    containerInfoCard.appendChild(containerAsinCarrello);
    containerAsinCarrello.appendChild(asin);
    containerAsinCarrello.appendChild(checkedItemAggiunto);
    containerAsinCarrello.appendChild(aggiungiCarrello);
    
    rowCard.appendChild(card);
  });
}

function troncaTitolo(titolo, lunghezzaMax) {
    lunghezzaMax = 25;
    if (titolo.length > lunghezzaMax) {
      return titolo.slice(0, lunghezzaMax) + "...";
    } else {
      return titolo;
    }
  }

  // Funzione per incrementare il contatore
function incrementaCounter(counterElement) {
    let valoreAttuale = parseInt(counterElement.innerText);
    counterElement.innerText = valoreAttuale + 1;
    calcolaTotaleCarrello();
  }
  
  // Funzione per decrementare il contatore
  function decrementaCounter(counterElement) {
    let valoreAttuale = parseInt(counterElement.innerText);
    if (valoreAttuale > 1) {
      counterElement.innerText = valoreAttuale - 1;
      calcolaTotaleCarrello();
    }
  }
  
  // Funzione per calcolare il totale del carrello
  function calcolaTotaleCarrello() {
    let elementiCarrello = document.querySelectorAll(".container-dati-item");
    let totale = 0;
    elementiCarrello.forEach(item => {
      let prezzo = parseFloat(item.querySelector('p:nth-of-type(2)').innerText); // Assumendo che il secondo p sia il prezzo
      let quantita = parseInt(item.querySelector('.container-contatore-carrello:nth-of-type(2) p').innerText); // Assumendo la struttura attuale, potrai aggiustare i selettori in base all'HTML finale.
      totale += prezzo * quantita;
    });
    document.getElementById("totaleCarrello").innerText = totale.toFixed(2) + " €";
  }

  function aggiungiAlCarrello(libro) {
    // Prima di creare un nuovo elemento, controlla se esiste già un articolo con lo stesso asin nel carrello
    let elementoEsistente = Array.from(document.querySelectorAll('.container-dati-item')).find(item => {
      return item.dataset.asin === libro.asin;
    });
  
    if (elementoEsistente) {
      // Se l'elemento esiste già, incrementa semplicemente il counter
      let counter = elementoEsistente.querySelector('.container-counter-carrello .container-contatore-carrello:nth-of-type(2) p');
      incrementaCounter(counter);
      calcolaTotaleCarrello();
      // Mostra il badge "checked-carrello"
        let checkedItemAggiunto = elementoEsistente.querySelector('.checked-carrello');
        if (checkedItemAggiunto) {
            checkedItemAggiunto.style.display = "block";
        }
    } else {
      // Altrimenti, crea un nuovo elemento nel carrello
      let containerDatiItem = document.createElement("div");
      containerDatiItem.classList.add("container-dati-item");
      // Aggiungiamo l'asin come attributo data per identificarlo facilmente
      containerDatiItem.dataset.asin = libro.asin;
  
      let imgCarrello = document.createElement("img");
      imgCarrello.src = libro.img;
      imgCarrello.alt = libro.title;
      imgCarrello.classList.add("img-carrello");
  
      let titoloCarrello = document.createElement("p");
      titoloCarrello.innerText = troncaTitolo(libro.title, 15)
      titoloCarrello.title = libro.title
  
      let prezzoCarrello = document.createElement("p");
      prezzoCarrello.innerText = libro.price.toFixed(2) + " €";
  
      let containerCounterCarrello = document.createElement("div");
      containerCounterCarrello.classList.add("container-counter-carrello")
  
      let containerMeno = document.createElement("div");
      containerMeno.classList.add("container-contatore-carrello")
      containerMeno.id = "meno"
      let containerCounter = document.createElement("div");
      containerCounter.classList.add("container-contatore-carrello")
      let containerPiù = document.createElement("div");
      containerPiù.classList.add("container-contatore-carrello")
      containerPiù.id = "più"
  
      let meno = document.createElement("p");
      let più = document.createElement("p");
      let counter = document.createElement("p");
      meno.innerText = "-";
      più.innerText = "+";
      counter.innerText = "1";

      let cestinoCarrello = document.createElement("ion-icon")
      cestinoCarrello.name = "trash-bin"
      cestinoCarrello.classList.add("cestino")

      cestinoCarrello.addEventListener("click", () => {
        // Rimuovi l'elemento dal DOM
        containerDatiItem.remove();
        // Aggiorna il totale
        calcolaTotaleCarrello();
    });

      meno.addEventListener("click", () => decrementaCounter(counter));
      più.addEventListener("click", () => incrementaCounter(counter));
  
      containerItemCarrello.appendChild(containerDatiItem);
      containerDatiItem.appendChild(imgCarrello);
      containerDatiItem.appendChild(titoloCarrello);
      containerDatiItem.appendChild(prezzoCarrello);
      containerDatiItem.appendChild(containerCounterCarrello);
      containerDatiItem.appendChild(cestinoCarrello)
      containerCounterCarrello.appendChild(containerMeno);
      containerMeno.appendChild(meno);
      containerCounterCarrello.appendChild(containerCounter);
      containerCounter.appendChild(counter);
      containerCounterCarrello.appendChild(containerPiù);
      containerPiù.appendChild(più);
  
      calcolaTotaleCarrello();
      let card = document.querySelector(`.card[data-asin="${libro.asin}"]`);
        if (card) {
            let checkedItemAggiunto = card.querySelector(".checked-carrello");
            if (checkedItemAggiunto) {
                checkedItemAggiunto.style.display = "block";
            }
        }
    }
  }
  

tastoRicerca.addEventListener("click", () => {
  let query = inputRicerca.value.toLowerCase();
  let url = baseUrl + query;
  console.log(url);

  containerCard.innerHTML = "";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      mostraLibri(data), console.log(data);
    })
    .catch((err) => console.log("Errore: ", err));
  document.getElementById("inputRicerca").value = "";
  document.getElementById("containerCard").value = "";
});

chiudiCarrello.addEventListener("click", () => {
  modale.style.display = modale.style.display === "block" ? "none" : "block";
});
document.getElementById("carrelloNav").addEventListener("click", ()=> {
  modale.style.display = "block"
})

});
