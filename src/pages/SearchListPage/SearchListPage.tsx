import { Button } from '@fluentui/react-components'
import { useRef } from 'react'

export function SearchListPage() {
  const clickTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    // 延迟触发 click，看看会不会马上触发 doubleClick
    clickTimeout.current = setTimeout(() => {
      console.log('click')
    }, 250) // 200~300ms 一般是合适的
  }

  const handleDoubleClick = () => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current)
      clickTimeout.current = null
    }
    console.log('doubleClick')
  }
  return (
    <Button onClick={handleClick} onDoubleClick={handleDoubleClick}>
      Click or DoubleClick
    </Button>
  )
}
