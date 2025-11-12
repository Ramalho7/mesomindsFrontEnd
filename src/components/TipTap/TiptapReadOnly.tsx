import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Link from '@tiptap/extension-link'
import Heading from '@tiptap/extension-heading'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Mathematics from '@tiptap/extension-mathematics'
import { common, createLowlight } from 'lowlight'
import 'katex/dist/katex.min.css'

const lowlight = createLowlight(common)

interface TiptapReadOnlyProps {
  content: string
}

export default function TiptapReadOnly({ content }: TiptapReadOnlyProps) {
  const editor = useEditor({
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
        openOnClick: true,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
      }),
      Mathematics.configure({
        katexOptions: {
          throwOnError: false,
          displayMode: false,
        },
      }),
    ],
    content: content,
    editable: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none',
      },
    },
  })

  return (
    <div className="tiptap-readonly">
      <EditorContent editor={editor} />
    </div>
  )
}
