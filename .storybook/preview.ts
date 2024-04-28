import type { Preview } from '@storybook/react';
import { initialize as initMsw, mswLoader } from 'msw-storybook-addon';
import { withThemeProvider } from '../src/decorators';
import '../src/globals.css';
import i18n from './i18next';

initMsw({
  serviceWorker: { url: '/apiMockServiceWorker.js' },
  quiet: false
})

const preview: Preview = {
  globals: {
    locale: 'en',
  },
  parameters: {
    i18n,
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  loaders: [mswLoader],
  decorators: [withThemeProvider]
}

export default preview
