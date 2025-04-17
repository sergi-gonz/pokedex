/*
 MODEL POKEMON
 {
  id: number,
  name: string,
  is_baby: boolean
  base_happiness: number,
  capture_rate: number,
  flavor_text_entries: [
    flavor_text: string,
    language: {
      name: string,
      url: string
    },
    version: {
      name: string,
      url": string
    }
  ]
 }
*/

console.log(POKEMONS);

// EXERCICI 1: 
// Crear una nova array de pokemons amb nomes les propietats id i name.  qque no es mostrin la resta de merdes de l'array original 

// EXERCICI 2:
// Ordenar la array creada anteriorment alfabeticament.

// EXERCICI 3:
// Extreure els pokemons que tinguin una ID parell i guardar-los a una nova array.

// EXERCICI 4:
// Extreure un pokemon aleatori (usant random entre min i max) de la array de l'exercici anterior, buscar-lo dins de la array original i recuperar-lo.

// EXERCICI 5: 
// Usant destructuring, agafar les propietats del pokemon anterior i mostrar-les per consola.

// EXERCICI 6:
// Usant fetch, recuperar la informacio del pokemon anterior usant l'endpoint "https://pokeapi.co/api/v2/pokemon/{id}" i mostrar la seva fitxa a index.html.


//EXERCICI 1
const idAndName = POKEMONS.map(function(POKEMON){ // utilitzo .map() per iterar dins de cada pokemon de l'array(POKEMONS) i crear una nova array. Faig una funció que hem retorna només la ID i el Name de l'objecte de l'array.
  return {id: POKEMON.id, name: POKEMON.name}; // els {} serveixen per fer el destructuring, per entrar a l'objecte i triar només la part que vull. Els : són per dir què té cada caracteristica nova dels objectes a la nova array, en aquest cas id: i name: i els hi assigno un valor POKEMON.id i POKEMON.name perquè vull recuperar els de l'array anterior.
});
console.log(idAndName);

//EXERCICI 2 
const alphabetically = idAndName.sort(function(a, b){ // sort() s'utilitza per ordenar elements dins una array(modifica l'array original) per fer-ho fa servir una funció de comparació per saber com ordenar-los.
  if (a.name < b.name){                               // alfabeticament la consola enten que A és el més petit i Z el més gran.                                   
    return -1;                                        // si el valor que retorna és negatiu(falç), a es posa davant de b.
  }
  if (a.name > b.name){
    return 1;                                        // si el valor que retorna és positiu(verdader), b es posa davant de a. 
  }
  return 0;                                          // si és 0, l'ordre de a i b és manté igual. 
});
console.log(alphabetically);

// amb localeCompare m'estalvio els if's, ja que ja ho fa la funció en si, de fet méss eficientment. 
//const alphabetically = idAndName.sort(function(a, b) {
//  return a.name.localeCompare(b.name);
//});
//console.log(alphabetically);

//EXERCICI 3
const idPair = idAndName.filter(function(pokeNumb){ // filter() permet filtrar elements d'un array segons el què li diguis dins d'una funció. Com que vull només els de número parell, pillo les id's dels pokemons i li dic que només pilli els que siguin divisibles per 2.
  return pokeNumb.id % 2 === 0; //hem retorna una nova array només amb els pokemons que tenen les id's parells.
});
console.log(idPair);

//EXERCICI 4 
const min = 0;
const max = idAndName.length -1; // -1 perquè a les arrays sempre es comença al 0.

//Math.random genera un numero decimal aleatori entre 0 y 1(el 0 inclòs però l'1 no). per tant necessito que multipliqui el numero random generat entre el 0 i l'1 per el de la llista d'objectes (en aquest cas les id's).
//(max-min+1) asegura que el numero generat estigui dins el rang que vull , ja que si el min és 0 i el máx és 150, el +1 m'assegura que pillem els 151 pokemons de l'array 
//com que el resultat d'aquesta operació no serà sempre numeros sencers, necessito  algo que hem redondeji els numeros , per això faig servir la funció Math.floor , que converteix en sencer el numero que obtinguem, sempre cap al més baix. aixis asseguro que sigui un numero vàlid per fer-lo servir a l'array.  
function getRandom(min, max){ 
  const randomId = Math.floor(Math.random()*(max - min + 1));  
  return idAndName[randomId]; //utilizo els [] per accedir als elements dins l'array                                      
}                                                                   
                                                                   
const pokeRandom = getRandom(min, max);
console.log(pokeRandom); 

const originalPokemon = POKEMONS.find(function(pokemon){ // .find torna el primer element que compleixi les condicións que li posem a la funció. en aquest cas el que tingui la mateixa id dins l'array POKEMONS.
  return pokemon.id === pokeRandom.id;
});

console.log(originalPokemon);

//EXERCICI 5 

const {id, name, is_baby, base_happiness, capture_rate, flavor_text_entries: [{flavor_text, language:{name: nameA, url}}],flavor_text_entries, version} = originalPokemon; // com que originalPokemon és un objecte i no un array, no cal que entrem a POKEMONS i puc mostrar directament les propietats a la consola.
console.log(id, name, is_baby, base_happiness, capture_rate, flavor_text_entries, version);
//const [{flavor_text, language:{name: nameA, url}}] = flavor_text_entries;
console.log(flavor_text);
console.log(nameA, url);



//EXERCICI 6 
const button = document.createElement("button");
button.textContent = "poke pick";
button.addEventListener("click", function(event){
  const pokeRandom = getRandom(min, max);
  pokeFetch(pokeRandom.id);
})
document.body.append(button);

const container = document.createElement("div");
container.id = "poke-container";

document.body.append(container);

function pokeFetch(pokeId){
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`) // accedim a lAPI i li diem que volem la ID per trobar-lo. (utilizo el + per concatenar l'string de la URL amb el que vull trobar, en aquest cas la id de originalPokemon)
  .then(function(response) {
    if (!response.ok){   // el .ok , es un boolea , que en aquest cas ens diu si ha sigut correcte la promesa.
      return Promise.reject("no s'ha trobat el Pokemon amb la ID: "+ pokeId);
    }
    return response.json(); //me'l torna en forma d'objecte, amb totes les característiques
    // uninitzar docus: 
})
  .then(function(pokeInfo){
    console.log(pokeInfo);// ja tenim l'objecte, amb aqueta funció podem treballar amb les dades, posant un console.log(pokeInfo.name) la consola ens ensenyaria el nom del pokemon, i aixís amb totes les característiques de l'objecte.

    const pokeContainer = document.createElement("div");
    const pokeNumber1 = document.createElement("div");
    pokeNumber1.innerHTML = "<strong>Número:</strong>" + pokeInfo.id;
    pokeNumber1.classList.add("poke-info");
    pokeContainer.append(pokeNumber1);

    const pokeName1 = document.createElement("div");
    pokeName1.innerHTML = "<strong>Nom:</strong>" + pokeInfo.name;
    pokeName1.classList.add("poke-info");
    pokeContainer.append(pokeName1);

    const pokeType1 = document.createElement("div");
    pokeType1.classList.add("poke-info");
    let typesName = "<strong>Tipus:</strong> ";
    const typeNames = pokeInfo.types.map(function(typeObj) { //utilizto el .map per mapejar només els noms dins l'array.
      return typeObj.type.name;  
    });
    typesName += typeNames.join(", ");  //.join uneix els noms dels tipus amb una coma entre ells ja que li he espcificat que sigui una coma
    pokeType1.innerHTML = typesName;
    pokeContainer.append(pokeType1);
    
    const pokeAbilities = document.createElement("div");
    let abilitiesName = "<strong>Habilitats:</strong>";
    pokeAbilities.classList.add("poke-info");
    const abilities = pokeInfo.abilities.map(function(abilitieObj){
      return abilitieObj.ability.name;
    });
    abilitiesName += abilities.join(", ");
    pokeAbilities.innerHTML = abilitiesName;
    pokeContainer.append(pokeAbilities); 
    
    /*const pokeInfo1 = document.createElement("div");
    pokeInfo1.textContent = "Moviments: ";
    pokeInfo1.style.textDecoration = "underline";
    pokeInfo1.style.fontWeight = "bold"; 
    pokeContainer.append(pokeInfo1);

    pokeInfo.moves.forEach(function(movesObj){
      const pokeMoves = document.createElement("div");
      pokeMoves.textContent = movesObj.move.name;
      pokeContainer.append(pokeMoves);
    }); hi ha masses moviments i hem sobresurt*/

    const baseExperience = document.createElement("div");
    baseExperience.innerHTML = "<strong>Experiència base:</strong>" + pokeInfo.base_experience;
    baseExperience.classList.add("poke-info");
    pokeContainer.append(baseExperience);

    const height = document.createElement("div");
    height.innerHTML = "<strong>Altura(Pulsades):</strong>" + pokeInfo.height;
    height.classList.add("poke-info");
    pokeContainer.append(height);

    const weight = document.createElement("div");
    weight.innerHTML = "<strong>Pes(lbs):</strong>" + pokeInfo.weight;
    weight.classList.add("poke-info");
    pokeContainer.append(weight);

    const sprites = document.createElement("img");
    sprites.src = pokeInfo.sprites.front_default;
    sprites.style.width = "300px";
    sprites.style.height = "300px";
    sprites.style.marginLeft = "45px";
    pokeContainer.append(sprites);

    container.innerHTML = pokeContainer.outerHTML;
  })
  .catch(function(error){
    console.error("alguna cosa ha fallat: ", error);
  });

  //Fetch és una funció que és fa servir per fer sol·licituts HTTP( GET , POST , PUT, DELETE) a servidors web y obtenir recursos. S'utilitza principalment per treballar amb API's i obternir dades desde un servidor, rollo text, imatges, objectes(JSON), entre d'altres.
  // el què fa és tornar una promesa(promise, un objecte que representa resultats d'una operació asincronica, una manera de treballar amb operacións que no s'executen instantàneament, rollo llegir un archiu, fer una solicitut a una Api o esperar una acció de l'usuari. Aquesta te varis conceptes, Pending(pendent)l'operació encara està en curs i no s'ha resolt; FullFilled(completada)et retorna un valor ja que s'ha completat el que demanes; Rejected(descartada)quan es produeix un error )
  // és pot fer servir amb .then o async/await per manipular el resultat un cop s'hagi completat.
  //.then es una fucnió associada a les promeses, s'utilitza per manipular/treballar amb els resultats de les promeses. Les pormeses poden ser exitoses o fallides en algún moment del futur. llavors then és per dir que ha de passar quan la promesa és correcte o succesfull o quan falla.
  // en el cas que fallés, s'utilitza la funció .catch(function(error)); El .then, és pot encadenar tantes vegades com vulguis, sempre que la promesa sigui exitosa.
  // pots fer diferents tipus de solicituts HTTP(endpoint) amb el fetch, Get(pillar dades del server); Post(enviar dades al server); Put(actualitzar dades del server); Delete(eleminiar dades del server).
  //ENDPOINT és una URL o punt d'accés a una API, que permet que diferents aplicacións o sistemes es comuniquin entre si, generalment a través de sol·licituts HTTP. És el lloc específic del servidor on s'envien les solicituts per accedir a recursos, dades o executar accións.
  // un exemple d'endpoint és "https://pokeapi.co/api/v2/pokemon/{id}", on li estem demanant la info d'un pokemon a partir de la ID ( el numero que te a la llista de pokemons).
}
pokeFetch(originalPokemon.id);

