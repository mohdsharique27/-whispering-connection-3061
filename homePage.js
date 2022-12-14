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

