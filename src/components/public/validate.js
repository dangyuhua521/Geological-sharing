//用户名正则，4到16位（字母，数字，下划线，减号）
function Username(str) {
    const reg = /^[a-zA-Z0-9_-]{4,16}$/
    return reg.test(str)
}
//校验密码：只能输入6-20个字母、数字、下划线
function PassWord(str) {
    const reg = /^(\w){6,20}$/
    if (!reg.exec(str)) return false
    return true
}
//大于0的数,含整数和小数
function ValNumber(str) {
    const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/
    return reg.test(str)
}

/* 手机号码*/
function Phone(str) {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    return reg.test(str)
}
/*邮编*/
function postcode(str) {
    const reg = /^[0-9]{6}$/
    return reg.test(str)
}
/* 邮箱*/
function Email(str) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return reg.test(str)
}
//校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
function Tel(str) {
    const reg = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
    if (!reg.exec(str)) return false
    return true
}
/**
 *
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
let valRule = {};
valRule.Username = (rule, value, callback) => {
    if (!Username(value)) {
        callback(new Error('用户名为4到16位(字母,数字,下划线,减号)'))
    } else {
        callback()
    }
}

valRule.PassWord = (rule, value, callback) => {
    if (!PassWord(value)) {
        callback(new Error('密码为6-20位,由字母、数字、下划线组成'))
    } else {
        callback()
    }
}

valRule.Number = (rule, value, callback) => {
    //正则表达式有错
    if (value == null || value == "")
        callback();
    if (!ValNumber(value)) {
        callback(new Error('输入必须为不小于0的数字'))
    } else {
        callback()
    }
}

valRule.Phone = (rule, value, callback) => {
    if (!Phone(value)) {
        callback(new Error('手机号码格式不正确'))
    } else {
        callback()
    }
}
valRule.Postcode = (rule, value, callback) => {
    if (!postcode(value)) {
        callback(new Error('邮编格式不正确'))
    } else {
        callback()
    }
}
valRule.Email = (rule, value, callback) => {
    if (!Email(value)) {
        callback(new Error('邮箱格式不正确'))
    } else {
        callback()
    }
}

valRule.Tel = (rule, value, callback) => {
    if (!Tel(value)) {
        callback(new Error('电话格式不正确'))
    } else {
        callback()
    }
}


// valRule.Pass = (rule, value, callback) => {
//     if (value === "" || !/^\w{1,}$/.test(value)) {
//         callback(new Error("请输入数字字母下划线！"));
//     } else if (value.length > 8 || value.length < 6) {
//         callback(new Error("密码长度为6-8位"));
//     } else {
//         callback();
//     }
// };

valRule.Pass = (rule, value, callback) => {
    if (value === "" || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/.test(value)) {
        callback(new Error("8-16个字符，至少一个大写字母，一个小写字母和一个数字！"));
    } else if (/(\w)*(\w)\2{2}(\w)*/g.exec(value)) {
        callback(new Error("不允许含有连续三个重复字符！"))
    } else {
        callback();
    }
};


valRule.checkNull = (rule, value, callback) => {
    if (String(value).replace(/\s/g, "") == "") {
        return callback(new Error("输入不能为空"));
    } else {
        callback();
    }
};
valRule.checkAge = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("请输入年龄"));
    }
    setTimeout(() => {
        let age = Number.parseInt(value);
        if (value <= 0 || value > 200) {
            callback(new Error("请填写1-200的数值"));
        } else {
            callback();
        }
    }, 1000);
};

// 验证手机和座机
valRule.checkTel = (rule, value, callback) => {
    let phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(19[0-9]{1})|(16[0-9]{1}))+\d{8})$/;
    let tel = /([0-9]{3,4}-)?[0-9]{7,8}/;
    if (!(phone.test(value) || tel.test(value))) {
        return callback(new Error("请输入有效号码"));
    } else {
        callback();
    }
};


export default valRule;