import React, { useState, useRef, memo } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { ChromePicker } from 'react-color'
import { Plus, Trash2, Download, Sparkles, User, Briefcase, GraduationCap, Code, Palette, Zap, Type, MoveVertical, Image, Layout, Layers } from 'lucide-react'
import ClassicTemplate from './templates/ClassicTemplate'
import ModernTemplate from './templates/ModernTemplate'
import CreativeTemplate from './templates/CreativeTemplate'
import { downloadPDF } from './utils/downloadPDF'
import axios from 'axios'

const FONT_OPTIONS = [
  { name: 'Modern Sans (Outfit)', value: "'Outfit', sans-serif" },
  { name: 'Clean Minimal (Inter)', value: "'Inter', sans-serif" },
  { name: 'Elegant Serif (Playfair Display)', value: "'Playfair Display', serif" },
  { name: 'Geometric (Montserrat)', value: "'Montserrat', sans-serif" }
]

const TEMPLATES = [
  { id: 'classic', name: 'Classic', icon: Layout, component: ClassicTemplate },
  { id: 'modern', name: 'Modern', icon: Layers, component: ModernTemplate },
  { id: 'creative', name: 'Creative', icon: Sparkles, component: CreativeTemplate }
]

function ResumeBuilder() {
  const [themeColor, setThemeColor] = useState('#6366f1')
  const [headingColor, setHeadingColor] = useState('#0f172a')
  const [textColor, setTextColor] = useState('#475569')
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState("'Outfit', sans-serif")
  const [selectedTemplate, setSelectedTemplate] = useState('classic')
  const [profileImage, setProfileImage] = useState(null)
  const [activePicker, setActivePicker] = useState(null)
  const resumePageRef = useRef(null)
  const fileInputRef = useRef(null)

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      personalDetails: { name: '', email: '', phone: '', title: '' },
      summary: '',
      experience: [{ company: '', role: '', startDate: '', endDate: '', description: '' }],
      education: [{ university: '', degree: '', year: '' }],
      skills: [{ value: '' }]
    }
  })

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' })
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' })
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: 'skills' })

  const formData = watch()

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setProfileImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const onSubmit = async (data) => {
    try {
      const payload = {
        ...data,
        skills: data.skills.map(s => s.value).filter(s => s.trim() !== ''),
        profileImage,
        template: selectedTemplate,
        themeColor,
        headingColor,
        textColor,
        fontSize,
        fontFamily
      }
      const API_URL = import.meta.env.VITE_API_URL || '/api';
      const res = await axios.post(`${API_URL}/resumes`, payload)
      alert('Resume saved successfully!')
    } catch (err) {
      console.error('Submission error:', err.response?.data || err.message)
      alert(`Failed to save resume: ${err.response?.data?.error || err.message}`)
    }
  }

  const renderTemplate = () => {
    const templateProps = {
      data: {
        ...formData,
        profileImage,
        skills: formData.skills?.map(s => s.value) || [],
        themeColor,
        headingColor,
        textColor,
        fontSize,
        fontFamily
      }
    }

    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate {...templateProps} />
      case 'creative':
        return <CreativeTemplate {...templateProps} />
      default:
        return <ClassicTemplate {...templateProps} />
    }
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 overflow-x-hidden relative">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '-2s' }}></div>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 md:p-10">
        <header className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span> <span className="gradient-text">BBA </span>Resume Builder</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Express Your <span className="gradient-text">Brand.</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

              <section className="glass-card p-8 rounded-3xl group transition-all duration-500 hover:border-indigo-500/30">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                    <User size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">Personal Signature</h2>
                </div>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    {profileImage ? (
                      <div className="relative group/image">
                        <img 
                          src={profileImage} 
                          alt="Profile" 
                          className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500/30"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover/image:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ) : (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-24 h-24 rounded-full bg-slate-700/50 border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition-colors"
                      >
                        <Image size={24} className="text-slate-500 mb-1" />
                        <span className="text-xs text-slate-500">Photo</span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                  <p className="text-sm text-slate-400">Click to upload profile photo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Full Name</label>
                    <input {...register('personalDetails.name', { required: true })} className="premium-input" placeholder="e.g. John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Professional Title</label>
                    <input {...register('personalDetails.title')} className="premium-input" placeholder="e.g. Senior Developer" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                    <input {...register('personalDetails.email', { required: true })} type="email" className="premium-input" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 ml-1">Contact Number</label>
                    <input {...register('personalDetails.phone')} className="premium-input" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </section>

              <section className="glass-card p-8 rounded-3xl group">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400">
                    <Zap size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">The Narrative</h2>
                </div>
                <textarea {...register('summary')} rows={3} className="premium-input resize-none" placeholder="Describe your professional essence..." />
              </section>

              <section className="glass-card p-8 rounded-3xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400">
                      <Briefcase size={24} />
                    </div>
                    <h2 className="text-2xl font-bold">Career Impact</h2>
                  </div>
                  <button type="button" onClick={() => appendExp({ company: '', role: '', startDate: '', endDate: '', description: '' })} className="premium-button py-2 px-4 bg-emerald-500/10 text-emerald-400 text-sm border border-emerald-500/20">
                    <Plus size={16} /> Add Role
                  </button>
                </div>
                <div className="space-y-4">
                  {expFields.map((field, index) => (
                    <div key={field.id} className="p-5 bg-slate-800/40 rounded-2xl relative border border-slate-700/50">
                      <button type="button" onClick={() => removeExp(index)} className="absolute top-4 right-4 text-slate-500 hover:text-rose-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <input {...register(`experience.${index}.company`)} className="premium-input py-2 text-sm" placeholder="Company" />
                        <input {...register(`experience.${index}.role`)} className="premium-input py-2 text-sm" placeholder="Role" />
                        <input {...register(`experience.${index}.startDate`)} className="premium-input py-2 text-sm" placeholder="Start" />
                        <input {...register(`experience.${index}.endDate`)} className="premium-input py-2 text-sm" placeholder="End" />
                      </div>
                      <textarea {...register(`experience.${index}.description`)} className="premium-input py-2 text-sm mt-4" placeholder="Highlight Achievements" rows={2} />
                    </div>
                  ))}
                </div>
              </section>

              <section className="glass-card p-8 rounded-3xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
                      <Code size={24} />
                    </div>
                    <h2 className="text-2xl font-bold">Tech Stack</h2>
                  </div>
                  <button type="button" onClick={() => appendSkill({ value: '' })} className="premium-button py-2 px-4 bg-amber-500/10 text-amber-400 text-sm border border-amber-500/20">
                    <Plus size={16} /> Add Tool
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <input {...register(`skills.${index}.value`)} className="bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-amber-500" placeholder="React" />
                      <button type="button" onClick={() => removeSkill(index)} className="text-slate-500 hover:text-rose-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <section className="glass-card p-8 rounded-3xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-sky-500/20 text-sky-400">
                      <GraduationCap size={24} />
                    </div>
                    <h2 className="text-2xl font-bold">Academics</h2>
                  </div>
                  <button type="button" onClick={() => appendEdu({ university: '', degree: '', year: '' })} className="premium-button py-2 px-4 bg-sky-500/10 text-sky-400 text-sm border border-sky-500/20">
                    <Plus size={16} /> Add School
                  </button>
                </div>
                <div className="space-y-4">
                  {eduFields.map((field, index) => (
                    <div key={field.id} className="p-5 bg-slate-800/40 rounded-2xl relative border border-slate-700/50">
                      <button type="button" onClick={() => removeEdu(index)} className="absolute top-4 right-4 text-slate-500 hover:text-rose-400">
                        <Trash2 size={18} />
                      </button>
                      <div className="grid grid-cols-2 gap-4">
                        <input {...register(`education.${index}.university`)} className="premium-input py-2 text-sm" placeholder="University" />
                        <input {...register(`education.${index}.degree`)} className="premium-input py-2 text-sm" placeholder="Degree" />
                        <input {...register(`education.${index}.year`)} className="premium-input py-2 text-sm col-span-2" placeholder="Year" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="glass-card p-8 rounded-3xl border-indigo-500/20 border">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
                    <Palette size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">Style & Branding</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-400">Primary Aura</span>
                      <button type="button" onClick={() => setActivePicker(activePicker === 'theme' ? null : 'theme')} className="w-10 h-10 rounded-xl border-2 border-slate-700 shadow-lg" style={{ backgroundColor: themeColor }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-400">Heading Color</span>
                      <button type="button" onClick={() => setActivePicker(activePicker === 'heading' ? null : 'heading')} className="w-10 h-10 rounded-xl border-2 border-slate-700 shadow-lg" style={{ backgroundColor: headingColor }} />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-400">Body Text</span>
                      <button type="button" onClick={() => setActivePicker(activePicker === 'text' ? null : 'text')} className="w-10 h-10 rounded-xl border-2 border-slate-700 shadow-lg" style={{ backgroundColor: textColor }} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 flex items-center gap-2">
                        <Type size={16} /> Typography
                      </label>
                      <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        className="premium-input py-2 text-sm appearance-none"
                      >
                        {FONT_OPTIONS.map(opt => <option key={opt.value} value={opt.value} className="bg-slate-900">{opt.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-400 flex items-center justify-between">
                        <span className="flex items-center gap-2"><MoveVertical size={16} /> Font Size</span>
                        <span className="text-indigo-400">{fontSize}px</span>
                      </label>
                      <input type="range" min="12" max="20" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full accent-indigo-500 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer" />
                    </div>
                  </div>
                </div>

                {activePicker && (
                  <div className="absolute z-50 animate-fade-in translate-y-[-100%] top-[-20px]">
                    <div className="fixed inset-0" onClick={() => setActivePicker(null)} />
                    <div className="relative glass-card p-4 rounded-3xl border border-slate-700 shadow-2xl">
                      <ChromePicker
                        color={activePicker === 'theme' ? themeColor : activePicker === 'heading' ? headingColor : textColor}
                        onChange={(color) => {
                          if (activePicker === 'theme') setThemeColor(color.hex)
                          if (activePicker === 'heading') setHeadingColor(color.hex)
                          if (activePicker === 'text') setTextColor(color.hex)
                        }}
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="glass-card p-8 rounded-3xl group border-indigo-500/20 border">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
                    <Layers size={24} />
                  </div>
                  <h2 className="text-2xl font-bold">Choose Template</h2>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {TEMPLATES.map((tmpl) => {
                    const Icon = tmpl.icon
                    return (
                      <button
                        key={tmpl.id}
                        type="button"
                        onClick={() => setSelectedTemplate(tmpl.id)}
                        className={`p-4 rounded-2xl border-2 transition-all ${
                          selectedTemplate === tmpl.id 
                            ? 'border-indigo-500 bg-indigo-500/20' 
                            : 'border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <Icon size={24} className={`mx-auto mb-2 ${selectedTemplate === tmpl.id ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <span className="text-sm font-medium block">{tmpl.name}</span>
                      </button>
                    )
                  })}
                </div>
              </section>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-3xl text-xl font-bold transition-all transform hover:scale-[1.02] shadow-[0_20px_50px_rgba(99,102,241,0.3)]">
                Save Narrative
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 sticky top-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Sparkles className="text-indigo-400" /> Live Manuscript
              </h2>
              <button
                type="button"
                onClick={() => downloadPDF('resume-page', 'Resume.pdf')}
                className="premium-button bg-indigo-600 hover:bg-indigo-500 text-white flex items-center gap-3"
              >
                <Download size={18} /> Download Master
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-white transition-all duration-700 hover:scale-[1.01] overflow-x-auto">
              <div ref={resumePageRef} id="resume-page" className="min-w-[800px] md:min-w-0">
                {renderTemplate()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
