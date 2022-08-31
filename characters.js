let currentOffset = 0
let elementsPerPage = 3


const apiUrl = "https://breakingbadapi.com/api/"



function doQuery( url, displayFunction ){
 
    // mandamos una solicitud y obtenemos una promesa
    const request = fetch( apiUrl + url )


    // esperar a que resuelva la promesa
    request.then( function(response) {

        // info sobre nuestra respuesta
        console.log("response", response)

        // extraer 'cuerpo' de respuesta
        response.json().then( function(data) {
            console.log("data", data)

            if( typeof displayFunction == "function" ) {                
                displayFunction( data )
            }

        })
        
    })

    console.log( "request", request )

}


function formatCharacter( character ) {
    return {
        id: character.char_id,
        name: character.name,
        nickname: character.nickname,
        image: character.img
    }
}

function displayCharacters( data ) {

    console.log("display", data);

    const formattedCharacters = data.map( formatCharacter ) 

    formattedCharacters.forEach( createAppendCharacter )

}


function openElement( event ) {
    const el = event.target
    console.log( "id", el.getAttribute("data-id") )
}


function setupInteraction( element ) {
    element.addEventListener("click", openElement )
}


function createAppendCharacter( character ){
    
    const container = document.querySelector("#characters")
    
    const characterBox = createCharacterHTML(character)
    
    setupInteraction( characterBox ) 

    container.append(characterBox)
    
}

function createCharacterHTML( character ) {

    const model = document.querySelector(".character.model")
    const characterBox = model.cloneNode( true )
    characterBox.classList.remove("model")
    
    const nameBox =  characterBox.querySelector(".name")
    const nicknameBox =  characterBox.querySelector(".nickname")


    const img =  characterBox.querySelector(".image img")

    

    nameBox.innerHTML = character.name
    nicknameBox.innerHTML = character.nickname

    img.setAttribute("src", character.image )
    
    characterBox.setAttribute("data-id", character.id )

    // characterBox.append( textBox )
    // characterBox.append( nicknameBox )

    characterBox.classList.add("character")

    return characterBox

}


function loadMore() {

    doQuery("characters?limit="+elementsPerPage+"&offset="+currentOffset, displayCharacters )

    currentOffset += elementsPerPage

}


function setupPagination() {
    const btn = document.querySelector("#load-more")
    btn.addEventListener("click", loadMore )
}

function windowScroll() {

    console.log( "scroll y", window.scrollY, window.innerHeight )
    
    const container = document.querySelector("#characters")
    console.log( "container height", container.clientHeight )


    if( window.scrollY > container.clientHeight - window.innerHeight ) {
        loadMore()
    }

}

function setupInfiniteScroll() {
    window.addEventListener("scroll", windowScroll)
}


setupPagination()
setupInfiniteScroll()


// doQuery("characters?limit=6&offset="+currentOffset, displayCharacters )
loadMore()





console.log("Consulta API")