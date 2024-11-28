'use client'

import StarterKit from '@tiptap/starter-kit'
import React, { useCallback, useEffect, useState } from 'react'
// => Tiptap packages
import { useEditor, EditorContent, Editor, BubbleMenu } from '@tiptap/react'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Link from '@tiptap/extension-link'
import Bold from '@tiptap/extension-bold'
import Underline from '@tiptap/extension-underline'
import Italic from '@tiptap/extension-italic'
import Strike from '@tiptap/extension-strike'
import Code from '@tiptap/extension-code'
import History from '@tiptap/extension-history'
import styles from './rich-editor.module.css'
// Custom

import {
  IoArrowUndoOutline,
  IoArrowRedoOutline,
  IoLinkOutline,
} from 'react-icons/io5'
import {
  RiBold,
  RiItalic,
  RiUnderline,
  RiStrikethrough,
  RiCodeBlock,
} from 'react-icons/ri'
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { DialogRootProps, IconButton, Input } from '@chakra-ui/react'
import { on } from 'events'
import { useFormContext } from 'react-hook-form'

export function RichEditor({ name }: { name: string }) {
  const { register, unregister, resetField, setValue, watch } = useFormContext()
  const value = watch(name)
  const editor = useEditor({
    extensions: [
      Document,
      History,
      Paragraph,
      Text,
      Link.configure({
        openOnClick: false,
      }),
      Bold,
      Underline,
      Italic,
      Strike,
      Code,
    ],
    content: '',
    onUpdate(props) {
      const value = editor.getHTML()
      setValue(name, value)
    },
  }) as Editor

  const [modalIsOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])
  const openModal = useCallback(() => {
    console.log(editor.chain().focus())
    setUrl(editor.getAttributes('link').href)
    setIsOpen(true)
  }, [editor])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setUrl('')
  }, [])

  const saveLink = useCallback(() => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: '_blank' })
        .run()
    } else {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
    }
    closeModal()
  }, [editor, url, closeModal])

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    closeModal()
  }, [editor, closeModal])

  const toggleBold = useCallback(() => {
    editor.chain().focus().toggleBold().run()
  }, [editor])

  const toggleUnderline = useCallback(() => {
    editor.chain().focus().toggleUnderline().run()
  }, [editor])

  const toggleItalic = useCallback(() => {
    editor.chain().focus().toggleItalic().run()
  }, [editor])

  const toggleStrike = useCallback(() => {
    editor.chain().focus().toggleStrike().run()
  }, [editor])

  const toggleCode = useCallback(() => {
    editor.chain().focus().toggleCode().run()
  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <div className="editor" style={{ width: '100%' }}>
      <div className="menu">
        <IconButton
          size="sm"
          variant="subtle"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <IoArrowUndoOutline />
        </IconButton>
        <IconButton
          size="sm"
          variant="subtle"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <IoArrowRedoOutline />
        </IconButton>
        <IconButton
          size="sm"
          variant={editor.isActive('link') ? 'solid' : 'subtle'}
          onClick={openModal}
        >
          <IoLinkOutline />
        </IconButton>
        <IconButton
          size="sm"
          variant={editor.isActive('bold') ? 'solid' : 'subtle'}
          onClick={toggleBold}
        >
          <RiBold />
        </IconButton>
        <IconButton variant={editor.isActive('underline') ? 'solid' : 'subtle'}>
          <RiUnderline />
        </IconButton>
        <IconButton
          size="sm"
          variant={editor.isActive('intalic') ? 'solid' : 'subtle'}
          onClick={toggleItalic}
        >
          <RiItalic />
        </IconButton>
        <IconButton
          size="sm"
          variant={editor.isActive('strike') ? 'solid' : 'subtle'}
          onClick={toggleStrike}
        >
          <RiStrikethrough />
        </IconButton>
        <IconButton
          size="sm"
          variant={editor.isActive('code') ? 'solid' : 'subtle'}
          onClick={toggleCode}
        >
          <RiCodeBlock />
        </IconButton>
      </div>

      <BubbleMenu
        className="bubble-menu-light"
        tippyOptions={{ duration: 150 }}
        editor={editor}
        shouldShow={({ editor, view, state, oldState, from, to }) => {
          // only show the bubble menu for links.
          return from === to && editor.isActive('link')
        }}
      >
        <button className="button" onClick={openModal}>
          Edit
        </button>
        <button className="button-remove" onClick={removeLink}>
          Remove
        </button>
      </BubbleMenu>

      <EditorContent
        className={styles.tiptap}
        style={{ minHeight: '400px', background: '#1b1b1b' }}
        editor={editor}
      />

      <LinkModal
        url={url}
        open={modalIsOpen}
        closeModal={closeModal}
        onChangeUrl={(e) => setUrl(e.target.value)}
        onSaveLink={saveLink}
        onRemoveLink={removeLink}
      />
    </div>
  )
}

interface IProps extends Omit<DialogRootProps, 'children'> {
  url: string
  closeModal: () => void
  onChangeUrl: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSaveLink: (e: React.MouseEvent<HTMLButtonElement>) => void
  onRemoveLink: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export function LinkModal(props: IProps) {
  const { url, closeModal, onChangeUrl, onSaveLink, onRemoveLink, ...rest } =
    props
  return (
    <DialogRoot {...rest} onOpenChange={(e) => (e.open ? null : closeModal())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit link</DialogTitle>
        </DialogHeader>

        <DialogBody>
          <p>
            <Input autoFocus value={url} onChange={onChangeUrl} />
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button onClick={onRemoveLink} variant="outline">
              Delete
            </Button>
          </DialogActionTrigger>
          <Button onClick={onSaveLink}>Save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
