import type { SearchProps } from '../../FolderPanel.types.ts'

export interface SearchResultActionsProps {
}

export interface FolderSearchFieldProps {
  searchProps: SearchProps
  setSearchProps: (newValue: Partial<SearchProps>) => void
}
