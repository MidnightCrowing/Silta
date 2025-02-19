import JoLPlayer from 'jol-player'

export default function VideoPage() {
  return (
    <div>
      <JoLPlayer
        option={{
          videoSrc:
            'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/540p.mp4',
          width: 750,
          height: 420,
          theme: '#ffb821',
          poster:
            'https://gs-files.oss-cn-hongkong.aliyuncs.com/okr/prod/file/2021/08/31/1080pp.png',
          language: 'zh',
          pausePlacement: 'center',
          isShowWebFullScreen: false,
          isProgressFloat: true,
        }}
      />
    </div>
  )
}
