/*
  活动基础信息操作.by kohelp
*/
exports.selectAll = async (context) => {
  try {
    let { shop_id } = context.data
    let selectArr = [shop_id]
    let data = await context.cloud.dataspace.executeSql('select id,lucky_title,start_date,end_date,gmt_create from lh_activity where shop_id=? order by id desc', selectArr);
    if (data) return { success: true, list: data }
    return { success: false, msg: '获取活动失败' }
  } catch (err) {
    return { success: false, msg: err, }
  }
}
exports.select = async (context) => {
  try {
    let { acid } = context.data
    let selectArr = [acid]
    let data = await context.cloud.dataspace.executeSql('select shop_id,seller_nick,lucky_title,start_date,end_date,is_need_userauth,is_auto_memo,memo from lh_activity where id=?', selectArr);
    if (data && data.length > 0) return { success: true, data: data[0] }
    return { success: false, msg: '获取活动失败' }
  } catch (err) {
    return { success: false, msg: err, }
  }
}
exports.insert = async (context) => {
  try {
    let { shop_id, seller_nick, lucky_title, start_date, end_date, is_need_userauth, is_auto_memo, memo } = context.data
    let addArr = [shop_id, seller_nick, lucky_title, start_date, end_date, is_need_userauth, is_auto_memo, memo]
    let data = await context.cloud.dataspace.executeSql('insert into lh_activity(shop_id,seller_nick,lucky_title,start_date,end_date,is_need_userauth,is_auto_memo,memo) values(?,?,?,?,?,?,?,?)', addArr);
    if (data.insertId > 0) return { success: true, insertId: data.insertId }
    return { success: false, msg: '新增失败' }
  } catch (err) {
    return { success: false, msg: err, }
  }
}
exports.update = async (context) => {
  try {
     let { lucky_title, start_date, end_date, is_need_userauth, is_auto_memo, memo,id } = context.data
    let data = await context.cloud.dataspace.executeSql('update lh_activity set lucky_title = ?,start_date = ?,end_date = ?,is_need_userauth = ?,is_auto_memo = ?,memo = ? where id = ?', [lucky_title, start_date, end_date, is_need_userauth, is_auto_memo, memo,id]);
    if (data.affectedRows > 0) return { success: true }
    return { success: false, msg: '更新失败' }
  } catch (err) {
    console.log(err);
    return { success: false, msg: err, }
  }
}
exports.updateThree = async (context) => {
  try {
     let {  max_join_times, max_lucky_times, per_day_times,id } = context.data
    let data = await context.cloud.dataspace.executeSql('update lh_activity set max_join_times = ?,max_lucky_times = ?,per_day_times = ? where id = ?', [max_join_times, max_lucky_times, per_day_times,id]);
    if (data.affectedRows > 0) return { success: true }
    return { success: false, msg: '更新失败' }
  } catch (err) {
    console.log(err);
    return { success: false, msg: err, }
  }
}
exports.delete = async (context) => {
  try {
    let { acid } = context.data
    let data = await context.cloud.dataspace.executeSql('delete from lh_activity where id = ?', [acid]);
    if (data.affectedRows > 0) return { success: true }
    return { success: false, msg: '删除失败' }
  } catch (err) {
    console.log(err);
    return { success: false, msg: err, }
  }
}