//存储localStorage
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content != 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

//获取localStorage
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

//删除localStorage
export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

export const showBack = callback => {
  document.addEventListener('scroll', () => {
    showBackFun()
  }, false)

  //判断是否达到目标点
  const showBackFun = () => {
    if (document.documentElement.scrollTop > 500) {
      callback(true)
    } else {
      callback(false)
    }
  }
}

//获取style样式
export const getStyle = (element, attr, NumberMode = 'int') => {
  let target
  if (attr == 'scrollTop') {
    target = element.scrollTop
  } else if (element.currentStyle) {
    target = element.currentStyle[attr]
  } else {
    target = document.defaultView.getComputedStyle(element,null)[attr];
  }
  return NumberMode == 'float' ? parseFloat(target) : parseInt(target)
}


export const animate = (element, target, duration = 400, mode = 'ease-out', callback) => {

  clearInterval(element.timer);
  //判断不同参数的情况
  if (duration instanceof Function) {
    callback = duration
    duration = 400
  } else if (duration instanceof String) {
    mode = duration
    duration = 400
  }


  //获取dom样式
  const attrStyle = attr => {
    if (attr == 'opaction') {
      return Math.round(getStyle(element, attr, 'float') * 100)
    } else {
      return getStyle(element, attr)
    }
  }

  //判断不同参数的情况
  if (mode instanceof Function) {
    callback = mode  //假设所有运动到达终点
    mode = 'ease-out'   //记录上一个速度值,在ease-in模式下需要用到
  }


  let flag = true
  const remberSpeed = {}
  element.timer = setInterval(() => {
    Object.keys(target).forEach(attr => {
      let iSpeed = 0   //步长
      let status = false    //是否仍需运动
      let iCurrent = attrStyle(attr) || 0    //当前元素属性值
      let speedBase = 0    //目标点需要减去的基础值，三种运动状态的值都不同
      let intervalTime    //将目标值分为多少步执行，数值越大，步长越小，运动时间越长
      switch (mode) {
        case 'ease-out':
          speedBase = iCurrent
          intervalTime = duration * 5 / 400
          break
      }

      if (mode != 'ease-in') {
        iSpeed = (target[attr] - speedBase) / intervalTime
        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
      }

      //判断是否达步长之内的误差距离，如果到达说明到达目标点
      switch (mode) {
        case 'ease-out':
          status = (iCurrent != target[attr])
      }

      if (status) {
        flag = false
        //opacity 和 scrollTop 需要特殊处理
        if (attr === "opacity") {
          element.style.filter = "alpha(opacity:" + (iCurrent + iSpeed) + ")";
          element.style.opacity = (iCurrent + iSpeed) / 100;
        } else if (attr === 'scrollTop') {
          element.scrollTop = iCurrent + iSpeed;
        }else{
          element.style[attr] = iCurrent + iSpeed + 'px';
        }
      } else {
        flag = true
      }
      if (flag) {
        clearInterval(element.timer);
        if (callback) {
          callback();
        }
      }
    })
  }, 20)
}

