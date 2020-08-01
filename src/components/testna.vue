<template>
	<div class='wrapper'>
		<title></title>
		<div class="main1">
			<image class="avatar" src="http://47.101.196.184/final/timg.jpg"></image>
			<div class="username">
				<text class="name">{{username}}</text>
				<text class="action">动态</text>
			</div>
		</div>
		  <wxc-tab-page ref="wxc-tab-page"
						:tab-titles="tabTitles"
						:tab-styles="tabStyles"
						title-type="icon"
						:tab-page-height="tabPageHeight"
						@wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
			<list v-for="(v,index) in tabList"
				  :key="index"
				  class="item-container"
				  :style="{ height: (tabPageHeight - tabStyles.height) + 'px' }">
			  <cell class="border-cell"></cell>
			  <cell v-for="(demo,key) in v"
					class="cell"
					:key="key">
				<wxc-pan-item :ext-id="'1-' + (v) + '-' + (key)"
							  url="https://h5.m.taobao.com/trip/ticket/detail/index.html?scenicId=2675"
							  @wxcPanItemPan="wxcPanItemPan">
				 <div class="content">
					<div v-if="current_index==1"><info></info></div>
					<div v-if="current_index==2"><subsite></subsite></div>
					<div v-if="current_index==3"><log></log></div>
					<div v-if="current_index==4"><datahis></datahis></div>
				 </div>
				</wxc-pan-item>
			  </cell>
			</list>
		  </wxc-tab-page>
	</div>
</template>
    <style scoped>
      .item-container {
        width: 750px;
        background-color: #f2f3f4;
      }
      .border-cell {
        background-color: #f2f3f4;
        width: 750px;
        height: 24px;
        align-items: center;
        justify-content: center;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #e0e0e0;
      }
      .cell {
        background-color: #ffffff;
      }
      .content{
        width:750px;
        height:600px;
        border-bottom-width:1px;
		margin-top: 20px;
        align-items: center;
        justify-content: center;
      }
	  .main1{
	  	flex-direction: row;
	  	height: 160px;
	  	background-color: #00B4FF;
		width: 750px;
	  }
	  .main2{
	  	flex-direction: column;
	  	height: 700px;
	  }
	  .bar{
	  	margin-top: 5px;
	  	flex-direction: row;
	  	height: 70px;
	  	justify-content: space-around;
	  }
	  .btn-holder{
	  	flex-direction: row;
	  	justify-content: space-around;
	  	margin-top: 50px;
	  }
	  .avatar {
	  	margin-top: 20px;
	  	margin-left: 30px;
	  	width: 120px;
	  	height: 120px;
	  	border-radius:60px;
	  	overflow:hidden;
	  }
	  .username{
	      flex-direction: column;
	  	margin-left: 30px;
	  }
	  .name {
	  	margin-top: 20px;
	  	font-size: 60px;
	  	font-weight: 600;
	  	color: #000000;
	  }
	  .action {
	  	margin-top: 20px;
	  	font-size: 40px;
	  	font-weight: 300;
	  	color: #000000;
	  }
    </style>
    <script>
      const dom = weex.requireModule('dom');
      import { WxcTabPage, WxcPanItem, Utils, BindEnv } from 'weex-ui';
      import Config from './config';
	  import title from './header4';
	  import info from './info';
	  import subsite from './add_subsite';
	  import log from './login_log';
	  import datahis from './datahis';
	  const modal = weex.requireModule('modal');
	  const storage = weex.requireModule('storage');
	  const toast = message => {
	    modal.toast({
	  	message,
	  	duration: 1
	    });
	  };
      export default {
        components: { WxcTabPage, WxcPanItem,'title': title,'info':info,'subsite':subsite,'log':log,'datahis':datahis} ,
        data: () => ({
          tabTitles: Config.tabTitles_home,
          tabStyles: Config.tabStyles_home,
          tabList: [],
          demoList: [1],
          tabPageHeight: 1334,
		  current_index:1,
		  username:''
        }),
        created () {
			storage.setItem('username','admin',res=>{
			    if(res.result=='success'){
			    }
			});  
          this.tabPageHeight = Utils.env.getPageHeight();
          this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
          Vue.set(this.tabList, 0, this.demoList);
		  storage.getItem('username',res=>{
		      if(res.result=='success'){
				this.username=res.data;
		      }
		  });  
        },
        methods: {
          wxcTabPageCurrentTabSelected (e) {
            const self = this;
            const index = e.page;
			this.current_index = index + 1;
            /* Unloaded tab analog data request */
            if (!Utils.isNonEmptyArray(self.tabList[index])) {
              setTimeout(() => {
                Vue.set(self.tabList, index, self.demoList);
              }, 100);
            }
          },
          wxcPanItemPan (e) {
            if (BindEnv.supportsEBForAndroid()) {
              this.$refs['wxc-tab-page'].bindExp(e.element);
            }
          }
        }
      };
    </script>