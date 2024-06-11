import app from './app'
import config from './app/config'
import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    app.listen(config.port, () => {
      console.log(`Bike Rental Service on port ${config.port}`)
    })
  } catch (err) {
    console.log(err)
  }
}
//nbh
main()
