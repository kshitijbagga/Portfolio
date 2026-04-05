// Dendrite Glow Vertex Shader
// Handles position transformation and passes data to fragment shader

uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vWorldPosition;
varying float vGlowIntensity;

void main() {
  vPosition = position;
  
  // Calculate world position for glow effects
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  
  // Create pulsing glow effect
  float pulse = sin(uTime * 2.0 + position.x * 0.5) * 0.5 + 0.5;
  vGlowIntensity = pulse;
  
  vec4 mvPosition = viewMatrix * worldPos;
  gl_Position = projectionMatrix * mvPosition;
  
  // Pass opacity and color to fragment shader
  gl_PointSize = 3.0 * (300.0 / -mvPosition.z);
}
