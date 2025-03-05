import JoLPlayer from '../../src/index';
// import JoLPlayer from '../../dist';
import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <JoLPlayer
      onEnterFullScreen={() => console.log('enter')}
      onExitFullScreen={() => console.log('exit')}
      option={{
        videoSrc: 'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4',
        width: 750,
        height: 420,
        isShowFullScreen: true,

        isToast: true, //  Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
      }}
    />
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
