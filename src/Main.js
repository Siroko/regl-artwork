/**
 * Created by siroko on 22/09/16.
 */

import View from "./views/View";
import Model from "./model/Model";
import Controller from "./controller/Controller";

export default class Main {

    constructor() {

        this.model;
        this.view;
        this.controller;

        this.init();
    }

    init() {

        this.model = new Model();
        this.view = new View( this.model );
        this.controller = new Controller( this.model, this.view );

        this.addEvents();
        this.view.resize( window.innerWidth, window.innerHeight );

    }

    addEvents() {

        window.addEventListener( 'resize', () => {
            this.view.resize( window.innerWidth, window.innerHeight );
        } );

    }

}