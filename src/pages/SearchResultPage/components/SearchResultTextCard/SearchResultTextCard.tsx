import './SearchResultTextCard.scss'

import { Body2, Button, Caption1, Card, CardHeader, Image, Link, Text } from '@fluentui/react-components'
import { MoreHorizontal20Regular } from '@fluentui/react-icons'
import { convertFileSrc } from '@tauri-apps/api/core'

const defaultSiteiconUrl = convertFileSrc('assets/siteicon.png')

function SiteIcon({ src }: { src: string }) {
  return (
    <span
      flex="~ items-center"
      rounded-full
      bg="$colorNeutralBackground6"
      border="1px solid $colorNeutralStroke1"
      p="5px"
      overflow-hidden
    >
      <Image
        alt="siteicon"
        shape="circular"
        src={src}
        height={16}
        width={16}
        onError={e => (e.currentTarget.src = defaultSiteiconUrl)}
      />
    </span>
  )
}

export function SearchResultTextCard() {
  const siteicon = 'https://th.bing.com/th/id/ODLS.e6ee8e96-2e22-4386-8bea-aa8be85093ee?w=32&h=32&qlt=93&pcl=fffffa&o=6&pid=1.2'
  const headerText = '笔趣阁'
  const siteUrl = 'https://www.bvquge.com'

  return (
    <section className="text-card">
      <Card>
        <CardHeader
          image={<SiteIcon src={siteicon} />}
          header={<Text weight="semibold">{headerText}</Text>}
          description={<Caption1>{siteUrl}</Caption1>}
          action={(
            <Button
              appearance="transparent"
              icon={<MoreHorizontal20Regular />}
              aria-label="More options"
            />
          )}
        />

        <Link className="result-title">
          <Body2>
            天灾信使-
            <strong>笔趣阁</strong>
            -听日-轻小说-最新章节全文免费阅读
          </Body2>
        </Link>

        <Caption1 className="color-$colorNeutralForeground3!">
          最新话: 第56789章
        </Caption1>
      </Card>
    </section>
  )
}
