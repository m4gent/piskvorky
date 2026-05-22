// pole ma 9 mist, null = prazdne
var pole = [null, null, null, null, null, null, null, null, null];

// kdo je ted na tahu, X zacina
var aktualniHrac = "X";

// hra bezi nebo ne
var hraBeži = false;

// jmena hracu
var jmeno1 = "Hrac 1";
var jmeno2 = "Hrac 2";

// skore
var skore1 = 0;
var skore2 = 0;

// vsechny mozne vyherni kombinace
var vyhry = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// spusti hru po kliknuti na tlacitko
function startHra() {
  try {
    var vstup1 = document.getElementById("jmeno1").value;
    var vstup2 = document.getElementById("jmeno2").value;

    // kontrola ze jmena nejsou prazdna
    if (vstup1 === "") {
      throw "Zadej jmeno hrace 1!";
    }
    if (vstup2 === "") {
      throw "Zadej jmeno hrace 2!";
    }

    jmeno1 = vstup1;
    jmeno2 = vstup2;

    // skryti nastaveni, zobrazeni hry
    document.getElementById("nastaveni").style.display = "none";
    document.getElementById("hra").style.display = "block";

    // zobrazeni jmen ve skore
    document.getElementById("jmeno1Skore").textContent = jmeno1;
    document.getElementById("jmeno2Skore").textContent = jmeno2;

    noveKolo();

  } catch (chyba) {
    document.getElementById("chyba").textContent = chyba;
  }
}

// reset herniho pole pro nove kolo
function noveKolo() {
  // vyprazdni pole
  pole = [null, null, null, null, null, null, null, null, null];
  aktualniHrac = "X";
  hraBeži = true;

  // vyprazdneni vsech bunek v tabulce
  var bunky = document.querySelectorAll("#pole td");
  for (var i = 0; i < bunky.length; i++) {
    bunky[i].textContent = "";
    bunky[i].className = "";
  }

  aktualizaceStavu();
}

// kdyz hrac klikne na bunku
function klik(index) {
  // pokud hra nebezi nebo bunka je obsazena, nic nedela
  if (hraBeži === false) {
    return;
  }
  if (pole[index] !== null) {
    return;
  }

  // zapis symbolu do pole a do tabulky
  pole[index] = aktualniHrac;
  var bunky = document.querySelectorAll("#pole td");
  bunky[index].textContent = aktualniHrac;

  // kontrola vyhry
  var vyherni = kontrolaVyhry(aktualniHrac);

  if (vyherni !== null) {
    // oznaceni vyhernich bunek zelene
    for (var i = 0; i < vyherni.length; i++) {
      bunky[vyherni[i]].className = "vyhra";
    }

    // pricteni skore
    if (aktualniHrac === "X") {
      skore1 = skore1 + 1;
      document.getElementById("skore1").textContent = skore1;
    } else {
      skore2 = skore2 + 1;
      document.getElementById("skore2").textContent = skore2;
    }

    var vitez = aktualniHrac === "X" ? jmeno1 : jmeno2;
    document.getElementById("stav").textContent = vitez + " vyhrál!";
    hraBeži = false;

    ulozeniDoHistorie(vitez);
    return;
  }

  // kontrola remizy - vsechna pole plna
  var plne = true;
  for (var j = 0; j < pole.length; j++) {
    if (pole[j] === null) {
      plne = false;
    }
  }

  if (plne === true) {
    document.getElementById("stav").textContent = "Remíza!";
    hraBeži = false;
    ulozeniDoHistorie("Remiza");
    return;
  }

  // prepnuti hrace
  if (aktualniHrac === "X") {
    aktualniHrac = "O";
  } else {
    aktualniHrac = "X";
  }

  aktualizaceStavu();
}

// vraci vyherni kombinaci nebo null
function kontrolaVyhry(hrac) {
  for (var i = 0; i < vyhry.length; i++) {
    var a = vyhry[i][0];
    var b = vyhry[i][1];
    var c = vyhry[i][2];

    if (pole[a] === hrac && pole[b] === hrac && pole[c] === hrac) {
      return vyhry[i];
    }
  }
  return null;
}

// zobrazi kdo je na tahu
function aktualizaceStavu() {
  var jmeno = aktualniHrac === "X" ? jmeno1 : jmeno2;
  document.getElementById("stav").textContent = "Na tahu: " + jmeno + " (" + aktualniHrac + ")";
}

// ukonci hru a vrati nastaveni
function konecHry() {
  document.getElementById("hra").style.display = "none";
  document.getElementById("nastaveni").style.display = "block";
  skore1 = 0;
  skore2 = 0;
}

// ulozi vysledek do localStorage
function ulozeniDoHistorie(vysledek) {
  try {
    var historie = JSON.parse(localStorage.getItem("historie") || "[]");

    var zaznam = {
      hrac1: jmeno1,
      hrac2: jmeno2,
      vysledek: vysledek,
      datum: new Date().toLocaleString("cs-CZ")
    };

    historie.push(zaznam);
    localStorage.setItem("historie", JSON.stringify(historie));

  } catch (chyba) {
    console.log("Chyba pri ukladani: " + chyba);
  }
}
