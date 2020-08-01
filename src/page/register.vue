<template>
	<div class="wrapper">
		<div class='logo'>
			<text class="iconfont bar-ic">&#xe625;</text>
			<text class='title'>水计量监测系统</text>
		</div>
		<div class="username-modal">
			<input class="username-input" type="text" auto-complete="off" placeholder="请输入用户名" v-model="username" max-length=20></input>
		</div>
		<div class="email-modal">
			<input class='password-input' type="text" auto-complete="off" placeholder="请输入邮箱" v-model="email" max-length=20></input>
		</div>
		<div class="phone-modal">
			<input class='password-input' type="text" auto-complete="off" placeholder="请输入电话号码" v-model="phone" max-length=20></input>
		</div>
		<div class="password-modal">
			<input class='password-input' type="password" auto-complete="off" placeholder="请输入密码" v-model="password" max-length=20></input>
		</div>
		<div class="re-password-modal">
			<input class='re-password-input' type="password" auto-complete="off" placeholder="请确认密码" v-model="re_password" max-length=20></input>
		</div>
		<div class="btn-holder">
			<wxc-button text="注册"
					type="blue"
					class="register"
					size="big"
					@wxcButtonClicked="registerSubmit"></wxc-button>
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
import navigateToNextPage from '../tools/router';
import navigateToBack from '../tools/router1';
const stream = weex.requireModule('stream');
const modal = weex.requireModule('modal');
const storage = weex.requireModule('storage');
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
			email:'',
			phone:'',
			re_password:'',
			error:''};
	},
	beforeCreate(){
		  let domModule = weex.requireModule('dom');
		  domModule.addRule('fontFace',{
			'fontFamily': 'iconfont5',
			'src': "url('http://at.alicdn.com/t/font_1735409_vr8qltccdak.ttf')"
		  })
	},
	methods: {
	  registerSubmit () {
		var reg_phone=/^1[3456789]\d{9}$/;
		var reg_email=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if (this.username==''||this.password==''||this.email==''||this.phone==''||this.re_password=='')
		{
			toast('请完善信息!');
		}
		else if(!reg_phone.test(this.phone)){
			toast('手机号码格式错误!');
		}
		else if(!reg_email.test(this.email)){
			toast('邮箱格式错误!');
		}
		else if(this.password!=this.re_password){
			toast('两次密码不一致');
		}
		else if (this.password.length<6){
			toast('密码长度小于六位');
		}
		else{
			stream.fetch({
			  method:'POST',
			  type:'application/json',
			  url:`https://leancloud.cn:443/1.1/users`,
			  headers:{
					'Content-Type':'application/json',  
					'X-Avoscloud-Application-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
					'X-Avoscloud-Application-Key': '2sQzz08lA6wd7OV2mLM6orHe',
					'Access-Control-Allow-Origin': 'https://leancloud.cn'},
					body:`{"username":"${this.username}","password":"${this.password}","email":"${this.email}","phone":"${this.phone}"}`,
			},res => {
				if(res.status==201){
					toast('注册成功');
					storage.setItem('objectId',res.data.objectId,res=>{
						if(res.result=='success'){
							storage.setItem('username',res.data.username,res=>{
								if(res.result=='success'){
									navigateToBack();
								}
							})
						}
					})
				}else{
					toast("注册失败");
				}
			} )
		}
	},
		exit(){
			navigateToBack();
		}
	}
};
//
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
	  font-size: 40px;
  }
	.wrapper{
		margin-top:50px;
	}
	.register{
		width: 300px;
	}
	.exit{
		width: 300px;
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
	.email-input{
		height:80px;
		border-width: 2px;
		margin-left: 50px;
		width: 650;
		border-radius: 10px;
	}
	.phone-input{
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
	.re-password-input{
		height:80px;
		border-width: 2px;
		margin-left: 50px;
		width: 650;
		margin-top: 30px;
		border-radius: 10px;
	}
</style>
