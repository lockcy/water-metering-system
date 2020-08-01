<template>
	<div class="wrapper">
		<div class='logo'>
			<text class="iconfont bar-ic">&#xe625;</text>
			<text class='title'>水计量监测系统</text>
		</div>
		<div class="login-modal">
			<input class="username-input" type="text" auto-complete="off" placeholder="请输入账号" v-model="username" max-length=20></input>
		</div>
		<div class="password-modal">
			<input class='password-input' type="password" auto-complete="off" placeholder="请输入密码" v-model="password" max-length=20></input>
		</div>
		<div class='tab-holder'>
			<div class='register' @click="register"><text>注册用户</text></div>
			<div class='forget' @click="forget"><text>忘记密码</text></div>
		</div>
		<div class="btn-holder">
			<wxc-button text="登录"
					type="blue"
					class="login"
					size="big"
					@wxcButtonClicked="handleSubmit"></wxc-button>
			<wxc-button text="退出"
					class="exit"
					type="red"
					size="big"
					@wxcButtonClicked="exit"></wxc-button>
		</div>
		
	</div>
</template>
<script>
import { WxcButton } from 'weex-ui';
let navigator = weex.requireModule('navigator');
import navigateToNextPage from './tools/router';
const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');
const close = weex.requireModule('close');
import global_msg from './tools/global';
const toast = message => {
	modal.toast({
		message,
		duration: 1
		});
	};
export default {
	components:{WxcButton},
	data () {
		return{
			username:'',
			password:'',
			objectId:'',
			error:''};
	},
	beforeCreate(){
		let domModule = weex.requireModule('dom');
		domModule.addRule('fontFace',{
			'fontFamily': 'iconfont5',
			'src': "url('http://at.alicdn.com/t/font_1735409_vr8qltccdak.ttf')"
		})
	},
	created(){
		//for test
		//
		//navigateToNextPage('graph');
		storage.removeItem('objectId',res=>{
		    if(res.result=='success'){
		    }
		});
		storage.removeItem('username',res=>{
		    if(res.result=='success'){
		    }
		});
		storage.removeItem('uid',res=>{
		    if(res.result=='success'){
		    }
		});
		storage.getItem('objectId', res =>{
			if (res.result == 'success'){
				navigateToNextPage("main");
				}
		});
	},
	methods:{
		handleSubmit () {
			//
			if (this.username==''||this.password=='')
			{
				toast('用户名或密码不能为空');
			}
			else
			{
				stream.fetch({
					method:'POST',
					type:'json',
					//url:`https://leancloud.cn:443/1.1/login?&&username=${this.username}&&password=${this.password}`,
					url:`https://leancloud.cn:443/1.1/login`,
					headers:{
					'Content-Type':'application/json',  
					'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
					'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
					},
					body:`{"username":"${this.username}","password":"${this.password}"}`
					},res => {
						if(res.status==200){
							//toast('登陆成功');
							this.objectId=res.data.objectId;
							storage.setItem('objectId',this.objectId,res=>{
								if(res.result=='success'){
								}
							});
							storage.setItem('username',this.username,res=>{
								if(res.result=='success'){
									navigateToNextPage('main');
								}
							});
						}else{
							//
							toast("登陆失败");
						}
					} )
			}
		},
	register(){
		// navigator.push({
		// 	url: 'http://192.168.43.210:9090/page/register.js',
		// 	animated: "true"
		// }, event => {
		// 	modal.toast({ message: 'callback: ' + event})
		// })
		navigateToNextPage('register');
	},
	exit(){
		close.closeApp();
	},
	forget(){
		toast('请联系管理员');
	}
	}
};
</script>

<style scoped>
	.logo{
		margin-top: 20px;
		align-items: center;
		margin-bottom: 50px;
	}
  .iconfont {
    font-family: iconfont5;
  }
  .bar-ic{
	  font-size: 200px;
  }
  .title{
	  font-size: 45px;
  }
	.wrapper{
		margin-top:50px;
	}
	.login{
		width: 300px;
	}
	.exit{
		width: 300px;
	}
	.tab-holder{
		margin-top: 10px;
		align-items: center;
		flex-direction: row;
		margin-left: 50px;
		width: 650px;
		height: 70px;
	}
	.register{
		margin-left: 100px;
	}
	.forget{
		margin-left: 250px;
	}
	.btn-holder{
		margin-left: 50px;
		width: 650px;
		margin-top: 50px;
		flex-direction: row;
		justify-content: space-around;
		border-radius: 10px;
	}
	.username-input{
		height:80px;
		border-width: 2px;
		margin-left: 50px;
		width: 650;
		border-radius: 10px;
	}
	.password-input{
		height:80px;
		border-width: 2px;
		margin-left: 50px;
		width: 650;
		margin-top: 30px;
		border-radius: 10px;
	}
</style>
