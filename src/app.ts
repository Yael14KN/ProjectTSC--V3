namespace app {
    export function UI() {
        d3.select("body")
            .style("box-sizing", "border-box")
            .style("margin", 0)
            .style("padding", 0)
            .style("background-color", "white")
            .style("font-family", "Open Sans, sans-serif");

        let _container = d3.select("body").append("div")
            .attr("class", "container")

        d3.select(".container")
            .style("display", "grid")
            .style("place-content", "center")
            .style("width", "auto")
            .style("height", "80vh");

        _container.append("div")
            .attr("id", "containerTwo")
            .attr("class", "containerTwo");

        let _containerTwo = d3.select(".containerTwo")
            .style("text-align", "center")
            .style("align-items", "center")
            .style("width", "360px")
            .style("border-radius", "8px")
            .style("padding", "20px 40px");

        _containerTwo.append("h3")
            .text("Personas")
            .attr("class", "title");

        d3.select(".title")
            .style("font-size", "20px")
            .style("margin", 0)
            .style("padding", "10px 0");

        _containerTwo.append("label")
            .text("Nombre")
            .attr("class", "clsLabel");

        _containerTwo.append("input")
            .attr("id", "txtNombre")
            .attr("class", "clsInput");

        _containerTwo.append("label")
            .text("")
            .attr("class", "mensaje");

        _containerTwo.append("label")
            .text("Apellido")
            .attr("class", "clsLabel");

        _containerTwo.append("input")
            .attr("id", "txtApellido")
            .attr("class", "clsInput");

        _containerTwo.append("label")
            .text("")
            .attr("class", "mensaje");

        _containerTwo.append("label")
            .text("Telefono")
            .attr("class", "clsLabel");

        _containerTwo.append("input")
            .attr("class", "clsInput")
            .attr("id", "txtTelefono");

        _containerTwo.append("label")
            .text("")
            .attr("class", "mensaje");

        _containerTwo.append("label")
            .text("Filtro")
            .attr("class", "clsLabel");

        _containerTwo.append("input")
            .attr("id", "txtFiltro")
            .attr("class", "clsInput")
            .on("keyup", () => met_filtrar());

        _containerTwo.append("label")
            .text("Filtro Telefono")
            .attr("class", "clsLabel");

        _containerTwo.append("input")
            .attr("id", "txtFiltroTelefono")
            .attr("class", "clsInput")
            .on("keyup", () => met_filtrar());

        _containerTwo.append("button")
            .text("Agregar")
            .attr("id", "btnAgregar")
            .attr("class", "clsButton")
            .on("click", () => met_agregar());

        _containerTwo.append("button")
            .text("Sin orden")
            .attr("id", "btnOrdenar")
            .attr("class", "clsButton")
            .on("click", () => met_ordenar());

        d3.selectAll(".clsInput")
            .attr("type", "text")
            .style("width", "100%")
            .style("padding", "10px 20px")
            .style("margin", "3px 0")
            .style("box-sizing", "border-box")
            .style("font-size", "15px")
            .style("border", "2px solid #ede7f6")
            .style("border-radius", "5px")
            .style("outline", "none");

        d3.selectAll(".clsLabel")
            .style("display", "flex")
            .style("width", "70%")
            .style("margin", "0.5rem")
            .style("font-size", "15px");

        d3.selectAll(".clsButton")
            .style("background", "#0c6dfa")
            .style("color", "white")
            .style("font-size", "15px")
            .style("width", "140px")
            .style("padding", "10px")
            .style("text-align", "center")
            .style("border-radius", "5px")
            .style("border", "2px solid #fff")
            .style("box-shadow", "0 0 10px rgb(0, 0, 0, 0.1)")
            .style("cursor", "pointer")
            .style("margin", "4px");

        d3.selectAll(".mensaje")
            .style("display", "flex")
            .style("width", "70%")
            .style("margin", "0.5rem")
            .style("color", "red")
            .style("font-size", "13px");
    }

    enum Tipo {
        Ascendente = 1,
        Descendente = 2,
        SinOrden = 3
    }

    interface Persona {
        id?: number;
        nombre: string;
        apellido: string;
        telefono: string;
    }

    let _tipoOrden: Tipo = Tipo.SinOrden;
    let _listaGeneral: Array<Persona> = [];
    let _litaTemporal: Array<Persona> = [];

    function met_agregar(): void {
        let _inputNombre = d3.select("#txtNombre");
        let _nombre = _inputNombre.property("value");
        let _inputApellido = d3.select("#txtApellido");
        let _apellido = _inputApellido.property("value");
        let _inputTelefono = d3.select("#txtTelefono");
        let _telefono = _inputTelefono.property("value");
        let _persona: Persona = { nombre: _nombre, apellido: _apellido, telefono: _telefono }
        if (_nombre !== "" && _apellido !== "" && _telefono !== "") {
            d3.selectAll(".mensaje").text("");
            _listaGeneral.push(_persona);
            _inputNombre.property("value", "");
            _inputApellido.property("value", "");
            _inputTelefono.property("value", "");
            met_imprimir();
        }
        else {
            d3.selectAll(".mensaje").text("Ingrese un valor");
        }
    }

    function met_ordenar(): void {
        let _texto: string = "Ascendente";
        if (_tipoOrden == Tipo.Ascendente) {
            _tipoOrden = Tipo.Descendente;
            _texto = "Descendente";
        }
        else if (_tipoOrden == Tipo.Descendente) {
            _tipoOrden = Tipo.SinOrden;
            _texto = "Sin orden";
        }
        else {
            _tipoOrden = Tipo.Ascendente;
        }
        d3.select("#btnOrdenar").text(_texto);
        met_imprimir();
    }

    function met_filtrar(): void {
        met_imprimir();
    }

    function met_imprimir(): void {
        let _filtro: string = d3.select("#txtFiltro").property("value");
        let _filtroTelefono: string = d3.select("#txtFiltroTelefono").property("value");
        _litaTemporal = _listaGeneral.slice(0);
        if (_filtro !== "" || _filtroTelefono !== "") {
            _litaTemporal = _litaTemporal.filter((a: Persona) => {
                let _f1: boolean = true;
                if (_filtro !== "")
                    _f1 = (a.nombre.toLowerCase().indexOf(_filtro.toLowerCase()) !== -1);
                let _f2: boolean = true;
                if (_filtroTelefono !== "")
                    _f2 = (a.telefono.indexOf(_filtroTelefono) !== -1);
                return (_f1 && _f2);
            })
        }
        if (_tipoOrden !== Tipo.SinOrden) {
            if (_tipoOrden == Tipo.Ascendente)
                _litaTemporal.sort((a: Persona, b: Persona) => d3.ascending(a.nombre, b.nombre));
            else if (_tipoOrden == Tipo.Descendente)
                _litaTemporal.sort((a: Persona, b: Persona) => d3.descending(a.nombre, b.nombre));
        }
        console.log(_litaTemporal);
    }
}

