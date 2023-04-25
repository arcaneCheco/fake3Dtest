uniform float uTime;
uniform vec2 uMouse;
uniform sampler2D uMap;
uniform sampler2D uDepth;
varying vec2 vUv;

void main() {
	float depth = texture2D(uDepth, vUv).r;
	// vec4 map = texture2D(uMap, vUv + uMouse * (depth - 0.5) * 0.1);
	vec4 map = texture2D(uMap, (vUv - 0.5) * 0.9 + 0.5 + uMouse * (depth - 0.5) * 0.1);
	gl_FragColor = vec4(vUv, 0., 1.);
	gl_FragColor = map;
}