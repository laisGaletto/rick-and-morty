async function fetchData() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();

    const characterContainer = document.getElementById('character-container');

    for (let i = 0; i < 3; i++) {
      const randomCharacter = data.results[Math.floor(Math.random() * data.results.length)];

      const card = document.createElement('div');
      card.classList.add('card');

      const bg = document.createElement('div');
      bg.classList.add('bg');

      const imageContainer = document.createElement('div');
      imageContainer.id = `image-container-${i}`;
      const imageElement = document.createElement('img');
      imageElement.src = randomCharacter.image;
      imageElement.alt = randomCharacter.name;
      imageContainer.appendChild(imageElement);

      const characterInfo = document.createElement('p');
      characterInfo.id = `character-info-${i}`;
      characterInfo.innerHTML = `Name: ${randomCharacter.name} <br> 
        Status: ${randomCharacter.status} <br> 
        Species: 👽 ${randomCharacter.species}`;

      bg.appendChild(imageContainer);
      bg.appendChild(characterInfo);

      const blob = document.createElement('div');
      blob.classList.add('blob');

      card.appendChild(bg);
      card.appendChild(blob);

      characterContainer.appendChild(card);
    }

  } catch (error) {
    console.error('Erro ao buscar dados da API:', error);
  }
}

fetchData();
