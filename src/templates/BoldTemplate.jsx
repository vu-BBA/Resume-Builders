import { forwardRef } from 'react'
import { Mail, Phone } from 'lucide-react'

const BoldTemplate = forwardRef(({ data }, ref) => {
  const {
    personalDetails = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    profileImage = null,
    themeColor = '#6366f1',
    headingColor = '#0f172a',
    textColor = '#475569',
    fontSize = 16,
    fontFamily = "'Outfit', sans-serif"
  } = data

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
      className="bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto relative transition-all duration-300"
      style={containerStyle}
    >
      <div className="h-48 relative overflow-hidden" style={{ backgroundColor: themeColor }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full -translate-y-1/2 translate-x-1/3" style={{ backgroundColor: headingColor }}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/3" style={{ backgroundColor: headingColor }}></div>
        </div>
        
        <div className="relative z-10 h-full flex items-end px-12 pb-6">
          {profileImage && (
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-2xl mr-8"
            />
          )}
          <div className="pb-2">
            <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
              {personalDetails.name || 'Your Name'}
            </h1>
            <p className="text-xl text-white/80 font-medium">
              {personalDetails.title || 'Job Title'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-12 py-10">
        <div className="flex gap-2 mb-8">
          {personalDetails.email && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100">
              <Mail size={14} style={{ color: themeColor }} />
              <span className="text-sm font-medium" style={{ color: textColor }}>{personalDetails.email}</span>
            </div>
          )}
          {personalDetails.phone && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100">
              <Phone size={14} style={{ color: themeColor }} />
              <span className="text-sm font-medium" style={{ color: textColor }}>{personalDetails.phone}</span>
            </div>
          )}
        </div>

        {summary && (
          <section className="mb-10 p-6 rounded-2xl" style={{ backgroundColor: `${themeColor}08` }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: themeColor }}>About Me</h2>
            <p className="leading-relaxed" style={{ color: textColor }}>{summary}</p>
          </section>
        )}

        {experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
          <section className="mb-10">
            <h2 className="text-xl font-black mb-6 pb-3 border-b-4" style={{ color: headingColor, borderColor: themeColor }}>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.filter(exp => exp.company || exp.role).map((exp, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-4">
                  <div className="col-span-2">
                    <div className="text-center">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-lg inline-block" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                        {exp.startDate}
                      </span>
                      <div className="w-0.5 h-8 mx-auto my-2" style={{ backgroundColor: themeColor }}></div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-lg inline-block" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                        {exp.endDate}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-10">
                    <h3 className="text-xl font-bold" style={{ color: headingColor }}>{exp.role}</h3>
                    <p className="font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</p>
                    {exp.description && (
                      <p className="leading-relaxed text-sm" style={{ color: textColor }}>{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-8">
          {education.length > 0 && education.some(edu => edu.university || edu.degree) && (
            <section>
              <h2 className="text-xl font-black mb-4" style={{ color: headingColor }}>Education</h2>
              <div className="space-y-4">
                {education.filter(edu => edu.university || edu.degree).map((edu, idx) => (
                  <div key={idx} className="p-4 rounded-xl border-l-4" style={{ backgroundColor: `${themeColor}05`, borderColor: themeColor }}>
                    <h3 className="font-bold" style={{ color: headingColor }}>{edu.degree}</h3>
                    <p style={{ color: themeColor }}>{edu.university}</p>
                    <p className="text-sm text-slate-400">{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && skills.some(skill => skill) && (
            <section>
              <h2 className="text-xl font-black mb-4" style={{ color: headingColor }}>Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.filter(skill => skill).map((skill, idx) => (
                  <span 
                    key={idx} 
                    className="px-4 py-2 rounded-full text-sm font-bold"
                    style={{ backgroundColor: `${themeColor}15`, color: themeColor }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
})

BoldTemplate.displayName = 'BoldTemplate'
export default BoldTemplate
