import { useState, useEffect } from 'react';
import Editor from "./Editor";
import useLocalStorage from '../hooks/use-localStorage';

function App() {
  const [html, setHtml] = useLocalStorage('html','');
  const [css, setCss] = useLocalStorage('css','');
  const [js, setJs] = useLocalStorage('js','');
  const [srcDocs, setSrcDocs] = useState('');

  useEffect(()=>{
    const timeout = setTimeout(()=>{
      setSrcDocs(`
      <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
      </html>`
      )
    },250);
    return ()=>{
      clearTimeout(timeout);
    }
  }, [html, css, js]);
  return (
    <>
      <div className="pane top-pane">
          <Editor 
            language='xml'
            value={html}
            onChange={setHtml}
            displayName='HTML'
          />
          <Editor 
            language='css'
            value={css}
            onChange={setCss}
            displayName='CSS'
          />
          <Editor 
            language='javascript'
            value={js}
            onChange={setJs}
            displayName='Javascript'
          />
      </div>
      <div className="pane">
          <iframe
            srcDoc={srcDocs}
            title="output"
            sandbox="allow-scripts"
            width="100%"
            height="100%"
          />
      </div>
    </>       
  );
}

export default App;
