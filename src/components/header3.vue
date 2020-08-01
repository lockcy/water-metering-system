<template>
	<div class="wrapper">
	  <div class="wxc-title" :aria-hidden="true">
		<image class="logo" src="http://47.101.196.184/final/logo.png"></image>
		<text class="text">报警</text>
		<image class="more" src="http://47.101.196.184/final/more.png"></image>
	  </div>
	  <div class="line"></div>
	</div>
</template>

<style scoped>
  .wxc-title {
    margin-top: 20px;
    flex-direction: row;
  }
  .logo {
    width: 120px;
    height: 120px;
  }
  .more {
    width: 80px;
    height: 80px;
  	margin-top: 20px;
  	margin-left: 380px;
  }
  .text {
    font-size: 60px;
    font-weight: 600;
    color: #000000;
	margin-top: 30px;
  }
  .line {
    background-color:#81F7F3;
    width: 750px;
    height: 2px;
	margin-top: 5px;
  }
</style>

<script>
  export default {
    props: {
      title: String
    }
  }
</script>