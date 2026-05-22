// nacte historii z localStorage a zobrazi ji
function nacteniHistorie() {
  try {
    var historie = JSON.parse(localStorage.getItem("historie") || "[]");
    var seznam = document.getElementById("seznam");
    var prazdna = document.getElementById("prazdna");

    if (historie.length === 0) {
      prazdna.style.display = "block";
      return;
    }

    // zobrazeni zaznamu od nejnovejsiho
    for (var i = historie.length - 1; i >= 0; i--) {
      var z = historie[i];

      var div = document.createElement("div");
      div.className = "zaznam";
      div.innerHTML = z.hrac1 + " vs " + z.hrac2 + "<br>" +
                      "Vyhral: " + z.vysledek + "<br>" +
                      z.datum;

      seznam.appendChild(div);
    }

  } catch (chyba) {
    document.getElementById("seznam").textContent = "Chyba pri nacitani: " + chyba;
  }
}

function smazaniHistorie() {
  var potvrzeni = confirm("Opravdu chces smazat historii?");
  if (potvrzeni === true) {
    localStorage.removeItem("historie");
    document.getElementById("seznam").innerHTML = "";
    document.getElementById("prazdna").style.display = "block";
  }
}

// spusteni po nacteni stranky
nacteniHistorie();
