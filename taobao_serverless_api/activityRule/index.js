/*
  活动规则操作.by kohelp
*/
exports.select = async (context) => {
  try {
    let { acid } = context.data
    let dataActivity = await context.cloud.dataspace.executeSql('select max_join_times, max_lucky_times, per_day_times from lh_activity where id=?', [acid]);
    let dataRule = await context.cloud.dataspace.executeSql('select id, rule_type, rule_sort, rule_extend from lh_activity_rule where acid=?', [acid]);
    if (dataActivity && dataRule) return { success: true, activity: dataActivity[0],ruleList: dataRule}
    return { success: false, msg: '获取活动失败' }
  } catch (err) {
    return { success: false, msg: err, }
  }
}
exports.insert = async (context) => {
  try {
    let { shop_id, acid, rule_type, rule_sort, rule_extend } = context.data
    let data = await context.cloud.dataspace.executeSql('insert into lh_activity_rule(shop_id, acid, rule_type, rule_sort, rule_extend) values(?,?,?,?,?)', [shop_id, acid, rule_type, rule_sort,rule_extend]);
    if (data.insertId > 0) return { success: true, insertId: data.insertId }
    return { success: false, msg: '新增失败' }
  } catch (err) {
    return { success: false, msg: err, }
  }
}

exports.delete = async (context) => {
  try {
    let { id } = context.data
    let data = await context.cloud.dataspace.executeSql('delete from lh_activity_rule where id = ?', [id]);
    if (data.affectedRows > 0) return { success: true }
    return { success: false, msg: '删除失败' }
  } catch (err) {
    console.log(err);
    return { success: false, msg: err, }
  }
}