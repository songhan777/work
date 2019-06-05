export default class EventTarget {
    constructor() {
        this._listeners = {}
    }
    /**
     * 添加监听事件
     */
    on(type, fn) {

        const _selfSmallFn = (type, fn) => {
            if (this._listeners[type] == undefined) {
                this._listeners[type] = []
            }
            //在绑定监听事件时候，就将元素存起来
            cce.EventManager.addTarget(type, this)
            let flag = true
            this._listeners[type].forEach(item => {
                if (item == fn) {
                    flag = false
                }
            })
            flag ? this._listeners[type].push(fn) : null
        }

        // 从新包装了下 自己的click事件，与原生的click处理方式不同
        if (type == 'mySelfClick') {
            // 鼠标按下开始计时，当时间超过一定毫秒数，就不算做click事件
            let timeMS = null;
            const mouseDownTimeStart = () => {
                //返回毫秒数getTime（）存起来
                const d = new Date()
                timeMS = d.getTime()
            }

            const mouseUpTimeEnd = (...arg) => {
                const d = new Date();
                const difrence = d.getTime() - timeMS
                if (difrence < 500) {
                    fn(...arg)
                }
                return
            }
            //mouseDownClick,mouseUpClick，是专门用来处理mySelfClick的事件
            _selfSmallFn('mouseDownClick', mouseDownTimeStart);
            _selfSmallFn('mouseUpClick', mouseUpTimeEnd);
            return
        }

        _selfSmallFn(type, fn)
    }

    /**
     * 触发监听事件
     */
    fire(type, point, container) {
        let self = this
        this._listeners[type].forEach(item => {
            item.call(self, self, point, container)
        })
    }

    remove(type, fn) {
        if (fn == null) {
            if (this._listeners.hasOwnProperty(type)) {
                this._listeners[type] = []
                cce.EventManager.removeTarget(type, this)
            }
        }

        if (this._listeners[type] instanceof Array) {
            let listeners = this._listeners[type]
            for (let i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1)
                    if (listeners.length == 0)
                        cce.EventManager.removeTarget(type, this)
                    break
                }
            }
        }
    }
}
