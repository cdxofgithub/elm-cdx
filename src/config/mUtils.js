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

export const animate = (element, target, duration = 400, mode = 'ease-out', callbackl) => {

}

