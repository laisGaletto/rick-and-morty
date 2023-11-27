const characterCard = document.getElementById('character-card');
const characterImage = document.getElementById('character-image');

const fetchRandomCharacter = async () => {
    const response = await fetch('https://rickandmortyapi.com/api/character/');
    const data = await response.json();
    const randomCharacter = data.results[Math.floor(Math.random() * data.results.length)];
    return randomCharacter;
};
const handleDislike = async () => {
    console.log('Dislike button clicked');
    const character = await fetchRandomCharacter();
    setCharacterData(character);
};

const handleLike = async () => {
    console.log('Like button clicked');
    const character = await fetchRandomCharacter();
    setCharacterData(character);
};

const setCharacterData = (character) => {
    characterImage.src = character.image;
};

window.onload = handleDislike;