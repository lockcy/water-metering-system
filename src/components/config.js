export default {

  // 正常模式的tab title配置
  tabTitles: [
    {
      title: '子站1',
    },
    {
      title: '子站2',
    },
    {
      title: '子站3',
    },
    {
      title: '子站4',
    },
	{
	  title: '子站5',
	}
  ],
  
 tabTitles_home:[
    {
      title: '个人信息',
    },
    {
      title: '添加子站',
    },
    {
      title: '登录日志',
    },
    {
      title: '查看历史数据',
    }
  ],
  
  tabStyles_home:{
    bgColor: '#FFFFFF',
    titleColor: '#666666',
    activeTitleColor: '#3D3D3D',
    activeBgColor: '#FFFFFF',
    isActiveTitleBold: true,
    iconWidth: 20,
    iconHeight: 20,
    width: 180,
    height: 80,
    fontSize: 26,
    textPaddingLeft: 10,
    textPaddingRight: 10
  },
  tabStyles: {
    bgColor: '#FFFFFF',
    titleColor: '#666666',
    activeTitleColor: '#3D3D3D',
    activeBgColor: '#FFFFFF',
    isActiveTitleBold: true,
    iconWidth: 70,
    iconHeight: 70,
    width: 140,
    height: 120,
    fontSize: 24,
    textPaddingLeft: 10,
    textPaddingRight: 10
  },

  // 使用 iconFont 模式的tab title配置
  tabIconFontTitles: [
    {
      title: '设备',
      codePoint: '\ue615'
    },
    {
      title: '数据',
      codePoint: '\ue664'
    },
    {
      title: '子站',
      codePoint: '\ue745',
      //badge: 5
    },
    {
      title: '报警',
      codePoint: '\ue600',
      dot: true
    },
	{
	  title: '个人',
	  codePoint: '\ue604',
	  dot: true
	}
  ],
  tabIconFontStyles: {
    bgColor: '#FFFFFF',
    titleColor: '#666666',
    activeTitleColor: '#3D3D3D',
    activeBgColor: '#FFFFFF',
    isActiveTitleBold: true,
    width: 140,
    height: 120,
    fontSize: 24,
    textPaddingLeft: 10,
    textPaddingRight: 10,
    iconFontSize: 50,
    iconFontMarginBottom: 8,
    iconFontColor: '#333333',
    activeIconFontColor: 'red',
    iconFontUrl: '//at.alicdn.com/t/font_1735409_vr8qltccdak.ttf'
  }
}