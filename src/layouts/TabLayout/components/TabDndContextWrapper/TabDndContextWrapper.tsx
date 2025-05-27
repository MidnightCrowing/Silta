import type { DragEndEvent } from '@dnd-kit/core'
import { closestCenter, DndContext, MouseSensor, useSensor, useSensors } from '@dnd-kit/core'
import { restrictToHorizontalAxis, restrictToParentElement } from '@dnd-kit/modifiers'
import type { ReactNode } from 'react'

export function TabDndContextWrapper({ children, onDragEnd }: { children: ReactNode, onDragEnd: (event: DragEndEvent) => void }) {
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
      {children}
    </DndContext>
  )
}
