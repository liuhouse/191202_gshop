/**
 * ajax请求函数模块
 * */
import axios from 'axios'
/**
 * 向外部暴露一个函数ajax
 * @param {*} url 请求路径，默认为空
 * @param {*} data 请求参数，默认为空对象
 * @param {*} type 请求类型
 * **/
export default function ajax(url="",data={},type="GET"){
    //返回Promise对象，此对象返回两个参数，第一个参数是成功执行的函数，第二个参数是失败执行的参数
    return new Promise(function(resolve,reject){
        //利用axios异步执行ajax请求
        let promise;//这个内部的promise用来保存axios的返回值(promise对象)
        if(type == 'GET'){
            //准备url的query参数数据
            let dataStr = '';//数据拼接字符串  url?id=1&name=xiaobangcai
            //Object.keys得到当前对象的键
            Object.keys(data).forEach(key=>{
                dataStr += key + '=' + data[key] + '&'
            })
             if(dataStr !== ''){
               //截取字符串中的最后一个&符号
               dataStr = dataStr.substring(0,dataStr.lastIndexOf('&'));
               url = url + '?' + dataStr
             }
             //发送get请求
             promise = axios.get(url)
        }else{
          //发送post请求
             promise = axios.post(url,data)
        }
    });
    promise.then(response=>{
      //成功回调resolve
      resolve(response.data)
    }).catch(error=>{
      reject(error)
    })
}
