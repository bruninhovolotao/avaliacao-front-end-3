const cardsContainer = document.getElementById('card-list')

async function getCards(){
    try{

        cardsContainer.innerHTML = '';

        const response = await api.get('/character')

        const cards = response.data.results.slice(0, 6); // Limita o número de cards

        cards.forEach((card) => {
            const cardElement = document.createElement('div')
            cardElement.classList.add('card', 'mb-3', 'col-6')
            cardElement.innerHTML = `
                <div class="row g-0">
                        <div class="card-thumbnail col-md-4">
                            <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                <img src="${card.image}" class="img-fluid rounded-start" alt="...">
                            </a>
                        </div>
                    
                    <div class="col-md-8">
                        <div class="card-body">
                            <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><h5 id="name" class="card-title">${card.name}</h5></a>
                            <div class="card-characters">   
                               <p id="status" class="card-status"><i class="ri-circle-fill"></i></p><p id="species">${card.status} - ${card.species}</p> 
                            </div>
                            <div id="origin" class="card-locations">
                               <p class="card-title-gray">Última localização conhecida</p>
                               <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><p  class="card-response">${card.location.name}</p></a>
                            </div>
                            <div id="episode" class="card-episodes">
                               <p class="card-title-gray">Visto a última vez em:</p>
                               <a href="" data-bs-toggle="modal" data-bs-target="#exampleModal"><p  class="card-response">Episódio: #${card.episode[0].length}</p></a>
                            </div> 
                        </div>
                    </div>
                </div> `
            cardElement.addEventListener('click', () => openModal(card)); // insere o evento de click para abrir o modal
            cardsContainer.appendChild(cardElement)
                  
        });
        
        console.log(cards)

    } catch (error) {
        console.error('Erro ao buscar recados', error)
    }
}

getCards()

// CHAMADA PARA O MODAL

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
});

// FUNÇÃO PARA ABRIR O MODAL E CARREGAR OS DADOS

function openModal(character) {
    const modal = document.getElementById('exampleModal');
    document.getElementById('modal-title').textContent = character.name;
    document.getElementById('modal-image').src = character.image;
    document.getElementById('modal-status').innerHTML = character.status;
    document.getElementById('modal-species').textContent = character.species;
    document.getElementById('modal-location').textContent = character.location.name;
    document.getElementById('modal-episodes').textContent = `Episódio: ${character.episode.length}`;

}

openModal()
