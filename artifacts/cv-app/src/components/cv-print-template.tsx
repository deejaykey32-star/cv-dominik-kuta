import { forwardRef } from 'react';
import { CVData } from '../types/cv';

interface Props {
  cvData: CVData;
}

/**
 * Single-page A4 print template (794×1123px @ 96dpi).
 * Base font: 12pt = 16px. All sizes derived from this scale.
 * No buttons, no badges — pure CV document.
 */
export const CVPrintTemplate = forwardRef<HTMLDivElement, Props>(({ cvData }, ref) => {
  // 1pt = 1.333px  →  12pt = 16px  (96dpi standard)
  const pt = (n: number) => `${(n * 1.333).toFixed(1)}px`;

  const SIDEBAR        = '#1C2B3A';
  const SIDEBAR_ACCENT = '#2E7D8C';
  const SIDEBAR_TEXT   = '#E8EDF2';
  const SIDEBAR_MUTED  = '#A8B8C8';
  const ACCENT         = '#1C2B3A';
  const DIVIDER        = '#D0D8E0';
  const BODY           = '#1A1A2E';
  const MUTED          = '#4A5568';

  const sh = (light = false): React.CSSProperties => ({
    fontFamily: 'Georgia, serif',
    fontSize: pt(8),          // 8pt section labels
    fontWeight: 'bold',
    letterSpacing: '2px',
    textTransform: 'uppercase' as const,
    color: light ? SIDEBAR_ACCENT : ACCENT,
    borderBottom: `1px solid ${light ? 'rgba(255,255,255,0.2)' : DIVIDER}`,
    paddingBottom: '5px',
    marginBottom: '10px',
  });

  return (
    <div
      ref={ref}
      style={{
        width: '794px',
        height: '1123px',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: pt(12),     // 12pt base
        color: BODY,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* ─── LEFT SIDEBAR ─── */}
      <div style={{
        width: '268px',
        height: '1123px',
        backgroundColor: SIDEBAR,
        padding: '28px 20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexShrink: 0,
        overflow: 'hidden',
      }}>

        {/* Name & Title */}
        <div>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: pt(22),   // 22pt name
            fontWeight: 'bold',
            color: '#FFFFFF',
            lineHeight: '1.15',
            marginBottom: '10px',
          }}>
            {cvData.name}
          </div>
          <div style={{
            fontSize: pt(9),    // 9pt title
            color: SIDEBAR_MUTED,
            lineHeight: '1.8',
            borderLeft: `2px solid ${SIDEBAR_ACCENT}`,
            paddingLeft: '9px',
          }}>
            {cvData.title.split(' | ').map((part, i) => (
              <div key={i}>{part}</div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <div style={sh(true)}>Kontakt</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            {[
              { icon: '✆', val: cvData.phone },
              { icon: '✉', val: cvData.email },
              { icon: '◎', val: 'Polska' },
            ].map(({ icon, val }) => (
              <div key={icon} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <span style={{ color: SIDEBAR_ACCENT, fontSize: pt(10), flexShrink: 0 }}>{icon}</span>
                <span style={{ color: SIDEBAR_TEXT, fontSize: pt(10.5), wordBreak: 'break-all' as const, lineHeight: '1.5' }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <div style={sh(true)}>Umiejętności</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {Object.entries(cvData.skills).map(([category, items]) => (
              <div key={category}>
                <div style={{
                  fontSize: pt(7.5),   // 7.5pt category label
                  fontWeight: 'bold',
                  color: SIDEBAR_ACCENT,
                  marginBottom: '3px',
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.5px',
                }}>
                  {category}
                </div>
                <div style={{ color: SIDEBAR_TEXT, fontSize: pt(10), lineHeight: '1.7' }}>
                  {items.join('  ·  ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div>
          <div style={sh(true)}>Języki</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
            {cvData.languages.map((lang, i) => (
              <div key={i} style={{ color: SIDEBAR_TEXT, fontSize: pt(11) }}>{lang}</div>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <div style={sh(true)}>Zainteresowania</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {cvData.interests.map((item, i) => (
              <div key={i} style={{ color: SIDEBAR_MUTED, fontSize: pt(10.5), lineHeight: '1.55' }}>
                {item}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── RIGHT MAIN CONTENT ─── */}
      <div style={{
        flex: 1,
        padding: '28px 30px 22px 28px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
      }}>

        {/* Summary */}
        <div>
          <div style={sh()}>Profil Zawodowy</div>
          <p style={{
            fontSize: pt(12),   // 12pt — standard body
            color: MUTED,
            lineHeight: '1.8',
            margin: '0',
            textAlign: 'justify' as const,
          }}>
            {cvData.summary}
          </p>
        </div>

        {/* Experience */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '0' }}>
          <div style={sh()}>Doświadczenie Zawodowe</div>
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
                  marginBottom: '4px',
                }}>
                  <div>
                    <span style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: pt(13),   // 13pt position title
                      fontWeight: 'bold',
                      color: BODY,
                    }}>
                      {exp.position}
                    </span>
                    {exp.company && (
                      <span style={{ fontSize: pt(11), color: MUTED, marginLeft: '6px' }}>
                        — {exp.company}
                      </span>
                    )}
                  </div>
                  <span style={{
                    fontSize: pt(10),
                    color: SIDEBAR_ACCENT,
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap' as const,
                    marginLeft: '8px',
                  }}>
                    {exp.period}
                  </span>
                </div>
                <ul style={{ margin: '2px 0 0 0', padding: '0 0 0 16px', listStyle: 'disc' }}>
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} style={{
                      fontSize: pt(11),   // 11pt bullets
                      color: MUTED,
                      lineHeight: '1.7',
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
        <div>
          <div style={sh()}>Edukacja</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
            {cvData.education.map((edu) => (
              <div key={edu.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                gap: '8px',
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: pt(12),   // 12pt degree
                    fontWeight: 'bold',
                    color: BODY,
                    lineHeight: '1.4',
                  }}>
                    {edu.degree}
                  </div>
                  <div style={{ fontSize: pt(10.5), color: MUTED, marginTop: '2px' }}>
                    {edu.school}
                  </div>
                </div>
                <span style={{
                  fontSize: pt(10),
                  color: SIDEBAR_ACCENT,
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap' as const,
                  flexShrink: 0,
                }}>
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RODO */}
        <div style={{ paddingTop: '10px', borderTop: `1px solid ${DIVIDER}` }}>
          <p style={{
            fontSize: pt(7),    // 7pt legal note
            color: '#9CA3AF',
            lineHeight: '1.6',
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
