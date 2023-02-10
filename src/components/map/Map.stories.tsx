import type { Meta, StoryObj } from '@storybook/react'
import Feature from 'ol/Feature'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { Stroke, Style } from 'ol/style'
import { LineString } from 'ol/geom'
import { Interactions, DrawInteraction } from './interactions'
import { Layers, TileLayer, VectorLayer } from './layers'

import { Map } from './Map'

const meta = {
  title: 'Map/Map',
  component: Map,
  tags: ['autodocs'],
} satisfies Meta<typeof Map>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    children: (
      <Layers>
        <TileLayer source={new OSM()} />
      </Layers>
    ),
  },
}
