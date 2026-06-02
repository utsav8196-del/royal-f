import { useState, useRef } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { uploadImage } from '@/lib/api'
import toast from 'react-hot-toast'
import { Loader2, Upload } from 'lucide-react'
import FitImageBox from '@/components/ui/FitImageBox'

interface ImageFieldProps {
  label: string
  value: string
  onChange: (url: string) => void
  hint?: string
  logoPreview?: boolean
  required?: boolean
}

export default function ImageField({
  label,
  value,
  onChange,
  hint,
  logoPreview,
  required,
}: ImageFieldProps) {
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      const url = await uploadImage(file)
      onChange(url)
      toast.success('Image uploaded successfully')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to upload image'
      toast.error(message)
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file)
    }
  }

  return (
    <div>
      <Label>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>

      {/* Preview */}
      {value && (
        <div className="mb-4 mt-2">
          {logoPreview ? (
            <div className="inline-block rounded-lg border border-slate-200 bg-slate-50 p-3">
              <img
                src={value}
                alt="Logo preview"
                style={{ maxWidth: '200px', maxHeight: '100px', objectFit: 'contain' }}
              />
            </div>
          ) : (
            <FitImageBox src={value} alt="Preview" aspect="4/3" size="md" />
          )}
        </div>
      )}

      {/* URL Input */}
      <div className="mb-3">
        <Input
          type="text"
          placeholder="Paste image URL here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
        />
      </div>

      {/* File Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          e.currentTarget.classList.add('border-blue-400', 'bg-blue-50')
        }}
        onDragLeave={(e) => {
          e.currentTarget.classList.remove('border-blue-400', 'bg-blue-50')
        }}
        className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-4 transition-colors"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Upload className="h-5 w-5 text-slate-400" />
          <p className="text-center text-sm text-slate-600">
            Drag and drop an image here or{' '}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              click to browse
            </button>
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Hint */}
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}
