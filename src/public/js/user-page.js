
function redirectTitle(id) {
    window.location.href = `http://localhost:3000/title.html?idmedia=${id}`
}

function redirectAddObra() {
    window.location.href = `http://localhost:3000/add-obra.html`;
}

// const Chart = require('Chart.js')

function getout() {
    localStorage.clear();
    window.location.href = "index.html";
}

let user = JSON.parse(localStorage.getItem("watchlist_user"))
let iduser = user.pk_user

// console.log(iduser)
let qtdSeries = 0
let qtdFilmes = 0
let qtdAnimes = 0

idEmail.innerHTML = user.email;
idUsername.innerHTML = user.nick;

fetch(`/media/getMylist?iduser=${iduser}`, {
    method: "GET"
}).then(response => {
    response.json().then(dataJson => {
        // console.log(data)
        idQtdObras.innerHTML = dataJson.length
        for(let i = 0; i < dataJson.length; i++) {
            // console.log(dataJson[i])
            // verificando categorias preferidas
            if(dataJson[i].type == "movie") {
                ++qtdFilmes;
            } else if (dataJson[i].type == "tvserie") {
                ++qtdSeries;
            } else {
                ++qtdAnimes;
            }

            // renderizando cards
            if(dataJson[i].situation == "watching") {
                // add watching
                idBoxWatching.innerHTML += `
                <div class="card" onclick="redirectTitle(${dataJson[i].pk_media})">
                    <img class="card-post" src="../upload/${dataJson[i].banner_url}">
                    <div class="card-title">${dataJson[i].title}</div>
                </div>
                `
                idnoitensWatching.style.display = "none"
            } else if (dataJson[i].situation == "plan-to-watch") {
                // add plan to watch
                idBoxPlanToWatch.innerHTML += `
                <div class="card" onclick="redirectTitle(${dataJson[i].pk_media})">
                    <img class="card-post" src="../upload/${dataJson[i].banner_url}">
                    <div class="card-title">${dataJson[i].title}</div>
                </div>
                `
                idnoitensPlanToWatch.style.display = "none"
            } else if (dataJson[i].situation == "complete") {
                // add complete
                idBoxComplete.innerHTML += `
                <div class="card" onclick="redirectTitle(${dataJson[i].pk_media})">
                    <img class="card-post" src="../upload/${dataJson[i].banner_url}">
                    <div class="card-title">${dataJson[i].title}</div>
                </div>
                `
                idnoitensComplete.style.display = "none"
            } else {
                // add droped
                idBoxDroped.innerHTML += `
                <div class="card" onclick="redirectTitle(${dataJson[i].pk_media})">
                    <img class="card-post" src="../upload/${dataJson[i].banner_url}">
                    <div class="card-title">${dataJson[i].title}</div>
                </div>
                `
                idnoitensDroped.style.display = "none"
            }
        }

        // montando gráfico
        const data = {
            labels: [
                'Filmes',
                'Séries',
                'Anime'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [qtdFilmes, qtdSeries, qtdAnimes],
                backgroundColor: [
                '#46276e',
                '#272e6e',
                '#6e2727'
                ],
                hoverOffset: 4
            }]
        };
        
        const config = {
            type: 'doughnut',
            data: data,
        };
        
        let ctx = document.querySelector("#idCanva");
        let myChart = new Chart(ctx, config);

    })
})