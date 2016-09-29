function formatTime(date) {

  date = new Date(date * 1000)

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
//[year, month, day].map(formatNumber).join('-') + ' ' +
  return  [month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function kindTime(date){
  var resultDate, currentDate, diffDate, kTime
  if(date){
      resultDate = new Date(date * 1000)
  
      currentDate = new Date()
      diffDate = currentDate - resultDate
      
      if(diffDate <= 60000){
        kTime = (diffDate / 1000).toFixed(0) + '秒前'
        return kTime
      }else if(diffDate <= 3600000 && diffDate > 6000){
        kTime = (diffDate / 60000).toFixed(0) + '分钟前'
        return kTime
      }else if(diffDate <= 86400000 && diffDate > 3600000){
        var _dtime = diffDate %  3600000
        kTime = (diffDate / 3600000).toFixed(0) + '小时' + (_dtime / 60000).toFixed(0) + '分钟前'
        return kTime
      }else{
        return formatTime(date)
      }
    }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  kindTime: kindTime,
  formatTime: formatTime
}
