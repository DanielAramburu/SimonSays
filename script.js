const colores = ["verde", "rojo","amarillo", "azul"];
const contenedor = document.querySelector('#contenedor');
let says = []
let result = [];
function nextColor(){
    let pos = Math.floor(Math.random()*colores.length);
    if (says[says.length - 1] === colores[pos]) {
        nextColor();
        return;
    }
    says.push(colores[pos]);
    setTimeout(showSays, 1000);
}
function simon() {
    contenedor.classList.remove('user');
    contenedor.classList.add('simon');
    nextColor();
}
function user() {
    contenedor.classList.remove('simon');
    contenedor.classList.add('user');
    result = [];
}
function showSays(n = 0) {
    showColor(says[n]);
    setTimeout(() => {
        hideColor(says[n]);
        if (n + 1 < says.length) {
            showSays(n + 1);
        } else {
            changePlayer();
        }
    }, 1000)
}
function showColor(color) {
    document.querySelector(`#${ color }`).classList.add('seleccionado');
}
function hideColor(color) {
    document.querySelector(`#${ color }`).classList.remove('seleccionado');
}
function init() {
    showMessage("jugando...");
    player = 'simon';
    says = [];
    simon();
}
function close() {
    contenedor.classList.remove('simon');
    contenedor.classList.remove('user');
}
function changePlayer() {
    if (getPlayer() === 'simon') {
        user();
    } else {
        simon();
    }
}
function getPlayer() {
    return contenedor.classList.contains('simon') ? 'simon' : 'user';
}
function clickColor(evt) {
    if (contenedor.classList.contains('simon')) {
        return;
    }
    result.push(evt.target.id);
    showColor(evt.target.id);
    setTimeout(() => {
        hideColor(evt.target.id);
    }, 100)
    if (result.length === says.length) {
        checkResult();
    }
}
function checkResult() {
    for (let n = 0; n < says.length; n++) {
        if (says[n] !== result[n]) {
            showMessage( `<b>Eres un manta, has durado ${says.length} rondas</b>`);
            return;
        }
    }
    changePlayer();
}
function showMessage(text) {
    document.querySelector('#message').innerHTML = text;
}
document.querySelector('#verde').addEventListener('click', clickColor);
document.querySelector('#rojo').addEventListener('click', clickColor);
document.querySelector('#azul').addEventListener('click', clickColor);
document.querySelector('#amarillo').addEventListener('click', clickColor);
document.querySelector('#comenzar').addEventListener('click', init);