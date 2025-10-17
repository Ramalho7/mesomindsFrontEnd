import Document from '@tiptap/extension-document'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { Dropcursor } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useRef, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { Node, mergeAttributes } from '@tiptap/core'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import { Decoration, DecorationSet } from '@tiptap/pm/view'

// Extensão para LaTeX inline
const InlineMath = Node.create({
  name: 'inlineMath',
  group: 'inline',
  inline: true,
  atom: true,

  addAttributes() {
    return {
      latex: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span.math-inline',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes({ class: 'math-inline' }, HTMLAttributes)]
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('span')
      dom.className = 'math-inline'
      try {
        katex.render(node.attrs.latex, dom, {
          throwOnError: false,
          displayMode: false,
        })
      } catch (e) {
        dom.textContent = node.attrs.latex
      }
      return {
        dom,
      }
    }
  },
})

// Extensão para LaTeX em bloco
const MathBlock = Node.create({
  name: 'mathBlock',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      latex: {
        default: '',
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div.math-block',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'math-block' }, HTMLAttributes)]
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('div')
      dom.className = 'math-block'
      try {
        katex.render(node.attrs.latex, dom, {
          throwOnError: false,
          displayMode: true,
        })
      } catch (e) {
        dom.textContent = node.attrs.latex
      }
      return {
        dom,
      }
    }
  },
})

export default () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [latexInput, setLatexInput] = useState('')
  const [showLatexModal, setShowLatexModal] = useState(false)
  const [isInline, setIsInline] = useState(true)
  
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Dropcursor,
      InlineMath,
      MathBlock,
    ],
    content: `
        <p>This is a basic example of implementing images and LaTeX.</p>
        <p>Try adding: x^2 + y^2 = z^2</p>
      `,
    editorProps: {
      handleDrop: (view, event, slice, moved) => {
        if (!moved && event.dataTransfer?.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0]
          
          if (file.type.startsWith('image/')) {
            event.preventDefault()
            
            convertToBase64(file).then((base64) => {
              const { schema } = view.state
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              })

              if (coordinates) {
                const node = schema.nodes.image.create({ src: base64 })
                const transaction = view.state.tr.insert(coordinates.pos, node)
                view.dispatch(transaction)
              }
            })
            
            return true
          }
        }
        return false
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items
        
        if (items) {
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.startsWith('image/')) {
              event.preventDefault()
              
              const file = items[i].getAsFile()
              if (file) {
                convertToBase64(file).then((base64) => {
                  editor?.chain().focus().setImage({ src: base64 }).run()
                })
              }
              
              return true
            }
          }
        }
        return false
      },
    },
  })

  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    
    if (file && editor) {
      convertToBase64(file).then((base64) => {
        editor.chain().focus().setImage({ src: base64 }).run()
      })
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [editor])

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleInsertLatex = useCallback(() => {
    if (editor && latexInput) {
      if (isInline) {
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'inlineMath',
            attrs: {
              latex: latexInput,
            },
          })
          .run()
      } else {
        editor
          .chain()
          .focus()
          .insertContent({
            type: 'mathBlock',
            attrs: {
              latex: latexInput,
            },
          })
          .run()
      }
      
      setLatexInput('')
      setShowLatexModal(false)
    }
  }, [editor, latexInput, isInline])

  if (!editor) {
    return null
  }

  return (
    <>
      <div className="control-group">
        <div className="button-group">
          <button onClick={addImage}>Set image from URL</button>
          <button onClick={triggerFileInput}>Upload image</button>
          <button onClick={() => setShowLatexModal(true)}>Add LaTeX</button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {showLatexModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '400px'
          }}>
            <h3>Insert LaTeX</h3>
            <div style={{ marginBottom: '10px' }}>
              <label>
                <input
                  type="radio"
                  checked={isInline}
                  onChange={() => setIsInline(true)}
                />
                Inline ($...$)
              </label>
              <label style={{ marginLeft: '10px' }}>
                <input
                  type="radio"
                  checked={!isInline}
                  onChange={() => setIsInline(false)}
                />
                Block ($$...$$)
              </label>
            </div>
            <textarea
              value={latexInput}
              onChange={(e) => setLatexInput(e.target.value)}
              placeholder="Ex: x^2 + y^2 = z^2"
              style={{
                width: '100%',
                minHeight: '100px',
                marginBottom: '10px',
                padding: '8px',
                fontFamily: 'monospace'
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleInsertLatex}>Insert</button>
              <button onClick={() => {
                setShowLatexModal(false)
                setLatexInput('')
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <EditorContent editor={editor} />
    </>
  )
}