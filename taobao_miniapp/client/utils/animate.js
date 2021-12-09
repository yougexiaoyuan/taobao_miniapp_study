var tween = {
  linear: function(t, b, c, d){
    return c * t / d + b;
  },
  easeInOut: function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;}
};

var Animate = function ({
    startPos, endPos, duration, easing, callback, complete
}) {
  this.startTime = 0;  // 动画开始世界
  this.startPos = startPos || 0;  // 开始值
  this.endPos = endPos || 0;  // 结束值
  this.propertyName = null;  // 需要改变的属性
  this.easing = 'linear';  // 选择运动的算法
  this.duration = duration || 1000;  // 动画持续时间
  this.callback = callback
  this.complete = complete
  this.start(startPos, endPos, duration, easing)
}

Animate.prototype.start = function (startPos, endPos, duration, easing) {
  this.startTime = +new Date;//记录现在的开始时间
  this.startPos = startPos//记录开始的位置
  this.endPos = endPos;//得到目标位置（传）
  this.duration = duration;//得到需要的时间（传）
  this.easing = tween[ easing ]//选择哪种运动的算法（传）

  var self = this;
  var timeId = setInterval(function(){
      //如果self返回false，则取消定时器
      if( self.step()=== false ) {
          clearInterval( timeId )
      }
  },80)
}

Animate.prototype.step = function(){
  //目前的时间
  var t = +new Date;
  //如果时间超过开始时间和需要时间之和，则矫正目前的位置为目标位置
  if( t >= this.startTime + this.duration ) {
          this.update( this.endPos )
          this.complete( this.endPos )
          return false;//返回false为了取消定时器
  }
  //计算小球的位置
  var pos = this.easing( 0, t - this.startTime, this.startPos, this.endPos-this.startPos ,this.duration)
  //更新div的属性
  this.update( pos )
}

Animate.prototype.update = function( pos ){
  this.callback(pos)
}

export default Animate
