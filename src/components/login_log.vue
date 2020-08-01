<template>
	<div class='wrapper'>
		<div class="main">
			<input class="name" type="text"  placeholder='请输入查询用户名' value=this.queryname v-model="queryname"></input>
			<div class="btn-holder">
				<wxc-button text="查询"
						type="blue"
						class="query"
						size="medium"
						@wxcButtonClicked="queryData"></wxc-button>
			</div>
		</div>
		<div class='test'>
			<list>
			<cell class='cell' v-for="index in this.length">
				<text class='q'>{{queryname}}</text>
				<text class='q'>{{list_ip[index-1]}}</text>
				<text class='q'>{{list_time[index-1]}}</text>
			</cell>
			</list>
		</div>
		
	</div>
</template>

<script>
	import { WxcButton } from 'weex-ui';
	const modal = weex.requireModule('modal');
	const stream = weex.requireModule('stream');
	const storage = weex.requireModule('storage');
	const toast = message => {
	modal.toast({
		message,
		duration: 1,
		});
		};
	export default{
		components:{WxcButton},
		data(){
			return {
				ssid:'',
				qid:'',
				queryname:'',
				test: '',
				list_ip:[],
				list_time:[],
				length:'',
			}
		},
		beforeCreate(){
			storage.setItem('uid','5eb2e0d9e525c60008b75619',res=>{
			    if(res.result=='success'){
			    // 数据缓存成功
				this.ssid=res.data;
			    }
			});
		},
		created() {},
		methods:{
			queryData(){
				if (this.queryname=='')
				{
					toast('请输入用户名!');
				}
				else{
				stream.fetch({
				  method:'GET',
				  type:'json',
				  url:`https://leancloud.cn:443/1.1/classes/_User?limit=1&&where={"username":"${this.queryname}"}`,
				  headers:{
					'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
					'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
					'X-LC-Session': 'u0zp8vfyhggvbtclb7aaxjx3x'
					},
				},res => {
				    if(res.status==200&&res.data.results!=''){
						this.qid=res.data.results[0].objectId;
						stream.fetch({
						  method:'GET',
						  type:'json',
						  url:`https://leancloud.cn:443/1.1/classes/login_log?where={"id": { "__type": "Pointer", "className": "_User", "objectId": "${this.qid}"}}`,
						  headers:{
							'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
							'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
							'X-LC-Session': '2sQzz08lA6wd7OV2mLM6orHe'
							},
						},res => {
						    if(res.status==200){
								this.test=res.data.results.length;
								this.length=parseInt(res.data.results.length);
								for (var i = 0 ;i < this.length;i++){
									this.list_ip[i]=res.data.results[i].ip;
									this.list_time[i]=res.data.results[i].time.iso;
								}
						    }else{
								toast(" 未知错误！");
						    }
						} );
				    }else{
						toast(" 查无此人！");
				    }
				} );
			}
			}
		},
		}
</script>

<style>
	.wrapper{
		flex-direction: column;
		height: 600px;
	}
	.main{
		align-items: center;
		flex-direction: row;
	}
	.btn-holder{
		flex-direction: row;
		justify-content: space-around;
		margin-top: 30px;
		margin-left: 20px;
	}
	.name{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
	}
	.test{
		flex-direction: column;
		margin-top: 30px;
	}
	.cell{
		flex-direction: row;
	}
	.q{
		margin-left: 20px;
	}
</style>
