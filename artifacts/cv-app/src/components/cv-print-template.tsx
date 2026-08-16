import { forwardRef } from 'react';
import { CVData } from '../types/cv';

interface Props {
  cvData: CVData;
}

/**
 * Single-page A4 print template (794×1123px).
 * Fonts scaled up to fill the full page.
 * No buttons, no badges — pure CV document.
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
    fontSize: '8.5px',
    fontWeight: 'bold',
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    color: light ? SIDEBAR_ACCENT : ACCENT,
    borderBottom: `1px solid ${light ? 'rgba(255,255,255,0.15)' : DIVIDER}`,
    paddingBottom: '4px',
    marginBottom: '9px',
    marginTop: '0px',
  });

  return (
    <div
      ref={ref}
      style={{
        width: '794px',
        height: '1123px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '10px',
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
          width: '258px',
          height: '1123px',
          backgroundColor: SIDEBAR,
          padding: '36px 22px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0,
          overflow: 'hidden',
        }}
      >
        {/* Top group: Name + Contact + Skills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {/* Name & Title */}
          <div style={{ marginBottom: '22px' }}>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: '26px',
              fontWeight: 'bold',
              color: '#FFFFFF',
              lineHeight: '1.15',
              marginBottom: '10px',
            }}>
              {cvData.name}
            </div>
            <div style={{
              fontSize: '9.5px',
              color: SIDEBAR_MUTED,
              lineHeight: '1.7',
              borderLeft: `2px solid ${SIDEBAR_ACCENT}`,
              paddingLeft: '9px',
            }}>
              {cvData.title.split(' | ').map((part, i) => (
                <div key={i}>{part}</div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: '22px' }}>
            <div style={sectionHeader('Kontakt', true)}>Kontakt</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                <span style={{ color: SIDEBAR_ACCENT, fontSize: '9px', marginTop: '1px', flexShrink: 0 }}>✆</span>
                <span style={{ color: SIDEBAR_TEXT, fontSize: '10px' }}>{cvData.phone}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                <span style={{ color: SIDEBAR_ACCENT, fontSize: '9px', marginTop: '1px', flexShrink: 0 }}>✉</span>
                <span style={{ color: SIDEBAR_TEXT, fontSize: '9.5px', wordBreak: 'break-all' as const }}>{cvData.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '7px' }}>
                <span style={{ color: SIDEBAR_ACCENT, fontSize: '9px', marginTop: '1px', flexShrink: 0 }}>◎</span>
                <span style={{ color: SIDEBAR_TEXT, fontSize: '10px' }}>Polska</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ marginBottom: '22px' }}>
            <div style={sectionHeader('Umiejetnosci', true)}>Umiejętności</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {Object.entries(cvData.skills).map(([category, items]) => (
                <div key={category}>
                  <div style={{
                    fontSize: '8.5px',
                    fontWeight: 'bold',
                    color: SIDEBAR_ACCENT,
                    marginBottom: '3px',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.5px',
                  }}>
                    {category}
                  </div>
                  <div style={{ color: SIDEBAR_TEXT, fontSize: '9.5px', lineHeight: '1.65' }}>
                    {items.join('  ·  ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom group: Languages + Interests */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {/* Languages */}
          <div style={{ marginBottom: '22px' }}>
            <div style={sectionHeader('Jezyki', true)}>Języki</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {cvData.languages.map((lang, i) => (
                <div key={i} style={{ color: SIDEBAR_TEXT, fontSize: '10px' }}>{lang}</div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div style={{ marginBottom: '0px' }}>
            <div style={sectionHeader('Zainteresowania', true)}>Zainteresowania</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {cvData.interests.map((item, i) => (
                <div key={i} style={{ color: SIDEBAR_MUTED, fontSize: '9.5px', lineHeight: '1.5' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT MAIN CONTENT ─── */}
      <div
        style={{
          flex: 1,
          padding: '36px 32px 28px 30px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
        }}
      >
        {/* Summary */}
        <div style={{ marginBottom: '0px' }}>
          <div style={sectionHeader('Profil Zawodowy')}>Profil Zawodowy</div>
          <p style={{
            fontSize: '10px',
            color: MUTED,
            lineHeight: '1.75',
            margin: '0',
            textAlign: 'justify' as const,
          }}>
            {cvData.summary}
          </p>
        </div>

        {/* Experience */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '18px' }}>
          <div style={sectionHeader('Doswiadczenie Zawodowe')}>Doświadczenie Zawodowe</div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            flex: 1,
          }}>
            {cvData.experience.map((exp) => (
              <div key={exp.id}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: '3px',
                }}>
                  <div>
                    <span style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '11.5px',
                      fontWeight: 'bold',
                      color: BODY,
                    }}>
                      {exp.position}
                    </span>
                    {exp.company && (
                      <span style={{ fontSize: '10px', color: MUTED, marginLeft: '5px' }}>
                        — {exp.company}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: '9px',
                    color: SIDEBAR_ACCENT,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap' as const,
                    marginLeft: '8px',
                  }}>
                    {exp.period}
                  </span>
                </div>
                <ul style={{ margin: '3px 0 0 0', padding: '0 0 0 15px', listStyle: 'disc' }}>
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} style={{
                      fontSize: '9.5px',
                      color: MUTED,
                      lineHeight: '1.65',
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
        <div style={{ marginTop: '18px' }}>
          <div style={sectionHeader('Edukacja')}>Edukacja</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                      fontSize: '10.5px',
                      fontWeight: 'bold',
                      color: BODY,
                      lineHeight: '1.4',
                    }}>
                      {edu.degree}
                    </div>
                    <div style={{
                      fontSize: '9px',
                      color: MUTED,
                      marginTop: '1px',
                    }}>
                      {edu.school}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '9px',
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
        <div style={{ marginTop: '18px', paddingTop: '12px', borderTop: `1px solid ${DIVIDER}` }}>
          <p style={{
            fontSize: '7px',
            color: '#9CA3AF',
            lineHeight: '1.55',
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
