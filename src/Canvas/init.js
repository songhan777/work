import Continer from './Continer' 
import DisplayObject from './DisplayObject' 
import  Eventmanager from  './Eventmanager' 
import  EventTarget from './EventTarget' 
export default function init () {
    let cce  = {} 
    cce.EventManager = new Eventmanager() 
    cce.EventTarget = EventTarget 
    cce.DisplayObject = DisplayObject 
    cce.Container = Continer 
    window.cce = cce 
}
