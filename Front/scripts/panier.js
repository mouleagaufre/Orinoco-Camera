











// formulaire

const form = document.createElement("form");

const label = document.createElement("label");
label.for = "email";
label.class = "labelEmail";
label.innerHTML = "Entrez votre email";

const input = document.createElement("input");
input.type = "email";
input.name = "email";
input.id = "email";
input.class = "emailInp";
input.required = "maxlength.50";
input.placeholder = "Entrez votre email";
