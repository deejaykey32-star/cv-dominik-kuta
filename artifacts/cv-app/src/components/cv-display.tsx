import React from 'react';
import { useCV } from '../context/cv-context';
import { EditableField } from './editable-field';
import { Trash2, Plus } from 'lucide-react';

export function CVDisplay() {
  const { cvData, setCVData, editMode } = useCV();

  const handleUpdate = (field: keyof typeof cvData, value: any) => {
    setCVData({ ...cvData, [field]: value });
  };

  const handleNestedUpdate = (
    field: 'experience' | 'education',
    index: number,
    subfield: string,
    value: string
  ) => {
    const newArray = [...cvData[field]] as any[];
    newArray[index][subfield] = value;
    setCVData({ ...cvData, [field]: newArray });
  };

  const handleBulletUpdate = (expIndex: number, bulletIndex: number, value: string) => {
    const newExp = [...cvData.experience];
    newExp[expIndex].bullets[bulletIndex] = value;
    setCVData({ ...cvData, experience: newExp });
  };

  const handleSkillsUpdate = (category: string, value: string) => {
    const newSkills = { ...cvData.skills };
    newSkills[category] = value.split(',').map(s => s.trim()).filter(Boolean);
    setCVData({ ...cvData, skills: newSkills });
  };

  const handleSimpleArrayUpdate = (field: 'languages' | 'interests' | 'additional', value: string) => {
    setCVData({ ...cvData, [field]: value.split('\n').filter(Boolean) });
  };

  return (
    <div id="cv-content" className="bg-card text-card-foreground shadow-sm rounded-xl overflow-hidden border border-border w-full max-w-5xl mx-auto flex flex-col md:flex-row min-h-[1056px]">
      
      {/* LEFT COLUMN - Sidebar */}
      <aside className="w-full md:w-[32%] bg-secondary/50 p-8 md:p-10 flex flex-col gap-8 md:border-r border-border">
        {/* Contact Info */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 uppercase text-primary/80 text-sm">Kontakt</h2>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground font-medium">
            <div>
              <EditableField 
                value={cvData.phone} 
                onChange={(val) => handleUpdate('phone', val)}
                className="text-foreground block"
              />
            </div>
            <div>
              <EditableField 
                value={cvData.email} 
                onChange={(val) => handleUpdate('email', val)}
                className="text-foreground block"
              />
            </div>
            <div className="text-muted-foreground">Polska</div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 uppercase text-primary/80 text-sm">Umiejętności</h2>
          <div className="flex flex-col gap-6">
            {Object.entries(cvData.skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="font-semibold text-foreground mb-2 text-sm">{category}</h3>
                {editMode ? (
                  <EditableField
                    value={items.join(', ')}
                    onChange={(val) => handleSkillsUpdate(category, val)}
                    multiline
                    className="text-sm font-sans"
                  />
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill, i) => (
                      <span key={i} className="badge inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-background border border-border text-foreground shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 uppercase text-primary/80 text-sm">Języki</h2>
          {editMode ? (
            <EditableField
              value={cvData.languages.join('\n')}
              onChange={(val) => handleSimpleArrayUpdate('languages', val)}
              multiline
              className="text-sm"
            />
          ) : (
            <ul className="list-none space-y-1 text-sm font-medium">
              {cvData.languages.map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
            </ul>
          )}
        </section>

        {/* Interests */}
        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4 uppercase text-primary/80 text-sm">Zainteresowania</h2>
          {editMode ? (
            <EditableField
              value={cvData.interests.join('\n')}
              onChange={(val) => handleSimpleArrayUpdate('interests', val)}
              multiline
              className="text-sm"
            />
          ) : (
            <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-muted-foreground marker:text-muted">
              {cvData.interests.map((interest, i) => (
                <li key={i}><span className="text-foreground">{interest}</span></li>
              ))}
            </ul>
          )}
        </section>
      </aside>

      {/* RIGHT COLUMN - Main Content */}
      <main className="w-full md:w-[68%] p-8 md:p-12 flex flex-col gap-8 md:gap-10 bg-card">
        
        {/* Header */}
        <header className="border-b border-border pb-8">
          <EditableField 
            tag="h1"
            value={cvData.name} 
            onChange={(val) => handleUpdate('name', val)}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-3"
          />
          <EditableField 
            tag="h2"
            value={cvData.title} 
            onChange={(val) => handleUpdate('title', val)}
            className="text-lg md:text-xl font-medium text-muted-foreground tracking-tight leading-snug"
          />
        </header>

        {/* Summary */}
        <section aria-label="Profil zawodowy">
          <h2 className="text-xl font-bold tracking-tight mb-4 uppercase text-primary/80 text-sm">Profil Zawodowy</h2>
          <EditableField 
            tag="p"
            value={cvData.summary} 
            onChange={(val) => handleUpdate('summary', val)}
            multiline
            className="text-base text-foreground leading-relaxed font-sans"
          />
        </section>

        {/* Experience */}
        <section aria-label="Doświadczenie zawodowe">
          <h2 className="text-xl font-bold tracking-tight mb-5 uppercase text-primary/80 text-sm">Doświadczenie Zawodowe</h2>
          <div className="flex flex-col gap-8">
            {cvData.experience.map((exp, expIndex) => (
              <article key={exp.id} className="relative">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2 gap-1">
                  <h3 className="text-lg font-bold text-foreground">
                    <EditableField
                      value={exp.position}
                      onChange={(val) => handleNestedUpdate('experience', expIndex, 'position', val)}
                    />
                    {exp.company && (
                      <>
                        <span className="text-muted-foreground font-normal mx-2">w</span>
                        <EditableField
                          value={exp.company}
                          onChange={(val) => handleNestedUpdate('experience', expIndex, 'company', val)}
                        />
                      </>
                    )}
                  </h3>
                  <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    <EditableField
                      value={exp.period}
                      onChange={(val) => handleNestedUpdate('experience', expIndex, 'period', val)}
                    />
                  </div>
                </div>
                
                {editMode ? (
                  <EditableField
                    value={exp.bullets.join('\n')}
                    onChange={(val) => {
                      const newExp = [...cvData.experience];
                      newExp[expIndex].bullets = val.split('\n').filter(Boolean);
                      setCVData({ ...cvData, experience: newExp });
                    }}
                    multiline
                    className="text-sm mt-2"
                  />
                ) : (
                  <ul className="list-disc list-outside ml-4 space-y-1.5 text-base text-muted-foreground marker:text-muted">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}><span className="text-foreground">{bullet}</span></li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Education */}
        <section aria-label="Edukacja">
          <h2 className="text-xl font-bold tracking-tight mb-5 uppercase text-primary/80 text-sm">Edukacja</h2>
          <div className="flex flex-col gap-5">
            {cvData.education.map((edu, eduIndex) => (
              <article key={edu.id} className="relative">
                <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1 mb-1">
                  <h3 className="text-base font-bold text-foreground">
                    <EditableField
                      value={edu.degree}
                      onChange={(val) => handleNestedUpdate('education', eduIndex, 'degree', val)}
                    />
                  </h3>
                  <div className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    <EditableField
                      value={edu.period}
                      onChange={(val) => handleNestedUpdate('education', eduIndex, 'period', val)}
                    />
                  </div>
                </div>
                <div className="text-sm text-foreground">
                  <EditableField
                    value={edu.school}
                    onChange={(val) => handleNestedUpdate('education', eduIndex, 'school', val)}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Additional */}
        {cvData.additional && cvData.additional.length > 0 && (
          <section aria-label="Informacje dodatkowe">
            <h2 className="text-xl font-bold tracking-tight mb-4 uppercase text-primary/80 text-sm">Informacje Dodatkowe</h2>
            {editMode ? (
              <EditableField
                value={cvData.additional.join('\n')}
                onChange={(val) => handleSimpleArrayUpdate('additional', val)}
                multiline
                className="text-sm"
              />
            ) : (
              <ul className="list-disc list-outside ml-4 space-y-1 text-sm text-muted-foreground marker:text-muted">
                {cvData.additional.map((item, i) => (
                  <li key={i}><span className="text-foreground">{item}</span></li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* RODO */}
        <section className="mt-auto pt-10 border-t border-border mt-8" aria-label="Klauzula RODO">
          <p className="text-[10px] text-muted-foreground/70 leading-relaxed text-justify font-sans">
            <EditableField
              value={cvData.rodo}
              onChange={(val) => handleUpdate('rodo', val)}
              multiline
              className="w-full min-h-[60px]"
            />
          </p>
        </section>

      </main>
    </div>
  );
}
