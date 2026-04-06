import { motion } from 'framer-motion';

export default function LegendPanel() {
  const branchColors = [
    { color: '#8338ec', name: 'Computational Materials', desc: 'Materials science & simulation' },
    { color: '#00f0ff', name: 'Machine Learning', desc: 'ML fundamentals & applications' },
    { color: '#ff006e', name: 'Programming Foundations', desc: 'Coding & analytics' },
    { color: '#00ff87', name: 'Generative AI', desc: 'GANs, VAEs, diffusion models' },
  ];

  const stageInfo = [
    { stage: 'Nucleation', year: '2022', color: '#8338ec', desc: 'Foundation at IIT Kanpur' },
    { stage: 'Primary Growth', year: '2023-24', color: '#00f0ff', desc: 'Core skill development' },
    { stage: 'Secondary Growth', year: '2024-25', color: '#ff006e', desc: 'Advanced specializations' },
    { stage: 'Convergence', year: 'Present', color: '#00f0ff', desc: 'Professional application' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      style={{
        position: 'fixed',
        top: '80px',
        left: '24px',
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
          }}>
            BRANCH COLORS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {branchColors.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '3px',
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}80`,
                }} />
                <div>
                  <div className="font-label" style={{ fontSize: '9px', color: item.color, fontWeight: 600 }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '2px' }}>
                    {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h3 className="font-label" style={{ 
            fontSize: '11px', 
            color: '#ffffff', 
            letterSpacing: '0.15em',
            marginBottom: '12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '8px',
          }}>
            TIMELINE STAGES
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {stageInfo.map((item, i) => (
              <motion.div
                key={item.stage}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 + 0.4 }}
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <div style={{ 
                  width: '10px', 
                  height: '10px', 
                  borderRadius: '50%',
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}80`,
                }} />
                <div style={{ flex: 1 }}>
                  <div className="font-label" style={{ fontSize: '9px', color: '#ffffff', fontWeight: 600 }}>
                    {item.stage}
                  </div>
                  <div style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.4)', marginTop: '2px' }}>
                    {item.year} · {item.desc}
                  </div>
                </div>
              </motion.div>
            ))}
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.4)' }} />
              <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.5)' }}>Course</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.6)' }} />
              <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.5)' }}>Project/Internship</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '16px', height: '16px', borderRadius: '3px', background: 'rgba(255, 255, 255, 0.8)' }} />
              <span style={{ fontSize: '8px', color: 'rgba(255, 255, 255, 0.5)' }}>Featured Work</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
