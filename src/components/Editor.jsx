import React, { useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';

const Editor = () => {
    const textareaRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        const editor = CodeMirror.fromTextArea(textareaRef.current, {
            mode: { name: 'javascript', json: true },
            theme: 'dracula',
            autoCloseTags: true,
            autoCloseBrackets: true,
            lineNumbers: true,
            extraKeys: {
                'Enter': function(cm) {
                    if (cm.state.completionActive) {
                        cm.state.completionActive.close();
                        return CodeMirror.Pass;
                    }
                    return cm.execCommand('newlineAndIndent');
                }
            }
        });
        editorRef.current = editor;

        return () => {
            editor.toTextArea();
        };
    }, []);

    return (
        <div>
            <textarea ref={textareaRef}></textarea>
            {editorRef.current && editorRef.current.getWrapperElement()}
        </div>
    );
};

export default Editor;
