// targeting the elements by ID
const movieList = document.querySelector("#films")
const poster = document.querySelector("#poster")
const title = document.querySelector("#title")
const runtime = document.querySelector("#runtime")
const description = document.querySelector("#film-info")
const showtime = document.querySelector("#showtime")
const ticketNumber = document.querySelector("#ticket-num")

// adding event listener to the button
const btn = document.querySelector("#buy-ticket")
btn.addEventListener('click', () => {
    ticketNumber.innerText = buyTickets(parseInt(ticketNumber.innerText,10))
})

// fetching films
function getMoviesData() {
    fetch("http://localhost:3000/films")
    .then(response => response.json())
    .then(data => {
        displayTitle(data)
        displayMovie(data[0])
        displayInfo(data[0])
    })
}
getMoviesData()

// looping throu the films
function displayTitle(filmsData) {
    filmsData.forEach(movie => {
        const movieTitle = document.createElement("li") // creating list
        movieTitle.className = "film item"
        movieTitle.innerText = movie.title
        movieList.append(movieTitle)
        movieTitle.addEventListener('click', () => { // adding event listener to the movie name
            displayMovie(movie)
            displayInfo(movie)
        })
    })
}

// movie image
function displayMovie(movieObj) {
    poster.src = movieObj.poster
}

// movie information
function displayInfo (movieObj) {
    title.innerText = movieObj.title
    runtime.innerText = movieObj.runtime + " minutes "
    description.innerText = movieObj.description
    showtime.innerText = movieObj.showtime
    ticketNumber.innerText = movieObj.capacity - movieObj.tickets_sold + " remaining tickets "
}

// ticket numbers available
function buyTickets(numOfTickets){
    numOfTickets -= 1
    if(numOfTickets > 0) {
        return numOfTickets + " remaining tickets "
    }
    else {
        return "sold out"
    }
}