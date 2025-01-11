import type { MapViewState } from 'deck.gl'
import { ClipExtension } from '@deck.gl/extensions'
import { PMTilesSource } from '@loaders.gl/pmtiles'
import DeckGL, { BitmapLayer, GeoJsonLayer, TileLayer } from 'deck.gl'

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 136.9025864,
  latitude: 35.1687756,
  zoom: 14,
  minZoom: 14,
}

export default function PMTiles() {
  const tileSource = PMTilesSource.createDataSource('http://localhost:5174/nagoya.pmtiles', {})

  const PMTilesLayer = new TileLayer({
    id: 'pmtilelayer',
    getTileData: tileSource.getTileData,
    maxRequests: 20,
    pickable: true,
    autoHighlight: true,
    minZoom: 14,
    maxZoom: 20,
    tileSize: 256,
    renderSubLayers: (props) => {
      return new GeoJsonLayer({
        id: `${props.id}-geojson`,
        data: props.data,
        pickable: true,
        autoHighlight: true,
        getFillColor: [255, 0, 80, 120],
        lineWidthScale: 1,
        lineWidthMinPixels: 0.5,
      })
    },
  })

  const tileLayer = new TileLayer({
    getTileData: props => tileSource.getTileData(props),
    visible: true,
    renderSubLayers: (props) => {
      return new GeoJsonLayer({
        id: props.id,
        data: props.data,
        extensions: [new ClipExtension()],
        clipBounds: [
          props.tile.bbox,
        ],
        getFillColor: [255, 0, 80, 120],
        lineWidthScale: 1,
        lineWidthMinPixels: 0.5,
      })
    },
  })

  const osm = new TileLayer({
    id: 'osmTileLayer',
    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    maxZoom: 20,
    minZoom: 14,

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
        tileLayer,
        PMTilesLayer,
      ]}
    />
  )
}
