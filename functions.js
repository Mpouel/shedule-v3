function $i(id) {
    return document.getElementById(id);
}

function $c(clas) {
    return document.querySelector(`.${clas}`)
}

function $n(name) {
    return document.querySelector(`[name=${name}]`)
}

function $t(type) {
    return document.querySelector(`[type=${type}]`)
}

function $s(selector) {
    return document.querySelector(selector)
}

function $a(selector) {
    return document.querySelectorAll(selector);
}

Element.prototype.$e = function (event, callback) {
    this.addEventListener(event, callback);
    return this;
}

NodeList.prototype.$ee = function (event, callback) {
    this.forEach(element => element.addEventListener(event, callback));
    return this;
}



String.prototype.cap = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.unCap = function () {
    return this.charAt(0).toLowerCase() + this.slice(1);
}

String.prototype.capAll = function() {
    return this.replace(/\b\w/g, char => char.toUpperCase());
}
String.prototype.unCapAll = function() {
    return this.replace(/\b\w/g, char => char.toLowerCase());
}