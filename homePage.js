window.onscroll = function(){myfunction()};

let navbar = document.querySelector('#nav');

let sticky = navbar.offsetTop;

function myfunction(){
    if(window.pageYOffset>=sticky){
        navbar.classList.add("sticky");
    }
    else{
        navbar.classList.remove("sticky");
    }
}

function openForm(){
    document.getElementById("myform").style.display = "block";
    console.log(document.getElementById("myform"))
    
}

function closeForm(){
    document.getElementById("myform").style.display = "none";
}
function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else { 
      x.className = x.className.replace(" w3-show", "");
    }
  }


 async function moviesList(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '91a4ae562amshd5660e31a849333p16562bjsn44b111dae606',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    let response = 
    await fetch('https://online-movie-database.p.rapidapi.com/title/get-most-popular-movies?currentCountry=US&purchaseCountry=US&homeCountry=IN&limit=20', options)
        .then(response => response.json())

        return response
 }
 
async function getMovieDetails(movieID){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '91a4ae562amshd5660e31a849333p16562bjsn44b111dae606',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    
   let movieData = await fetch(`https://online-movie-database.p.rapidapi.com/title/get-videos?tconst=${movieID}&limit=25&region=US`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

        return movieData
}

 async function fetchMovies(){
    let movies = await moviesList()

    // console.log("movies",movies)

    let moviesData = []
    for(let i=0;i<8;i++){
        let movieID = movies[i].split('/')[2];

        let data = await getMovieDetails(movieID)
        moviesData.push(data)


    }

    return moviesData
 }

 function Card(movieobj){
    const movieId=  movieobj.resource.id.split("/")[2];
    localStorage.setItem(movieId, JSON.stringify(movieobj));

    let container = document.createElement("div");
    container.className = "container";
    
    let overlay = document.createElement("div");
    overlay.className = "overlay";
    let image = document.createElement("img");
    image.setAttribute("src",movieobj.resource.image.url)
    let title = document.createElement("h2");
    title.innerText = movieobj.resource.title
    overlay.append(title)
    container.append(overlay,image)
    
    container.addEventListener("click",function(){
        window.location.href = `/details.html?id=${movieId}`;
    })
    return container;
 }

 function renderRow(movies,className){
    console.log(movies,className)
    movies.forEach((movie)=>{
        document.querySelector(`.${className}`).append(Card(movie));
    })
 }

 (async function load(){
    console.log("fetching started")
    // const movies = await fetchMovies()

    //dev purpose only
    // localStorage.setItem("movies", JSON.stringify(movies))
    const movies = JSON.parse(localStorage.getItem("movies"))
    renderRow(movies.slice(0,4),"free-cards");
    renderRow(movies.slice(4,movies.length),"popular-cards");
    console.log(movies);
    document.getElementById("loading").style.display="none"
    document.getElementById("main").style.display="block"
    console.log("fetching complete")
 })()

