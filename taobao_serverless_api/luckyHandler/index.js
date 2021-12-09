// 获取活动、规则、奖品、布局信息
exports.getElement = async (context) => {
  // 获取参数
  let { shop_id, acid } = context.data

  // 获取活动信息
  let activityInfo = await context.cloud.dataspace.executeSql('select * from lh_activity where id=? order by id desc', [acid]);
  if (activityInfo == null || activityInfo == '' || activityInfo.length == 0) return { success: true, 'code': 182, 'msg': '活动未创建!' }

  // 获取活动规则
  let ruleList = await context.cloud.dataspace.executeSql('select * from lh_activity_rule where acid=? order by rule_sort', [acid]);
  if (ruleList == null || ruleList == '' || ruleList.length == 0) return { success: true, 'code': 183, 'msg': '商家未创建规则!' }

  // 获取活动奖品
  let awardList = await context.cloud.dataspace.executeSql('select * from lh_activity_award where acid=? order by award_sort asc', [acid]);
  if (awardList == null || awardList == '' || awardList.length == 0) return { success: true, 'code': 152, 'msg': '商家未创建奖品!' }

  // 游戏布局
  let layoutInfo = [{ "id": "cff0fc10-3ac4-11eb-8d87-075f1f865e61", "name": "\u9996\u9875", "edit": false, "height": 870, "game_type": 601, "bg": "https:\/\/img.alicdn.com\/imgextra\/i4\/289589474\/O1CN01w97kww2Jr8yFgZ3vi_!!289589474.png", "val": { "1607590343651000": { "name": "gameRichLuckyArea", "timestamp": "1607590343651000", "position": { "top": 191, "left": 36.5, "width": 293, "height": 289, "zindex": 3 }, "layoutConfig": { "widthTitle": "\u5bbd\u5ea6", "width": 293, "heightTitle": "\u9ad8\u5ea6", "height": 289, "topTitle": "\u5c45\u4e0a", "top": 191, "leftTitle": "\u5c45\u5de6", "left": 36.5 }, "logoConfig": { "title": "\u80cc\u666f\u56fe\u7247", "url": "https:\/\/img.alicdn.com\/imgextra\/i3\/289589474\/O1CN01fH3FAZ2Jr8yIA3yZA_!!289589474.png" }, "roundType": { "title": "\u8f6c\u76d8\u7c7b\u578b", "type": 0, "list": [{ "val": "\u65e0\u6307\u9488", "style": "0" }, { "val": "\u5e26\u6307\u9488", "style": "1" }, { "val": "\u5e26\u6307\u94882", "style": "2" }] } }, "1607590371934000": { "name": "gameRichBtn", "timestamp": "1607590371934000", "position": { "top": 289, "left": 138, "width": 90, "height": 90, "zindex": 4 }, "layoutConfig": { "widthTitle": "\u5bbd\u5ea6", "width": 90, "heightTitle": "\u9ad8\u5ea6", "height": 90, "topTitle": "\u5c45\u4e0a", "top": 289, "leftTitle": "\u5c45\u5de6", "left": 138 }, "logoConfig": { "title": "\u80cc\u666f\u56fe\u7247", "url": "" } }, "1607590381308000": { "name": "activityShare", "timestamp": "1607590381308000", "position": { "top": 523, "left": 27, "width": 151, "height": 40.5, "zindex": 2 }, "titleColor": { "title": "\u80cc\u666f\u989c\u8272", "default": [{ "item": "rgba(255,255,255,0)" }], "color": [{ "item": "rgba(255,255,255,0)" }] }, "textPosition": { "title": "\u6587\u672c\u4f4d\u7f6e", "type": 0, "list": [{ "val": "\u5c45\u5de6", "style": "left", "icon": "icondoc_left" }, { "val": "\u5c45\u4e2d", "style": "center", "icon": "icondoc_center" }, { "val": "\u5c45\u53f3", "style": "right", "icon": "icondoc_right" }] }, "textStyle": { "title": "\u6587\u672c\u6837\u5f0f", "type": 0, "list": [{ "val": "\u6b63\u5e38", "style": "normal", "icon": "icondoc_general" }, { "val": "\u659c\u4f53", "style": "italic", "icon": "icondoc_skew" }, { "val": "\u52a0\u7c97", "style": "bold", "icon": "icondoc_bold" }] }, "fontSize": { "title": "\u6587\u672c\u5927\u5c0f", "val": 12, "min": 12 }, "mbConfig": { "title": "\u9875\u9762\u95f4\u8ddd", "val": 0, "min": 0 }, "layoutConfig": { "widthTitle": "\u5bbd\u5ea6", "width": 151, "heightTitle": "\u9ad8\u5ea6", "height": 40.5, "topTitle": "\u5c45\u4e0a", "top": 523, "leftTitle": "\u5c45\u5de6", "left": 27 }, "logoConfig": { "title": "\u80cc\u666f\u56fe\u7247", "url": "" } }, "1607590393073000": { "name": "activityMyAward", "timestamp": "1607590393073000", "position": { "top": 528, "left": 199, "width": 147, "height": 35.5, "zindex": 2 }, "titleColor": { "title": "\u80cc\u666f\u989c\u8272", "default": [{ "item": "rgba(255,255,255,0)" }], "color": [{ "item": "rgba(255,255,255,0)" }] }, "textPosition": { "title": "\u6587\u672c\u4f4d\u7f6e", "type": 0, "list": [{ "val": "\u5c45\u5de6", "style": "left", "icon": "icondoc_left" }, { "val": "\u5c45\u4e2d", "style": "center", "icon": "icondoc_center" }, { "val": "\u5c45\u53f3", "style": "right", "icon": "icondoc_right" }] }, "textStyle": { "title": "\u6587\u672c\u6837\u5f0f", "type": 0, "list": [{ "val": "\u6b63\u5e38", "style": "normal", "icon": "icondoc_general" }, { "val": "\u659c\u4f53", "style": "italic", "icon": "icondoc_skew" }, { "val": "\u52a0\u7c97", "style": "bold", "icon": "icondoc_bold" }] }, "fontSize": { "title": "\u6587\u672c\u5927\u5c0f", "val": 12, "min": 12 }, "mbConfig": { "title": "\u9875\u9762\u95f4\u8ddd", "val": 0, "min": 0 }, "layoutConfig": { "widthTitle": "\u5bbd\u5ea6", "width": 147, "heightTitle": "\u9ad8\u5ea6", "height": 35.5, "topTitle": "\u5c45\u4e0a", "top": 528, "leftTitle": "\u5c45\u5de6", "left": 199 }, "logoConfig": { "title": "\u80cc\u666f\u56fe\u7247", "url": "" } }, "1607590404375000": { "name": "activityRule", "timestamp": "1607590404375000", "position": { "top": 601, "left": 27, "width": 322, "height": 119, "zindex": 2 }, "titleColor": { "title": "\u5b57\u4f53\u989c\u8272", "default": [{ "item": "rgba(255,255,255,0)" }], "color": [{ "item": "rgba(255,255,255,0)" }] }, "bgColor": { "title": "\u80cc\u666f\u989c\u8272", "default": [{ "item": "rgba(255,255,255,0)" }], "color": [{ "item": "rgba(255,255,255,0)" }] }, "textPosition": { "title": "\u6587\u672c\u4f4d\u7f6e", "type": 0, "list": [{ "val": "\u5c45\u5de6", "style": "left", "icon": "icondoc_left" }, { "val": "\u5c45\u4e2d", "style": "center", "icon": "icondoc_center" }, { "val": "\u5c45\u53f3", "style": "right", "icon": "icondoc_right" }] }, "textStyle": { "title": "\u6587\u672c\u6837\u5f0f", "type": 0, "list": [{ "val": "\u6b63\u5e38", "style": "normal", "icon": "icondoc_general" }, { "val": "\u659c\u4f53", "style": "italic", "icon": "icondoc_skew" }, { "val": "\u52a0\u7c97", "style": "bold", "icon": "icondoc_bold" }] }, "fontSize": { "title": "\u6587\u672c\u5927\u5c0f", "val": 12, "min": 12 }, "mbConfig": { "title": "\u9875\u9762\u95f4\u8ddd", "val": 0, "min": 0 }, "layoutConfig": { "widthTitle": "\u5bbd\u5ea6", "width": 322, "heightTitle": "\u9ad8\u5ea6", "height": 119, "topTitle": "\u5c45\u4e0a", "top": 601, "leftTitle": "\u5c45\u5de6", "left": 27 }, "logoConfig": { "title": "\u80cc\u666f\u56fe\u7247", "url": "" } }, "1607590423999000": { "name": "activityPrize", "timestamp": "1607590423999000", "tabVal": 1, "position": { "top": 742, "left": 27, "width": 319, "height": 107, "zindex": 2 }, "layoutConfig": { "widthTitle": "\u5bbd\u5ea6", "width": 319, "heightTitle": "\u9ad8\u5ea6", "height": 107, "topTitle": "\u5c45\u4e0a", "top": 742, "leftTitle": "\u5c45\u5de6", "left": 27 }, "lrConfig": { "title": "\u5de6\u53f3\u8fb9\u8ddd", "val": 10, "min": 0 } } }, "awardBackSrc": "https:\/\/img.alicdn.com\/imgextra\/i2\/289589474\/O1CN01fU77PJ2Jr8yr7xDal_!!289589474.png", "mConfig": [{ "name": "game_rich_lucky_area", "cname": "\u5927\u5bcc\u7fc1\u533a", "configName": "c_rich_lucky_area", "icon": "iconfuzhukongbai", "type": 3, "dataShow": 0, "dataSort": 4, "dataDelete": 0, "dataLimit": 1, "dataLimitRange": 0, "dataTag": [1, 2], "dataExtendOne": 0, "dataExtendTwo": 0, "defaultName": "gameRichLuckyArea", "props": { "index": { "type": null, "default": -1 }, "num": { "type": null } }, "position": { "top": 191, "left": 36.5, "width": 293, "height": 289, "zindex": 3 }, "computed": [], "watch": { "pageData": { "deep": true }, "num": { "deep": true }, "defaultArray": { "deep": true } }, "methods": [], "staticRenderFns": [], "_compiled": true, "_scopeId": "data-v-dda33620", "num": "1607590343651000" }, { "name": "game_rich_btn", "cname": "\u5927\u5bcc\u7fc1\u6309\u94ae", "configName": "c_base_image", "icon": "iconfuzhukongbai", "type": 3, "dataShow": 0, "dataSort": 3, "dataDelete": 0, "dataLimit": 1, "dataLimitRange": 0, "dataTag": [1, 2], "dataExtendOne": 0, "dataExtendTwo": 0, "defaultName": "gameRichBtn", "props": { "index": { "type": null, "default": -1 }, "num": { "type": null } }, "position": { "top": 289, "left": 138, "width": 90, "height": 90, "zindex": 4 }, "computed": [], "watch": { "pageData": { "deep": true }, "num": { "deep": true }, "defaultArray": { "deep": true } }, "methods": [], "staticRenderFns": [], "_compiled": true, "_scopeId": "data-v-7645be0d", "num": "1607590371934000" }, { "name": "activity_share", "cname": "\u5206\u4eab", "icon": "luckyshare", "configName": "c_home_btn", "type": 1, "dataShow": 1, "dataSort": 2, "dataDelete": 1, "dataLimit": 1, "dataLimitRange": 0, "dataTag": [1, 2], "dataExtendOne": 0, "dataExtendTwo": 0, "defaultName": "activityShare", "props": { "index": { "type": null }, "num": { "type": null } }, "position": { "top": 511, "left": 22, "width": 151, "height": 40.5, "zindex": 2 }, "computed": [], "watch": { "pageData": { "deep": true }, "num": { "deep": true }, "defaultArray": { "deep": true } }, "methods": [], "staticRenderFns": [], "_compiled": true, "_scopeId": "data-v-68077081", "num": "1607590381308000" }, { "name": "activity_my", "cname": "\u6211\u7684\u5956\u54c1", "icon": "luckybags", "configName": "c_home_btn", "dataShow": 1, "dataSort": 4, "dataDelete": 1, "dataLimit": 1, "dataLimitRange": 0, "dataTag": [1, 2], "dataExtendOne": 0, "dataExtendTwo": 0, "type": 1, "defaultName": "activityMyAward", "props": { "index": { "type": null }, "num": { "type": null } }, "position": { "top": 512, "left": 197, "width": 147, "height": 35.5, "zindex": 2 }, "computed": [], "watch": { "pageData": { "deep": true }, "num": { "deep": true }, "defaultArray": { "deep": true } }, "methods": [], "staticRenderFns": [], "_compiled": true, "_scopeId": "data-v-c889b36e", "num": "1607590393073000" }, { "name": "activity_rule", "cname": "\u89c4\u5219", "icon": "luckyguize", "configName": "c_home_btn", "dataShow": 1, "dataSort": 5, "dataDelete": 1, "dataLimit": 1, "dataLimitRange": 0, "dataTag": [1, 2], "dataExtendOne": 0, "dataExtendTwo": 0, "type": 1, "defaultName": "activityRule", "props": { "index": { "type": null }, "num": { "type": null } }, "position": { "top": 579, "left": 27, "width": 322, "height": 83, "zindex": 2 }, "computed": [], "watch": { "pageData": { "deep": true }, "num": { "deep": true }, "defaultArray": { "deep": true } }, "methods": [], "staticRenderFns": [], "_compiled": true, "_scopeId": "data-v-fcb98f24", "num": "1607590404375000" }, { "name": "activity_prize", "cname": "\u6d3b\u52a8\u5956\u54c1", "configName": "c_award_prize", "icon": "luckygift", "type": 1, "dataShow": 1, "dataSort": 3, "dataDelete": 1, "dataLimit": 1, "dataLimitRange": 0, "dataTag": [1, 2], "dataExtendOne": 0, "dataExtendTwo": 0, "defaultName": "activityPrize", "props": { "index": { "type": null }, "num": { "type": null } }, "position": { "top": 675, "left": 49, "width": 277, "height": 90, "zindex": 2 }, "computed": [], "watch": { "pageData": { "deep": true }, "num": { "deep": true }, "defaultArray": { "deep": true } }, "methods": [], "staticRenderFns": [], "_compiled": true, "_scopeId": "data-v-7d014920", "num": "1607590423999000" }], "popubSwith": false, "lucky": 1, "bgColor": "rgba(200,4,4,1)" }];

  return { success: true, code: 100, activityInfo: activityInfo[0], ruleList: ruleList, awardList: awardList, layoutInfo: layoutInfo }

};
// 抽奖入口访问
exports.getLuckyChance = async (context) => {
  let { shop_id, acid } = context.data
  let { mixNick, openId, userNick } = context
  // console.log('1111', shop_id, acid,mixNick, openId, userNick)
  /********************************************基本信息过滤**********************************************************/

  // 获取活动信息
  let activityInfo = await context.cloud.dataspace.executeSql('select * from lh_activity where id=? order by id desc', [acid]);
  if (activityInfo == null || activityInfo == '' || activityInfo.length == 0) return { success: true, 'code': 182, 'msg': '活动未创建!' }
  console.log('222222')
  // 用户总计最大参与次数
  let drawTimes = 0
  if (activityInfo[0]['max_join_times'] != 0) {
    let dbUserLuckyTimes = await context.cloud.dataspace.executeSql('select count(*) as count from lh_buyer_luckytimes where acid=? and shop_id=? and open_id=?', [acid, shop_id, openId]);
    drawTimes = dbUserLuckyTimes[0]['count']
    if (activityInfo[0]['max_join_times'] <= drawTimes) return { success: true, code: 105, msg: '超过了最大抽奖次数' }
  }
  console.log('3333')
  // 用户每天最大参与次数
  let perDayDrawTimes = 0
  if (activityInfo[0]['per_day_times'] != 0) {
    let dbUserPerDayLuckyTimes = await context.cloud.dataspace.executeSql('select count(*) as count from lh_buyer_luckytimes where acid=? and shop_id=? and open_id=?', [acid, shop_id, openId]);
    perDayDrawTimes = dbUserPerDayLuckyTimes[0]['count']
    if (activityInfo[0]['per_day_times'] <= perDayDrawTimes) return { success: true, code: 107, msg: '超过了每天最大抽奖次数' }
  }
  console.log('4444444')
  /********************************************基本信息过滤**********************************************************/

  /********************************************规则过滤**********************************************************/
  let ruleInfo = {}
  // 规则信息
  let ruleList = await context.cloud.dataspace.executeSql('select * from lh_activity_rule where acid=? order by rule_sort ', [acid]);
  if (ruleList == null || ruleList == '' || ruleList.length == 0) return { success: true, 'code': 183, 'msg': '商家未创建规则!' }
  console.log('55555')
  let luckyChance = 0; //最终买家可以抽奖的机会次数
  let canJoinTimes = 0; //卖家配置的抽奖次数

  for (const rule of ruleList) {
    let ruleExtendObject = JSON.parse(rule['rule_extend'])
    if (ruleExtendObject['rule_type'] == 211) { // 免费抽奖
      canJoinTimes = ruleExtendObject['join_times']
    }
    if (ruleExtendObject['rule_type'] == 221) { // 分享
      let ruleId = rule['id']
      let dbCount = await context.cloud.dataspace.executeSql('select count(*) as count from lh_buyer_join_detail where acid=? and shop_id=? and rule_id=? and open_id=?', [acid, shop_id, ruleId, openId]);

      // 可抽次数 * (签到总数/完成次数)
      if (ruleExtendObject['is_multi'])
        canJoinTimes = intval(ruleExtendObject['join_times']) * intval(floor(dbCount[0]['count'] / intval(ruleExtendObject['finish_times'])));
      if (intval(floor(dbCount[0]['count'] / ruleExtendObject['finish_times'])) >= 1)
        canJoinTimes = ruleExtendObject['join_times'];
    }
    if (canJoinTimes <= 0) continue;

    let drawTimes = 0
    let dbUserLuckyTimes = await context.cloud.dataspace.executeSql('select count(*) as count from lh_buyer_luckytimes where acid=? and shop_id=? and rule_id=? and open_id=?', [acid, shop_id, rule['id'], openId]);
    drawTimes = dbUserLuckyTimes[0]['count']

    luckyChance = canJoinTimes - drawTimes
    if (luckyChance > 0) ruleInfo = rule
    if (canJoinTimes <= 0) return { success: true, 'code': 103, 'msg': '没有满足抽奖条件!' }
    if (luckyChance <= 0) return { success: true, 'code': 104, 'msg': '没有抽奖机会!' }
  }

  /********************************************规则过滤**********************************************************/

  /********************************************奖品过滤**********************************************************/
  console.log('6666666')
  // 用户中奖的奖品
  let luckyAwardInfo = {}

  // 有效的奖品集合
  let awardInfo = {}
  // 奖品ID集合
  let awardIdArr = []
  // 中奖标记
  let lucky_status = false

  // 获取奖品列表
  let awardList = await context.cloud.dataspace.executeSql('select * from lh_activity_award where acid=? order by award_sort asc', [acid]);
  if (awardList == null || awardList == '' || awardList.length == 0) return { success: true, 'code': 152, 'msg': '商家未创建奖品!' }
  console.log('7777777', JSON.stringify(awardList))
  // 遍历每个奖品
  for (const award of awardList) {
    // 该奖品已发完
    if (award['award_remain_num'] <= 0) {
      lucky_status = false
      // 防止消费者浪费一次抽奖机会，所以循环判断下一个奖品。
      continue;
    }
    //增加过的奖品不在增加，防止重复
    if (awardInfo[award.id] == null) awardInfo[award.id] = award
    else continue

    // 该奖品概率
    let awardChance = award['award_chance']
    console.log('7777777_awardChance', awardChance)
    if (awardChance == 0) continue;

    // 循环 放入 奖池
    let chance = awardChance * 100

    console.log('7777777_chance', chance)
    for (let i = 0; i < chance; i++) {
      awardIdArr.push(award['id'])
      awardInfo[award['id']] = award
    }
  }
  console.log('7777777_11111')
  // 概率为0
  if (awardIdArr.length == 0) {
    lucky_status = false;
  }

  let rand = Math.floor(Math.random() * 10001)
  console.log('7777777_2222222222')
  // 随机数大于奖品池的索引，所以不中奖
  console.log('7777777_2222222222_lenght', awardIdArr.length)
  console.log('7777777_2222222222_rand', rand)
  if (awardIdArr.length < rand) {
    lucky_status = false;
  } else {
    lucky_status = true
    luckyAwardInfo = awardInfo[awardIdArr[rand]];
  }
  console.log('7777777_3333333333')
  // 奖品ID
  let awardId = 0
  // 中奖
  if (lucky_status) {
    // 这里判断奖品的最大中奖次数
    if (luckyAwardInfo['award_per_limit'] != 0) {
      let maxLuckyTimes = 0
      let dbUserMaxLuckyTimes = await context.cloud.dataspace.executeSql('select count(*) as count from lh_buyer_luckydog where acid=? and shop_id=? and award_id=? and open_id=?', [acid, shop_id, luckyAwardInfo['id'], openId]);
      maxLuckyTimes = dbUserMaxLuckyTimes[0]['count']
      console.log('8888888')
      if (luckyAwardInfo['award_per_limit'] <= maxLuckyTimes)
        lucky_status = false;
    }
    awardId = luckyAwardInfo['id']
  }
  console.log('8888888_11111')
  userNick = userNick ? userNick : mixNick
  let addArr = [shop_id, acid, userNick, openId, ruleInfo['id'], ruleInfo['rule_type'], awardId, lucky_status]
  // 抽奖表插入数据
  console.log('8888888_22222')
  let resInsertLuckyTimes = await context.cloud.dataspace.executeSql('insert into lh_buyer_luckytimes(shop_id,acid,buyer_pin,open_id,rule_id,rule_type,award_id,lucky_status) values(?,?,?,?,?,?,?,?)', addArr);
  console.log('99999999999')
  // 中奖的新增插入的主键ID
  let luckyLogId = 0;
  if (lucky_status) {
    let addLuckyArr = [shop_id, acid, openId, userNick, ruleInfo['id'], ruleInfo['rule_type'], awardId, luckyAwardInfo['award_type'], luckyAwardInfo['award_title'], luckyAwardInfo['award_pic_url']]
    // 中奖表插入数据
    let resInsertLuckyDog = await context.cloud.dataspace.executeSql('insert into lh_buyer_luckydog(shop_id,acid,open_id,buyer_pin,rule_id,rule_type,award_id,award_type,award_title,award_pic_url) values(?,?,?,?,?,?,?,?,?,?)', addLuckyArr);

    // 修改奖品的剩余数量
    let data = await context.cloud.dataspace.executeSql('update lh_activity_award set award_remain_num = award_remain_num-1 where id = ? and award_remain_num>=0', [luckyAwardInfo['id']]);

    return { success: true, code: 100, msg: '恭喜你中奖了', lucky_status: true, award_info: luckyAwardInfo }
  } else {
    return { success: true, code: 100, msg: '很遗憾', lucky_status: false }
  }

  /********************************************奖品过滤**********************************************************/

};

// 获取中奖信息--消费者使用
exports.getLuckyDog = async (context) => {
  // 获取参数
  let { acid } = context.data
   // 获取活动奖品
  let awardList = await context.cloud.dataspace.executeSql('select * from lh_buyer_luckydog where acid=? and open_id=? order by id desc', [acid,context.openId]);
   return { success: true, 'list': awardList }
};

// 获取中奖信息--商家使用
exports.getLuckyDogForSeller = async (context) => {
  // 获取参数
  let { acid } = context.data
   // 获取活动奖品
  let awardList = await context.cloud.dataspace.executeSql('select * from lh_buyer_luckydog where acid=?  order by id desc', [acid]);
   return { success: true, 'list': awardList }
};

// 获取抽奖信息--商家使用
exports.getLuckyTimesForSeller = async (context) => {
  // 获取参数
  let { acid } = context.data
   // 获取活动奖品
  let awardList = await context.cloud.dataspace.executeSql('select * from lh_buyer_luckytimes where acid=?  order by id desc', [acid]);
   return { success: true, 'list': awardList }
};