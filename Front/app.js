// MODAL
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// recupération des données
fetch("http://localhost:3000/api/cameras")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);

    // boucle foreatch
    for (let i = 0; i < response.length; i++) {
      console.log(response[i].name);

      // recupere le container
      let container = document.getElementById("produit");

      // creer la carte
      let card = document.createElement("div");
      card.setAttribute("class", "card border-light shadow");

      // creer l'image
      let img = document.createElement("img");
      img.setAttribute("class", "img1 card-img-top");
      img.setAttribute("src", response[i].imageUrl);
      card.appendChild(img);

      // creer contenu carte
      let inner = document.createElement("div");
      inner.setAttribute("class", "card-body");

      // titre de la carte
      let title = document.createElement("h4");
      title.style.color = "#b8bfb4";
      title.innerHTML = "Apareil photo : " + response[i].name;
      inner.appendChild(title);

      // prix en €
      let prix1 = document.createElement("price");
      prix1.style.fontSize = "1.5vw";
      // prix1.style.marginButton = "6px";
      prix1.innerHTML = "Prix : " + response[i].price / 100 + " €";
      inner.appendChild(prix1);

      // boutton
      let a = document.createElement("a");
      a.innerHTML = "Découvrez le produit ";
      a.href = "../Front/html/produit.html?id_camera=" + response[i]._id;
      a.style.color = "#000";
      a.style.marginTop = "10px";
      a.style.backgroundColor = "#e8ecef";
      a.style.padding = "7px";
      a.style.borderRadius = "6px";
      a.style.boxShadow = "5px 5px 0.75rem #e0d9d9";
      a.style.textDecoration = "none";
      // a.style.border = "1px solid black" ;

      inner.appendChild(a);

      // insert le contenu dans la carte
      card.appendChild(inner);

      let col = document.createElement("div");
      col.setAttribute("class", "carte pb-5 col-12 col-lg-6");
      col.appendChild(card);

      container.appendChild(col);
    }
  });
