
import  Eventmanager from  './Eventmanager' ;
import Dis from './DisplayObject'
import Cir from './circle'
import lin from './line'
import Re from './rect'
import ev from './EventTarget'
import con from './Container'
import wid from './Widge'
~(function () {
    let cce  = {} 
    cce.EventManager = new Eventmanager() 
    cce.EventTarget = ev 
    cce.DisplayObject = Dis 
    cce.Rect = Re
    cce.Circle = Cir
    cce.Line = lin
    window.cce = cce 
})()
export let Container = con
export let Circle = Cir
export let Rect = Re
export let Line = lin
export let EventTarget = ev
export let DisplayObject = Dis 
export let Widge = wid


