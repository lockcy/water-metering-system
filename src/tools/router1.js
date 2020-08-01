/**
 * 页面跳转路由
 */
let navigator = weex.requireModule('navigator');


export default function navigateToBack() {
    navigator.pop({
        animated:"true"
    })
};



