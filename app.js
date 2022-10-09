    //creating flex container for info
    const flexContainer = document.createElement("div")
    flexContainer.id = "flex-container"
    flexContainer.style.display = "flex"
    document.body.appendChild(flexContainer)
    
    

const name = document.querySelector("#hero-name")
const idButton = document.querySelector("#search-hero")
const infoButton = document.querySelector("#get-bio")
const idOutput = document.querySelector("#hero-id")
let idValue = ""
const details = document.querySelector("#bio-details")

infoButton.addEventListener("click", () => {
getHeroInfo(idValue);
})

async function getHeroInfo(id) {
  
  try {
    const response = await fetch(`https://www.superheroapi.com/api.php/10104673739575338/${id}`, {
      method: 'GET'
    })
  
    const data = await response.json()
    console.log(Object.keys(data.biography))
    const biography = data.biography;

    const textContainer = document.createElement("div")
    textContainer.id = "text-container"
    textContainer.style.cssText = `
    background-color : black;
    color : white;
    border-radius : 5px;
    padding : 15px;
    margin-right : 10px;
    margin-top: 10px;`
    document.getElementById("flex-container").appendChild(textContainer)
  
    const heroName = document.createElement("div")
    heroName.id = "real-name"
    heroName.className = "text"
    heroName.textContent = `Real Name: ${biography["full-name"]}`
    document.getElementById("text-container").appendChild(heroName)
  
    
    const homeTown = document.createElement("div")
    homeTown.id = "birthplace"
    homeTown.className = "text"
    homeTown.textContent = `Place of Birth: ${biography["place-of-birth"]}`
    document.getElementById("text-container").appendChild(homeTown)
  
    
    const aliases = document.createElement("div")
    aliases.id = "known-aliases"
    aliases.className = "text"
    aliases.textContent = `Known Aliases: ${biography["aliases"]}`
    document.getElementById("text-container").appendChild(aliases)
    
  
    const image = document.createElement("img")
    image.id = "hero-image"
    image.src = data.image.url
    document.getElementById("flex-container").appendChild(image)
    
    
      }
  
  catch (err) {
    console.error(err)
  }
}
idButton.addEventListener("click", () => {
  getHeroId(name.value)
 
  const realName = document.getElementById("real-name")
  if(realName) {
   realName.remove()
 }
  const birthplace = document.getElementById("birthplace")
  if(birthplace) {
    birthplace.remove()
  }
  
  const aliases = document.getElementById("known-aliases")
  if(aliases) {
    aliases.remove()
  }
  const image = document.getElementById("hero-image") 
  if(image) {
      image.remove()
  }

  const textContainer = document.getElementById("text-container")
  if(textContainer) {
    textContainer.remove()
  }
  
})

async function getHeroId(name) {
  console.log(name)
  try {
    const response = await fetch(`https://www.superheroapi.com/api.php/10104673739575338/search/${name}`, {
      method: 'GET'
    })
    const data = await response.json()
    if (data === 'undefined') {
      throw new Error ("This Superhero was not found - try alternate spelling");
  }
    
    idValue = data.results[0].id
    console.log(idValue);
    idOutput.textContent = `${name}'s ID: ${idValue}`;
  
  }
  catch (err) {
    console.log(`Error: ${err.message}`);
  }
}
