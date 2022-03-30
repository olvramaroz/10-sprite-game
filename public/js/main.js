// un type number qui va déterminer quel regles CSS appliquer au perso, pour les class positionFace, positionBack etc..
// stocker des touches du clavier pour déterminer le deplacement du perso vers le haut, bas, gauche ou droite
// la vitesse de déplacement du perso
// POSITIONS X et Y du perso sur la map
// INDEX pour déterminer quel map charger

const MOVE = {
    go_top: 1,
    go_bottom: 1,
    go_left: 1,
    go_right: 1,
    speed: 10,
    positionX: 0,
    positionY: 0,
};

const KEY = {
    keyZ: "KeyW",
    keyQ: "KeyA",
    keyS: "KeyS",
    keyD: "KeyD",
};

let { go_top, go_bottom, go_left, go_right, positionX, positionY, speed } =
    MOVE;
const { keyZ, keyQ, keyS, keyD } = KEY;

let indexMap = 0;

// récuperer les tag html liés au perso et la map
const perso = document.getElementById("perso");
const resultMap = document.getElementById("resultMap");

/*********************************************/
/*********************************************/
/*********************************************/
// fonction qui va générer la map au début du jeu et au changement de map
function createMap(mapper, index, spawn) {
    // console.log(mapper[index].spawnA, index, spawn);

    // déterminer les positions de départ du perso
    if (spawn === "spawnA") {
        positionX = mapper[index].spawnA[0];
        positionY = mapper[index].spawnA[1];
    }

    // console.log(positionX);
    // console.log(positionY);

    // affecter la position du perso en fonction des positions x et y
    perso.style.top = positionY + "px";
    perso.style.left = positionX + "px";

    // création d'une balise html table
    let html = "<table>";

    // boucle (2 ?) qui va parcourir la mapper, en fonction des éléments du tableau bi-dimensionnelle injecter un td avec la class en rapport
    // console.log(mapper[index].map.length);
    for (let i = 0; i < mapper[index].map.length; i++) {
        // console.log(i);
        html += "<tr>";
        for (let j = 0; j < mapper[index].map[i].length; j++) {
            // console.log(mapper[index].map[i][j]);
            switch (mapper[index].map[i][j]) {
                case 0:
                    html += "<td class='grass'>";
                    break;
                case 1:
                    html += "<td class='water'>";
                    break;
                case 2:
                    html += "<td class='rock'>";
                    break;
                case 3:
                    html += "<td class='wall'>";
                    break;
                case 4:
                    html +=
                        "<td class='arrow-right'><i class='fas fa-arrow-right'></i>";
                    break;
                case 5:
                    html += "<td class='arrow-left'>";
                    break;
            }
        }
        html += "</tr>";
    }
    html += "</table>";

    // injecter dans le html
    resultMap.innerHTML = html;
}

// va gérer le déplacement du perso
function movePerso(e) {
    // console.log(e);
    switch (e.code) {
        // si c'est la touche du bas
        case keyS:
            //on initialise une chaine de caractère vide au classname du perso
            perso.className = "";
            // on incrémente notre variable go_bottom
            go_bottom++;
            // on va limiter à 9
            if (go_bottom > 9) {
                go_bottom = 1;
            }
            // on va ajouter la class positionBottom en lui affectant la valeur de go_bottom pour acceder à la bonne image
            perso.classList.add(`positionFace-${go_bottom}`);

            // si la position du perso permets le déplacement
            if (isValidatePosition(positionX, positionY, mapper, keyS)) {
                positionY += speed;
                perso.style.top = `${positionY}px`;
            }
            break;
        // verifier les autres touches keyW, keyQ, keyD
        case keyZ:
            //on initialise une chaine de caractère vide au classname du perso
            perso.className = "";
            // on incrémente notre variable go_bottom
            go_top++;
            // on va limiter à 9
            if (go_top > 9) {
                go_top = 1;
            }
            // on va ajouter la class positionBottom en lui affectant la valeur de go_bottom pour acceder à la bonne image
            perso.classList.add(`positionBack-${go_top}`);

            // si la position du perso permets le déplacement
            if (isValidatePosition(positionX, positionY, mapper, keyZ)) {
                positionY -= speed;
                perso.style.top = `${positionY}px`;
            }
            break;
        case keyQ:
            //on initialise une chaine de caractère vide au classname du perso
            perso.className = "";
            // on incrémente notre variable go_bottom
            go_left++;
            // on va limiter à 9
            if (go_left > 9) {
                go_left = 1;
            }
            // on va ajouter la class positionBottom en lui affectant la valeur de go_bottom pour acceder à la bonne image
            perso.classList.add(`positionLeft-${go_left}`);

            // si la position du perso permets le déplacement
            if (isValidatePosition(positionX, positionY, mapper, keyQ)) {
                positionX -= speed;
                perso.style.left = `${positionX}px`;
            }
            break;
        case keyD:
            //on initialise une chaine de caractère vide au classname du perso
            perso.className = "";
            // on incrémente notre variable go_bottom
            go_right++;
            // on va limiter à 9
            if (go_right > 9) {
                go_right = 1;
            }
            // on va ajouter la class positionBottom en lui affectant la valeur de go_bottom pour acceder à la bonne image
            perso.classList.add(`positionRight-${go_right}`);

            // si la position du perso permets le déplacement
            if (isValidatePosition(positionX, positionY, mapper, keyD)) {
                positionX += speed;
                perso.style.left = `${positionX}px`;
            }
            break;
    }
}

// va vérifier si le perso peut se déplacer
function isValidatePosition(positionX, positionY, mapper, key) {
    // console.log(positionX, positionY, mapper, key);
    // initialiser un Index X et Y à 0;
    indexX = 0;
    indexY = 0;

    console.log(positionY);
    // affectation de la position du perso au indexX et Y en fonction l'argument key
    if (key === keyS) {
		indexX = parseInt((positionY + 50) / 60);
		indexY = parseInt((positionX + 30) / 60);
	} else if (key === keyZ) {
		indexX = parseInt((positionY + 10) / 60);
		indexY = parseInt((positionX + 30) / 60);
	} else if (key === keyQ) {
		indexX = parseInt((positionY + 30) / 60);
		indexY = parseInt((positionX + 10) / 60);
	} else if (key === keyD) {
		indexX = parseInt((positionY + 30) / 60);
		indexY = parseInt((positionX + 40) / 60);
	}
    
    console.log(mapper[indexMap].map[indexX][indexY]);
    // récupération de la valeur de la case où on veut déplacer le perso, déclarer une variable qui va stocker cette valeur
    let type = mapper[indexMap].map[indexX][indexY];
    
    // return true;
    // changement de map ou déplacement non autorisé du perso
    switch(type){

        case 0:
            return true;

        case 4:
            indexMap++;
            createMap(mapper, indexMap, "spawnA");
            break;

        default: 
            return false;
    }
    //
}

/*********************************************/
/*********************************************/
/*********************************************/

// APPEL DE LA FONCTION DE CREATION DE LA MAP

document.addEventListener("DOMContentLoaded", function () {
    // envoyer 3 parametres -> la map, un index, et une chaine de caracteres identifiant le point de départ
    createMap(mapper, indexMap, "spawnA");

    // INSTALLER UN ECOUTEUR KEYDOWN QUI FERA APPEL A UNE FONCTION POUR BOUGER VOTRE PERSONNAGE
    document.addEventListener("keydown", movePerso);
});
