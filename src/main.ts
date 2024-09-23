import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Continet from "./obj/Continet.ts";
import Path from "./obj/path/Path.ts";
import {uuid} from "./util/ProbabilityUtils.ts";

createApp(App).mount('#app')

var continet = new Continet();
var map = new Map<Path, number>();
var path = new Path();
path.id=uuid()
map.set(path, 3);
var path = new Path();
path.id=uuid()
map.set(path, 1);
continet.pathMap = map
continet.init()
console.log(continet.getPaths());