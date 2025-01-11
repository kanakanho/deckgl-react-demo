import styles from './Attribution.module.css'

type AttributionProps = {
  url: string
  message: string
}

export default function Attribution() {
  const attributions: AttributionProps[] = [
    {
      url: 'https://www.openstreetmap.org/copyright',
      message: '© OpenStreetMap contributors',
    },
    {
      url: 'https://www.mlit.go.jp/plateau/',
      message: '© 国土交通省 Project PLATEAU',
    },
  ]

  return (
    <div className={styles.attribution}>
      {
        attributions.map(attribution => (
          <a key={attribution.url} href={attribution.url} target="_blank" rel="noopener noreferrer">
            {attribution.message}
          </a>
        ))
      }
    </div>
  )
}
