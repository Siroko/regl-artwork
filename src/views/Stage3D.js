/**
 * Created by siroko on 23/09/16.
 */

import createREGL from 'regl';
import bunny from 'bunny';
import mat4 from 'gl-mat4';

import vs_quad from './../glsl/vs-quad.glsl';
import fs_debug from './../glsl/fs-debug.glsl';
import fs_draw_noise from './../glsl/fs-draw-noise.glsl';

export default class Stage3D {

    constructor() {

        this.init();
        this.setup();
        this.addEvents();

    }

    init() {

        this.regl = createREGL( {
            optionalExtensions: ['oes_texture_float']
        } );

    }

    setup() {

        this.quadBuffer = [
            [-1, -1], [ 1, -1], [ 1,  1],
            [ 1,  1], [-1,  1], [-1, -1]
        ];

        this.uvQuadBuffer = [
            [ 0,  0], [1,  0], [1, 1],
            [ 1,  1], [0,  1], [0, 0]
        ];

        // create the fbo

        const SIZE = 1024;
        this.noiseFbo = this.regl.framebuffer( {

            color: this.regl.texture( {

                width: SIZE,
                height: SIZE,
                data: ( Array( SIZE * SIZE * 4 ) ).fill( 0 ),
                format: 'rgba',
                type: 'float',
                wrap: 'repeat'

            } ),

            depth: false

        } );

        this.drawNoise = this.regl( {

            vert: vs_quad,
            frag: fs_draw_noise,

            attributes: {
                position: this.quadBuffer,
                uv: this.uvQuadBuffer
            },

            uniforms: {
                uTime: ({tick}) => tick * 0.001
            },

            framebuffer: this.fbo,

            count: this.quadBuffer.length

        } );

        this.debugQuad = this.regl( {

            vert: vs_quad,
            frag: fs_debug,

            attributes: {
                position: this.quadBuffer,
                uv: this.uvQuadBuffer
            },

            uniforms: {
                uDebugTexture : this.regl.prop( 'textureToDebug' )
            },

            count: this.quadBuffer.length

        } );

        this.drawBunny = this.regl( {
            vert: `
              precision mediump float;
              attribute vec3 position;
              uniform mat4 model, view, projection;
              void main() {
                gl_Position = projection * view * model * vec4(position, 1);
              }`,

            frag: `
              precision mediump float;
              void main() {
                gl_FragColor = vec4(1, 1, 1, 1);
              }`,

            // this converts the vertices of the mesh into the position attribute
            attributes: {
                position: bunny.positions
            },

            // and this converts the faces fo the mesh into elements
            elements: bunny.cells,

            uniforms: {

                model: mat4.identity( [] ),
                view: ({tick}) => {
                    const t = 0.01 * tick
                    return mat4.lookAt([],
                        [30 * Math.cos(t), 2.5, 30 * Math.sin(t)],
                        [0, 2.5, 0],
                        [0, 1, 0])
                },
                projection: ({viewportWidth, viewportHeight}) =>
                    mat4.perspective( [],
                        Math.PI * 0.25,
                        viewportWidth / viewportHeight,
                        0.01,
                        1000)
            }
        } );

    }

    addEvents() {

        this.regl.frame( ( c ) => {

            this.animate( c );

        } );

    }

    animate( c ) {

        this.regl.clear( {
            color: [ 0.3, 0.1, 0, 1 ]
        } );

        this.drawNoise();
        this.debugQuad( {
            textureToDebug: this.noiseFbo.color[ 0 ]
        } );

        // this.drawBunny();
    }

    resize( w, h ) {

    }

}