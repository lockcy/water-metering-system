<template>
  <div class="wrapper">
	<div class="select">
		<div class="group">
			<text class="button_site" @click="pick">{{subsite}}</text>
			<text class="button_type" @click="pickType">{{data_type}}</text>
		</div>
		<div class="group">
			<text class='start-text'>起始日期</text>
			<text class="button" @click="pickDate1">{{date_start}}</text>
			<text class='start-text'>起始时间</text>
			<text class="button" @click="pickTime1">{{time_start}}</text>
		</div>
		<div class="group">
			<text class='end-text'>结束日期</text>
			<text class="button" @click="pickDate2">{{date_end}}</text>
			<text class='end-text'>结束时间</text>
			<text class="button" @click="pickTime2">{{time_end}}</text>
		</div>
		<div class='butt' style="flex-direction: row;">
		<wxc-button text="查询"
				type="blue"
				class="query"
				size="small"
				@wxcButtonClicked="queryData"></wxc-button>
		<wxc-button text="生成图表"
				type="blue"
				class="graph"
				size="small"
				@wxcButtonClicked="go"></wxc-button>
		</div>
	</div>
	<scroller class='scroller'>
		<div class="row" v-for="row in ttest" :key="row.id">
		      <text class="text">{{row.name}}</text>
		</div>
	</scroller>
  </div>
</template>

<script>
  import navigateToNextPage from '../tools/router';
  import { WxcButton } from 'weex-ui';
  const picker = weex.requireModule('picker');
  const modal = weex.requireModule('modal');
  const stream = weex.requireModule('stream');
  const storage = weex.requireModule('storage');
  const dom = weex.requireModule('dom');
  const toast = message => {
    modal.toast({
  	message,
  	duration: 1
    });
  };
  export default {
	  components: {
	  	WxcButton
	  },
    data () {
      return {
        subsite: '请选择子站',
		subsite_id:[],
		data_type:'请选择数据类型',
		ttest:[],
		ttest1:'',
		ttest2:'',
		subsite1:[],
		ssid:'',
		length:'',
		dateValue:'',
		equ:[[],[],[],[],[],[],[],[],[],[]],
		date_start:'',
		date_end:'',
		time_start:'',
		time_end:'',		
		index:'',
		value:'',
		results:'',
		
		data_data:[],
		data_name:[],
		data_time:[],
		data_length:0,
		
		test2:'',
      }
    },
	beforeCreate(){
	},
	created(){
		storage.setItem('uid','5eb2e0d9e525c60008b75619',res=>{
		    if(res.result=='success'){
		    } 
		});
		storage.getItem('uid',res=>{
		    if(res.result=='success'){
		    // 数据缓存成功
			this.ssid=res.data;
			stream.fetch({
			  method:'GET',
			  type:'json',
			  url:`https://leancloud.cn:443/1.1/classes/subsite?where={"id": {"__type": "Pointer","className": "_User", "objectId": "${this.ssid}"}}&limit=10`,
			  headers:{
				'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
				'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
				},
			},res => {
			    if(res.status==200){
					//toast(res.data.results[1].name);
					this.length=parseInt(res.data.results.length);
					this.test2=res.data.results;
					for (var i = 0; i < this.length;i++){
						this.subsite1.push(res.data.results[i].name);
						this.subsite_id.push(res.data.results[i].objectId);
						// this.equ[0][0]=res.data.results[0].equipment[0];
						// this.equ[0][1]=res.data.results[0].equipment[1];
						for (var j = 0; j<res.data.results[i].equipment.length;j++){
							this.equ[i][j]=res.data.results[i].equipment[j];
						}
					}
			    }else{
					toast(" 未知错误！");
			    }
			} );
		    }
		});
	},
    methods: {
      pickDate1 () {
        picker.pickDate({
          value: this.value
        }, event => {
          if(event.result === 'success') {
            this.date_start = event.data;
          }

        })
      },
	  pickDate2 () {
	    picker.pickDate({
	      value: this.value
	    }, event => {
	      if(event.result === 'success') {
	        this.date_end = event.data;
	      }
	  
	    })
	  },
      pickTime1 () {
        picker.pickTime({
          value: this.value
        }, event => {
          if (event.result === 'success') {
			this.time_start = event.data;
          }
        })
      },
	  pickTime2 () {
	    picker.pickTime({
	      value: this.value
	    }, event => {
	      if (event.result === 'success') {
	  			this.time_end = event.data;
	      }
	    })
	  },
      
      pick () {
        picker.pick({
          items: this.subsite1
        }, event => {
          if (event.result === 'success') {
			this.index=event.data;
            this.subsite = this.subsite1[event.data];
			this.data_type='请选择数据类型';
          }
        })
      },
	  pickType () {
	    picker.pick({
	      items: this.equ[this.index]
	    }, event => {
	      if (event.result === 'success') {
	        this.data_type = this.equ[this.index][event.data];
	      }
	    })
	  },
	  go(){
		navigateToNextPage('graph');  
	  },
	  queryData() {
		  stream.fetch({
		    method:'GET',
		    type:'json',
		    //url:`https://leancloud.cn:443/1.1/classes/data?limit=20&&where={"subsite":{"__type":"Pointer","className":"subsite","objectId":"57328ca079bc44005c2472d0"},"dataname":"ETLT","date":{"$gte":{ "__type": "Date","iso": "2020-04-04T15:59:45.000Z"},"$lt":{"__type":"Date","iso":"2020-04-05T16:00:00.000Z"}}}`,
		    url:`https://leancloud.cn:443/1.1/classes/data?limit=100&&where={"subsite":{"__type":"Pointer","className":"subsite","objectId":"57328ca079bc44005c2472d0"},"dataname":"${this.data_type}","date":{"$gte":{ "__type": "Date","iso": "${this.date_start}T${this.time_start}:00.000Z"},"$lt":{"__type":"Date","iso":"${this.date_end}T${this.time_end}:00.000Z"}}}`,
			headers:{
		  	'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
		  	'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
		  	},
		  },res => {
		      if(res.status==200){
				  this.ttest=[];
				  this.results=res.data.results;
				  this.data_length=res.data.results.length;
				  for (var i=0;i<this.data_length;i++){
					  this.data_time[i]=this.results[i].date.iso;
					  this.data_name[i]=this.results[i].dataname;
					  this.data_data[i]=this.results[i].data;
					  this.ttest.push({id: i,name: this.data_time[i]+'    '+this.data_name[i]+'    '+this.data_data[i]})
				  }
				  if (this.data_length==100){
					  toast('最多显示100条数据，请选择合适的时间范围。');
					  //
				  }
		      }else{
		  		toast(" 查询失败！");
		      }
			  
		  } );
		  //navigateToNextPage('graph');
	  }
    }
  }
</script>

<style scoped>
  .wrapper {
	flex-direction: column;
  }
  .group {
    flex-direction: row;
    justify-content: center;
    align-items: center;
	height: 50px;
  }
  .select{
	  flex-direction: column;
  }
  .label {
    font-size: 40px;
    color: #888888;
  }
  .title {
    font-size: 80px;
    color: #41B883;
  }
  .start-text{
		font-size: 26px;
		height: 60px;
		margin-left: 20px;
  }
  .end-text{
  		font-size: 26px;
  		height: 60px;
		margin-left: 20px;
  }
  .button {
    font-size: 26px;
    width: 200px;
	height: 40px;
    color:#000000;
	margin-left: 20px;
    border-width: 1px;
    border-color:#000000;
    background-color:white
  }
  .button_site {
	  margin-left: 30px;
  }
  .button_type{
	  margin-left: 30px;
  }
  .query{
	  margin-left: 200px;
  }

  .scroller{
	  flex-direction: column;
	  margin-top: 5px;
	  margin-left: 100px;
	  height: 300px;
  }
</style>