/**
 * Created by LinCenYing on 2016-06-04.
 */
/* global navigator */
export const ua = () => {
    var userAgentInfo = navigator.userAgent
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"]
    var flag = 'PC'
    for (var vv = 0; vv < Agents.length; vv++) {
        if (userAgentInfo.indexOf(Agents[vv]) > 0) {
            flag = 'MO'
            break
        }
    }
    return flag
}
