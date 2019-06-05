/**
 * 创建工作流的 模板ID
 */
function createStreamId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 *  注册时生成唯一的tokenID
 */
function createTokenId () {
    return 'xxxxxxxxxxxxxxxx'.replace(/x/g, c => {
        const r = (Math.random() * 16) | 0;
        return r.toString(16) 
    })

}

function copyTableToSession (req, tableData) {
    console.log('//////////////////')
    console.log(tableData)
    console.log(typeof tableData)
    req.session.token = tableData.token
    req.session.user_id = tableData.user_id
    req.session.last_action = tableData.last_action
    req.session.login = tableData.login
/*     for (let key in tableData) {
        console.log(key)
        console.log('$#$#$#$#$$)))))))))))))')
        req.session[key] = tableData[key]
    }  */
    return null
}

function loginNoTimeOut (interval) {
    const bol = interval < 1000 * 60 * 60 * 24
    return bol
}

module.exports = {
    createStreamId,
    createTokenId,
    copyTableToSession,
    loginNoTimeOut
}
