<template>
  <div class="wrapper">
		<title></title>
		<div class="main">
			<div class="alarm-live">
				<text class='title_history'>历史报警</text>
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
			<div class='button-query'>
					<wxc-button text="查询"
										type="blue"
										size="small"
										@wxcButtonClicked="queryData"></wxc-button>
			</div>
			<scroller class='scroller-history'>
				<div class="row" v-for="row in results" :key="row.id">
					<text class="text">{{row.data}}</text>
				</div>
			</scroller>
			<div class="alarm-live">
				<text class='title_live'>实时报警</text>
			</div>
			<scroller class='scroller-live'>
				<div class="row" v-for="row in results1" :key="row.id">
					<text class="text">{{row.data}}</text>
					<wxc-button text="处理"
										type="red"
										size="small"
										class="solve"
										@wxcButtonClicked="openDialog"></wxc-button>
				</div>
			</scroller>
		</div>
		<wxc-dialog title="警告"
					content="确认是否处理"
					:show="show"
					:single="false"
					:is-checked="isChecked"
					@wxcDialogCancelBtnClicked="wxcDialogCancelBtnClicked"
					@wxcDialogConfirmBtnClicked="wxcDialogConfirmBtnClicked"
					@wxcDialogNoPromptClicked="wxcDialogNoPromptClicked">
		</wxc-dialog>
	</div>
</template>
<script>
	import { WxcButton } from 'weex-ui';
	import { WxcDialog } from 'weex-ui';
	import title from './header3.vue';
	const dom = weex.requireModule('dom');
	const picker = weex.requireModule('picker');
	const modal = weex.requireModule('modal');
	const stream = weex.requireModule('stream');
	const storage = weex.requireModule('storage');
	const toast = message => {
		modal.toast({
		message,
		duration: 1,
		});
	};
	export default {
	components: {WxcButton, WxcDialog , 'title': title},
	data () {
      return {
		show: false,
		isChecked: false,
		isShow: false,
		date_start: '',
		date_end: '',
		time_start: '',
		time_end: '',
		data_data: [],
		data_name: [],
		data_time: [],
		results: [],
		results1: [],
		value: ''
		};
	},
	created() {
		this.getLive();
	},
methods: {
	pickDate1 () {
		picker.pickDate({
			value: this.value,
			}, event => {
				if (event.result === 'success') {
					this.date_start = event.data;
				}
			});
		},
	pickDate2 () {
		picker.pickDate({
			value: this.value,
			}, event => {
				if (event.result === 'success') {
					this.date_end = event.data;
				}
			});
		},
	pickTime1 () {
		picker.pickTime({
			value: this.value,
			}, event => {
				if (event.result === 'success') {
				this.time_start = event.data;
			}
		});
	},
	pickTime2 () {
		picker.pickTime({
			value: this.value,
			}, event => {
				if (event.result === 'success') {
				this.time_end = event.data;
			}
		});
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
			this.results1.splice(1,1);
			//this.getLive();
	},
	wxcDialogNoPromptClicked (e) {
	//此处必须设置，组件为无状态组件，自己管理
			this.isChecked = e.isChecked;
	},
	queryData() {
		this.results = [];
		stream.fetch({
			method: 'GET',
			type: 'json',
			url: `https://leancloud.cn:443/1.1/classes/alarm?limit=20&&where={"solve": "已解决","time":{"$gte":{ "__type": "Date","iso": "2020-04-04T15:59:45.000Z"},"$lt":{"__type":"Date","iso":"2020-06-30T00:00:00.000Z"}}}`,
			// url:`https://leancloud.cn:443/1.1/classes/alarm?where={"subsite":{"__type":"Pointer","className":"subsite","objectId":"57328ca079bc44005c2472d0"},"dataname":"ETLT","date":{"$gte":{ "__type": "Date","iso": "${this.date_start}T${this.time_start}.000Z"},"$lt":{"__type":"Date","iso":"${this.date_end}T${this.time_end}.000Z"}}}`,
			headers: {
			'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
			'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
			},
		}, res => {
			if (res.status === 200){
				var results = res.data.results;
				var data_length=res.data.results.length;
				for (var i=0;i<data_length;i++){
					// this.data_time[i]=this.results[i].date.iso;
					// this.data_name[i]=this.results[i].dataname;
					// this.data_data[i]=this.results[i].data;
					this.results.push({id: i, data: results[i].time.iso + '    ' + results[i].content + '    ' + results[i].operator + '    ' + results[i].solve + '    '});
					}
				} else {
					toast( '历史报警查询失败！');
					}
			});
		},
		getLive() {
			this.results1 = [];
			stream.fetch({
				method: 'GET',
				type: 'json',
				url: `https://leancloud.cn:443/1.1/classes/alarm?limit=20&&where={"solve": "未解决"}`,
				headers: {
				'X-LC-Id': 'Q4JYeS8N8yTAhdaFtzqW67KX-gzGzoHsz',
				'X-LC-Key': '2sQzz08lA6wd7OV2mLM6orHe',
				},
			}, res => {
				if (res.status === 200){
					var results = res.data.results;
					var data_length=res.data.results.length;
					for (var i=0;i<data_length;i++){
						this.results1.push({id: i, data: results[i].time.iso + '    ' + results[i].content + '    ' + results[i].solve});
						}
					} else {
						toast( '实时报警查询失败！');
						}
				});
		},
		solve () {
		}
	}
};
</script>
<style>
	.group {
		margin-top: 5px;
		flex-direction: row;
		justify-content: center;
		align-items: center;
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
	.alarm-live{
		position: relative;
		background-color:#1C8DE0;
		height: 100px;
		width: 750px;
		margin-top:5px;
		border-radius:10px;
	}
	.title_history{
		font-size: 50px;
		margin-top: 20px;
	}
	.title_live{
		font-size: 50px;
		margin-top: 20px;
	}
	.button-query{
		margin-top: 20px;
		align-items: center;
		width: 750px;
	}
	.scroller-history{
		align-items: center;
		height: 300px;
	}
	.scroller-live{
		align-items: center;
		margin-bottom: 5px;
	}
	.row{
		flex-direction: row;
	}
	.solve{
		height:30px;
		width: 100px;
		margin-left: 10px;
	}
</style>