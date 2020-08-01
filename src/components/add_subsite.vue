<template>
	<div class='wrapper'>
		<div class="main">
			<input class="name" type="text"  placeholder='请输入子站名称' value=this.name v-model="name"></input>
			<input class="place" type="text" placeholder='请输入子站地点'  value=this.place v-model="place"></input>
			<input class="condition" type="text" placeholder='请输入子站运行状况' value=this.condition v-model="condition"></input>
			<input class="username" type="text" placeholder='请输入所属用户名' value=this.username v-model="username"></input>
			<div class="btn-holder">
				<wxc-button text="添加"
						type="blue"
						class="save"
						size="medium"
						@wxcButtonClicked="saveData"></wxc-button>
				<wxc-button text="取消"
						type="red"
						class="cancel"
						size="medium"
						@wxcButtonClicked="cancelData"></wxc-button>
			</div>
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
				ssid: '',
				name: '',
				place: '',
				condition: '',
				username: '',
				uid:'',
				test: '',
				qid:''
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
		created() {
		},
		methods:{
			saveData(){
				if (this.name==''||this.place==''||this.condition==''||this.username=='')
				{
					toast('请完善信息!');
				}
				stream.fetch({
				  method:'GET',
				  type:'json',
				  url:`https://leancloud.cn:443/1.1/classes/_User?where={"username":"${this.username}"}&limit=1`,
				  headers:{
					'Content-Type': 'application/json',
					'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
					'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
					'X-LC-Session': 'u0zp8vfyhggvbtclb7aaxjx3x'},
				},res => {
				    if(res.status==200){
						this.qid=res.data.results[0].objectId;
						stream.fetch({
						  method:'POST',
						  type:'json',
						  url:`https://leancloud.cn:443/1.1/classes/subsite`,
						  headers:{
							'Content-Type': 'application/json',
							'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
							'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',},
							body: `{"id":{"__type":"Pointer","className":"_User","objectId":"${this.qid}"},"name":"${this.name}","condition":"${this.condition}","place":"${this.place}"}`
						},res => {
						    if(res.status==201){
								toast("添加成功！");
						    }else{
								toast(" 添加子站失败！");
						    }
						} );
				    }else{
						toast(" 无此用户！");
				    }
				} );
			},
			cancelData(){
				this.name='';
				this.place='';
				this.condition='';
				this.username='';
			},
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
	}
	.btn-holder{
		flex-direction: row;
		justify-content: space-around;
		margin-top: 50px;
	}
	.name{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
	}
	.condition{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
	}
	.place{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
	}
	.username{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
	}
	.cancel{
		margin-left: 50px;
	}
</style>
