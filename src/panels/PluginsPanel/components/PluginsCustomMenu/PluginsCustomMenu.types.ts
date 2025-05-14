import type { AccordionItem } from '../../PluginsPanel.types.ts'

export interface ViewMenuProps {
  visibleItems: AccordionItem[]
  setVisibleItems: (items: AccordionItem[]) => void
}

export type PluginsCustomMenuProps = ViewMenuProps
