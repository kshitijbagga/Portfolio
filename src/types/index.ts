export type ProjectCategory = 'course' | 'internship' | 'research' | 'personal';
export type Stage = 'nucleation' | 'primary' | 'secondary' | 'convergence';
export type NodeSize = 'small' | 'medium' | 'large' | 'featured';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  category: ProjectCategory;
  stage: Stage;
  branch: string;

  description: string;
  achievements: string[];
  technologies: string[];
  metrics?: Array<{
    label: string;
    value: string;
  }>;

  links?: {
    github?: string;
    paper?: string;
    demo?: string;
    report?: string;
  };

  featured: boolean;
  position: [number, number, number];
  size: NodeSize;
  color: string;
}

export interface DendriticBranch {
  id: string;
  stage: Stage;
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  thickness: number;
}

export interface CameraTarget {
  position: [number, number, number];
  lookAt: [number, number, number];
  duration: number;
}
