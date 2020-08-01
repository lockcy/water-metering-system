<template>
	<div class='wrapper'>
		<div class="info1">
			<input class="user" type="text" disabled=true value=this.username v-model="username"></input>
			<input class="phone" type="tel" placeholder='请输入手机号' value=this.phone v-model="phone"></input>
			<input class="email" type="email" placeholder='请输入用户名' value=this.email v-model="email"></input>
			<!-- <input class="password" type="password" placeholder='如需修改密码则填入新密码' value=this.password v-model="password"></input> -->
			<div class="btn-holder">
				<wxc-button text="保存"
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
			<div class="exit-holder">
				<wxc-button text="退出登录"
						type="red"
						class="exit"
						size="big"
						@wxcButtonClicked="exit"></wxc-button>
			</div>
		</div>
	</div>
</template>

<script>
	import global_msg from '../tools/global';
	//import Vue from 'vue' ;
	import navigateToBack from '../tools/router1';
	import { WxcButton } from 'weex-ui';
	const modal = weex.requireModule('modal');
	const stream = weex.requireModule('stream');
	const storage = weex.requireModule('storage');
	const toast = message => {
	modal.toast({
		message,
		duration: 1
		});
	};
	export default{
		components:{WxcButton},
		data(){
			return {
				ssid: '',
				username: 'guest',
				phone: '',
				email: '',
				password:'',
				username_old: '',
				phone_old: '',
				email_old: '',
				test: '',
			}
			//
		},
		beforeCreate(){

		},
		created() {
			// storage.removeItem('objectId',res=>{
			//     if(res.result=='success'){
			//     }
			// });
			// storage.removeItem('username',res=>{
			//     if(res.result=='success'){
			//     }
			// });
			// storage.removeItem('uid',res=>{
			//     if(res.result=='success'){
			//     }
			// });
			storage.setItem('objectId','5eb2e0d9e525c60008b75619',res=>{
			    if(res.result=='success'){
			    // 数据缓存成功
			    }
			});
			storage.setItem('username','admin',res=>{
			    if(res.result=='success'){
			    // 数据缓存成功
			    }
			});
			// storage.getAllKeys(res=>{
			//     if(res.result=='success'){
			// 		toast(res.data);
			//     }
			// });
			storage.getItem('username',res=>{
			    if(res.result=='success'){
			    }
			});
			storage.getItem('objectId',res=>{
			    if(res.result=='success'){
			        this.ssid = res.data;
					stream.fetch({
					  method:'GET',
					  type:'json',
					  url:`https://leancloud.cn:443/1.1/classes/_User/${this.ssid}`,
					  headers:{
					  'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
					  'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe'},
					},res => {
					    if(res.status==200){
							this.username=res.data.username;
							this.username_old=res.data.username;
							this.phone=res.data.phone;
							this.phone_old=res.data.phone;
							this.email = res.data.email;
							this.email_old = res.data.email;
					    }else{
							//
							//toast("获取数据失败");
					    }
					} )
			    }
				else{
					toast("请先登录");
					//navigateTo("login");
				}
			});
		},
		methods:{
			saveData(){
				var reg_phone=/^1[3456789]\d{9}$/;
				var reg_email=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if (this.username==''||this.email==''||this.phone=='')
				{
					toast('请完善信息!');
				}
				else if(!reg_phone.test(this.phone)){
					toast('手机号码格式错误!');
				}
				else if(!reg_email.test(this.email)){
					toast('邮箱格式错误!');
				}
				else{
				stream.fetch({
				  method:'PUT',
				  type:'json',
				  url:`https://leancloud.cn/1.1/classes/_User/${this.ssid}`,
				  headers:{
					"Content-Type":'application/json',   //巨坑的一个点，卡了一个晚上
					'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
					'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
					'X-LC-Session': 'tuk3195vk4rikhhn6obuza0eh' ,
					},
					body: `{"email":"${this.email}","phone":"${this.phone}"}`,
				},res => {
				    if(res.status==200){
						toast("修改成功！");
				    }else{
						toast("更新数据失败,手机号或邮箱已被占用！");
				    }
				} )
			}
		},
			cancelData(){
				this.username=this.username_old;
				this.phone=this.phone_old;
				this.email=this.email_old;
			},
			exit(){
				//
				navigateToBack();
				// storage.removeItem('ssid',res=>{
				//     if(res.result=='success'){
				//         //清除缓存数据后的操作
				// 		//navigateToBack();
				// 		toast('123');
				//     }
				// })
			}
		}
	}
</script>

<style>
	.wrapper{
		flex-direction: column;
		height: 600px;
	}
	.btn-holder{
		flex-direction: row;
		justify-content: space-around;
		margin-top: 50px;
	}
	.line {
		background-color:#81F7F3;
		width: 750px;
		height: 2px;
		margin-top: 5px;
	}
	.nav{
		flex-direction: column;
		background-color: #00B4FF;
		width: 300px;
		align-items: center;
	}
	.info{
		font-size: 40px;
		height: 100px;
		margin-top: 30px;
	}
	.info1{
		flex-direction: column;
		margin-left: 10px;
		align-items: center;
	}
	.user{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
				background-color: #D8D8D8;
	}
	.phone{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
	}
	.email{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
	}
	.password{
		height: 60px;
		width: 400px;
		border: #000000;
		border-width: 1px;
		margin-top: 30px;
	}
	.cancel{
		margin-left: 50px;
	}
	.exit-holder{
		margin-top: 40px;
	}
	.exit{
		height: 80px;
	}
</style>
