"use strict";
///<reference path="Personas/catalogoPersonas.ts"/>
var ModuloMain;
(function (ModuloMain) {
    class main {
        constructor() {
            this.mostrar();
        }
        mostrar() {
            new ModuloPersona.clsPersona();
        }
    }
    ModuloMain.main = main;
})(ModuloMain || (ModuloMain = {}));
let _main = new ModuloMain.main();
//# sourceMappingURL=_main.js.map