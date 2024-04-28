import { StoryBookFacetFilterGroup as Component } from '@/components/FacetFilterGroup'
import { Meta, StoryObj } from '@storybook/react'

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
    label: 'Inventor',
    aggregation: AGGREGATIONS.aggregations,
  }
}

export default meta

export const FacetFilterGroup: Story = {}
