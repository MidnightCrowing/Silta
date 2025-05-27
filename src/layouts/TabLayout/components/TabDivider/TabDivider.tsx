import { Divider, useIsOverflowGroupVisible } from '@fluentui/react-components'

export function TabDivider({ groupId }: { groupId: string }) {
  const isGroupVisible = useIsOverflowGroupVisible(groupId)

  if (isGroupVisible === 'hidden') {
    return null
  }

  return (
    <Divider className="grow-0! p-(x-0 py-12px) h-1/2 m-y-auto" vertical />
  )
}
