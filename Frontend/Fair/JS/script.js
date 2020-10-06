const nav=document.querySelector("nav");
const service=document.querySelector(".services");

window.addEventListener("scroll",function(){
  let pos=service.getBoundingClientRect().top;
  if(pos<0){
    nav.setAttribute("class","sticky");

  }
  else{
    nav.removeAttribute("class","sticky");
  }
})

    const clients = ["Fitness Freaks", "Vegans", "Developers","Everyone"];
    const span = document.getElementById("change-word");
    // const h1 = document.querySelector(".main-heading");
    function typewriter(clients, span) {
      // let count = 0;
      let txt = "";
      let isDeleting = false;
      let wordIndex = 0;

      function typer() {
        // bounds
        wordIndex = wordIndex % clients.length;
        // current word
        let word = clients[wordIndex];
// 
        if (isDeleting) {
            

                txt = word.substring(0, txt.length - 1)
            
        }
  //  add 
        else {
          txt = word.substring(0, txt.length + 1);
        }
        if (txt.length == word.length && isDeleting == false) {
          wait=200;
            isDeleting = true;
        } else if (isDeleting == true && txt == "") {
          wordIndex++;
          
          isDeleting = false;
        }

        span.textContent = txt;

        setTimeout(function () {

          typer();
        }, 150)
      }
      typer();
    }



 typewriter(clients,span)
 

 