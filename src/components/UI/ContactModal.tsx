import { motion, AnimatePresence } from 'framer-motion';
import { contact, socialLinks } from '../../data/contact';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(10px)',
            }}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              background: 'rgba(30, 30, 30, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              padding: '48px 40px',
              zIndex: 101,
              maxWidth: '480px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              backdropFilter: 'blur(30px) saturate(180%)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '24px',
                cursor: 'pointer',
                opacity: 0.7,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              ×
            </button>

            {/* Title */}
            <h2
              className="font-display"
              style={{
                fontSize: '22px',
                color: 'var(--text-primary)',
                marginBottom: '28px',
                letterSpacing: '0.05em',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              Get in Touch
            </h2>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Email */}
              <div style={{ textAlign: 'center' }}>
                <div
                  className="font-label"
                  style={{ fontSize: '11px', color: 'var(--text-label)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                >
                  Email
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {contact.email.map((email, idx) => (
                    <a
                      key={idx}
                      href={`mailto:${email}`}
                      style={{
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-dendrite)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                    >
                      {email}
                    </a>
                  ))}
                </div>
              </div>

              {/* Phone & Social */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div
                    className="font-label"
                    style={{ fontSize: '11px', color: 'var(--text-label)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                  >
                    Phone
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    style={{
                      color: 'var(--text-secondary)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-dendrite)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {contact.phone}
                  </a>
                </div>

                {/* Social Links */}
                <div>
                  <div
                    className="font-label"
                    style={{ fontSize: '11px', color: 'var(--text-label)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center' }}
                  >
                    Connect
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: 'rgba(0, 240, 255, 0.1)',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        borderRadius: '6px',
                        color: 'var(--text-primary)',
                        textDecoration: 'none',
                        fontSize: '13px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 240, 255, 0.2)';
                        e.currentTarget.style.borderColor = 'var(--accent-dendrite)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 240, 255, 0.1)';
                        e.currentTarget.style.borderColor = 'rgba(0, 240, 255, 0.3)';
                      }}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                
                {/* Resume Download */}
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <a
                    href="/resume.pdf"
                    download
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 24px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      fontSize: '13px',
                      transition: 'all 0.2s',
                      fontWeight: 500,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.borderColor = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    }}
                  >
                    <span>📄</span> Download Resume
                  </a>
                </div>
              </div>
            </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
