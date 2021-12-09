/*
  商家信息操作.by kohelp
*/
//商家信息初始化
exports.initSellerInfo = async (context) => {
  try {

    // 获取数据库商家的小程序的url
    let selectArr = [context.data.shop_id]
    let dbSellerInfo = await context.cloud.dataspace.executeSql('select app_url from lh_seller_info where shop_id=?', selectArr);
    // 直接返回数据库中的app_url
    if (dbSellerInfo && dbSellerInfo.length > 0) {
      return { success: true, data: dbSellerInfo[0]['app_url'] };
    }

    // 实例化并返回app_url
    let templateId = 3000000005439521
    let tempVersion = context.data.tempVersion
    let description = "抽奖靠手专属定制"
    let name = context.data.userNick
    let accessToken = context.accessToken

    let json = JSON.stringify({
      'shop_id': context.data.shop_id
    });

    // 构建实例化应用
    const insInfo = await context.cloud.topApi.invoke({
      api: 'taobao.miniapp.template.instantiate',
      data: {
        'clients': 'taobao',
        'description': description,
        'ext_json': json,
        'icon': 'https://img.alicdn.com/imgextra/i1/289589474/O1CN01kGf3a92Jr8upORpfu_!!289589474.jpg',
        'name': name,
        'template_id': templateId,
        'template_version': tempVersion,
        'session': accessToken
      }
    });

    // 已经实例化
    if (insInfo['code'] != null && insInfo['code'] == 15) {

    } else if (insInfo['app_version'] != '') {
      let appId = insInfo['app_id'];
      let appVersion = insInfo['app_version'];

      // 上线实例化应用
      const onLineAppInfo = await context.cloud.topApi.invoke({
        api: 'taobao.miniapp.template.onlineapp',
        data: {
          'clients': 'taobao',
          'app_id': appId,
          'template_id': templateId,
          'template_version': tempVersion,
          'app_version': appVersion,
          'session': accessToken
        }
      });
      if (onLineAppInfo['app_info'] != '') {
        let selectArr = [context.data.shop_id, context.data.userNick, accessToken, appId, appVersion, tempVersion, appUrl]

        let data = await context.cloud.dataspace.executeSql('insert into lh_seller_info(shop_id,user_nick,accessToken,app_id,app_version,app_temp_version,app_url) values(?,?,?,?,?,?,?)', selectArr);

        if (data.insertId > 0) return { success: true, data: onLineAppInfo['app_info']['online_url'] }; 
      }
    }

    return { success: false, data: "获取链接失败", }
  } catch (err) {
    return { success: false, msg: JSON.stringify(err), }
  }
};
