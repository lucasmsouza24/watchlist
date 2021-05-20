if (localStorage.getItem("watchlist_user") !== null) {
    // menu autenticado
    let user = JSON.parse(localStorage.getItem("watchlist_user"));
    console.log(user);

    idMenuBox.innerHTML = `
    <ul class="main-menu-ul">
        <li class="main-menu-item"><a href="index.html"><img src="./img/logotipo-watchlist.png" alt="watchlist logo"></a></li>
        <li class="main-menu-item main-menu-item-click"><a href="#">Filmes</a></li>
        <li class="main-menu-item main-menu-item-click"><a href="#">Séries</a></li>
        <li class="main-menu-item main-menu-item-click"><a href="#">Animes</a></li>
        <li class="main-menu-item main-menu-item-click margin-left"><a href="#">Sobre</a></li>
        <li class="main-menu-item main-menu-item-click main-menu-item-entre"><a href="./user-page.html">@${user.nick}</a></li>
    </ul>
    `;
    // console.log("auth");
} else {
    // menu nnão autenticado
    idMenuBox.innerHTML = `
    <ul class="main-menu-ul">
        <li class="main-menu-item"><a href="index.html"><img src="./img/logotipo-watchlist.png" alt="watchlist logo"></a></li>
        <li class="main-menu-item main-menu-item-click"><a href="#">Filmes</a></li>
        <li class="main-menu-item main-menu-item-click"><a href="#">Séries</a></li>
        <li class="main-menu-item main-menu-item-click"><a href="#">Animes</a></li>
        <li class="main-menu-item main-menu-item-click margin-left"><a href="#">Sobre</a></li>
        <li class="main-menu-item main-menu-item-click main-menu-item-entre"><a href="./login.html">Entrar</a></li>
        <li class="main-menu-item main-menu-item-click"><a href="sign-up.html">Cadastrar</a></li>
    </ul>
    `;
    // console.log("not auth");
}