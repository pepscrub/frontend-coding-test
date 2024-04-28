import { SBFacetAnalysis as Component } from '@/components/FacetAnalysis'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'
import AGGREGATIONS from '../fixtures/patent-facets.json'

type Story = StoryObj<typeof Component>

const title = "Publications over time";
const hint = "Highlight a selection to filter by date";

const meta: Meta<typeof Component> = {
  title: 'Components/FacetAnalysis',
  component: Component,
  decorators: [],
  args: {
    aggregation: AGGREGATIONS.aggregations.dates,
    title,
    hint,
  }
}

export default meta

export const FacetAnalysis: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Check to see if Title is displayed', async () => {
      const data = await canvas.findByLabelText('bar-chart-title')
      expect(data).not.toBeNull();
      expect(data).toBeDefined()
    });

    await step('Check to see if Hint is displayed', async () => {
      const data = await canvas.findByLabelText('bar-chart-hint')
      expect(data).not.toBeNull();
      expect(data).toBeDefined()
    })

    await step('Check to bar chart exists', async () => {
      const barChart = await canvas.findByLabelText('bar-chart')
      expect(barChart).toBeDefined()
    })
  }
}
