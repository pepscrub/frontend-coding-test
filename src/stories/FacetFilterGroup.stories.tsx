import { StoryBookFacetFilterGroup as Component } from '@/components/FacetFilterGroup'
import { Meta, StoryObj } from '@storybook/react'

import { expect, userEvent, within } from '@storybook/test'
import AGGREGATIONS from '../fixtures/patent-facets.json'

type Story = StoryObj<typeof Component>

const meta: Meta<typeof Component> = {
  title: 'Components/FacetFilterGroup',
  component: Component,
  decorators: [],
  argTypes: {
    aggregationTarget: {
      options: [
        'inventor.name.exact',
        'applicant.name.exact',
        'jurisdiction',
        'dates',
        'publication_type',
        'legal_status.patent_status',
      ],
      control: { type: 'select' }
    }
  },
  args: {
    aggregationTarget: 'jurisdiction',
    label: 'Jurisdiction',
    search: false,
    aggregation: AGGREGATIONS.aggregations,
  }
}

export default meta

export const FacetFilterGroup: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const selectAllButton = await canvas.getByLabelText('facet-select-all');

    await step('Search for a Country and select current results', async () => {
      const searchBox = await canvas.getByPlaceholderText('Search Jurisdiction');
      // Added delay as typing in 0ms breaks fuzzy searcher
      await userEvent.type(searchBox, 'China', { delay: 25 });
      
      const checkBox = canvas.getByLabelText('China')
      expect(checkBox).not.toBeNull();
      await userEvent.dblClick(checkBox);
      
      const currentResults = await canvas.getByLabelText('facet-selection-type-1');
      await userEvent.click(currentResults);

      await userEvent.click(selectAllButton);

      await userEvent.clear(searchBox);
    })

    await step('Selecting All / Deselecting All', async () => {
      await userEvent.click(selectAllButton, { delay: 50 });
      await userEvent.click(selectAllButton, { delay: 50 });
    })

    await step('Selecting a couple items and selecting and de-selecting all', async () => {
      const checkBoxCN = canvas.getByLabelText('China');
      const checkBoxJP = canvas.getByLabelText('Japan');
      const checkBoxWO = canvas.getByLabelText('WO - WIPO');

      await userEvent.click(checkBoxCN)
      await userEvent.click(checkBoxJP)
      await userEvent.click(checkBoxWO)

      await userEvent.click(selectAllButton, { delay: 50 });
      await userEvent.click(selectAllButton, { delay: 50 });
    })
  }
}
