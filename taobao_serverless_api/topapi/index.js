/*
  TOP接口调用.by kohelp
*/
exports.main = async (context) => {
  try{
    const result = await context.cloud.topApi.invoke({
      api : context.data.api,
      data : context.data.params,
      autoSession: true,
    });
    return { success: true,  data: result }
  } catch(e) {
    return { success: false,  message:  e.msg + ':' + e.sub_msg}
  }
};