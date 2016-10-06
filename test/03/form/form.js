var inputs=document.getElementsByTagName('input');
var button=document.getElementsByTagName('button')[0];

button.addEventListener('click',function () {
    for(var i=0;i<inputs.length;i++){
        var span=inputs[i].parentElement.getElementsByClassName('tip')[0];
        validate(inputs[i]);
        span.style.visibility='visible';
    }
})

for(var i=0;i<inputs.length;i++){
    inputs[i].addEventListener('focus',function (event) {
        event=event||event.srcElement;
        var target=event.target;
        var span=target.parentElement.getElementsByClassName('tip')[0];
        span.style.visibility='visible';
    });
    inputs[i].addEventListener('blur',function (event) {
        event=event||event.srcElement;
        validate(event.target);
    });
}



function validate(ele) {
    var str=ele.value.trim();
    var span=ele.parentElement.getElementsByClassName('tip')[0];
    if(str.length==0){
        span.innerHTML='输入不能为空';
        span.style.color='red';
        ele.style.border="1px solid red";
        return;
    }

    //名称
    if(ele.id=='input1'){
        var effectiveVal= str.replace(new RegExp('[^\x00-\xff]','g'),'--');
        var lenReg=/^.{4,16}$/;
        if(!lenReg.test(effectiveVal)){
            span.innerHTML='字符长度应该为4~16';
            span.style.color='red';
            ele.style.border="1px solid red";
        }else {
            span.innerHTML='名称可用';
            ele.style.border="1px solid green";
        }
    }

    //密码
    if(ele.id=='input2'){
        if(str.match(/^[a-zA-Z0-9]{6,16}$/)){
            span.innerHTML='密码格式正确';
            ele.style.border="1px solid green";

        }else {
            span.innerHTML='密码格式错误';
            span.style.color='red';
            ele.style.border="1px solid red";
        }
    }

    //确认密码
    if(ele.id=='input3'){
        var input2=document.getElementById('input2');
        if(str===input2.value.trim()){
            span.innerHTML='密码输入正确';
            ele.style.border="1px solid green";

        }else {
            span.innerHTML='两次密码输入不一致';
            span.style.color='red';
            ele.style.border="1px solid red";

        }
    }

    //邮箱
    if(ele.id=='input4'){
        var reg=new RegExp('^([a-zA-Z0-9]+[_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}','i');
        if(str.match(reg)){
            span.innerHTML='邮箱格式正确';
            ele.style.border="1px solid green";

        }else {
            span.innerHTML='邮箱格式错误';
            span.style.color='red';
            ele.style.border="1px solid red";
        }
    }
    if(ele.id=='input5'){
        if(str.match(/^1\d{10}$/)){
            span.innerHTML='号码可用';
            ele.style.border="1px solid green";

        }else{
            span.innerHTML='号码不可用';
            span.style.color='red';
            ele.style.border="1px solid red";
        }
    }
}
