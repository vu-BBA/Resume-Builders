import { forwardRef } from 'react'
import { Mail, Phone } from 'lucide-react'

const ResumePage = forwardRef(({ data }, ref) => {
  const {
    personalDetails = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    themeColor = '#6366f1',
    headingColor = '#0f172a',
    textColor = '#475569',
    fontSize = 16,
    fontFamily = "'Outfit', sans-serif"
  } = data

  const sectionTitleStyle = {
    color: themeColor,
    borderBottom: `1px solid ${themeColor}15`,
    paddingBottom: '8px',
    marginBottom: '20px',
    fontSize: `${fontSize * 0.75}px`,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.2em'
  }

  const containerStyle = {
    minHeight: '297mm',
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    color: textColor
  }

  return (
    <div
      ref={ref}
      id="resume-page"
      className="bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto relative overflow-hidden flex flex-col transition-all duration-300"
      style={containerStyle}
    >
      {/* Dynamic Header */}
      <header className="relative pt-16 pb-12 px-12 overflow-hidden bg-slate-50 border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/2 h-full -skew-x-12 translate-x-1/4 opacity-[0.03] pointer-events-none" style={{ background: themeColor }}></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="flex-1">
            <h1 className="text-6xl font-black tracking-tighter leading-tight mb-2" style={{ color: headingColor }}>
              {personalDetails.name || 'Your Name'}
            </h1>
            <p className="text-2xl font-light uppercase tracking-[0.3em]" style={{ color: themeColor }}>
              {personalDetails.title || 'Job Title'}
            </p>
          </div>
          <div className="flex flex-col gap-2 text-right text-sm font-medium" style={{ color: textColor }}>
            {personalDetails.email && (
              <span className="flex items-center justify-end gap-2">
                {personalDetails.email} <Mail size={14} style={{ color: themeColor }} />
              </span>
            )}
            {personalDetails.phone && (
              <span className="flex items-center justify-end gap-2">
                {personalDetails.phone} <Phone size={14} style={{ color: themeColor }} />
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="p-12 flex-1 relative bg-white">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 space-y-12">
            
            {/* Summary */}
            {summary && (
              <section>
                <h2 style={sectionTitleStyle}>Executive Summary</h2>
                <p className="font-medium leading-relaxed italic border-l-[3px] pl-6" style={{ borderColor: `${themeColor}40`, fontSize: `${fontSize * 1.1}px` }}>
                  "{summary}"
                </p>
              </section>
            )}

            {/* Experience */}
            {experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
              <section>
                <h2 style={sectionTitleStyle}>Career Impact</h2>
                <div className="space-y-10">
                  {experience.filter(exp => exp.company || exp.role).map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-3">
                        <div className="flex flex-col">
                          <h3 className="text-2xl font-bold" style={{ color: headingColor }}>
                            {exp.role}
                          </h3>
                          <span className="text-lg font-semibold tracking-tight" style={{ color: themeColor }}>{exp.company}</span>
                        </div>
                        <span className="text-sm font-extrabold px-4 py-1.5 rounded-full bg-slate-100 tabular-nums">
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                         <p className="leading-relaxed font-medium pl-6 relative">
                          <span className="absolute left-0 top-3 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></span>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Bottom Row */}
            <div className="grid grid-cols-2 gap-12">
              {/* Education */}
              {education.length > 0 && education.some(edu => edu.university || edu.degree) && (
                <section>
                  <h2 style={sectionTitleStyle}>Academics</h2>
                  <div className="space-y-6">
                    {education.filter(edu => edu.university || edu.degree).map((edu, idx) => (
                      <div key={idx} className="relative pl-6">
                        <div className="absolute left-0 top-1.5 w-1 h-3/4 rounded-full" style={{ backgroundColor: `${themeColor}25` }}></div>
                        <h3 className="text-lg font-bold mb-0.5" style={{ color: headingColor }}>{edu.degree}</h3>
                        <p className="text-sm font-semibold mb-1" style={{ color: themeColor }}>{edu.university}</p>
                        <span className="text-xs font-bold text-slate-400 block">{edu.year}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Skills */}
              {skills.length > 0 && skills.some(skill => skill) && (
                <section>
                  <h2 style={sectionTitleStyle}>Skill Portfolio</h2>
                  <div className="flex flex-wrap gap-2">
                    {skills.filter(skill => skill).map((skill, idx) => (
                      <div key={idx} className="px-4 py-2 rounded-md text-sm font-bold border-b-2" style={{ backgroundColor: `${themeColor}08`, color: headingColor, borderColor: themeColor }}>
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="h-1.5 w-full mt-12" style={{ backgroundColor: themeColor }}></footer>
    </div>
  )
})

ResumePage.displayName = 'ResumePage'

export default ResumePage