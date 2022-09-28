function getEllapsedYears( date ) {

    const birthdayYear = moment( date, "dd-mm-yyyy").format("YYYY")
    const thisYear = moment().format("YYYY")

    const years = thisYear - birthdayYear
   
    return years
}

function formatCharacter( character ) {
    return {
        id: character.char_id,
        name: character.name,
        nickname: character.nickname,
        image: character.img,
        age: getEllapsedYears( character.birthday ),
        occupations: character.occupation, 
    }
}

function populateTemplate( character ) {

    const characterBox = document.querySelector(".character-detail")

    const nameBox =  characterBox.querySelector(".name")
    const nicknameBox =  characterBox.querySelector(".nickname")
    const img =  characterBox.querySelector(".image img")
    const ageBox =  characterBox.querySelector(".age")
    const occupationsBox =  characterBox.querySelector(".occupations")
    
    nameBox.innerHTML = character.name
    nicknameBox.innerHTML = character.nickname
    ageBox.innerHTML = character.age

    img.setAttribute("src", character.image )

    const occupationsList = occupationsBox.querySelector("ul")
    occupationsList.innerHTML = ""

    character.occupations.forEach(function(occupation) {
        const newLi = document.createElement("li")
        newLi.innerHTML = occupation
        occupationsList.append(newLi)
    })
    
    }

function displayCharacter( data ) {

    const character = data[0]
    const formattedCharacter = formatCharacter( character )

    populateTemplate( formattedCharacter)
    
}

doQuery("characters/3", displayCharacter )