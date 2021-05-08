// return a element with tag, class name and innerHTML defined
function createCompleteElement(tagType, className, innerHTML) {
    let element = document.createElement(tagType);
    element.setAttribute("class", className);
    element.innerHTML = innerHTML;

    return element;
}

// return a box component
function createBoxElement(title) {
    // building elements
    let boxElement = createCompleteElement("div", "box-container lg", "");
    let titleElement = createCompleteElement("h1", "box-container-title", title);
    let contentElement = createCompleteElement("div", "box-content", "");

    // append elements
    boxElement.appendChild(titleElement);
    boxElement.appendChild(contentElement);

    return boxElement;
}

// return a card box component
function createCard(title, src_img) {
    // building elements
    let cardElement = createCompleteElement("div", "card", "");
    let imgElement = createCompleteElement("img", "card-post", "");
    let titleElement = createCompleteElement("div", "card-title", title);
    
    imgElement.setAttribute("src", src_img);

    // append elements
    cardElement.appendChild(imgElement);
    cardElement.appendChild(titleElement);

    return cardElement;
}  