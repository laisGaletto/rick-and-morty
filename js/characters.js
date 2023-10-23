/* Verifica se houve scroll na página e coloca fundo menu preto */
let menu = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 550) {
    menu.style.cssText =
      "background-color: rgba(0, 0, 0, 1); transition: 0.5s;";
  } else {
    menu.style.cssText =
      "background-color: rgba(0, 0, 0, 0.5); transition:0.5s;";
  }
});

/*Inicia Páginação*/

let page = 1;
let prev = document.querySelector("#prev");
let next = document.querySelector("#next");
let atual = document.querySelector("#atualPage");
let resultsContainer = document.querySelector("#caracters");

prev.addEventListener("click", () => {
  if (page > 1) {
    page--;
    localStorage.setItem("pagina", page);
    getData();
  }
});

next.addEventListener("click", () => {
  page++;
  localStorage.setItem("pagina", page);
  console.log(localStorage.getItem("pagina"));
  getData();
});

/*Ordenação*/

let ordernacao = "default";
let ord = document.querySelector("#select");
let btn = document.querySelector("#button");

btn.addEventListener("click", () => {
  resultsContainer.innerHTML = "";
  ordernacao = ord.value;
  getData();
});

if (ordernacao == "default") {
  getData();
}

async function getData() {
  let pageAtual = localStorage.getItem("pagina");
  let info = await fetch(
    "https://rickandmortyapi.com/api/character/?page=" + pageAtual
  );
  let dados = await info.json();

  // Limpa apenas o conteúdo dentro do elemento de resultados
  resultsContainer.innerHTML = "";

  if (ordernacao == "AZ") {
    dados.results.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      } else {
        ordernacao = "AZ";
        return true;
      }
    });
  } else if (ordernacao == "ZA") {
    dados.results.sort(function (a, b) {
      if (a.name > b.name) {
        return -1;
      } else {
        ordernacao = "ZA";
        return true;
      }
    });
  }

  for (let i of dados.results) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
            <img src="${i.image}" alt="${i.name}"<br> 
            <h3>${i.name}</h3>
            <h4 class="status">${i.status}</h4>
            <p> 👽 ${i.species}  ⚧️${i.gender} </p> 
                <p> 🌎 ${i.location.name}  </p>
            `;
    newDiv.classList.add("card-caracters");
    resultsContainer.appendChild(newDiv);
  }

  prev.innerHTML = `← Página Anterior ${pageAtual - 1}`;
  next.innerHTML = `Próxima Página  ${Number(pageAtual) + 1} →`;
  atual.innerHTML = `<div class="pagina-atual"> ${pageAtual}`;

  if (pageAtual == 1) {
    prev.style.display = "none";
  } else {
    prev.style.display = "block";
  }

  if (pageAtual == 42) {
    next.style.display = "none";
  } else {
    next.style.display = "block";
  }
}

getData();
