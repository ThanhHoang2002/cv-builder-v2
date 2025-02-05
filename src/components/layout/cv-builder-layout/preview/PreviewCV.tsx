import previewData from './preview.json'

import { usePersonalInfoStore } from '@/features/information/store/personal-info-store'
import { useFontStore } from '@/stores/font'

const Header = () => {
  const { info } = usePersonalInfoStore()
  const basics = previewData.basics
  return (
    <div className="flex flex-col items-center space-y-4 border-b pb-6">
      {/* Avatar */}
      <div className="relative h-32 w-32 overflow-hidden rounded-full">
        <img
          src={info.showImage ? info.avatarUrl : basics.picture.url}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Name and Title */}
      <div className="text-center">
        <h1 className="break-words text-2xl font-bold">
          {info.firstName || info.lastName 
            ? `${info.firstName} ${info.lastName}`
            : basics.name}
        </h1>
        <p className="break-words text-muted-foreground">{basics.headline}</p>
      </div>

      {/* Contact Info */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        {info.email && (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="break-all">{info.email}</span>
          </div>
        )}
        {info.phone && (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="break-all">{info.phone}</span>
          </div>
        )}
      </div>
    </div>
  )
}

const Summary = () => {
  const { info } = usePersonalInfoStore()
  
  if (!info.profile) return null

  return (
    <section className="space-y-2 border-b pb-6">
      <h2 className="text-xl font-semibold">Profile</h2>
      <div 
        className="prose prose-sm max-w-none break-words text-muted-foreground" 
        dangerouslySetInnerHTML={{ __html: info.profile }} 
      />
    </section>
  )
}

const PreviewCV = () => {
  const {selectedFont} = useFontStore()
  return (
    <div style={{ fontFamily: selectedFont?.name }} 
      className="relative h-full">
      <div className="absolute inset-0 overflow-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div 
            className="h-[297mm] w-full max-w-[210mm] rounded-sm bg-white shadow-[0_0_40px_rgba(0,0,0,0.1)] ring-1 ring-black/5"
          >
            <div className="h-full p-[30mm_20mm]">
              <div className="mx-auto h-full space-y-6">
                <Header />
                <Summary />
                {/* Add other sections from preview.json as needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewCV
