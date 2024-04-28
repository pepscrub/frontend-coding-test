import { SBFacetAnalysis as Component } from '@/components/FacetAnalysis'
import { Meta, StoryObj } from '@storybook/react'
import AGGREGATIONS from '../fixtures/patent-facets.json'

type Story = StoryObj<typeof Component>

const meta: Meta<typeof Component> = {
  title: 'Components/FacetAnalysis',
  component: Component,
  decorators: [],
  args: {
    aggregation: AGGREGATIONS.aggregations.dates,
    title: "Publications over time",
    hint: "Highlight a selection to filter by date"
  }
}

export default meta

export const FacetAnalysis: Story = {}
