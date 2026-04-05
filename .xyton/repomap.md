.gitignore

package-lock.json

package.json

README.md

tsconfig.json

vercel.json

src/types/index.ts:
    1	export type ProjectCategory = 'course' | 'internship' | 'research' | 'personal';
    2	export type Stage = 'nucleation' | 'primary' | 'secondary' | 'convergence';
    3	export type NodeSize = 'small' | 'medium' | 'large' | 'featured';
    4	
    5	export interface Project {
    6	  id: string;
...
   34	
   35	export interface DendriticBranch {
   36	  id: string;
...
   43	
   44	export interface CameraTarget {
   45	  position: [number, number, number];

src/hooks/useCameraAnimation.ts:
    3	
    4	export interface CameraTarget {
    5	  position: [number, number, number];
...
    8	
    9	export type ActiveStage = Stage | 'all';
   10	
...
   18	
   19	export function useCameraAnimation() {
   20	  const [activeStage, setActiveStage] = useState<ActiveStage>('all');

src/App.tsx:
   30	
   31	export default function App() {
   32	  const [selectedId, setSelectedId] = useState<string | null>(null);

src/components/Scene/DendriteGlow.tsx:
   76	
   77	interface DendriteGlowProps {
   78	  position?: [number, number, number];
...
   85	  namespace JSX {
   86	    interface IntrinsicElements {
   87	      dendriteGlowMaterial: any;
...
   91	
   92	export default function DendriteGlow({ 
   93	  position = [0, 0, 0], 

src/components/Scene/Nucleus.tsx:
    4	
    5	export default function Nucleus() {
    6	  const meshRef = useRef<THREE.Mesh>(null);

src/components/Scene/HolographicGrid.tsx:
   78	
   79	interface HolographicGridProps {
   80	  position?: [number, number, number];
...
   87	
   88	export default function HolographicGrid({ 
   89	  position = [0, -2, 0], 

src/components/Scene/ParticleSystem.tsx:
    4	
    5	interface ParticleSystemProps {
    6	  count?: number;
...
   10	
   11	export default function ParticleSystem({ 
   12	  count = 320, 

src/components/UI/AboutModal.tsx:
    3	
    4	interface AboutModalProps {
    5	  isOpen: boolean;
...
    8	
    9	export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
   10	  return (

src/components/UI/ContactModal.tsx:
    3	
    4	interface ContactModalProps {
    5	  isOpen: boolean;
...
    8	
    9	export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
   10	  return (

src/components/UI/PlaythroughOverlay.tsx:
    2	
    3	interface PlaythroughOverlayProps {
    4	  headline: string;
...
   10	
   11	export default function PlaythroughOverlay({
   12	  headline,

src/components/UI/ProjectCard.tsx:
    4	
    5	interface ProjectCardProps {
    6	  project: Project | null;
...
    9	
   10	export default function ProjectCard({ project, onClose }: ProjectCardProps) {
   11	  // Close on Escape

src/components/UI/SkillsPanel.tsx:
    3	
    4	interface SkillsPanelProps {
    5	  isOpen: boolean;
...
    8	
    9	export default function SkillsPanel({ isOpen, onClose }: SkillsPanelProps) {
   10	  if (!isOpen) return null;

src/hooks/usePlaythroughSound.ts:
    2	
    3	interface SoundOptions {
    4	  enabled?: boolean;
...
    7	
    8	export function usePlaythroughSound(options: SoundOptions = {}) {
    9	  const { enabled = true, volume = 0.5 } = options;

src/hooks/useDeviceDetection.ts:
    2	
    3	export function useIsMobile() {
    4	  const [isMobile, setIsMobile] = useState(false);
...
   23	
   24	export function useTouchDevice() {
   25	  const [isTouch, setIsTouch] = useState(false);

src/components/UI/MiniMap.tsx:
   10	
   11	function worldToMap(x: number, z: number): [number, number] {
   12	  const px = CENTER + (x / WORLD_RANGE) * MAP_SIZE * 0.9;
...
   16	
   17	interface MiniMapProps {
   18	  cameraX: number;
...
   23	
   24	export default function MiniMap({ cameraX, cameraZ, activeStage }: MiniMapProps) {
   25	  const [camPx, camPy] = worldToMap(cameraX, cameraZ);

src/hooks/useAutoPlaythrough.ts:
    4	
    5	export interface PlaythroughBeat {
    6	  time: number;
...
   82	
   83	export interface PlaythroughState {
   84	  isPlaying: boolean;
...
   92	
   93	export function useAutoPlaythrough(): PlaythroughState {
   94	  const [elapsed, setElapsed]       = useState(0);

src/components/Scene/ProjectNode.tsx:
   20	
   21	interface ProjectNodeProps {
   22	  project: Project;
...
   27	
   28	export default function ProjectNode({ project, onHover, onClick, dimmed = false }: ProjectNodeProps) {
   29	  const meshRef = useRef<THREE.Mesh>(null);

src/components/UI/Timeline.tsx:
   10	
   11	interface TimelineProps {
   12	  activeStage: ActiveStage;
...
   15	
   16	export default function Timeline({ activeStage, onStageClick }: TimelineProps) {
   17	  return (

src/components/Scene/CameraController.tsx:
    5	
    6	interface CameraControllerProps {
    7	  target: CameraTarget;
...
   12	
   13	export default function CameraController({ target, onPositionUpdate }: CameraControllerProps) {
   14	  const { camera, controls } = useThree();

src/components/Scene/DendriticStructure.tsx:
   11	
   12	interface DendriticStructureProps {
   13	  projects: Project[];
...
   21	
   22	export default function DendriticStructure({
   23	  projects,

AUDIO_UPDATE.md

CLEANUP_CHANGES.md

DEPLOYMENT.md

DEVELOPMENT_SUMMARY.md

ENHANCEMENTS_SUMMARY.md

eslint.config.js

FEATURES_GUIDE.md

index.html

nikitakondrashev-cinematic-space-510707.mp3

PHASE1_COMPLETE.md

public/favicon.svg

public/icons.svg

public/resume.pdf

public/space-music-v2.mp3

src/App.css

src/assets/hero.png

src/assets/react.svg

src/assets/vite.svg

src/data/about.ts

src/data/branches.ts

src/data/contact.ts

src/data/projects.ts

src/data/skills.ts

src/index.css

src/main.tsx

src/shaders/dendriteGlow/fragment.glsl

src/shaders/dendriteGlow/vertex.glsl

src/shaders/holographicGrid/fragment.glsl

src/shaders/holographicGrid/vertex.glsl

src/styles/globals.css

src/styles/mobile.css

tsconfig.app.json

tsconfig.node.json

vite.config.ts
