import { forwardRef } from 'react';
import { CVData } from '../types/cv';

interface Props {
  cvData: CVData;
}

/**
 * Single-page A4 print template.
 *
 * Strategy: render content at RENDER_WIDTH (1060px) with comfortable font sizes,
 * then CSS-scale the whole block down to exactly 794×1123px (A4 @ 96 dpi).
 * html2canvas captures the already-scaled, 794×1123 outer wrapper —
 * so the PDF is always exactly one page, nothing clipped, nothing overflowing.
 */

const A4_W = 794;
const A4_H = 1123;
const RENDER_W = 1060;                    // natural render width
const RENDER_H = Math.round(A4_H * RENDER_W / A4_W); // 1500px
const SCALE = A4_W / RENDER_W;           // 0.7491…

export const CVPrintTemplate = forwardRef<HTMLDivElement, Props>(({ cvData }, ref) => {
  const SIDEBAR        = '#1C2B3A';
  const SIDEBAR_ACCENT = '#2E7D8C';
  const SIDEBAR_TEXT   = '#E8EDF2';
  const SIDEBAR_MUTED  = '#A8B8C8';
  const ACCENT         = '#1C2B3A';
  const DIVIDER        = '#D0D8E0';
  const BODY           = '#1A1A2E';
  const MUTED          = '#4A5568';

  // Section heading style
  const sh = (light = false): React.CSSProperties => ({
    fontFamily: 'Georgia, serif',
    fontSize: '11px',
    fontWeight: 'bold',
    letterSpacing: '2.5px',
    textTransform: 'uppercase' as const,
    color: light ? SIDEBAR_ACCENT : ACCENT,
    borderBottom: `1px solid ${light ? 'rgba(255,255,255,0.2)' : DIVIDER}`,
    paddingBottom: '6px',
    marginBottom: '12px',
  });

  return (
    /* ── Outer shell: exact A4 size, clips anything that somehow overflows ── */
    <div
      ref={ref}
      style={{
        width: `${A4_W}px`,
        height: `${A4_H}px`,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#ffffff',
      }}
    >
      {/* ── Inner content: rendered at RENDER_W, then scaled to fit ── */}
      <div style={{
        width: `${RENDER_W}px`,
        height: `${RENDER_H}px`,
        transformOrigin: 'top left',
        transform: `scale(${SCALE})`,
        display: 'flex',
        flexDirection: 'row',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '16px',        // 12pt @ 96dpi
        lineHeight: '1.55',
        color: BODY,
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
      }}>

        {/* ─── LEFT SIDEBAR ─── */}
        <div style={{
          width: '340px',
          height: `${RENDER_H}px`,
          backgroundColor: SIDEBAR,
          padding: '38px 26px',
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
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#ffffff',
              lineHeight: '1.15',
              marginBottom: '12px',
            }}>
              {cvData.name}
            </div>
            <div style={{
              fontSize: '13px',
              color: SIDEBAR_MUTED,
              lineHeight: '1.8',
              borderLeft: `3px solid ${SIDEBAR_ACCENT}`,
              paddingLeft: '10px',
            }}>
              {cvData.title.split(' | ').map((part, i) => (
                <div key={i}>{part}</div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={sh(true)}>Kontakt</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { icon: '✆', val: cvData.phone },
                { icon: '✉', val: cvData.email },
                { icon: '◎', val: 'Polska' },
              ].map(({ icon, val }) => (
                <div key={icon} style={{ display: 'flex', gap: '9px', alignItems: 'flex-start' }}>
                  <span style={{ color: SIDEBAR_ACCENT, fontSize: '14px', flexShrink: 0, lineHeight: '1.55' }}>{icon}</span>
                  <span style={{ color: SIDEBAR_TEXT, fontSize: '14px', wordBreak: 'break-all' as const, lineHeight: '1.55' }}>{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div>
            <div style={sh(true)}>Umiejętności</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {Object.entries(cvData.skills).map(([category, items]) => (
                <div key={category}>
                  <div style={{
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: SIDEBAR_ACCENT,
                    marginBottom: '4px',
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.8px',
                  }}>
                    {category}
                  </div>
                  <div style={{ color: SIDEBAR_TEXT, fontSize: '13px', lineHeight: '1.6' }}>
                    {items.join('  ·  ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div>
            <div style={sh(true)}>Języki</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cvData.languages.map((lang, i) => (
                <div key={i} style={{ color: SIDEBAR_TEXT, fontSize: '14px' }}>{lang}</div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <div style={sh(true)}>Zainteresowania</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {cvData.interests.map((item, i) => (
                <div key={i} style={{ color: SIDEBAR_MUTED, fontSize: '13px', lineHeight: '1.5' }}>
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ─── RIGHT MAIN CONTENT ─── */}
        <div style={{
          flex: 1,
          padding: '38px 36px 28px 34px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
        }}>

          {/* Summary */}
          <div>
            <div style={sh()}>Profil Zawodowy</div>
            <p style={{
              fontSize: '15px',
              color: MUTED,
              lineHeight: '1.8',
              margin: '0',
              textAlign: 'justify' as const,
            }}>
              {cvData.summary}
            </p>
          </div>

          {/* Experience */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                    marginBottom: '5px',
                  }}>
                    <div>
                      <span style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '17px',
                        fontWeight: 'bold',
                        color: BODY,
                      }}>
                        {exp.position}
                      </span>
                      {exp.company && (
                        <span style={{ fontSize: '14px', color: MUTED, marginLeft: '7px' }}>
                          — {exp.company}
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontSize: '13px',
                      color: SIDEBAR_ACCENT,
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap' as const,
                      marginLeft: '10px',
                    }}>
                      {exp.period}
                    </span>
                  </div>
                  <ul style={{ margin: '3px 0 0 0', padding: '0 0 0 18px', listStyle: 'disc' }}>
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} style={{
                        fontSize: '14px',
                        color: MUTED,
                        lineHeight: '1.7',
                        paddingLeft: '3px',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {cvData.education.map((edu) => (
                <div key={edu.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '10px',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      color: BODY,
                      lineHeight: '1.4',
                    }}>
                      {edu.degree}
                    </div>
                    <div style={{ fontSize: '13px', color: MUTED, marginTop: '2px' }}>
                      {edu.school}
                    </div>
                  </div>
                  <span style={{
                    fontSize: '13px',
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
          <div style={{ paddingTop: '12px', borderTop: `1px solid ${DIVIDER}` }}>
            <p style={{
              fontSize: '10px',
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
    </div>
  );
});

CVPrintTemplate.displayName = 'CVPrintTemplate';
