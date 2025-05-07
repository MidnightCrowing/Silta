import './ImageGalleryPageTopBar.scss'

import type { OverflowItemProps } from '@fluentui/react-components'
import {
  Breadcrumb,
  BreadcrumbButton,
  BreadcrumbDivider,
  BreadcrumbItem,
  Link,
  Menu,
  MenuButton,
  MenuPopover,
  MenuTrigger,
  Overflow,
  OverflowItem,
  Skeleton,
  SkeletonItem,
  Subtitle2,
  Tag,
  Text,
  ToggleButton,
  useIsOverflowItemVisible,
  useOverflowMenu,
} from '@fluentui/react-components'
import { bundleIcon, ChevronDown20Regular, Pin20Filled, Pin20Regular } from '@fluentui/react-icons'
import type { FC } from 'react'
import { Fragment } from 'react'

import type { breadcrumbPathItem, ImageGalleryPageTopBarProps } from './ImageGalleryPageTopBar.types'

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

      <MenuPopover className="ImageGallery-top-bar-effect">
        {itemIds.map((i) => {
          return <OverflowMenuItem key={i} id={i} />
        })}
      </MenuPopover>
    </Menu>
  )
}

export function ImageGalleryPageTopBar({
  imageTitle,
  imageLink,
  breadcrumbPath,
  publishTime,
  source,
  authorName,
  imageCount,
  description,
  tags,
}: ImageGalleryPageTopBarProps) {
  const isLoading = imageTitle === undefined
  const isError = imageTitle == null

  return (
    <div
      absolute
      className="image-gallery top-bar top-bar-effect"
      w="[calc(100%-15px)]"
      max-h="40px"
      p="x-10px"
      flex="~ col"
      overflow-hidden
      z="1"
      transition="all delay-150 duration-200 ease-in-out"
      box-border
    >
      <Skeleton aria-label="Loading images topbar info">
        <div shrink-0 flex="~ row justify-between items-center" gap="3px" h="38px">
          {
            isLoading
              ? (
                  <SkeletonItem />
                )
              : (
                  <Subtitle2 className={`m-0 line-clamp-2 ${isError ? 'color-$colorPaletteRedForeground1' : ''}`}>
                    {imageTitle ?? 'Error: 获取标题失败'}
                  </Subtitle2>
                )
          }

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
          {/* 链接 */}
          {imageLink && (
            <>
              <Text>链接：</Text>
              <Link className="w-fit" href={imageLink}>
                {imageLink}
              </Link>
            </>
          )}

          {/* 路径 */}
          {breadcrumbPath && breadcrumbPath.length > 0 && (
            <>
              <Text>路径：</Text>
              <Breadcrumb aria-label="Image Breadcrumb">
                {
                  breadcrumbPath.map(({ title, link }: breadcrumbPathItem, index: number) => {
                    const isLastItem = index === breadcrumbPath.length - 1
                    return (
                      <Fragment key={title + link}>
                        <BreadcrumbItem>
                          <BreadcrumbButton
                            appearance="transparent"
                            onClick={() => console.log(title)}
                            current={isLastItem}
                            className="py-0! h-unset!"
                          >
                            {title}
                          </BreadcrumbButton>
                        </BreadcrumbItem>
                        {!isLastItem && <BreadcrumbDivider />}
                      </Fragment>
                    )
                  })
                }
              </Breadcrumb>
            </>
          )}

          {/* 发布时间 */}
          {publishTime && (
            <>
              <Text>发布时间：</Text>
              <Text className="w-fit">{publishTime}</Text>
            </>
          )}

          {/* 来源 */}
          {source && (
            <>
              <Text>来源：</Text>
              <Text className="w-fit">
                {source}
              </Text>
            </>
          )}

          {/* 作者 */}
          {authorName && (
            <>
              <Text>作者：</Text>
              <Text className="w-fit">{authorName}</Text>
            </>
          )}

          {/* 数量 */}
          <Text>数量：</Text>
          <Text className="w-fit">{imageCount}</Text>

          {/* 描述 */}
          {description && (
            <>
              <Text className="self-start">描述：</Text>
              <Text className="whitespace-pre-wrap!">
                {description}
              </Text>
            </>
          )}

          {/* 标签 */}
          {tags && tags.length > 0 && (
            <>
              <Text>标签：</Text>
              <Overflow padding={25}>
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
            </>
          )}
        </div>
      </Skeleton>
    </div>
  )
}
