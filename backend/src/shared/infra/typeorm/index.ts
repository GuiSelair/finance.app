import { ConnectionSource } from './bootstrap'

ConnectionSource.initialize()
  .then(() => {
    console.log('🏦 Datasource: ON')
  })
  .catch((error) => {
    console.log('⚠️ Datasource: DOWN ⚠️')
    console.error(error)
  })
