for (let i = 0; i < 5; i++) {
    let box = createBoxElement("Séries");
    for (let j = 0; j < 5; j++) {
        let card = createCard("Fumetsu no Anata E", "./upload/example-poster.jpg");
        let content = box.childNodes[1];
        let redirect = `redirectTitle(${j})`;
        card.setAttribute("onclick", redirect);
        
        // add element to content
        content.appendChild(card);
    }
    display_container.appendChild(box);
}