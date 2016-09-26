precision highp float;

uniform sampler2D uDebugTexture;
varying vec2 vUv;

void main() {

    vec4 color = texture2D( uDebugTexture, vUv );
    gl_FragColor = color;
}
