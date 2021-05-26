let types = ["anime", "movie", "tvserie"];
let label = ["Animes", "Filmes", "Séries"];

for (let i = 0; i < types.length; i++) {
    let box = createBoxElement(label[i]);

    fetch(`media/last?type=${types[i]}&length=5`, {
        method: "GET"
    }).then(result => {
        result.json().then(data => {
            for (let j = 0; j < data.length; j++) {
                console.log(data[j])
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