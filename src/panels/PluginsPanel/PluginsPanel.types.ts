import type { ReactNode } from 'react'

export interface CustomAccordionItemProps {
  value: string
  title: string
  committedOpenItems: string[]
  children: ReactNode
}
