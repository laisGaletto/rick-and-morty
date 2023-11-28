 async function search() {
    try {
      let url = await fetch(
        "https://rickandmortyapi.com/api/character/?name=" + inpSearch.value
      );

      let dadosSearch = await url.json();

      for (let i of dadosSearch.results) {
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
    } catch (err) {
      resultsContainer.innerHTML =
        "<div class='not-found'>Personagem não encontrado</div>";
    }
  }
  //Chama a função Search
  search();
});
