
  export default  class Eventmanager {
       constructor() {
           this._target={} 
           this.select=[] 
       }
       addTarget(event,ele) {
           if(this._target[event]== undefined){
               this._target[event] = [] 
           }

           let flag = true  
           this._target[event].forEach(item => {
               if (item == ele) {
                   flag = false 
               }
           })
           flag ? this._target[event].push(ele) : null 
       }
       getTarget(event) {
           return this._target[event] 
       }
       removeTarget(type,ele) {
           let i = null 
           let ary = this._target[type] 
           ary.forEach((item,index) => {
               if (item == ele ) {
                   i = index 
               }
           })
           ary.splice(i,1) 
       }
}

