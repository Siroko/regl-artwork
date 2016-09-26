precision highp float;

varying vec2 vUv;
uniform float t;

void main() {

    vec4 color = vec4( t, vUv.x, vUv.x, 1.0 );
    gl_FragColor = color;

}