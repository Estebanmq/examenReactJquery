import React, { Component } from 'react'
import Axios from 'axios'
import Global from '../Global'
import { Redirect } from 'react-router';

export default class CrearPersonaje extends Component {
    
    cajaNombreRef = React.createRef();
    cajaImgRef = React.createRef();
    cajaSerieIdRef = React.createRef();
    idSerieSelect = 1;

    state = {
        series : [] 
        , status : false         
    }

    insertarPj = (e) => {
        e.preventDefault();
        var request = "/api/Personajes";
        var personaje = {
            idPersonaje : 1
            , nombre : this.cajaNombreRef.current.value
            , imagen : this.cajaImgRef.current.value
            , idSerie : parseInt(this.idSerieSelect)
        }
        
        Axios.post(Global.urlApi + request, personaje).then(res => {
            this.setState({
                status : true
            })
        });
    }

    cargarSeries = () => {
        var request = "/api/Series";
        Axios.get(Global.urlApi + request).then(res => {
            this.setState({
                series : res.data
              
            });
            console.log(this.state.series)
        })
    }

    componentDidMount = () => {
        this.cargarSeries();
    }

    cambioIdSerie = (id) => {
        this.idSerieSelect = id.target.value;
    }

    render() {  
        if (this.state.status) {

            return (<div>{alert("Se ha insertado el pesonaje correctamente")}<Redirect to={"/"} /></div>)
        }  
        return (
            <div>
                <h1 style={{color :"blue"}}>Nuevo personaje</h1>
                <form onSubmit={this.insertarPj}
                style={{width : "50%" , margin : "0 auto" , display : "table" }}
                className="form">
                    <div className="form-group row">
                        <label>Nombre:</label>
                        <input className="form-control"
                        ref={this.cajaNombreRef}   
                        required                     
                        />
                    </div>
                    <div className="form-group row">
                        <label>Imagen:</label>
                        <input className="form-control"
                        ref={this.cajaImgRef}   
                        
                        required                     
                        />
                    </div>
                    <div className="form-group row">
                        <label>Serie: </label>
                        <select onChange={this.cambioIdSerie} className="form-select">
                            {this.state.series.map((serie,index) => {
                                return (<option key={index} value={serie.idSerie}>{serie.nombre}</option>)
                            })}
                        </select>
                    </div>
                    <button className="mt-3 btn btn-success">
                        Insertar Personaje
                    </button>
                </form>                      
            </div>
        )
    }
}
