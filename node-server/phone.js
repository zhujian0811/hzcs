const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAI4zHaMPzYhjKW'
const secretAccessKey = '8vv0lqkhNF334D0KfgA7ZSAcnq5CND'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
//发送短信
smsClient.sendSMS({
    PhoneNumbers: '13606603546',
    SignName: '云通信产品',
    TemplateCode: 'SMS_000000',
    TemplateParam: '{"code":"12345","product":"云通信"}'
}).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        //处理返回参数
        console.log(res)
    }
}, function (err) {
    console.log(err)
})