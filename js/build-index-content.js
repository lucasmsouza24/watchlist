for (let i = 0; i < 5; i++) {
    let box = createBoxElement("Séries");
    for (let j = 0; j < 5; j++) {
        let card = createCard("Fumetsu no Anata E", "./img/data/poster/exemple-poster.jpg");
        let content = box.childNodes[1];
        
        // add element to content
        content.appendChild(card);
    }
    display_container.appendChild(box);
}