import { forwardRef } from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

const TwoColumnTemplate = forwardRef(({ data }, ref) => {
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
      className="bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto relative flex transition-all duration-300"
      style={containerStyle}
    >
      <div className="w-[30%] p-8" style={{ backgroundColor: headingColor }}>
        <div className="mb-8">
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white/20"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto bg-white/10 flex items-center justify-center">
              <span className="text-4xl font-bold text-white/50">
                {personalDetails.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-center text-white mb-1">
          {personalDetails.name || 'Your Name'}
        </h1>
        <p className="text-center text-white/80 text-sm mb-8">
          {personalDetails.title || 'Job Title'}
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
              Contact
            </h3>
            <div className="space-y-2">
              {personalDetails.email && (
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <Mail size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{personalDetails.email}</span>
                </div>
              )}
              {personalDetails.phone && (
                <div className="flex items-start gap-2 text-white/70 text-sm">
                  <Phone size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{personalDetails.phone}</span>
                </div>
              )}
            </div>
          </div>

          {skills.length > 0 && skills.some(skill => skill) && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
                Skills
              </h3>
              <div className="space-y-2">
                {skills.filter(skill => skill).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                    <span className="text-white/70 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {education.length > 0 && education.some(edu => edu.university || edu.degree) && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>
                Education
              </h3>
              <div className="space-y-4">
                {education.filter(edu => edu.university || edu.degree).map((edu, idx) => (
                  <div key={idx}>
                    <p className="text-white font-medium text-sm">{edu.degree}</p>
                    <p className="text-white/60 text-xs">{edu.university}</p>
                    <p className="text-white/40 text-xs">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-[70%] p-10 bg-white">
        {summary && (
          <section className="mb-10 pb-8 border-b border-slate-100">
            <h2 className="text-lg font-bold mb-4" style={{ color: themeColor }}>
              Professional Summary
            </h2>
            <p className="leading-relaxed" style={{ color: textColor }}>
              {summary}
            </p>
          </section>
        )}

        {experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
          <section>
            <h2 className="text-lg font-bold mb-6" style={{ color: themeColor }}>
              Work Experience
            </h2>
            <div className="space-y-6">
              {experience.filter(exp => exp.company || exp.role).map((exp, idx) => (
                <div key={idx} className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2" style={{ borderColor: themeColor, backgroundColor: 'white' }}></div>
                  {idx < experience.filter(e => e.company || e.role).length - 1 && (
                    <div className="absolute left-[5px] top-6 w-0.5 h-full" style={{ backgroundColor: `${themeColor}20` }}></div>
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: headingColor }}>{exp.role}</h3>
                      <p className="font-medium" style={{ color: themeColor }}>{exp.company}</p>
                    </div>
                    <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-sm leading-relaxed" style={{ color: textColor }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
})

TwoColumnTemplate.displayName = 'TwoColumnTemplate'
export default TwoColumnTemplate
