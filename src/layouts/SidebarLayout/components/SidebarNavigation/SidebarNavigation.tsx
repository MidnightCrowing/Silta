import { Divider, ToggleButton, Tooltip } from '@fluentui/react-components'
import { bundleIcon, GridFilled, GridRegular } from '@fluentui/react-icons'
import clsx from 'clsx'
import type { FC } from 'react'
import { Component, Fragment } from 'react'

import type { SidebarActiveItemId, SidebarButton, SidebarItem, SidebarNavItem } from '../../shared/SidebarItem.types'
import type { SidebarNavigationProps } from './SidebarNavigation.types'

const DefaultSidebarIcon = bundleIcon(GridFilled, GridRegular)

export class SidebarNavigation extends Component<SidebarNavigationProps> {
  render() {
    const {
      children,
      className,
      position,
      topItems,
      bottomItems,
      topActiveItemId,
      bottomActiveItemId,
      setTopActiveItemId,
      setBottomActiveItemId,
      ...props
    } = this.props
    const { SideBarItemButton } = this

    return (
      <div
        className={clsx(
          position === 'left'
            ? 'b-r-(solid 1px $colorNeutralBackground5)'
            : 'b-l-(solid 1px $colorNeutralBackground5)',
          className,
        )}
        flex="~ col justify-between"
        gap="8px"
        p="5px"
        {...props}
      >
        {([
          { position: 'top', items: topItems },
          { position: 'bottom', items: bottomItems },
        ] as const).map(({ position, items }) => (
          <div key={position} flex="~ col" gap="8px">
            {items?.map(item => (
              <SideBarItemButton
                key={item.id}
                position={position}
                item={item}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  private changeActiveItem(position: 'top' | 'bottom', id: SidebarActiveItemId) {
    const setActiveItemId = position === 'top' ? this.props.setTopActiveItemId : this.props.setBottomActiveItemId
    setActiveItemId(id)
  }

  private SideBarItemButton: FC<{ position: 'top' | 'bottom', item: SidebarItem }> = ({ position, item }) => {
    const { topActiveItemId, bottomActiveItemId } = this.props
    const { id, type = 'item' } = item

    switch (type) {
      case 'item': {
        const { label, icon: Icon = DefaultSidebarIcon } = item as SidebarNavItem

        return (
          <Tooltip content={label} relationship="label" positioning="after" withArrow>
            <ToggleButton
              checked={topActiveItemId === id || bottomActiveItemId === id}
              icon={<Icon />}
              appearance="subtle"
              onClick={() => this.changeActiveItem(position, id)}
            />
          </Tooltip>
        )
      }

      case 'divider':
        return <Divider />

      case 'button': {
        const { component: Component = Fragment } = item as SidebarButton

        return <Component />
      }

      default:
        throw new Error(`Unknown sidebar item type: ${type}`)
    }
  }
}
