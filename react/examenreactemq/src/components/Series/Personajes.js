import React, { Component } from 'react'
import Axios from 'axios'
import Global from '../Global'
import { NavLink } from 'react-router-dom'

export default class Personajes extends Component {

    state = {
        personajes : []
        , status : false
    }

    cargarPersonajes = () => {
        var request = "/api/Series/PersonajesSerie/" + this.props.IdSerie;
        Axios.get(Global.urlApi + request).then(res => {
            this.setState({
                personajes : res.data
                , status : true
            })
        })
    }


    componentDidMount = () => {
        this.cargarPersonajes();    
    }

    render() {
        return (
            <div>                
                <NavLink className="btn btn-danger" to={"/serie/"+this.props.IdSerie}>Volver</NavLink>
                <table style={{width : "70%" ,margin : "0 auto" , display : "table"}} className="mt-3 table table-dark">
                        <thead>
                            <tr>
                                <th>PERSONAJE</th>
                                <th>IMAGEN</th>                             
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.personajes.map((pj, index)  =>{
                                return(<tr key={index}>
                                    <td>{pj.nombre}</td>
                                    <td><img style={{width : "200px" , height : "200px"}} src={pj.imagen}/></td>
                                  
                                </tr>)
                            })}
                        </tbody>
                    </table>
            </div>
        )
    }
}
