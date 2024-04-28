import { ViewPatent as Component } from '@/components/ViewPatent';
import { getDefaultTestParameters, getTestPatent } from '@/components/handlers';
import { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/test';

type Story = StoryObj<typeof Component>

const meta: Meta<typeof Component> = {
  title: 'Components/ViewPatent',
  component: Component,
  args: {
    patent: getTestPatent(0).document
  }
}

export default meta

export const ViewPatent: Story = {
  parameters: getDefaultTestParameters(),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('Check the title is displayed', async () => {
      await canvas.findAllByText(
        'ARTIFICIAL INTELLIGENCE EYE DISEASE SCREENING AND DIAGNOSTIC SYSTEM BASED ON OPHTHALMIC ROBOT'
      )
    })

    await step('Check patent bar is rendered', async () => {
      await canvas.findAllByText('20220079429')
      await canvas.findAllByText('A1')
      await canvas.findAllByText('Patent Application')
      await canvas.findAllByText('Family: 4s/4ex')
    })

    await step('Check patent legal status', async () => {
      await canvas.findAllByText('Pending')
    })

    await step('Check correct dates are displayed', async () => {
      await canvas.findAllByText('Published: Mar 17, 2022')
      await canvas.findAllByText('Earliest Priority: Sep 11, 2020')
    })

    await step('Check correct inventors are displayed', async () => {
      await canvas.findAllByText('Inventors: Chen Wei, Li Zhongwen, Zheng Qinxiang')
    })

    await step('Checking to see is abstract is displayed', async () => {
      await canvas.findAllByText(
        'Abstract'
      )
    })

    await step('Checking to see if claim is displayed', async () => {
      await canvas.findAllByText(
        'Claim'
      )
    })

    await step('Checking to see if preview contains no image', async () => {
      await canvas.findAllByText(
        'No Image Yet'
      )
    })
  }
}

