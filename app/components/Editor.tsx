'use client'

import React, { useMemo, useRef } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { ImageResize } from 'quill-image-resize-module-ts'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'
import { toast } from 'react-toastify'
import { Images } from '../write/page'
Quill.register('modules/ImageResize', ImageResize)

interface EditorProps {
  content: string
  theme: string
  readOnly?: boolean
  setContent?: React.Dispatch<React.SetStateAction<string>>
  setUploadImage?: React.Dispatch<React.SetStateAction<Images[]>>
}

export default function Editor({
  content,
  theme,
  readOnly,
  setContent,
  setUploadImage,
}: EditorProps) {
  const quillRef = useRef<any>()

  const imageHandler = async () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = async () => {
      if (!input.files) return
      const file = input.files[0]
      const editor = quillRef.current.getEditor()
      const range = editor.getSelection()

      try {
        const imgRef = ref(storage, `uploadImages/${Date.now()} - ${file.name}`)
        const result = await uploadBytes(imgRef, file)
        const fileUrl = await getDownloadURL(ref(storage, result.ref.fullPath))

        editor.insertEmbed(range.index, 'image', fileUrl)
        editor.setSelection(range.index + 1)

        if (setUploadImage) {
          setUploadImage((prev) => [
            ...prev,
            { imageURL: fileUrl, imagePath: result.ref.fullPath },
          ])
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error('이미지 업로드에 실패했습니다!')
        }
      }
    }
  }

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          [{ color: [] }, { background: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image', 'link', 'code-block'],
        ],
        handlers: { image: imageHandler },
      },
      ImageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
      clipboard: {
        matchVisual: false,
      },
    }
  }, [])

  return (
    <ReactQuill
      ref={quillRef}
      value={content}
      onChange={setContent}
      modules={theme === 'snow' ? modules : undefined}
      theme={theme}
      readOnly={readOnly}
      className="w-full h-full mt-6"
    />
  )
}