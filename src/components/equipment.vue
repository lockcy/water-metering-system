<template>
  <div class="wrapper">
	<title></title>
	<wxc-ep-slider :slider-id="sliderId"
				   :card-length=this.eqnumber
				   :card-s="cardSize"
				   :select-index="2"
				   @wxcEpSliderCurrentIndexSelected="wxcEpSliderCurrentIndexSelected">
	  <!--自动生成demo-->
	  <div v-for="(v,index) in this.index"
		   :key="index"
		   :slot="`card${index}_${sliderId}`"
		   :class="['slider',`slider${index}`]">
		   <image class="logo" v-bind:src="url[indexg]"/>
	  </div>
	</wxc-ep-slider>
	<div class="line"></div>
	<div class='equipment'>
		<text class='equipment-name'>设备名称:  {{list[indexg]}}</text>
		<text class='equipment-place'>设备地点:  {{list1[indexg]}}</text>
		<text class='equipment-condition'>运行状态:  {{list2[indexg]}}</text>
		<text class='equipment-data'>数据:  {{list3[indexg]}}</text>
	</div>
	<div class='select'>
		<wxc-button text="子站选择"
						  type="blue"
						  size="medium"
						  class='select_1'
						  @wxcButtonClicked="pick"></wxc-button>
		<text class='select_2'>当前子站{{subsite_select}}</text>
	</div>
	<wxc-dialog title="警告"
				content="是否删除"
				:show="show"
				:single="false"
				:is-checked="isChecked"
				@wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
				@wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked "
				@wxcDialogNoPromptClicked="wxcDialogNoPromptClicked">
	</wxc-dialog>
	 <div class="size">
	          <wxc-button text="修改"
	                      type="blue"
	                      size="big"
	                      @wxcButtonClicked="add"></wxc-button>
	          <wxc-button text="删除"
	                      type="red"
	                      size="big"
	                      @wxcButtonClicked="openDialog"></wxc-button>
	</div>
  </div>
</template>
<style scoped>
  .wrapper {
	padding-top: 0px;
  }
  .slider {
	margin-top: 30px;
	width: 400px;
	height: 400px;
	background-color: #C3413D;
	align-items: center;
/* 	justify-content: center; */
  }
  .logo{
	  height: 400px;
	  width: 400px;
	  margin-top: 0px;
  }
  .slider1 {
	background-color: #635147;
  }
  .slider2 {
	background-color: #FFC302;
  }
  .slider3 {
	background-color: #FF9090;
  }
  .slider4 {
	background-color: #546E7A;
  }
  .equipment{
	  left:30px;
  }
  .equipment-name{
	  font-size: 40px;
	  line-height: 100px;
  }
  .equipment-condition{
	  font-size: 40px;
	  line-height: 100px;
  }
  .equipment-place{
	  font-size: 40px;
	  line-height: 100px;
  }
  .equipment-username{
	  font-size: 40px;
	  line-height: 100px;
  }
  .equipment-data{
  	  font-size: 40px;
  	  line-height: 100px;
  }
  .btn{
	  flex-direction: row;
	  align-items: center;
  }
  .select{
	  margin-left: 24px ;
	  flex-direction: row;
  }
  .select_2{
	  font-size: 30px;
	  font-weight: 100;
	  margin-left: 20px;
  }
    .size {
		margin-top: 30px;
      flex-direction: row;
      justify-content: space-around;
    }
    .button-size-text {
      margin-left: 24px;
      margin-bottom: 24px;
      margin-top: 40px;
    }
	.line {
	  background-color:#81F7F3;
	  width: 750px;
	  height: 2px;
	  margin-top: 5px;
	}
	.test{
		height: 200px;
	}
	.iconfont {
	  font-family: iconfont5;
	  font-size: 200px;
	}
</style>
<script>
	import { WxcMask , WxcEpSlider , WxcButton , WxcDialog } from 'weex-ui';
	import title from './header';
	const modal = weex.requireModule('modal');
	const stream = weex.requireModule('stream');
	const storage = weex.requireModule('storage');
	const picker = weex.requireModule('picker');
	const toast = message => {
	  modal.toast({
		message,
		duration: 1
	  });
	};
  export default {
	components:{ WxcEpSlider, WxcButton, WxcMask, WxcDialog ,'title':title},
	data () {
		return{
			  sliderId: 1,
			  cardLength: this.eqnumber,
			  cardSize: {
				width: 400,
				height: 350,
				spacing: 0,
				scale: 0.3
			  },
			  
			  eqnumber:0,
			  indexg : 0,
			  index:[],
			  list : [],
			  list1 : [],
			  list2 : [],
			  list3 : [],
			  list4: [],
			  url:[],
			  data:[],
			  count:'',
			  number:'',
			  ssid:'',
			  indexsub:0,
			  subsite:[],
			  subsite_id:[],
			  subsite_select:'',
			  result:[],
			  show: false,
			  isChecked: false,
			  isShow:false,
		}
	},
	beforeCreate(){
		  storage.setItem('uid','5eb2e0d9e525c60008b75619',res=>{
		      if(res.result=='success'){
		      // 数据缓存成功
		      }
		  });
		  storage.getItem('uid', res =>{
		      if(res.result =='success'){
		          this.ssid = res.data;
		  		stream.fetch({
		  		  method: 'GET',
		  		  type: 'json',
		  		  url: `https://leancloud.cn:443/1.1/classes/subsite?where={"id":{"__type": "Pointer","className": "_User","objectId": "${this.ssid}"}}&limit=10`,
		  		  headers: {
		  		  'X-Avoscloud-Application-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
		  		  'X-Avoscloud-Application-Key': '2sQzz08lA6wd7OV2mLM6orHe'},
		  		}, res => {
		  		    if(res.status==200){
		  				this.number=parseInt(Object.keys(res.data.results).length);
		  				this.eqnumber=parseInt(res.data.results[0].equipment.length);	
		  				for ( var j=0;j<this.number;j++){
							this.subsite.push(res.data.results[j].name);
		  					this.subsite_id.push(res.data.results[j].objectId );
							//
		  					}
		  				this.getData();
		  		    }else{
		  				toast("获取数据失败");
		  		    }
		  		} );
		      }
		  });
	},
	created (){
			},
			
	methods: {
	  wxcEpSliderCurrentIndexSelected (e) {
		const index = e.currentIndex;
		this.indexg = e.currentIndex;
		console.log(index);
	  },
	  
	  wxcButtonClicked (e) {
	  console.log(e);
	  },
		getData(){
	  		  stream.fetch({
	  		    method:'GET',
	  		    type:'json',
	  		    url:`https://leancloud.cn:443/1.1/classes/equipment?where={"sid": {"__type": "Pointer", "className": "subsite", "objectId": "${this.subsite_id[this.indexsub]}"}}`,
	  		    headers:{
	  		    'X-Avoscloud-Application-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
	  		    'X-Avoscloud-Application-Key': '2sQzz08lA6wd7OV2mLM6orHe',
				},
	  		  },res => {
	  		      if(res.status==200){
	  				var number=parseInt(res.data.results.length);
	  		  		for (var i=0;i < number; i++) {
	  		  			this.index[i]=i;
						this.list.push(res.data.results[i].name);
						this.list1.push(res.data.results[i].place);
						this.list2.push(res.data.results[i].condition);
						this.list3.push(res.data.results[i].data);
						this.list4.push(res.data.results[i].objectId);
						this.url.push(res.data.results[i].pic.url);
	  		  		}
	  		      }else{
	  		  		toast("获取数据失败");
	  		      }
	  		  } );
	  },
	  
	  delData(){
		  //
	  		  stream.fetch({
	  		    method:'DELETE',
	  		    type:'json',
	  		    url:`https://leancloud.cn:443/1.1/classes/equipment/${this.list4[this.indexg]}`,
	  		    headers:{
	  		    'X-Avoscloud-Application-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
	  		    'X-Avoscloud-Application-Key': '2sQzz08lA6wd7OV2mLM6orHe'},
	  		  },res => {
	  		      if(res.status==200){
					  this.list.splice(this.indexg,1);
					  this.list1.splice(this.indexg,1);
					  this.list2.splice(this.indexg,1);
					  this.list3.splice(this.indexg,1);
					  this.list4.splice(this.indexg,1);
					 toast("删除数据成功");
	  		      }else{
	  		  		toast("删除数据失败");
	  		      }
	  		  } );
	  },
	  add(){
		  
	  },
	  
	  openDialog () {
	  		this.show = true;
	  },
	  wxcDialogCancelBtnClicked () {
	  //此处必须设置，组件为无状态组件，自己管理
	  		this.show = false;
	  },
	  wxcDialogConfirmBtnClicked () {
	  //此处必须设置，组件为无状态组件，自己管理
	  		this.show = false;
			this.delData();
	  },
	  wxcDialogNoPromptClicked (e) {
	  //此处必须设置，组件为无状态组件，自己管理
	  		this.isChecked = e.isChecked;
	  },
	  pick () {
	    picker.pick({
	      items: this.subsite
	    }, event => {
	      if (event.result === 'success') {
	        this.indexsub = event.data;
			this.subsite_select = this.subsite[event.data];
			this.clear();
			this.getData();
	      }
	    })
	  },
	  clear(){
		  this.list=[];
		  this.list1=[];
		  this.list2=[];
		  this.list3=[];
		  this.list4=[];
		  this.test1='';
		  this.url=[];
		  this.indexg=0;
	  }
	}
  }
</script>