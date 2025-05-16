import { AccordionHeader, AccordionItem, AccordionPanel, CounterBadge, List } from '@fluentui/react-components'

import type { CustomAccordionItemProps } from './CustomAccordionItem.types.ts'

export function CustomAccordionItem({ value, title, count, committedOpenItems, children }: CustomAccordionItemProps) {
  const isOpen = committedOpenItems.includes(value)
  const className = `flex-(~ col) overflow-hidden ${isOpen ? 'flex-1' : 'flex-0'}`

  return (
    <AccordionItem className={className} value={value}>
      <AccordionHeader className="shadow-lg" size="small" as="h6">
        <div grow>{title}</div>
        <CounterBadge count={count} shape="rounded" size="small" />
      </AccordionHeader>
      <AccordionPanel className="h-full mx-0! overflow-(x-hidden! y-scroll!)">
        <List selectionMode="single" navigationMode="composite">
          {children}
        </List>
      </AccordionPanel>
    </AccordionItem>
  )
}
