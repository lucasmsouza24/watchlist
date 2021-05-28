let params = new URLSearchParams(document.location.search.substring(1));
let type = params.get("type");

console.log(type);
let label = "";

if(type == "anime") {
    label = "Animes";
} else if (type == "movie") {
    label = "Filmes";
} else if (type == "tvserie") {
    label = "Séries"
}

let box = createBoxElement(label);

fetch(`/media/category?type=${type}`, {
    method: "GET"
}).then(result => {
    result.json().then(data => {

        for (let j = 0; j < data.length; j++) {
            let obra = data[j]
            // console.log(j)
            // console.log(obra)
            let card = createCard(obra.title, "./upload/" + obra.banner_url);
            let content = box.childNodes[1];
            let redirect = `redirectTitle(${obra.pk_media})`;
            card.setAttribute("onclick", redirect);
            
            // add element to content
            content.appendChild(card);
        }
        display_container.appendChild(box);
    })
})