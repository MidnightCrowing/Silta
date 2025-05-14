import type { AccordionItem } from '../../PluginsPanel.types.ts'

export interface ViewMenuProps {
  initialVisibleItems: AccordionItem[]
  onVisibleItemsChange: (items: AccordionItem[]) => void
}

export interface PluginsCustomMenuProps {
  visibleItems: AccordionItem[]
  setVisibleItems: (items: AccordionItem[]) => void
}
