import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { Button, Divider, useIsOverflowGroupVisible } from '@fluentui/react-components'
import { AddRegular } from '@fluentui/react-icons'
import { Fragment } from 'react'

import type { TabItemTypes } from '../../shared/TabItem.types.ts'
import type { updatePageData } from '../../TabLayout.types.ts'
import { SortableTab } from '../SortableTab'

function AddNewTab({ addNewItem }: { addNewItem: () => void }) {
  return (
    <Button
      className="size-28px! mx-5px"
      icon={<AddRegular />}
      appearance="subtle"
      onClick={() => { addNewItem() }}
    />
  )
}

function TabDivider({ groupId }: { groupId: string }) {
  return useIsOverflowGroupVisible(groupId) === 'hidden'
    ? null
    : <Divider className="grow-0! p-(x-0 py-12px) h-1/2 m-y-auto" vertical />
}

export function CustomTabList({ items, activeItemId, onTabSelect, onDragEnd, addItem, removeItem, updatePageData }: {
  items: Record<string, TabItemTypes>
  activeItemId: string | null
  onTabSelect: (itemId: string) => void
  onDragEnd: (event: DragEndEvent) => void
  addItem: (newItem?: any, active?: boolean, insertIndex?: number) => void
  removeItem: (updater: (items: Record<string, any>) => Record<string, any>) => void
  updatePageData: updatePageData
}) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5, // 按住不动移动5px时才进行拖拽, 这样就可以触发点击事件
      },
    }),
  )

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      sensors={sensors}
      modifiers={[
        restrictToHorizontalAxis, // 限制只能在水平方向上移动
        restrictToParentElement, // 不能超出父组件
      ]}
    >
      <SortableContext items={Object.keys(items)} strategy={horizontalListSortingStrategy}>
        <div w-full m="t-9px" flex="~ row items-center">
          {
            Object.entries(items).map(([id, item]) => {
              return (
                <Fragment key={id}>
                  <SortableTab
                    id={id}
                    item={item}
                    isSelect={activeItemId === id}
                    allTabIds={Object.keys(items)}
                    onSelect={() => { onTabSelect(id) }}
                    addItem={addItem}
                    removeItem={updater => removeItem(updater)}
                    updatePageData={updatePageData}
                  />
                  <TabDivider groupId={id} />
                </Fragment>
              )
            })
          }

          <AddNewTab addNewItem={addItem} />
        </div>
      </SortableContext>
    </DndContext>
  )
}
