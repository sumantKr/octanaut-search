import UserHandler from './src/api/user/route'
import App from './src/App'

const honoApp = new App([
    new UserHandler()
])

export default {
    port: honoApp.port,
    fetch:honoApp.app.fetch
}
