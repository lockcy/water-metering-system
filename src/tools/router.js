/**
 * 页面跳转路由
 */
let navigator = weex.requireModule('navigator');

const routes = [
	{path:'index', component:'index',name:"登录"},
	{path:'page/register', component:'register',name:"注册"},
	{path:'page/main', component:'main',name:"主界面"},
	{path:'components/equipment', component:'equipment',name:"设备"},
	{path:'components/graph', component:'graph',name:"图表"},
	{path:'components/info', component:'info',name:"个人信息"},
	{path:'components/testna', component:'testna',name:"个人"},
	{path:'components/datahis', component:'datahis',name:"历史数据"},
    {path:'error', component:'error',name:"错误页面"},
	{path:'modules/goods-detail', component:'goods-detail',name:"商品"},
	
];
const modal = weex.requireModule('modal');
const toast = message => {
	modal.toast({
		message,
		duration: 1
		});
	};
function getRoute(component) {
    let name = "";
    let targets = routes.filter(function (route) {
        return route.component === component;
    });
    if(targets.length > 0){
        name = targets.pop().path;
		console.log('name='+name);
    } else {
        name = "error";
    }
    let arr = weex.config.bundleUrl.split("/");
	//console.log('arr='+arr);
    arr.pop();
    if(arr.includes("modules")){
        arr.pop();
    }
	//
	if(arr.includes("page")){
	    arr.pop();
	}
	if(arr.includes("components")){
	    arr.pop();
	}
    if (weex.config.env.platform === "Web"){
        arr.push(name + ".html");
        return arr.join("/");
    } else {
        arr.push(name + ".js");
		//toast(arr.join("/"));
        return arr.join("/");
    }
}
export default function navigateToNextPage(component) {
	console.log('url='+getRoute(component));
    navigator.push({
        url:getRoute(component),
        animated:"true"
    })
};



