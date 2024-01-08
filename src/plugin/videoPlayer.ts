import {App} from 'vue'
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

const setupVueVideoPlayer  = (app: App) => {
    app.use(VueVideoPlayer)
}
export {setupVueVideoPlayer}