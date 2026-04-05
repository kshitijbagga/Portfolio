// Dendrite Glow Fragment Shader
// Creates a glowing, energetic effect for dendritic branches

uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor;

varying vec3 vPosition;
varying vec3 vWorldPosition;
varying float vGlowIntensity;

// Noise function for organic glow variation
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

void main() {
  // Base color with glow intensity
  vec3 glowColor = uColor * (1.0 + vGlowIntensity * 0.5);
  
  // Add noise-based variation for organic feel
  float noiseVal = noise(vWorldPosition.xz * 2.0 + uTime * 0.1);
  glowColor += vec3(noiseVal * 0.2);
  
  // Create radial glow falloff
  float dist = length(vPosition.xy);
  float glow = exp(-dist * 2.0);
  
  // Pulsing effect
  float pulse = sin(uTime * 3.0) * 0.3 + 0.7;
  
  // Final color with glow
  vec3 finalColor = glowColor * glow * pulse;
  
  // Apply opacity
  float finalOpacity = uOpacity * (0.6 + vGlowIntensity * 0.4);
  
  gl_FragColor = vec4(finalColor, finalOpacity);
}
