import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function ResumeUploader() {
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = async () => {
    if (!file) {
      setMessage('⚠️ Please select a PDF file')
      return
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      setMessage('⚠️ Only PDF files are allowed')
      return
    }

    // Validate file size (max 5MB)
    const MAX_SIZE = 5 * 1024 * 1024 // 5MB in bytes
    if (file.size > MAX_SIZE) {
      setMessage('⚠️ File size must be less than 5MB')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      // Upload the file
      const { data, error } = await supabase.storage
        .from('resume')
        .upload('latest.pdf', file, {
          upsert: true,
          contentType: 'application/pdf',
        })

      if (error) {
        throw error
      }

      // Get the public URL
      const { data: urlData } = await supabase.storage
        .from('resume')
        .getPublicUrl('latest.pdf')

      setMessage('✅ Resume uploaded successfully!')
      setFile(null)
      
      // Reset the file input
      const fileInput = document.getElementById('resume-file') as HTMLInputElement
      if (fileInput) fileInput.value = ''
      
    } catch (error: any) {
      console.error('Upload error:', error)
      setMessage(`❌ Upload failed: ${error.message}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-gunmetal-gray p-6 rounded-xl text-white shadow-md space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-cool-cyan">Resume Manager</h2>
        <span className="text-steel-blue text-sm">PDF only, max 5MB</span>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            id="resume-file"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="block w-full text-sm text-chrome-silver
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-medium
              file:bg-cool-cyan file:text-white
              hover:file:cursor-pointer hover:file:bg-cool-cyan/90
              file:transition"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className={`flex-1 py-2 px-4 rounded-lg transition ${
              uploading || !file
                ? 'bg-steel-blue/50 cursor-not-allowed'
                : 'bg-cool-cyan hover:bg-cool-cyan/90'
            }`}
          >
            <span className="flex items-center justify-center">
              {uploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  Upload Resume
                </>
              )}
            </span>
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('⚠️')
              ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500'
              : message.includes('❌')
              ? 'bg-ember-red/10 border border-ember-red/30 text-ember-red'
              : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-500'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
} 