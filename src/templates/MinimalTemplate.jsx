import { forwardRef } from 'react'
import { Mail, Phone } from 'lucide-react'

const MinimalTemplate = forwardRef(({ data }, ref) => {
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
        <div className="flex items-start justify-between mb-16">
          <div className="flex items-center gap-6">
            {profileImage && (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            )}
            <div>
              <h1 className="text-5xl font-bold mb-2 tracking-tight" style={{ color: headingColor }}>
                {personalDetails.name || 'Your Name'}
              </h1>
              <p className="text-xl font-light" style={{ color: themeColor }}>
                {personalDetails.title || 'Job Title'}
              </p>
            </div>
          </div>
          <div className="text-right space-y-1">
            <div className="flex items-center gap-2 justify-end text-sm" style={{ color: textColor }}>
              <span>{personalDetails.email}</span>
              <Mail size={14} style={{ color: themeColor }} />
            </div>
            {personalDetails.phone && (
              <div className="flex items-center gap-2 justify-end text-sm" style={{ color: textColor }}>
                <span>{personalDetails.phone}</span>
                <Phone size={14} style={{ color: themeColor }} />
              </div>
            )}
          </div>
        </div>

        {summary && (
          <section className="mb-12">
            <p className="text-lg leading-relaxed max-w-3xl" style={{ color: textColor }}>
              {summary}
            </p>
          </section>
        )}

        <div className="grid grid-cols-3 gap-16">
          <div className="col-span-2">
            {experience.length > 0 && experience.some(exp => exp.company || exp.role) && (
              <section className="mb-12">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-8" style={{ color: themeColor }}>
                  Experience
                </h2>
                <div className="space-y-8">
                  {experience.filter(exp => exp.company || exp.role).map((exp, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline mb-2">
                        <div>
                          <h3 className="text-xl font-bold" style={{ color: headingColor }}>{exp.role}</h3>
                          <p className="font-medium" style={{ color: themeColor }}>{exp.company}</p>
                        </div>
                        <span className="text-sm" style={{ color: textColor }}>
                          {exp.startDate} — {exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="leading-relaxed" style={{ color: textColor }}>{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && education.some(edu => edu.university || edu.degree) && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: themeColor }}>
                  Education
                </h2>
                <div className="space-y-4">
                  {education.filter(edu => edu.university || edu.degree).map((edu, idx) => (
                    <div key={idx} className="flex justify-between items-baseline">
                      <div>
                        <h3 className="font-bold" style={{ color: headingColor }}>{edu.degree}</h3>
                        <p style={{ color: textColor }}>{edu.university}</p>
                      </div>
                      <span className="text-sm" style={{ color: textColor }}>{edu.year}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div>
            {skills.length > 0 && skills.some(skill => skill) && (
              <section className="mb-12">
                <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: themeColor }}>
                  Skills
                </h2>
                <div className="space-y-2">
                  {skills.filter(skill => skill).map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                      <span className="text-sm" style={{ color: textColor }}>{skill}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

MinimalTemplate.displayName = 'MinimalTemplate'
export default MinimalTemplate
