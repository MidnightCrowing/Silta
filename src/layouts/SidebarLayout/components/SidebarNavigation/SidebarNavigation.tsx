import { Divider } from '@fluentui/react-components'
import clsx from 'clsx'
import type { FC } from 'react'
import { Component, Fragment } from 'react'

import type {
  SidebarActiveItemId,
  SidebarButton,
  SidebarItem,
  SidebarNavItem,
  SidebarPosition,
} from '../../shared/SidebarItem.types'
import { NavigationItem } from './NavigationItem.tsx'
import type { SidebarNavigationProps } from './SidebarNavigation.types'

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
          { selfPosition: 'top', items: topItems },
          { selfPosition: 'bottom', items: bottomItems },
        ] as const).map(({ selfPosition, items }) => (
          <div key={selfPosition} flex="~ col" gap="8px">
            {items?.map(item => (
              <SideBarItemButton
                key={item.id}
                selfPosition={selfPosition}
                item={item}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  private changeActiveItem(selfPosition: 'top' | 'bottom', id: SidebarActiveItemId) {
    const setActiveItemId = selfPosition === 'top' ? this.props.setTopActiveItemId : this.props.setBottomActiveItemId
    setActiveItemId(id)
  }

  private SideBarItemButton: FC<{ selfPosition: 'top' | 'bottom', item: SidebarItem }> = ({ selfPosition, item }) => {
    const { position, topActiveItemId, bottomActiveItemId, setItemPosition } = this.props
    const { id, type = 'item' } = item

    switch (type) {
      case 'item': {
        const sidebarPosition = `${position}${selfPosition.charAt(0).toUpperCase()}${selfPosition.slice(1)}` as SidebarPosition

        return (
          <NavigationItem
            itemPosition={sidebarPosition}
            item={item as SidebarNavItem}
            checked={topActiveItemId === id || bottomActiveItemId === id}
            onClick={() => this.changeActiveItem(selfPosition, id)}
            setItemPosition={(newPosition) => { setItemPosition(id, newPosition) }}
          />
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
