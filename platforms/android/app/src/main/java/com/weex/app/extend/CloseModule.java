package com.weex.app.extend;

import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;
import com.weex.app.WXPageActivity;
import com.weex.app.extend.CacheActivity;

public class CloseModule extends WXModule {

    @JSMethod(uiThread = false)
    public void closeApp() {
		CacheActivity.finishActivity();
    }

}