import { Dropcursor } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Mathematics, { migrateMathStrings } from '@tiptap/extension-mathematics'
import FileHandler from '@tiptap/extension-file-handler'
import { common, createLowlight } from 'lowlight'
import React, { useCallback, useRef } from 'react'
import 'katex/dist/katex.min.css'
import { Button } from '../ui/button'
import { Bold as BoldIcon, Italic, Heading1, Heading2, Heading3, Link2, List } from 'lucide-react'
import { useCreateContent } from '@/service/content/postContent'

const lowlight = createLowlight(common)

interface TiptapProps {
  content?: string
  onChange?: (content: string) => void
}

export default ({ content = '', onChange }: TiptapProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        heading: false,
      }),
      Bold,
      Code,
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)

            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run()
            }
          })
        },
        onPaste: (currentEditor, files) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run()
            }
          })
        },
      }),
      Dropcursor,
      Mathematics.configure({
        inlineOptions: {
          onClick: (node, pos) => {
            const newCalculation = prompt('Enter new calculation:', node.attrs.latex)
            if (newCalculation && editor) {
              editor.chain().setNodeSelection(pos).updateInlineMath({ latex: newCalculation }).focus().run()
            }
          },
        },
        blockOptions: {
          onClick: (node, pos) => {
            const newCalculation = prompt('Enter new calculation:', node.attrs.latex)
            if (newCalculation && editor) {
              editor.chain().setNodeSelection(pos).updateBlockMath({ latex: newCalculation }).focus().run()
            }
          },
        },
        katexOptions: {
          throwOnError: false,
        },
      }),
    ],
    onCreate: ({ editor: currentEditor }) => {
      migrateMathStrings(currentEditor)
    },
    content: content || `
        <p>This is a basic example of implementing images and LaTeX.</p>
        <p>Try adding: x^2 + y^2 = z^2</p>
      `,
    onUpdate: ({ editor: currentEditor }) => {
      if (onChange) {
        onChange(currentEditor.getHTML())
      }
    },
    editorProps: {
      handleDrop: (_view, event, _slice, moved) => {
        if (!moved && event.dataTransfer?.files && event.dataTransfer.files[0]) {
          const file = event.dataTransfer.files[0]

          if (file.type.startsWith('image/')) {
            event.preventDefault()

            convertToBase64(file).then((base64) => {
              const { schema } = _view.state
              const coordinates = _view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              })

              if (coordinates) {
                const node = schema.nodes.image.create({ src: base64 })
                const transaction = _view.state.tr.insert(coordinates.pos, node)
                _view.dispatch(transaction)
              }
            })

            return true
          }
        }
        return false
      },
      handlePaste: (_view, event) => {
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

  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    try {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    } catch (e) {
      alert('Invalid URL')
    }
  }, [editor])

  const onInsertInlineMath = useCallback(() => {
    if (!editor) return

    const latex = prompt('Enter inline math expression:', '')
    if (latex) {
      return editor.chain().insertInlineMath({ latex }).focus().run()
    }
  }, [editor])

  const onRemoveInlineMath = useCallback(() => {
    if (!editor) return
    editor.chain().deleteInlineMath().focus().run()
  }, [editor])

  const onInsertBlockMath = useCallback(() => {
    if (!editor) return

    const latex = prompt('Enter block math expression:', '')
    if (latex) {
      return editor.chain().insertBlockMath({ latex }).focus().run()
    }
  }, [editor])

  const onRemoveBlockMath = useCallback(() => {
    if (!editor) return
    editor.chain().deleteBlockMath().focus().run()
  }, [editor])

  return (
    <div className="w-full mt-7 mb-7">
      <div className="control-group border border-border rounded-lg bg-card p-4 mb-4 shadow-sm space-y-3">
        <div className="button-group flex gap-2 flex-wrap">
          <Button
            onClick={addImage}
            variant="outline"
            type="button"
            size="sm"
          >
            Set image from URL
          </Button>
          <Button
            onClick={triggerFileInput}
            variant="outline"
            type="button"
            size="sm"
          >
            Upload image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              variant={editor.isActive('bold') ? 'default' : 'outline'}
              size="sm"
              type="button"
              title="Bold (Ctrl+B)"
            >
              <BoldIcon className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              disabled={!editor.can().chain().focus().toggleItalic().run()}
              variant={editor.isActive('italic') ? 'default' : 'outline'}
              size="sm"
              type="button"
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              variant={editor.isActive('heading', { level: 1 }) ? 'default' : 'outline'}
              size="sm"
              type="button"
              title="Heading 1"
            >
              <Heading1 className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}
              size="sm"
              type="button"
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              variant={editor.isActive('heading', { level: 3 }) ? 'default' : 'outline'}
              size="sm"
              type="button"
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </Button>

            <Button
              onClick={setLink}
              variant={editor.isActive('link') ? 'default' : 'outline'}
              size="sm"
              type="button"
              title="Set Link"
            >
              <Link2 className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive('link')}
              variant="outline"
              size="sm"
              type="button"
              title="Unset Link"
            >
              Unset link
            </Button>

            <Button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              variant={editor.isActive('bulletList') ? 'default' : 'outline'}
              size="sm"
              type="button"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="border-t border-border pt-3">
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={onInsertInlineMath}
              variant="outline"
              type="button"
              size="sm"
              title="Insert inline math"
            >
              Insert inline math
            </Button>

            <Button
              onClick={onRemoveInlineMath}
              variant="outline"
              type="button"
              size="sm"
              title="Remove inline math"
            >
              Remove inline math
            </Button>

            <Button
              onClick={onInsertBlockMath}
              variant="outline"
              type="button"
              size="sm"
              title="Insert block math"
            >
              Insert block math
            </Button>

            <Button
              onClick={onRemoveBlockMath}
              variant="outline"
              type="button"
              size="sm"
              title="Remove block math"
            >
              Remove block math
            </Button>
          </div>
        </div>
      </div>

      <EditorContent
        editor={editor}
        className={`prose max-w-none border border-border rounded-lg bg-background p-6 h-[600px] overflow-y-auto focus-within:ring-2 focus-within:ring-accent prose:text-base prose:leading-relaxed [&_.ProseMirror]:text-base [&_.ProseMirror]:leading-relaxed [&_.ProseMirror_h1]:text-4xl [&_.ProseMirror_h1]:font-bold [&_.ProseMirror_h1]:mt-6 [&_.ProseMirror_h1]:mb-4 [&_.ProseMirror_h2]:text-3xl [&_.ProseMirror_h2]:font-bold [&_.ProseMirror_h2]:mt-5 [&_.ProseMirror_h2]:mb-3 [&_.ProseMirror_h3]:text-2xl [&_.ProseMirror_h3]:font-bold [&_.ProseMirror_h3]:mt-4 [&_.ProseMirror_h3]:mb-2`}
      />
    </div>
  )
}