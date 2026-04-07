import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { useIsMobile } from '../../hooks/useDeviceDetection';

interface ProjectsIndexProps {
  onSelectProject: (id: string) => void;
}

export default function ProjectsIndex({ onSelectProject }: ProjectsIndexProps) {
  const isMobile = useIsMobile();
  
  // Group projects by stage for better organization
  const stages = ['nucleation', 'primary', 'secondary', 'convergence'];
  
  const getStageLabel = (stage: string) => {
    switch(stage) {
      case 'nucleation': return 'Nucleation';
      case 'primary': return 'Primary Growth';
      case 'secondary': return 'Secondary Growth';
      case 'convergence': return 'Convergence';
      default: return stage;
    }
  };

  if (isMobile) {
    return null; // Hide projects index on mobile
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{
        position: 'fixed',
        top: '80px',
        right: '24px',
        zIndex: 10,
        maxWidth: '280px',
      }}
    >
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'rgba(20, 20, 20, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          maxHeight: 'calc(100vh - 280px)',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <h3 className="font-label" style={{ 
            fontSize: '11px', 
            color: '#ffffff', 
            letterSpacing: '0.15em',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span>PROJECT INDEX</span>
            <span style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.5)' }}>{projects.length} TOTAL</span>
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {stages.map((stage) => {
              const stageProjects = projects.filter(p => p.stage === stage);
              if (stageProjects.length === 0) return null;

              return (
                <div key={stage}>
                  <h4 className="font-label" style={{
                    fontSize: '10px',
                    color: '#ffffff',
                    letterSpacing: '0.12em',
                    marginBottom: '10px',
                    paddingBottom: '6px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    textTransform: 'uppercase',
                  }}>
                    {getStageLabel(stage)}
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {stageProjects.map((project, i) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => onSelectProject(project.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px 10px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '6px',
                          border: '1px solid transparent',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        whileHover={{ 
                          scale: 1.02,
                          x: 4,
                        }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.borderColor = `${project.color}40`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.borderColor = 'transparent';
                        }}
                      >
                        <div style={{ 
                          width: '10px', 
                          height: '10px', 
                          borderRadius: '50%',
                          background: project.color,
                          boxShadow: `0 0 8px ${project.color}80`,
                          flexShrink: 0,
                        }} />
                        
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="font-label" style={{ 
                            fontSize: '10px', 
                            color: '#ffffff',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                            {project.title}
                          </div>
                          <div style={{ 
                            fontSize: '8px', 
                            color: 'rgba(255, 255, 255, 0.4)', 
                            marginTop: '2px',
                            display: 'flex',
                            gap: '8px',
                          }}>
                            <span style={{ textTransform: 'capitalize' }}>{project.category}</span>
                            <span>•</span>
                            <span>{project.timeframe}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="font-label" style={{ 
            fontSize: '11px', 
            color: '#ffffff', 
            letterSpacing: '0.15em',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '8px',
          }}>
            NODE SIZES
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }} />
              <span className="font-label" style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>Small</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '14px', 
                height: '14px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }} />
              <span className="font-label" style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>Medium</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ 
                width: '18px', 
                height: '18px', 
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }} />
              <span className="font-label" style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.6)' }}>Large</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
