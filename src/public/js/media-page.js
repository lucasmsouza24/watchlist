// var global para controle de insert/update
let temAvaliacao = false
let iduser = null;

// adicionando valor no input "episódios assistidos"
function add1_ep(max) {
    let eps = idEpValue.value;

    if (eps < max) {
        idEpValue.value = ++eps;
    }
}

// preenchendo parte dinamica do site
let params = new URLSearchParams(document.location.search.substring(1));
let idmedia = params.get("idmedia");
// console.log(idmedia)

fetch(`/media/single?idmedia=${idmedia}`, {
    method: "GET"
})
.then(function (response) {
    if (response.ok) {
        response.json().then(function (dadosMedia) {
            // tratamento dos dados
            let data = dadosMedia[0];
            // console.log(data);

            titleType.innerHTML = data.type;
            titleGenre.innerHTML = data.genre_name;
            titleYear.innerHTML = data.since_year;
            titleImg.setAttribute("src", "./upload/" + data.banner_url);
            titleTitle.innerHTML = data.title;
            titleTextSynopsis.innerHTML = data.synopsis;
            idMaxEp.innerHTML = data.total_eps;
            idEpValue.setAttribute("max", data.total_eps);
            titleMaxEp.setAttribute("onclick", `add1_ep(${data.total_eps})`);
        })
    }
})
.catch(function (error) {
    console.log("error: ", error.message);
});

// preenchendo a pontuação média
fetch(`/media/getAverageScore?idmedia=${idmedia}`, {
    method: "GET"
}).then(response => {
    response.json().then(data => {
        if (data.avgscore == null) {
            idScoreValue.innerHTML = "Sem Nota"
        } else {
            idScoreValue.innerHTML = Number(data.avgscore).toFixed(1)
        }
    })
})

// verificando se o usuário está logado
if (localStorage.getItem("watchlist_user") === null) {
    // deslogado
    // console.log("deslogado")
} else {
    // logado
    // console.log("logado")
    iduser = JSON.parse(localStorage.getItem("watchlist_user")).pk_user;

    inputUser.value = iduser
    inputMedia.value = idmedia

    // console.log("id", iduser)
    fetch(`/media/getAvaliacao?idmedia=${idmedia}&iduser=${iduser}`, {
        method: "GET"
    })
    .then(result => {
        result.json().then(data => {
            // console.log(data)
            if (data.length == 0) {
                // nao ta na lista
            } else {
                temAvaliacao = true;
                // ta na lista
                let array = data[0]
                // console.log(array);

                // atribuindo valores dinamicamente
                idEpValue.value = array.eps_assistidos;

                // definindo situação
                let sit = ["watching", "plan-to-watch", "complete", "droped"];

                for (let i = 0; i < sit.length; i++) {
                    if (array.situation == sit[i]) {
                        idTitleSituation.value = i
                    }
                }

                // definindo nota individual
                for (let i = 0; i <= 10; i++) {
                    if(array.score == i) {
                        idScore.value = i;
                    }
                }
            }
        })
    })
}

function getJsonReq() {

    let sit = ["watching", "plan-to-watch", "complete", "droped"];

    
    const fd = new FormData(idForm);
    const bodyObj = {}
    
    
    fd.forEach(function (value, key) {
        bodyObj[key] = value;
    })
    
    for (let i = 0; i < sit.length; i++) {
        if (i == idTitleSituation.value) {
            bodyObj.situation = sit[i];
            // console.log(i)
        }
    }

    bodyObj.iduser = iduser
    bodyObj.idmedia = idmedia
    // const body = JSON.stringify(bodyObj);
    // console.log(body)
    return bodyObj;
}

// adicionando à lista
function atualize() {
    const b = getJsonReq();
    console.log(b);
    // console.log(json);
    // console.log(temAvaliacao)
    if(!temAvaliacao) {
        fetch(`/media/addAvaliacao?score=${b.score}&situation=${b.situation}&eps_assistidos=${b.eps_assistidos}&iduser=${b.iduser}&idmedia=${b.idmedia}`, {
            method: "GET",
        }).then(function (response) {
            response.json().then(function (data) {
                console.log(data);
            })
        })
    } else {
        fetch(`/media/updateAvaliacao?score=${b.score}&situation=${b.situation}&eps_assistidos=${b.eps_assistidos}&iduser=${b.iduser}&idmedia=${b.idmedia}`, {
            method: "GET",
        }).then(function (response) {
            response.json().then(function (data) {
                console.log(data);
            })
        })
    }

    window.location.reload();
}

// comentarios

function createComment(nick, text) {
    return `
    <div class="comment-card">
        @<span class="comment-nick">${nick}</span> <br><br> 
        <div class="comment-text">
            ${text}
        </div>
    </div>
    `
}

fetch(`/media/getComments?idmedia=${idmedia}`, {
    method: "GET"
}).then(response => {
    response.json().then(data => {
        if (data.length > 0) {
            divCommentContent.innerHTML = ""
            for (let i = 0; i <= data.length - 1; i++) {
                // console.log(data);
                divCommentContent.innerHTML += createComment(data[i].nick, data[i].comment_text)
            }
        }
    })
})