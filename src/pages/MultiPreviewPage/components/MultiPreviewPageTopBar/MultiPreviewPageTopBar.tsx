import './MultiPreviewPageTopBar.scss'

import type { OverflowItemProps } from '@fluentui/react-components'
import {
  Link,
  Menu,
  MenuButton,
  MenuPopover,
  MenuTrigger,
  Overflow,
  OverflowItem,
  Subtitle2,
  Tag,
  Text,
  ToggleButton,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components'
import { bundleIcon, ChevronDown20Regular, Pin20Filled, Pin20Regular } from '@fluentui/react-icons'
import type { FC } from 'react'

import type { MultiPreviewPageTopBarProps } from './MultiPreviewPageTopBar.types'

const PinIcon = bundleIcon(Pin20Filled, Pin20Regular)

const OverflowMenuItem: FC<Pick<OverflowItemProps, 'id'>> = (props) => {
  const { id } = props
  const isVisible = useIsOverflowItemVisible(id)

  if (isVisible) {
    return null
  }

  return (
    <Tag key={id} className="m-(x-2.5px y-4px)" appearance="brand" size="small" shape="circular">
      {id}
    </Tag>
  )
}

const OverflowMenu: FC<{ itemIds: string[] }> = ({ itemIds }) => {
  const { ref, overflowCount, isOverflowing } = useOverflowMenu<HTMLButtonElement>()

  if (!isOverflowing) {
    return null
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <MenuButton ref={ref} appearance="transparent" size="small" shape="circular">
          +
          {overflowCount}
        </MenuButton>
      </MenuTrigger>

      <MenuPopover className="MultiPreview-top-bar-effect">
        {itemIds.map((i) => {
          return <OverflowMenuItem key={i} id={i} />
        })}
      </MenuPopover>
    </Menu>
  )
}

export function MultiPreviewPageTopBar({
  imageTitle,
  imageLink,
  publishTime,
  sourceUrl,
  authorName,
  imageCount,
  description,
  tags,
}: MultiPreviewPageTopBarProps) {
  return (
    <div
      absolute
      className="multi-preview top-bar top-bar-effect"
      w="[calc(100%-15px)]"
      max-h="40px"
      p="x-10px"
      flex="~ col"
      overflow-hidden
      z="1"
      transition="all delay-150 duration-200 ease-in-out"
      box-border
    >
      <div shrink-0 flex="~ row justify-between items-center" gap="3px" h="38px">
        <Subtitle2 className="m-0 line-clamp-2">{imageTitle}</Subtitle2>

        <div flex="~ row items-center" gap="3px">
          <ToggleButton className="pin-button hidden!" icon={<PinIcon />} appearance="transparent" />
          <div className="chevron-down-wrapper" flex duration="200">
            <ChevronDown20Regular />
          </div>
        </div>
      </div>

      <div
        shrink-0
        grid="~ cols-[auto_1fr] items-center"
        gap="x-5px y-10px"
        m="y-10px"
        max-h="302px"
        truncate
        overflow-y="auto!"
        box-border
      >
        <Text>链接：</Text>
        <Link className="w-fit" href={imageLink}>
          {imageLink}
        </Link>
        <Text>发布时间：</Text>
        <Text className="w-fit">{publishTime}</Text>
        <Text>来源：</Text>
        <Link className="w-fit" href={sourceUrl}>
          {sourceUrl}
        </Link>
        <Text>作者：</Text>
        <Text className="w-fit">{authorName}</Text>
        <Text>数量：</Text>
        <Text className="w-fit">{imageCount}</Text>
        <Text className="self-start">描述：</Text>
        <Text className="whitespace-pre-wrap!">
          {description}
        </Text>
        <Text>标签：</Text>
        <Overflow>
          <div flex="~ row items-center" gap="5px" overflow-hidden>
            {tags.map(tag => (
              <OverflowItem key={tag} id={tag}>
                <Tag key={tag} appearance="brand" size="small" shape="circular">
                  {tag}
                </Tag>
              </OverflowItem>
            ))}
            <OverflowMenu itemIds={tags} />
          </div>
        </Overflow>
      </div>
    </div>
  )
}
