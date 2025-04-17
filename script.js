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
// Crear una nova array de pokemons amb nomes les propietats id i name.

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

// Utilitzo .map() per iterar dins de cada pokemon de l'array(POKEMONS) i crear
// una nova array. Faig una funció que hem retorna només la ID i el Name
// de l'objecte de l'array.

// els {} serveixen per fer el destructuring, per entrar a l'objecte i triar
// només la part que vull. Els : són per dir què té cada caracteristica nova
// dels objectes a la nova array, en aquest cas id: i name: i els hi assigno
// un valor POKEMON.id i POKEMON.name perquè vull recuperar
// els de l'array anterior.
const idAndName = POKEMONS.map(({id, name}) => ({id, name}));
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
