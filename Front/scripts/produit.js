// récupération de l'id du produit sélectionné dans la page précédente
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

const urlSearchParams = new URLSearchParams(queryString_url_id);
const productId = urlSearchParams.get("id_camera");
console.log(productId);

//  localStorage.clear();

// récupération du produit avec l'id associé
fetch(`http://localhost:3000/api/cameras/${productId}`)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    // recupere le container
    let container = document.getElementById("produit");
    container.style.display = "block";

    // creer la carte
    let card = document.createElement("div");
    card.setAttribute("class", "card border-light shadow");

    // creer l'image
    let img = document.createElement("img");
    img.setAttribute("class", "img1 card-img-top");
    img.setAttribute("src", response.imageUrl);
    card.appendChild(img);

    // creer contenu carte
    let inner = document.createElement("div");
    inner.setAttribute("class", "card-body");

    // titre de la carte
    let title = document.createElement("h4");
    title.style.color = "#b8bfb4";
    title.innerHTML = "Apareil photo : " + response.name;
    inner.appendChild(title);

    // prix en €
    let prix1 = document.createElement("price");
    prix1.style.fontSize = "1.5vw";

    prix1.innerHTML = "Prix : " + response.price / 100 + " €";
    inner.appendChild(prix1);

    // description
    let descri = document.createElement("h6");
    descri.style.margin = "6px 0 20px 0";
    descri.innerHTML = "Description : " + response.description;
    inner.appendChild(descri);

    // bouton choix
    const form = document.createElement("form");

    const label = document.createElement("label");
    label.innerHTML = "Type de lentille : ";
    label.style.color = "#000";
    label.style.margin = "10px auto";
    label.style.backgroundColor = "#e8ecef";
    label.style.padding = "7px";
    label.style.borderRadius = "6px";
    label.style.boxShadow = "5px 5px 0.75rem #e0d9d9";
    inner.appendChild(label);
    // form.appendChild(label);
    
    // choix des lentilles
    const select = document.createElement("select");
    select.name = "lentille";
    select.style.color = "#000";
    select.style.margin = "10px auto";
    select.style.backgroundColor = "#e8ecef";
    select.style.padding = "7px";
    select.style.borderRadius = "6px";
    select.style.borderColor = "#e8ecef";
    select.style.boxShadow = "5px 5px 0.75rem #e0d9d9";
    
    const option = document.createElement("option");
    option.innerHTML = 'Faite votre choix';
    option.disabled = true;
    option.selected = true;
    select.appendChild(option);
    form.appendChild(select);

    // boucle
    for (let i = 0; i < response.lenses.length; i++) {
      let option = document.createElement("option");
      option.innerHTML = response.lenses[i];
      option.value = i;
      select.appendChild(option);
    }

    // input 
    let submit = document.createElement("input");
    submit.type = "submit";
    submit.value = " Ajouter au panier";
    submit.id = "youpi";
    submit.style.padding = "7px";
    submit.style.margin = "10px auto";
    submit.style.backgroundColor = "#e8ecef";
    submit.style.borderRadius = "6px";
    submit.style.boxShadow = "5px 5px 0.75rem #e0d9d9";
    submit.style.border = "none";
    submit.addEventListener('mouseover',function(){this.style.backgroundColor='#CFD7DE'});
    submit.addEventListener('mouseout',function(){this.style.backgroundColor='#e8ecef'});
    form.appendChild(submit);

    // local storage
    form.onsubmit = function(form) {
      form.preventDefault();
      
      let lenseId = parseInt(select.value);

      if (isNaN(lenseId)) {
        console.log('not a number');
        alert ("Vous n'avez pas sélectionné votre lentille ! 😕 .. ")
        return;
      }

      if (localStorage.getItem('panier') != null) {
        var cart = JSON.parse(localStorage.getItem('panier'));
        // popupConfirmation;
      } else {
        var cart = [];
      }

      let item = {
        id: productId,
        lenseId: select.value
      };

      cart.push(item);
      
      localStorage.setItem('panier', JSON.stringify(cart));
      console.log(cart);

      // popup confirmation / redirection 
      if ( confirm( "Voulez vous voir votre panier OK ou Continuer vos achats ANNULER")) {
      window.location.href = 'panier.html';
      
      }
      else{ 
        window.location.href = '../index.html';
      }

    };

    
    inner.appendChild(form);

    card.appendChild(inner);

    let col = document.createElement("div");
    col.setAttribute("class", "carte mb-4 col-12 col-lg-7");
    col.appendChild(card);

    container.appendChild(col);
  });
     
   
  
 
 
 
