/**
 * Created by siroko on 22/09/16.
 */

import Stage3D from "./Stage3D";

export default class View {

    constructor( model ) {

        this.model = model;

        this.init();

    }

    init() {

        this.stage3D = new Stage3D();

    }

    resize ( w, h ) {

        this.stage3D.resize( w, h );

    }

}