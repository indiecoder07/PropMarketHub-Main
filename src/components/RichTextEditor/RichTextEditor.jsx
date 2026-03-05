'use client';

import { useState, useEffect, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Placeholder from '@tiptap/extension-placeholder';
import styles from './RichTextEditor.module.css';

export function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }) {
  const [showHTML, setShowHTML] = useState(false);
  const [htmlSource, setHtmlSource] = useState(content || '');

  const openHTML = (html) => { setHtmlSource(html); setShowHTML(true); };
  const closeHTML = () => setShowHTML(false);

  useEffect(() => {
    setHtmlSource(content);
  }, [content]);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer nofollow' } }),
      Image.configure({ inline: false, allowBase64: true }),
      Highlight,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor: nextEditor }) => {
      const html = nextEditor.getHTML();
      onChange(html);
      setHtmlSource(html);
    },
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  const addLink = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter URL:');
    if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('Enter image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const applyHTMLSource = () => {
    if (editor) {
      editor.commands.setContent(htmlSource);
      onChange(htmlSource);
    }
    closeHTML();
  };

  if (!editor) return null;

  const btn = (active) => `${styles.btn} ${active ? styles.btnActive : ''}`;
  const btnDi = `${styles.btn} ${styles.btnDisabled}`;

  return (
    <div className={styles.editorWrapper}>
      <div className={styles.toolbar}>
        <button type="button" className={btn(editor.isActive('bold'))} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">B</button>
        <button type="button" className={`${btn(editor.isActive('italic'))} ${styles.btnItalic}`} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">I</button>
        <button type="button" className={`${btn(editor.isActive('underline'))} ${styles.btnUnderline}`} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">U</button>
        <button type="button" className={`${btn(editor.isActive('strike'))} ${styles.btnStrike}`} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">S</button>
        <button type="button" className={`${styles.btn} ${editor.isActive('highlight') ? styles.btnActive : styles.btnHighlight}`} onClick={() => editor.chain().focus().toggleHighlight().run()} title="Highlight">H</button>

        <span className={styles.sep} />

        <button type="button" className={btn(editor.isActive('heading', { level: 1 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="H1">H1</button>
        <button type="button" className={btn(editor.isActive('heading', { level: 2 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="H2">H2</button>
        <button type="button" className={btn(editor.isActive('heading', { level: 3 }))} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="H3">H3</button>

        <span className={styles.sep} />

        <button type="button" className={btn(editor.isActive('bulletList'))} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">• List</button>
        <button type="button" className={btn(editor.isActive('orderedList'))} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">1. List</button>
        <button type="button" className={btn(editor.isActive('blockquote'))} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">❝</button>
        <button type="button" className={btn(editor.isActive('codeBlock'))} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block">{'</>'}</button>

        <span className={styles.sep} />

        <button type="button" className={btn(editor.isActive({ textAlign: 'left' }))} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Left">⫷</button>
        <button type="button" className={btn(editor.isActive({ textAlign: 'center' }))} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Center">☰</button>
        <button type="button" className={btn(editor.isActive({ textAlign: 'right' }))} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Right">⫸</button>

        <span className={styles.sep} />

        <button type="button" className={btn(editor.isActive('link'))} onClick={addLink} title="Add Link">🔗</button>
        {editor.isActive('link') && (
          <button type="button" className={styles.btn} onClick={() => editor.chain().focus().unsetLink().run()} title="Remove Link">✕🔗</button>
        )}
        <button type="button" className={styles.btn} onClick={addImage} title="Add Image">🖼️</button>

        <span className={styles.sep} />

        <button type="button" className={editor.can().undo() ? styles.btn : btnDi} onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">↩</button>
        <button type="button" className={editor.can().redo() ? styles.btn : btnDi} onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">↪</button>

        <span className={styles.spacer} />

        <button
          type="button"
          className={btn(showHTML)}
          onClick={() => {
            if (showHTML) {
              closeHTML();
            } else {
              openHTML(editor.getHTML());
            }
          }}
          title="Toggle HTML Source"
        >
          {'</>'} HTML
        </button>
      </div>

      {showHTML ? (
        <div className={styles.htmlPanel}>
          <textarea
            className={styles.htmlTextarea}
            value={htmlSource}
            onChange={(e) => setHtmlSource(e.target.value)}
          />
          <button type="button" className={styles.applyBtn} onClick={applyHTMLSource}>
            Apply HTML
          </button>
        </div>
      ) : (
        <EditorContent editor={editor} />
      )}
    </div>
  );
}
