///<reference path="Personas/catalogoPersonas.ts"/>

module ModuloMain {
    export class main {
        constructor() {
            this.mostrar();
        }

        private mostrar(): void {
            new ModuloPersona.clsPersona()
        }
    }
}

let _main = new ModuloMain.main();

