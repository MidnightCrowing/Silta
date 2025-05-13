import type { ReactNode } from 'react'

export interface CustomAccordionItemProps {
  value: string
  title: string
  count: number
  committedOpenItems: string[]
  children: ReactNode
}
