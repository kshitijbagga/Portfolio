// Holographic Grid Fragment Shader
// Creates a futuristic holographic grid pattern

uniform float uTime;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uFadeDistance;

varying vec3 vPosition;
varying vec2 vUv;
varying float vGridLine;
varying float vDistance;

// Scanline effect
float scanline(float y, float time) {
  float scan = sin(y * 50.0 - time * 2.0);
  return smoothstep(0.0, 0.1, scan);
}

void main() {
  // Base grid color
  vec3 gridColor = uColor;
  
  // Add scanline effect
  float scan = scanline(vPosition.z, uTime);
  gridColor += vec3(scan * 0.3);
  
  // Pulsing glow on grid intersections
  float pulse = sin(uTime * 4.0 + vPosition.x * 0.5 + vPosition.z * 0.5) * 0.5 + 0.5;
  gridColor += pulse * 0.2;
  
  // Distance-based fade
  float fade = smoothstep(uFadeDistance, uFadeDistance * 0.5, vDistance);
  
  // Combine grid lines with fade
  float alpha = vGridLine * uOpacity * fade;
  
  // Add subtle glow around grid lines
  float glow = vGridLine * exp(-vDistance * 0.1) * 0.3;
  
  vec3 finalColor = gridColor + vec3(glow);
  
  gl_FragColor = vec4(finalColor, alpha);
}
