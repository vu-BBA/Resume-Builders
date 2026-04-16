import { forwardRef } from 'react'
import { Mail, Phone } from 'lucide-react'

const TimelineTemplate = forwardRef(({ data }, ref) => {
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
      <div className="p-12">
        <div className="text-center mb-12">
          {profileImage && (
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 shadow-xl"
              style={{ borderColor: themeColor }}
            />
          )}
          <h1 className="text-4xl font-black mb-2" style={{ color: headingColor }}>
            {personalDetails.name || 'Your Name'}
          </h1>
          <p className="text-xl font-medium mb-4" style={{ color: themeColor }}>
            {personalDetails.title || 'Job Title'}
          </p>
          <div className="flex justify-center gap-6">
            {personalDetails.email && (
              <span className="flex items-center gap-2 text-sm" style={{ color: textColor }}>
                <Mail size={14} style={{ color: themeColor }} />
                {personalDetails.email}
              </span>
            )}
            {personalDetails.phone && (
              <span className="flex items-center gap-2 text-sm" style={{ color: textColor }}>
                <Phone size={14} style={{ color: themeColor }} />
                {personalDetails.phone}
              </span>
            )}
          </div>
        </div>

        {summary && (
          <section className="mb-12 max-w-2xl mx-auto text-center">
            <div className="inline-block px-8 py-4 rounded-2xl" style={{ backgroundColor: `${themeColor}08` }}>
              <p className="text-lg leading-relaxed italic" style={{ color: textColor }}>
                "{summary}"
              </p>
            </div>
          </section>
        )}

        {experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
          <section className="mb-12 max-w-3xl mx-auto">
            <h2 className="text-center text-lg font-bold uppercase tracking-widest mb-8" style={{ color: themeColor }}>
              Experience
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2" style={{ backgroundColor: `${themeColor}20` }}></div>
              
              {experience.filter(exp => exp.company || exp.role).map((exp, idx) => (
                <div key={idx} className={`relative mb-8 ${idx % 2 === 0 ? 'pr-1/2' : 'pl-1/2'}`}>
                  <div className={`bg-white p-6 rounded-2xl shadow-lg border ${idx % 2 === 0 ? 'mr-8 text-right' : 'ml-8 text-left'}`}>
                    <div className={`absolute top-8 w-4 h-4 rounded-full border-4 bg-white ${idx % 2 === 0 ? '-right-10' : '-left-10'}`} style={{ borderColor: themeColor }}></div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-2" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                    <h3 className="text-lg font-bold" style={{ color: headingColor }}>{exp.role}</h3>
                    <p className="font-semibold mb-2" style={{ color: themeColor }}>{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm leading-relaxed" style={{ color: textColor }}>{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12 max-w-4xl mx-auto">
          {education.length > 0 && education.some(edu => edu.university || edu.degree) && (
            <section>
              <h2 className="text-center text-lg font-bold uppercase tracking-widest mb-6" style={{ color: themeColor }}>
                Education
              </h2>
              <div className="space-y-4">
                {education.filter(edu => edu.university || edu.degree).map((edu, idx) => (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${themeColor}15` }}>
                      <span className="text-2xl font-bold" style={{ color: themeColor }}>{edu.year?.charAt(0) || '2'}</span>
                    </div>
                    <h3 className="font-bold" style={{ color: headingColor }}>{edu.degree}</h3>
                    <p className="text-sm" style={{ color: textColor }}>{edu.university}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && skills.some(skill => skill) && (
            <section>
              <h2 className="text-center text-lg font-bold uppercase tracking-widest mb-6" style={{ color: themeColor }}>
                Skills
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
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

TimelineTemplate.displayName = 'TimelineTemplate'
export default TimelineTemplate
