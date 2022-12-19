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

( async function load(){

    	const url = new URLSearchParams(window.location.search)

        const movieID =  url.get("id")
		const moviesData = JSON.parse(localStorage.getItem(movieID));
		console.log("fetchingReviews")
		const movieReviews = await getMovieReviews(movieID);
		console.log("reviews fetched");
		console.log(moviesData);
		console.log(movieReviews);

		document.getElementById("banner-img").src=moviesData.resource.image.url
		document.getElementById("banner-title").innerText=moviesData.resource.title
		document.getElementById("banner-type").innerText=moviesData.resource.titleType
		document.getElementById("banner-release").innerText=moviesData.resource.year



		renderRow(movieReviews)
})()

 async function getMovieReviews(movieID){
	
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '91a4ae562amshd5660e31a849333p16562bjsn44b111dae606',
			// 'X-RapidAPI-Key': '8706a1dc58mshec2a5ce55edc9a2p127189jsn44ba20c61be4',

			'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
		}
	};

	// uncomment only when pusint to github and demonstrating
	
	// let movieReviews   =  await fetch(`https://online-movie-database.p.rapidapi.com/title/get-user-reviews?tconst=${movieID}`, options)
	// 	.then(response =>{
	// 		console.log(response)
	// 		return response.json()})

	let movieReviews = JSON.parse(localStorage.getItem('reviews'))
	
		return movieReviews.reviews;
 }

 

 function Review(reviewobj){

	let container = document.createElement("div");
	container.className = "container";

	let name = document.createElement("h3");
	name.innerText = reviewobj.author.displayName;
	let comment = document.createElement("p");
	let title = document.createElement("strong");
	title.innerText = reviewobj.reviewTitle
	comment.innerText = reviewobj.reviewText
	container.append(name,title,comment);

	return container

}
    
function renderRow(reviews){
	reviews.forEach((review)=>document.querySelector('.reviewContainer').append(Review(review)))
}


	

	
