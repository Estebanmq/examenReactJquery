import React, { Component } from 'react'
import Axios from 'axios'
import Global from '../Global'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/img/logo.png';

export default class Navegacion extends Component {

    state = {
        series : []
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

    render() {
        return (
            <div>
                <ul className="nav nav-pills p-3">
                    <li className="nav-item">
                        <img style={{width : "100px", height :"50px"}} src={logo} />
                    </li>
                    <li className="nav-item">                        
                        <NavLink style={{backgroundColor : "transparent"}} className="text-secondary nav-link" to={"/"}>Home</NavLink>
                    </li>
                    <li className="nav-item">                                                
                        <NavLink style={{backgroundColor : "transparent"}} className="text-secondary nav-link" to={"/crearpersonaje"}>Nuevo Personaje</NavLink>
                    </li>
                    <li className="nav-item">                                                
                        <NavLink style={{backgroundColor : "transparent"}} className="text-secondary nav-link" to={"/modificarpersonaje"}>Modificar Personaje</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="text-secondary nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Series</a>
                        <ul className="dropdown-menu">
                            {
                            this.state.series.map((serie, index) => {
                                return (<li key={index}><NavLink className="dropdown-item" to={"/serie/" + serie.idSerie} >{serie.nombre}</NavLink></li>)
                            })}
                        </ul>
                    </li>

                </ul>
            </div>
        )
    }
}
