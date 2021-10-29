import React, { Component } from 'react'
import Axios from 'axios'
import Global from '../Global'
import { NavLink } from 'react-router-dom'

export default class Series extends Component {

    state = {
        serie : {}
        , status : false
    }

    cargarSerie = () => {
        var request = "/api/Series/" + this.props.IdSerie;
        
        Axios.get(Global.urlApi + request).then(res => {
            this.setState({
                serie : res.data
                , status : true
            })
        });
    }

    componentDidMount = () => {
        this.cargarSerie();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps != this.props) {
            this.cargarSerie();
        }
    }

    render() {
        return (
            <div>                
                <div className="card mt-4" style={{margin : "0 auto", width : "50%"}}>
                <img className="card-img-img" src={this.state.serie.imagen} />
                   <div className="card-body">
                       
                        <h5 className="card-title">{this.state.serie.nombre}</h5>                        
                        <p className="card-text">IMDB: {this.state.serie.puntuacion}</p>
                        <NavLink className="btn btn-success" to={"/serie/personajes/" + this.props.IdSerie}>Personajes</NavLink>
                        
                    </div>
                </div>
            </div>
        )
    }
}
