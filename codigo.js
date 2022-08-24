const apiUrl = "https://breakingbadapi.com/api/"


// const fakeQuotes = [
//     {
//         quote: "Lorem eu eiusmod deserunt ut reprehenderit est commodo ea elit ut nostrud labore aliquip.",
//         author: "Nombre de autor 4",
//         id: 1
//     },
//     {
//         quote: "Ullamco cillum cupidatat sit ullamco cupidatat mollit cupidatat dolore irure reprehenderit non nulla eu.",
//         author: "Nombre de autor 5",
//         id: 2
//     },
//     {
//         quote: "Ea ea laborum enim excepteur dolore eu.",
//         author: "Nombre de autor 1",
//         id: 3
//     },
//     {
//         quote: "Dolore aute adipisicing dolore excepteur ipsum do ad aute.",
//         author: "Nombre de autor 2",
//         id: 4
//     },
//     {
//         quote: "Laborum occaecat nisi labore fugiat cillum qui veniam.",
//         author: "Nombre de autor 3",
//         id: 5
//     },
// ]


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



function displayQuotes( data ) {

    console.log("display", data);
    
    data.forEach( createAppendQuote )

}

function createAppendQuote( quote ){
    
    const body = document.querySelector("body")
    
    const quoteBox = createQuoteHTML(quote)
    
    body.append(quoteBox)
    
}

function createQuoteHTML( quote ) {

    const quoteBox = document.createElement("blockquote")
    const textBox =  document.createElement("p")
    const authorBox =  document.createElement("p")

    textBox.innerHTML = quote.quote
    authorBox.innerHTML = quote.author

    quoteBox.append( textBox )
    quoteBox.append( authorBox )

    quoteBox.classList.add("quote")

    return quoteBox

}




doQuery("quotes", displayQuotes )
doQuery("characters")
doQuery("episodes")




console.log("Consulta API")