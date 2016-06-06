/**
 * Created by LinCenYing on 2016-06-04.
 */
export const ua = () => {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPod"];
    var flag = 'PC';
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = 'MO';
            break;
        }
    }
    return flag;
}
