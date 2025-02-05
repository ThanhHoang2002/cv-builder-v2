import Quill from 'quill'
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react'
import 'quill/dist/quill.snow.css'

interface EditorProps {
  value?: string
  onChange?: (value: string) => void
  readOnly?: boolean
}

const Editor = forwardRef<Quill, EditorProps>(({ readOnly, value, onChange }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const onChangeRef = useRef(onChange)

  useLayoutEffect(() => {
    onChangeRef.current = onChange
  })

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement('div')
    )
    
    const quill = new Quill(editorContainer, {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
      },
    })

    if (typeof ref === 'function') {
      ref(quill)
    } else if (ref) {
      ref.current = quill
    }

    if (value) {
      quill.root.innerHTML = value
    }

    quill.on('text-change', () => {
      onChangeRef.current?.(quill.root.innerHTML)
    })

    return () => {
      if (typeof ref === 'function') {
        ref(null)
      } else if (ref) {
        ref.current = null
      }
      container.innerHTML = ''
    }
  }, [ref])

  useEffect(() => {
    if (typeof ref === 'object' && ref?.current) {
      ref.current.enable(!readOnly)
    }
  }, [ref, readOnly])

  return <div ref={containerRef} className="bg-white"></div>
})

Editor.displayName = 'Editor'

export default Editor