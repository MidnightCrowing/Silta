import { FluentProvider, webLightTheme } from '@fluentui/react-components'
import type { RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { AliveScope } from 'react-activation'

function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <FluentProvider theme={webLightTheme}>
        <AliveScope>
          {children}
        </AliveScope>
      </FluentProvider>
    ),
    ...options,
  })
}

export { renderWithProviders }
