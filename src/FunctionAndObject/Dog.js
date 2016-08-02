function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    this.bark = function() {
        if (this.weight > 25) {
            alert(this.name + " says Woof!");
        } else {
            alert(this.name + " says Yip!");
        }
    }
}
window.onload = init;

function init() {
    var fido = new Dog("Fido", "Mixed", 38);
    var tiny = new Dog("Tiny", "Chawalla", 8);
    fido.bark();
    tiny.bark();
}