let params = new URLSearchParams(document.location.search.substring(1));
let urlSearch = params.get("search");
// urlSearch = urlSearch.replace(" ", "+")
console.log(urlSearch)

// console.log(params)
let searchComplete = urlSearch.replace("+", " ")
let box = createBoxElement(`Pesquisa para "${searchComplete}"`);

fetch(`/media/mediaSearch?search=${urlSearch}`, {
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