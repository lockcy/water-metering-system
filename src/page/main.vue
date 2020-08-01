<template>
  <wxc-tab-bar :tab-titles="tabTitles"
				:tab-styles="tabStyles"
				title-type="iconFont"
				@wxcTabBarCurrentTabSelected="wxcTabBarCurrentTabSelected">
	<!-- 设备页面-->
	<equipment></equipment>
	<!-- 实时数据页面-->
	<datanow></datanow>
	<!-- 子站组态-->
	<subsites></subsites>
	<!-- 报警-->
	<alarm></alarm>
	<!-- 个人界面-->
	<testna></testna>
  </wxc-tab-bar>
</template>
<style scoped>
	.item-container {
	width: 750px;
	background-color: #f2f3f4;
	align-items: center;
	justify-content: center;
  }
</style>
<script>
	import alarm from '../components/alarm';
	import datanow from '../components/datanow';
	import equipment from '../components/equipment';
	import subsites from '../components/subsites';
	import home from '../components/home';
	import testna from '../components/testna'
	import { WxcTabBar, Utils } from 'weex-ui';
	import {navigateToNextPage,navigateToBack} from '../tools/router';
	import Config from '../components/config';
	const storage = weex.requireModule('storage');
	const modal = weex.requireModule('modal');
	export default {
	components: { WxcTabBar,
			'alarm': alarm,
			'equipment': equipment,
			'datanow': datanow,
			'subsites': subsites,
			'home': home,
			'testna':testna},
			data: () => ({
				// tabTitles: Config.tabTitles,
				// tabStyles: Config.tabStyles
				tabTitles: Config.tabIconFontTitles,
				tabStyles: Config.tabIconFontStyles,
				ssid : '',
		}),
		created () {
			const tabPageHeight = Utils.env.getPageHeight();
			// 如果页面没有导航栏，可以用下面这个计算高度的方法
			//const tabPageHeight = env.deviceHeight / env.deviceWidth * 750;
			const { tabStyles } = this;
			this.contentStyle = { height: (tabPageHeight - tabStyles.height) + 'px' };
			},
			methods: {
				wxcTabBarCurrentTabSelected (e) {
					const index = e.page;
					},
				},
			};
</script>