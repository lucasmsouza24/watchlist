// content box
let types = ["anime", "movie", "tvserie"];
let label = ["Animes", "Filmes", "Séries"];

for (let i = 0; i < types.length; i++) {
    let box = createBoxElement(label[i]);

    fetch(`media/last?type=${types[i]}&length=5`, {
        method: "GET"
    }).then(result => {
        result.json().then(data => {
            for (let j = 0; j < data.length; j++) {
                // console.log(data[j])
                let card = createCard(data[j].title, "./upload/" + data[j].banner_url);
                let content = box.childNodes[1];
                let redirect = `redirectTitle(${data[j].pk_media})`;
                card.setAttribute("onclick", redirect);
                
                // add element to content
                content.appendChild(card);
            }
            display_container.appendChild(box);
        })
    })
}

// tuto box
let user = localStorage.getItem("watchlist_user");
// console.log(user);

if (user == null) {
    buildTutoBox()
} 

function buildTutoBox() {

    let body = `
    <div class="box-container lg box-content">
        <div class="box-container-title">Funcionalidades exclusivas para usuários logados</div>

        <div class="box-content">
            <div class="card-tuto" onclick="redirectPage('login.html')">
                <p>Organize tudo que você assiste!</p><img src="./img/tuto-checklist.png">
            </div>

            <div class="card-tuto" onclick="redirectPage('login.html')">
                <p>Avalie Filmes, Séries e Animes!</p>

                <img src="./img/tuto-rating.png">
            </div>

            <div class="card-tuto" onclick="redirectPage('login.html')">
                <p>Faça um comentário sobre alguma obra!</p>

                <img src="./img/tuto-comment.png">
            </div>

            <div class="card-tuto" onclick="redirectPage('login.html')">
                <p>Adicione novas obras ao catálogo!</p>

                <img src="./img/tuto-add.png">
            </div>
        </div>
    </div>
    `;

    tutoBox.innerHTML = body;
}

function redirectPage(url) {
    window.location.href = 'http://localhost:3000/' + url;
}

function redirectTitle(id) {
    window.location.href = `title.html?idmedia=${id}`;
}