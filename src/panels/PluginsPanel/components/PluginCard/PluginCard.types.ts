import type { PluginItem } from '../../shared/PluginItem.ts'

export interface PluginCardProps {
  item: PluginItem
  isSelect: boolean
  onSelectedItem: () => void
}
