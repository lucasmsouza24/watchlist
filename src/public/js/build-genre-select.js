fetch("/leituras/genres", {
    method: "GET"
})
.then(response => {
    response.json().then(data => {
        // console.log(data);

        for (let i = 0; i <= data.length - 1; i++) {
            // console.log(data[i]);

            idGenre.innerHTML += `<option value="${data[i].pk_genre}">${data[i].name}</option>`
        }
    })
})