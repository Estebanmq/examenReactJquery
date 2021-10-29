import React, { Component } from 'react'
import Axios from 'axios'
import Global from '../Global'
import { Redirect } from 'react-router';

export default class ModificarPersonaje extends Component {

    idSerieSelect = 1;
    idPersonajeSelect = 1;

    state = {
        personajes : []
        , series : []
        , modificado : false
    }

    cargarSeries = () => {
        var request = "/api/Series";
        Axios.get(Global.urlApi + request).then(res => {
            this.setState({
                series : res.data
            });
            
        })
    }

    cargarPersonajes = () => {
        var request = "/api/Personajes";
        Axios.get(Global.urlApi + request).then(res => {
            
            this.setState({
                personajes : res.data
                
            });
        })
    }

    cambiarPersonaje = (e) => {
        e.preventDefault();
        var request = "/api/Personajes/" + this.idPersonajeSelect + "/" + this.idSerieSelect;
        console.log(this.idSerieSelect + " / " + this.idPersonajeSelect)
        Axios.put(Global.urlApi + request).then(res => {
            this.setState({
                modificado : true
            })
        });

    }

    componentDidMount = () => {
        this.cargarSeries();
        this.cargarPersonajes();
    }


    cambioIdSerie = (id) => {
        this.idSerieSelect = id.target.value;

    }

    cambioIdPersonaje = (id) => {
        this.idPersonajeSelect = id.target.value;
    }


    render() {
        if (this.state.modificado) {
            alert("Cambios guardados")
            return (<Redirect to={"/"}/>)
        }
        return (
            <div>
                <h1 style={{color : "blue"}}>Personajes y series</h1>
                <form
                onSubmit={this.cambiarPersonaje}
                style={{width : "75%" , margin : "0 auto" , display : "table" }}
                className="form">
                    <div className="form-group row">
                        <label>Seleccione una serie: </label>
                        <select onChange={this.cambioIdSerie} className="form-select">
                            {this.state.series.map((serie,index) => {
                                return (<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                            })}
                        </select>
                    </div>
                    <div className="form-group row">
                        <label>Seleccione un personaje: </label>
                        <select onChange={this.cambioIdPersonaje} className="form-select">
                            {this.state.personajes.map((personaje,index) => {
                                return (<option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>)
                            })}
                        </select>
                    </div>
                    <button className="mt-3 btn btn-info">
                        Guardar cambios
                    </button>
                </form>


            </div>
        )
    }
}
