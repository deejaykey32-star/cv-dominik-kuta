import { forwardRef } from 'react';
import { CVData } from '../types/cv';

interface Props {
  cvData: CVData;
}

/**
 * A4-proportioned, print-ready CV template rendered off-screen.
 * Captured by html2canvas for PDF export — no buttons, no badges, no UI chrome.
 * Uses inline styles to guarantee rendering consistency across browsers.
 */
export const CVPrintTemplate = forwardRef<HTMLDivElement, Props>(({ cvData }, ref) => {
  const SIDEBAR = '#1C2B3A';
  const SIDEBAR_ACCENT = '#2E7D8C';
  const SIDEBAR_TEXT = '#E8EDF2';
  const SIDEBAR_MUTED = '#A8B8C8';
  const ACCENT = '#1C2B3A';
  const DIVIDER = '#D0D8E0';
  const BODY = '#1A1A2E';
  const MUTED = '#4A5568';

  const sectionHeader = (title: string, light = false): React.CSSProperties => ({
    fontFamily: 'Georgia, serif',
    fontSize: '7px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    color: light ? SIDEBAR_ACCENT : ACCENT,
    borderBottom: `1px solid ${light ? 'rgba(255,255,255,0.15)' : DIVIDER}`,
    paddingBottom: '4px',
    marginBottom: '8px',
    marginTop: '0px',
  });

  return (
    <div
      ref={ref}
      style={{
        width: '794px',
        minHeight: '1123px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '9px',
        lineHeight: '1.5',
        color: BODY,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ─── LEFT SIDEBAR ─── */}
      <div
        style={{
          width: '252px',
          minHeight: '1123px',
          backgroundColor: SIDEBAR,
          padding: '36px 22px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
          flexShrink: 0,
        }}
      >
        {/* Name & Title (in sidebar) */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#FFFFFF',
            lineHeight: '1.2',
            marginBottom: '8px',
          }}>
            {cvData.name}
          </div>
          <div style={{
            fontSize: '8px',
            color: SIDEBAR_MUTED,
            lineHeight: '1.6',
            borderLeft: `2px solid ${SIDEBAR_ACCENT}`,
            paddingLeft: '8px',
          }}>
            {cvData.title.split(' | ').map((part, i) => (
              <div key={i}>{part}</div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '20px' }}>
          <div style={sectionHeader('Kontakt', true)}>Kontakt</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ color: SIDEBAR_ACCENT, fontSize: '8px', marginTop: '1px', flexShrink: 0 }}>✆</span>
              <span style={{ color: SIDEBAR_TEXT, fontSize: '8.5px' }}>{cvData.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ color: SIDEBAR_ACCENT, fontSize: '8px', marginTop: '1px', flexShrink: 0 }}>✉</span>
              <span style={{ color: SIDEBAR_TEXT, fontSize: '8px', wordBreak: 'break-all' as const }}>{cvData.email}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <span style={{ color: SIDEBAR_ACCENT, fontSize: '8px', marginTop: '1px', flexShrink: 0 }}>◎</span>
              <span style={{ color: SIDEBAR_TEXT, fontSize: '8.5px' }}>Polska</span>
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '20px' }}>
          <div style={sectionHeader('Umiejetnosci', true)}>Umiejętności</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(cvData.skills).map(([category, items]) => (
              <div key={category}>
                <div style={{
                  fontSize: '7.5px',
                  fontWeight: 'bold',
                  color: SIDEBAR_ACCENT,
                  marginBottom: '3px',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px',
                }}>
                  {category}
                </div>
                <div style={{ color: SIDEBAR_TEXT, fontSize: '8px', lineHeight: '1.6' }}>
                  {items.join('  ·  ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div style={{ marginBottom: '20px' }}>
          <div style={sectionHeader('Jezyki', true)}>Języki</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {cvData.languages.map((lang, i) => (
              <div key={i} style={{ color: SIDEBAR_TEXT, fontSize: '8.5px' }}>{lang}</div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div style={{ marginBottom: '20px' }}>
          <div style={sectionHeader('Zainteresowania', true)}>Zainteresowania</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            {cvData.interests.map((item, i) => (
              <div key={i} style={{ color: SIDEBAR_MUTED, fontSize: '8px', lineHeight: '1.5' }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Additional */}
        {cvData.additional && cvData.additional.length > 0 && (
          <div style={{ marginBottom: '20px' }}>
            <div style={sectionHeader('Dodatkowe', true)}>Dodatkowe</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {cvData.additional.map((item, i) => (
                <div key={i} style={{ color: SIDEBAR_MUTED, fontSize: '8px', lineHeight: '1.5' }}>{item}</div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── RIGHT MAIN CONTENT ─── */}
      <div
        style={{
          flex: 1,
          padding: '36px 30px 36px 28px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
          backgroundColor: '#FFFFFF',
          overflowX: 'hidden',
        }}
      >
        {/* Summary */}
        <div style={{ marginBottom: '18px' }}>
          <div style={sectionHeader('Profil Zawodowy')}>Profil Zawodowy</div>
          <p style={{
            fontSize: '8.5px',
            color: MUTED,
            lineHeight: '1.7',
            margin: '0',
            textAlign: 'justify' as const,
          }}>
            {cvData.summary}
          </p>
        </div>

        {/* Experience */}
        <div style={{ marginBottom: '18px' }}>
          <div style={sectionHeader('Doswiadczenie Zawodowe')}>Doświadczenie Zawodowe</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
            {cvData.experience.map((exp) => (
              <div key={exp.id}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '2px',
                }}>
                  <div>
                    <span style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      color: BODY,
                    }}>
                      {exp.position}
                    </span>
                    {exp.company && (
                      <span style={{ fontSize: '9px', color: MUTED, marginLeft: '5px' }}>
                        — {exp.company}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '7.5px',
                    color: SIDEBAR_ACCENT,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap' as const,
                    marginLeft: '8px',
                  }}>
                    {exp.period}
                  </span>
                </div>
                <ul style={{ margin: '4px 0 0 0', padding: '0 0 0 14px', listStyle: 'disc' }}>
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} style={{
                      fontSize: '8px',
                      color: MUTED,
                      lineHeight: '1.6',
                      paddingLeft: '2px',
                    }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div style={{ marginBottom: '14px' }}>
          <div style={sectionHeader('Edukacja')}>Edukacja</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {cvData.education.map((edu) => (
              <div key={edu.id}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '8px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      color: BODY,
                      lineHeight: '1.4',
                    }}>
                      {edu.degree}
                    </div>
                    <div style={{
                      fontSize: '7.5px',
                      color: MUTED,
                      marginTop: '1px',
                    }}>
                      {edu.school}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '7.5px',
                    color: SIDEBAR_ACCENT,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap' as const,
                    flexShrink: 0,
                  }}>
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RODO */}
        <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: `1px solid ${DIVIDER}` }}>
          <p style={{
            fontSize: '6.5px',
            color: '#9CA3AF',
            lineHeight: '1.5',
            margin: '0',
            textAlign: 'justify' as const,
            fontStyle: 'italic' as const,
          }}>
            {cvData.rodo}
          </p>
        </div>
      </div>
    </div>
  );
});

CVPrintTemplate.displayName = 'CVPrintTemplate';
