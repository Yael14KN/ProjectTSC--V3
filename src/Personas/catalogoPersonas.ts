module ModuloPersona {
  enum Tipo {
    Ascendente = 1,
    Descendente = 2,
    SinOrden = 3,
  }

  interface Personaje {
    id: number;
    nombre: string;
    status: string;
    genero: string;
    img: string;
  }

  export class clsPersona {
    private _tipoOrden: Tipo;
    private _litaTemporal: Array<Personaje>;
    private _id = 0;
    private _map: Map<number, Personaje>;
    private _esEditar: boolean;
    private _texto: string;
    private _obj: Personaje;
    private _personaje: Personaje;

    constructor() {
      this._tipoOrden = Tipo.SinOrden;
      this._litaTemporal = [];
      this._map = new Map<number, Personaje>();
      this.UI();
      this._esEditar = false;
      this._texto = "";
      this._obj = <Personaje>{};
      this._personaje = <Personaje>{};
    }

    public UI(): void {
      d3.select("body")
        .style("box-sizing", "border-box")
        .style("margin", 0)
        .style("padding", 0)
        .style("background-color", "white")
        .style("font-family", "Open Sans, sans-serif");
      let _container = d3
        .select("body")
        .append("div")
        .attr("class", "container");
      d3.select(".container")
        .style("display", "grid")
        .style("place-content", "center")
        .style("width", "auto")
        .style("height", "80vh");
      _container
        .append("div")
        .attr("id", "containerTwo")
        .attr("class", "containerTwo");
      let _containerTwo = d3
        .select(".containerTwo")
        .style("text-align", "center")
        .style("align-items", "center")
        .style("width", "360px")
        .style("border-radius", "8px")
        .style("padding", "20px 40px");
      _containerTwo.append("h3").text("Personas").attr("class", "title");
      d3.select(".title")
        .style("font-size", "20px")
        .style("margin", 0)
        .style("padding", "10px 0");
      _containerTwo.append("label").text("Nombre").attr("class", "clsLabel");
      _containerTwo
        .append("input")
        .attr("id", "txtNombre")
        .attr("class", "clsInput");
      _containerTwo.append("label").text("").attr("class", "mensaje");
      _containerTwo.append("label").text("Estatus").attr("class", "clsLabel");
      _containerTwo
        .append("input")
        .attr("id", "txtEstatus")
        .attr("class", "clsInput");
      _containerTwo.append("label").text("").attr("class", "mensaje");
      _containerTwo.append("label").text("Genero").attr("class", "clsLabel");
      _containerTwo
        .append("input")
        .attr("class", "clsInput")
        .attr("id", "txtGenero");
      _containerTwo.append("label").text("").attr("class", "mensaje");
      _containerTwo.append("label").text("Filtro").attr("class", "clsLabel");
      _containerTwo
        .append("input")
        .attr("id", "txtFiltro")
        .attr("class", "clsInput")
        .on("keyup", () => this.met_filtrar());
      _containerTwo
        .append("label")
        .text("Filtro Telefono")
        .attr("class", "clsLabel");
      _containerTwo
        .append("input")
        .attr("id", "txtFiltroTelefono")
        .attr("class", "clsInput")
        .on("keyup", () => this.met_filtrar());
      _containerTwo
        .append("button")
        .text("Agregar")
        .attr("id", "btnAgregar")
        .attr("class", "clsButton")
        .on("click", () => this.met_agregar());
      _containerTwo
        .append("button")
        .text("Sin orden")
        .attr("id", "btnOrdenar")
        .attr("class", "clsButton")
        .on("click", () => this.met_ordenar());
      _containerTwo
        .append("button")
        .text("Consultar")
        .attr("id", "btnConsultar")
        .attr("class", "clsButton")
        .on("click", () => {
          this.met_fetch();
        });
      _container
        .append("div")
        .attr("id", "containerThree")
        .attr("class", "clsContainerThree");
      let _containerThree = d3
        .select(".clsContainerThree")
        .style("text-align", "center")
        .style("align-items", "center")
        .style("width", "360px")
        .style("border-radius", "8px")
        .style("padding", "20px 40px");
      _containerThree
        .append("table")
        .attr("id", "containerThreeTable")
        .attr("class", "clsContainerThreeTable")
        .style("position", "absolute");
      let _thead = d3.select("#containerThreeTable").append("thead");
      _thead.append("tr").attr("id", "tr");
      let _tr = d3.select("#tr");
      _tr.append("th").text("Eliminar").attr("class", "clsT");
      _tr.append("th").text("Actualizar").attr("class", "clsT");
      _tr.append("th").text("Nombre").attr("class", "clsT");
      _tr.append("th").text("Estatus").attr("class", "clsT");
      _tr.append("th").text("Genero").attr("class", "clsT");
      _tr.append("th").text("Foto").attr("class", "clsT");
      d3.select("#containerThreeTable").append("tbody");
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
      d3.select("table").style("border-collapse", "collapse");
      d3.selectAll(".clsT")
        .style("width", "76px")
        .style("height", "30px")
        .style("vertical-aling", "middle")
        .style("text-align", "center")
        .style("color", "white")
        .style("background-color", "#1f618d")
        .style("font-size", "normal");
      d3.select("td").style("border", "1px solid #ede7f6");
    }

    private met_agregar(): void {
      let _inputNombre: string = d3.select("#txtNombre").property("value");
      let _inputEstatus: string = d3.select("#txtEstatus").property("value");
      let _inputGenero: string = d3.select("#txtGenero").property("value");
      if (_inputNombre !== "" && _inputEstatus !== "" && _inputGenero !== "") {
        let _numeroID: number;
        if (this._id == 4 || this._id > 4) {
          _numeroID = this._id += 1;
        } else {
          _numeroID = this._id += -1;
        }
        this._personaje = {
          id: _numeroID,
          nombre: _inputNombre,
          status: _inputEstatus,
          genero: _inputGenero,
          img: "https://rickandmortyapi.com/api/character/avatar/19.jpeg",
        };
        d3.selectAll(".mensaje").text("");
        if (this._esEditar == true) {
          this._texto = "Agregar";
          let _actualizar: Personaje = <any>this._map.get(this._obj.id);
          _actualizar.nombre = _inputNombre;
          _actualizar.status = _inputEstatus;
          _actualizar.genero = _inputGenero;
          d3.select("#btnAgregar").text(this._texto);
          this._esEditar = false;
        } else {
          if (this._map.has(this._id)) {
            this._map.delete(this._id);
          }
          this._map.set(this._id, this._personaje);
        }
        d3.select("#txtNombre").property("value", "");
        d3.select("#txtEstatus").property("value", "");
        d3.select("#txtGenero").property("value", "");
        this.met_imprimir();
      } else {
        d3.selectAll(".mensaje").text("Ingrese un valor");
      }
    }

    private met_ordenar(): void {
      this._texto = "Ascendente";
      if (this._tipoOrden == Tipo.Ascendente) {
        this._tipoOrden = Tipo.Descendente;
        this._texto = "Descendente";
      } else if (this._tipoOrden == Tipo.Descendente) {
        this._tipoOrden = Tipo.SinOrden;
        this._texto = "Sin orden";
      } else {
        this._tipoOrden = Tipo.Ascendente;
      }
      d3.select("#btnOrdenar").text(this._texto);
      this.met_imprimir();
    }

    private met_filtrar(): void {
      this.met_imprimir();
    }

    private met_imprimir(): void {
      this._litaTemporal = Array.from(this._map.values());
      let _filtro: string = d3.select("#txtFiltro").property("value");
      let _filtroTelefono: string = d3
        .select("#txtFiltroTelefono")
        .property("value");

      if (_filtro !== "" || _filtroTelefono !== "") {
        this._litaTemporal = this._litaTemporal.filter((a: Personaje) => {
          let _f1: boolean = true;
          if (_filtro !== "")
            _f1 = a.nombre.toLowerCase().indexOf(_filtro.toLowerCase()) !== -1;
          let _f2: boolean = true;
          if (_filtroTelefono !== "")
            _f2 =
              a.status.toLowerCase().indexOf(_filtroTelefono.toLowerCase()) !==
              -1;
          return _f1 && _f2;
        });
      }

      if (this._tipoOrden !== Tipo.SinOrden) {
        if (this._tipoOrden == Tipo.Ascendente)
          this._litaTemporal.sort((a: Personaje, b: Personaje) =>
            d3.ascending(a.nombre, b.nombre)
          );
        else if (this._tipoOrden == Tipo.Descendente)
          this._litaTemporal.sort((a: Personaje, b: Personaje) =>
            d3.descending(a.nombre, b.nombre)
          );
      }
      console.log(this._map);
      this.met_tabla();
    }

    private met_tabla(): void {
      let _fila = d3
        .select("tbody")
        .selectAll(".fila")
        .data(this._litaTemporal, (a: any) => a.id);
      _fila.join(
        (enter) => {
          let _celda = enter
            .append("tr")
            .attr("class", "fila")
            .style("background", (a, posicion) => {
              return posicion % 2 == 0 ? "#fff" : "#eee";
            })
            .style("border", "1px solid #ede7f6");
          _celda
            .append("td")
            .append("li")
            .attr("class", "fa-solid fa-trash")
            .style("color", "red")
            .style("cursor", "pointer")
            .on("click", (d, p) => {
              this.met_eliminar(p);
            });
          _celda
            .append("td")
            .append("li")
            .attr("class", "fa-solid fa-pen-to-square")
            .style("color", "blue")
            .style("cursor", "pointer")
            .on("click", (d, p) => {
              this.met_obtener(p);
            });
          _celda
            .append("td")
            .text((a) => a.nombre)
            .attr("class", "nombre");
          _celda
            .append("td")
            .text((a) => a.status)
            .attr("class", "status");
          _celda
            .append("td")
            .text((a) => a.genero)
            .attr("class", "genero");
          _celda
            .append("td")
            .append("img")
            .attr("src", (a) => a.img)
            .style("width", "50px")
            .attr("class", "imagen");
          return _celda;
        },
        (update) => {
          update.select(".nombre").text((b) => b.nombre);
          update.select(".status").text((b) => b.status);
          update.select(".genero").text((b) => b.genero);
          update.select(".imagen").attr("src", (a) => a.img);
          update.style("background", (a, posicion) => {
            return posicion % 2 == 0 ? "#fff" : "#eee";
          });
          return update;
        },
        (exit) => {
          exit.remove();
          return exit;
        }
      );
    }

    private met_eliminar(id: Personaje): void {
      if (this._map.has(id.id)) this._map.delete(id.id);
      this.met_imprimir();
      alert("Eliminado");
    }

    private met_obtener(personaje: Personaje): void {
      this._esEditar = true;
      this._texto = "Actualizar";
      d3.select("#txtNombre").property("value", personaje.nombre);
      d3.select("#txtEstatus").property("value", personaje.status);
      d3.select("#txtGenero").property("value", personaje.genero);
      d3.select("#btnAgregar").text(this._texto);
      this._obj = personaje;
    }

    private met_fetch(): void {
      let _URI = "https://rickandmortyapi.com/api/character/";
      fetch(_URI)
        .then((res) => res.json())
        .then((data) => {
          this.met_guardarPersonaje(data.results);
        });
    }

    private met_guardarPersonaje(data: any): void {
      for (let i = 0; i < 4; i++) {
        let _data = data[i];
        this._personaje = {
          id: _data.id,
          nombre: _data.name,
          status: _data.status,
          genero: _data.gender,
          img: _data.image,
        };

        if (this._map.has(this._personaje.id)) {
          this._map.delete(this._personaje.id);
        }
        this._map.set(this._personaje.id, this._personaje);
        this._id = _data.id;
      }
      d3.select("#btnConsultar")
        .attr("disabled", "true")
        .style("background", "gray")
        .text("¡Ya no sirve!");
      this.met_imprimir();
    }
  }
}
