import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navegacion from './components/Navegacion/Navegacion'
import Serie from './components/Series/Serie'
import Personajes from './components/Series/Personajes'
import CrearPersonaje from './components/Series/CrearPersonaje'
import ModificarPersonaje from './components/Series/ModificarPersonaje'


export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
            
                <Navegacion/>
                <Switch>                       
                    <Route exact path={"/serie/:idserie"} render={props => {
                        var idserie = props.match.params.idserie;
                        return(<Serie IdSerie={idserie}/>);
                    }}/>

                    <Route exact path={"/serie/personajes/:idserie"} render={props => {
                        var idserie = props.match.params.idserie;
                        return(<Personajes IdSerie={idserie}/>);
                    }}/>

                    <Route exact path={"/crearpersonaje"} component={CrearPersonaje} />

                    <Route exact path={"/modificarpersonaje"} component={ModificarPersonaje} />
                </Switch>
            </BrowserRouter>
        )
    }
}
