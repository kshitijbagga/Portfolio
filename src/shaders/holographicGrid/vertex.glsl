// Holographic Grid Vertex Shader
// Creates a moving grid plane with perspective effects

uniform float uTime;
uniform vec2 uGridSize;
uniform float uGridSpacing;

varying vec3 vPosition;
varying vec2 vUv;
varying float vGridLine;
varying float vDistance;

void main() {
  vUv = uv;
  vPosition = position;
  
  // Create moving grid effect
  vec3 pos = position;
  pos.x += sin(uTime * 0.5 + pos.z * 0.1) * 0.2;
  pos.z += cos(uTime * 0.3 + pos.x * 0.1) * 0.2;
  
  // Calculate distance from center for fade effect
  vDistance = length(pos.xz);
  
  // Grid line calculation
  float gridX = mod(pos.x / uGridSpacing, 1.0);
  float gridZ = mod(pos.z / uGridSpacing, 1.0);
  
  // Create smooth grid lines
  float lineThickness = 0.1;
  float lineX = smoothstep(lineThickness, 0.0, abs(gridX - 0.5));
  float lineZ = smoothstep(lineThickness, 0.0, abs(gridZ - 0.5));
  
  vGridLine = max(lineX, lineZ);
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
