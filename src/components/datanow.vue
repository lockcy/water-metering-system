<template>
	<div class='wrapper'>
		<title></title>
<!-- 		<div class='test'><text>{{test}}</text></div> -->
		<div class='subtitle'>
			<wxc-button text="选择子站"
					class="exit"
					type="blue"
					size="medium"
					@wxcButtonClicked="pick"></wxc-button>
			<text class='subsite-text'>{{subsite_select}}</text>
		</div>
		<scroller class='main'>
			<div class='flex-test'>
				<div class='card' v-for="data in results">
					<div style="flex-direction: row;">
						<text style="margin-top: 20px; margin-bottom: 20px; font-size: 20px;" >{{data.name}}</text>
						<text v-if="data.unit" style="margin-top: 20px; margin-bottom: 20px; font-size: 20px;" >({{data.unit}})</text>
					</div>
					<text style="margin-top: 20px; margin-bottom: 20px; font-size: 20px;" >{{data.data}}</text>
				</div>
			</div>
		</scroller>
	</div>
</template>

<script>
  import title from './header1';
  import { WxcButton } from 'weex-ui';
  const picker = weex.requireModule('picker');
  const dom = weex.requireModule('dom');
  const modal = weex.requireModule('modal');
  const stream = weex.requireModule('stream');
  const storage = weex.requireModule('storage');
  const toast = message => {
    modal.toast({
  	message,
  	duration: 1
    });
  };
  export default {
	components: {'title': title, WxcButton},
    data () {
      return {
		list:['111','222','333'],
		subsite:[],
		subsite_id:[],
		test:'1',
		test1:'2',
		index:'',
		index1:'',
		data:[],
		temp: [],
		number:[],
		ttt:[],
		results:'',
		subsite_select:'请选择子站'
      };
    },
	beforeCreate(){
		storage.setItem('uid','5eb2e0d9e525c60008b75619',res=>{
		    if(res.result=='success'){
		    // 数据缓存成功
		    }
		});
		//
		storage.getItem('uid',res=>{
		    if(res.result=='success'){
		        this.ssid = res.data;
				stream.fetch({
				  method:'GET',
				  type:'json',
				  url:`https://leancloud.cn:443/1.1/classes/subsite?where={"id":{"__type": "Pointer","className": "_User","objectId": "${this.ssid}"}}&&limit=20`,
				  headers:{
				  'X-Avoscloud-Application-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
				  'X-Avoscloud-Application-Key': '2sQzz08lA6wd7OV2mLM6orHe'},
				},res => {
				    if(res.status==200){
						var number=parseInt(Object.keys(res.data.results).length);
						this.number=number;
						for ( var i=0;i<number;i++){
							//this.subsite[i]=res.data.results[i].name;
							this.subsite.push(res.data.results[i].name);
							//this.subsite_id[i]=res.data.results[i].objectId;
							// this.subsite_id.push( {id : i, name : res.data.results[i].objectId});
							 this.subsite_id.push( res.data.results[i].objectId );
						}
						stream.fetch({
						  method:'GET',
						  type:'json',
						  url:`https://leancloud.cn:443/1.1/classes/equipment?where={"sid":{"__type": "Pointer", "className": "subsite", "objectId":"${this.subsite_id[0]}"}}`,
						  headers:{
						  'X-Avoscloud-Application-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
						  'X-Avoscloud-Application-Key': '2sQzz08lA6wd7OV2mLM6orHe'},
						},res => {
							if(res.status==200){
								this.results=res.data.results;
								//this.data.push({id: 1, data: res.data.results});
							}
						} );
				    } else {
						toast( "获取数据失败");
				    }
				} );
				
		    }
		});
		// stream.fetch({
		//   method:'GET',
		//   type:'json',
		//   url:`https://leancloud.cn:443/1.1/classes/equipment?where={"sid":{"__type": "Pointer", "className": "subsite", "objectId":"${this.subsite_id[i]}"}}`,
		//   headers:{
		//   'X-Avoscloud-Application-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
		//   'X-Avoscloud-Application-Key': '2sQzz08lA6wd7OV2mLM6orHe'},
		// },res => {
		// 	if(res.status==200){
		// 		this.data.push({id: 1, data: res.data.results});
		// 	}
		// } );
	},
	created(){
		//this.test1=this.subsite_id[this.number];
		//this.getData();
	},
    methods: {
		pick () {
		  picker.pick({
		    items: this.subsite
		  }, event => {
		    if (event.result === 'success') {
					this.index=event.data;
					this.subsite_select = this.subsite[event.data];
		    }
		  })
		},
		getData(){
			stream.fetch({
			  method:'GET',
			  type:'json',
			  url:`https://leancloud.cn:443/1.1/classes/equipment?where={"sid":{"__type": "Pointer", "className": "subsite", "objectId":"${this.subsite_id[this.index]}"}}`,
			  headers:{
			  'X-Avoscloud-Application-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
			  'X-Avoscloud-Application-Key': '2sQzz08lA6wd7OV2mLM6orHe'},
			},res => {
			    if(res.status==200){
					// this.data.push({id: this.subsite[i], data: res.data.results});
					this.temp=this.subsite_id;
					this.test1=this.temp;
			    }else{
					toast("获取数据失败");
			    }
			} );
		},
      scroll(e) {
      }
    }
  };
  //
</script>

<style scoped>
	.eq{
		flex-direction: row;
	}
	.subtitle{
		margin-top: 20px;
		margin-left: 20px;
		height: 100px;
		flex-direction: row;
	}
	.subsite-text{
		font-size: 40px;
		margin-left: 50px;
	}
	.title{
		position: relative;
		background-color:#0088FB;
		height: 100px;
		width: 700px;
		top: 30px;
		border-radius:10px;
		left:30px;
	}
	.title-text{
		margin-top: 30px;
		font-size: 50px;
		color: white;
	}
	.vice-title{
		margin-top: 10px;
	}
  .panel {
		width: 700px;
		height: 300px;
		margin-left: 30px;
		margin-top: 10px;
		margin-bottom: 20px;
		flex-direction: column;
		/* justify-content: center; */
		border-width: 2px;
		border-style: solid;
		border-color: rgb(162, 217, 192);
		background-color: white;
  }
  .text {
		font-size: 20px;
		text-align: center;
		color: #41B883;
  }
  .data1{
		border-width: 4px;
		border-color:rgb(162, 217, 192);
  }
  .tmp{
		flex-direction: row;
  }
  .test{
	  height: 700px;
  }
  .test-s{
	  height: 600px;
  }
  .flex-test{

	  width: 700px;
	  display: flex;
	  display: -webkit-flex;
	  flex-direction: row;
	  flex-wrap: wrap;
	  margin: auto;
  }
  .card{
	  border-width: 3px;
	  border-color: #000000;
	  margin-top: 2px;
	  margin-left: 2px;
	  margin-bottom: 2px;
	  height: 150px;
	  width: 170px;
	  border-radius: 10px;
	  align-items: center;
  }
  .main{
	  margin-top: 10px;
	  margin-left: 25px;
	  width: 700px;
	  height: 700px;
  }

</style>
