import type { MapViewState } from '@deck.gl/core'
import { BitmapLayer } from '@deck.gl/layers'
import DeckGL from '@deck.gl/react'
import { TileLayer } from 'deck.gl'

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 136.9025864,
  latitude: 35.1687756,
  zoom: 13,
  minZoom: 6,
}

export default function Map() {
  const osm = new TileLayer({
    id: 'TileLayer',
    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 19,
    minZoom: 6,

    renderSubLayers: (props) => {
      const { boundingBox } = props.tile

      return new BitmapLayer(props, {
        data: undefined,
        image: props.data,
        bounds: [boundingBox[0][0], boundingBox[0][1], boundingBox[1][0], boundingBox[1][1]],
      })
    },
    pickable: true,
  })

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={[
        osm,
      ]}
    />
  )
}
