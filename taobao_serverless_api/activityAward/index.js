/*
  奖品增删改查.by kohelp
*/
exports.selectAll = async (context) => {
  try {
    let { acid } = context.data
    let selectArr = [acid]
    let data = await context.cloud.dataspace.executeSql('select id,award_title,award_type,award_pic_url,award_num,award_chance,award_sort,award_per_limit,award_remain_num from lh_activity_award where acid=? order by award_sort asc', selectArr);
    if (data) return { success: true, list: data }
    return { success: false, msg: '获取活动失败' }
  } catch (err) {
    return { success: false, msg: err, }
  }
}
exports.select = async (context) => {
  try {
    let { id } = context.data
    let selectArr = [id]
    let data = await context.cloud.dataspace.executeSql('select id,award_title,award_type,award_pic_url,award_num,award_chance,award_sort,award_per_limit from lh_activity_award where id=?', selectArr);
    if (data && data.length > 0) return { success: true, data: data[0] }
    return { success: false, msg: '获取活动失败' }
  } catch (err) {
    return { success: false, msg: err, }
  }
}
exports.insert = async (context) => {
  try {
    let { shop_id,acid,award_title,award_type,award_pic_url,award_num,award_chance,award_sort,award_per_limit } = context.data
    let addArr = [ shop_id,acid,award_title,award_type,award_pic_url,award_num,award_chance,award_sort,award_per_limit,award_num ]
    let data = await context.cloud.dataspace.executeSql('insert into lh_activity_award(shop_id,acid,award_title,award_type,award_pic_url,award_num,award_chance,award_sort,award_per_limit,award_remain_num) values(?,?,?,?,?,?,?,?,?,?)', addArr);
    if (data.insertId > 0) return { success: true, insertId: data.insertId }
    return { success: false, msg: '新增失败' }
  } catch (err) {
    return { success: false, msg: err, }
  }
}
exports.update = async (context) => {
  try {
     let { award_title,award_type,award_pic_url,award_num,award_chance,award_sort,award_per_limit,id } = context.data
    let data = await context.cloud.dataspace.executeSql('update lh_activity_award set award_title = ?,award_type = ?,award_pic_url = ?,award_num = ?,award_chance = ?,award_sort = ?,award_per_limit = ?,award_remain_num=? where id = ?', [award_title,award_type,award_pic_url,award_num,award_chance,award_sort,award_per_limit,award_num,id]);
    if (data.affectedRows > 0) return { success: true }
    return { success: false, msg: '更新失败' }
  } catch (err) {
    console.log(err);
    return { success: false, msg: err, }
  }
}

exports.delete = async (context) => {
  try {
    let { id } = context.data
    let data = await context.cloud.dataspace.executeSql('delete from lh_activity_award where id = ?', [id]);
    if (data.affectedRows > 0) return { success: true }
    return { success: false, msg: '删除失败' }
  } catch (err) {
    console.log(err);
    return { success: false, msg: err, }
  }
}