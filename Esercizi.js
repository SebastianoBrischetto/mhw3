/*-----------------------------------------------------------
			variabili globali e event listener
-----------------------------------------------------------*/
// Numero massimo di esercizi caricati
const show_max=50;
// Aggiunge un eventListener al form
document.querySelector('form').addEventListener('submit', search)
/*-----------------------------------------------------------
		Funzione al ricevimento del json
-----------------------------------------------------------*/
function onJson(json) {
  // Svuotiamo il contenuto della libreria esercizi
  const library = document.querySelector('#exercise_library');
  library.innerHTML = '';
  // Leggi il numero di risultati
  const count = json.count;
  // Ciclo che legge ogni elemento ricevuto e lo aggiunge alla libreria esercizi
  for(let i=0;i<count;i++){
    let exercise=json.results[i];
	// Se il nome dell'esercizio contiene la stringa nella barra della ricerca lo carica sulla pagina
	if (exercise.name.toLowerCase().includes(document.querySelector('#name').value.toLowerCase())){
		// Crea un div
		const exercise_div = document.createElement('div');
		// Gli aggiunge classe courses_element
		exercise_div.classList.add('courses_element');
		// Aggiunge un eventListener al click che mostra/nasconde i dettagli
		exercise_div.addEventListener('click',details);
		// Crea un h1
		const name = document.createElement('h1');
		// Carica il nome dell'esercizio nel h1
		name.textContent = exercise.name;
		// Crea un div
		const exercise_description = document.createElement('div');
		// Aggiunge classe dettagli
		exercise_description.classList.add('details');
		// Aggiunge classe hidden per nascondere i dettagli
		exercise_description.classList.add('hidden');
		// Carica i dettagli sul div
		exercise_description.innerHTML = exercise.description;
		// Attacca al div exercise_div il nome e la descrizione
		exercise_div.appendChild(name);
		exercise_div.appendChild(exercise_description);
		// Attacca il div alla pagina
		library.appendChild(exercise_div);
	}
  }
}
/*-----------------------------------------------------------
						Funzione dettagli
-----------------------------------------------------------*/
function details(){
	const div_details=event.currentTarget.querySelector('.details');
	// Controllo dello stato (nascosto o meno)
	if(div_details.classList.contains('hidden')){
		// Se nascosto lo mostra
		div_details.classList.remove('hidden');
	}
	else {
		// Se mostrato lo nasconde
		div_details.classList.add('hidden');
	};
}
/*-----------------------------------------------------------
						Funzione alla risposta
-----------------------------------------------------------*/
function onResponse(response) {
  return response.json();
}
/*-----------------------------------------------------------
						Funzione invio form
-----------------------------------------------------------*/
function search(event)
{
  // Blocca l'invio del form
  event.preventDefault();
  // Imposta type con cio che e scritto nel menu tipo
  const type = document.querySelector('#tipo').value;
  // Se il type è zero non e stato selezionato un tipo e informa l'utente
  if(type==0){
	  alert('Selezionare il tipo di esercizio');
  }
  // Se il tipo è diverso da 0
  else{
		// Crea la richiesta
		url = 'https://wger.de/api/v2/exercise.json/?limit=' + show_max +'&language=2&category=' + type;
  // Esegui fetch con la richiesta
  fetch(url).then(onResponse).then(onJson);
  }
}


