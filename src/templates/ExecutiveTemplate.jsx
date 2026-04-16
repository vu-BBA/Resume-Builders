import { forwardRef } from 'react'
import { Mail, Phone, Globe } from 'lucide-react'

const ExecutiveTemplate = forwardRef(({ data }, ref) => {
  const {
    personalDetails = {},
    summary = '',
    experience = [],
    education = [],
    skills = [],
    profileImage = null,
    themeColor = '#1e3a5f',
    headingColor = '#0f172a',
    textColor = '#64748b',
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
      <div className="h-2 w-full" style={{ backgroundColor: themeColor }}></div>
      
      <div className="p-12">
        <div className="flex items-start justify-between mb-10 pb-10 border-b-2" style={{ borderColor: `${themeColor}20` }}>
          <div className="flex items-center gap-6">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold" style={{ backgroundColor: `${themeColor}15`, color: themeColor }}>
                {personalDetails.name?.charAt(0) || '?'}
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: headingColor }}>
                {personalDetails.name || 'Your Name'}
              </h1>
              <p className="text-xl font-medium" style={{ color: themeColor }}>
                {personalDetails.title || 'Job Title'}
              </p>
            </div>
          </div>
          <div className="text-right space-y-2">
            {personalDetails.email && (
              <div className="flex items-center gap-2 justify-end text-sm">
                <span>{personalDetails.email}</span>
                <Mail size={14} style={{ color: themeColor }} />
              </div>
            )}
            {personalDetails.phone && (
              <div className="flex items-center gap-2 justify-end text-sm">
                <span>{personalDetails.phone}</span>
                <Phone size={14} style={{ color: themeColor }} />
              </div>
            )}
          </div>
        </div>

        {summary && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-lg font-bold uppercase tracking-wider" style={{ color: headingColor }}>
                Executive Summary
              </h2>
            </div>
            <p className="leading-relaxed text-base pl-4" style={{ color: textColor }}>
              {summary}
            </p>
          </section>
        )}

        {experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-lg font-bold uppercase tracking-wider" style={{ color: headingColor }}>
                Professional Experience
              </h2>
            </div>
            <div className="space-y-8 pl-4">
              {experience.filter(exp => exp.company || exp.role).map((exp, idx) => (
                <div key={idx} className="relative">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: headingColor }}>{exp.role}</h3>
                      <p className="font-semibold" style={{ color: themeColor }}>{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium px-4 py-1.5 rounded" style={{ backgroundColor: `${themeColor}10`, color: themeColor }}>
                        {exp.startDate} — {exp.endDate}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="leading-relaxed mt-3" style={{ color: textColor }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid grid-cols-2 gap-12">
          {education.length > 0 && education.some(edu => edu.university || edu.degree) && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }}></div>
                <h2 className="text-lg font-bold uppercase tracking-wider" style={{ color: headingColor }}>
                  Education
                </h2>
              </div>
              <div className="space-y-4 pl-4">
                {education.filter(edu => edu.university || edu.degree).map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold" style={{ color: headingColor }}>{edu.degree}</h3>
                    <p style={{ color: themeColor }}>{edu.university}</p>
                    <p className="text-sm" style={{ color: textColor }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && skills.some(skill => skill) && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-6 rounded-full" style={{ backgroundColor: themeColor }}></div>
                <h2 className="text-lg font-bold uppercase tracking-wider" style={{ color: headingColor }}>
                  Core Competencies
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 pl-4">
                {skills.filter(skill => skill).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                    <span className="text-sm" style={{ color: textColor }}>{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <div className="h-1 w-full mt-auto" style={{ backgroundColor: themeColor }}></div>
    </div>
  )
})

ExecutiveTemplate.displayName = 'ExecutiveTemplate'
export default ExecutiveTemplate
