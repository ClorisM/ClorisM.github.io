//存放城市以及学校
var list=[
    {city:'北京',school:['北京大学','清华大学','北京邮电大学','北京外国语大学','北京电影学院']},
    {city:'上海',school:['上海交通大学','复旦大学','华东理工大学','东华大学','上海财经大学']},
    {city:'武汉',school:['武汉大学','华中科技大学','中南财经政法大学','武汉理工大学','华中师范大学']},
    {city:'成都',school:['西南大学','四川大学','电子科技大学','西南民族大学','西南交通大学']}
];

var undergraduate=document.getElementById('undergraduate');
var graduate=document.getElementById('graduate');
var city=document.getElementById('city');
var school=document.getElementById('school');
var work=document.getElementById('work');

var college=document.getElementById('college');
var company=document.getElementById('company');

undergraduate.onclick=function () {
    if(undergraduate.checked){
        company.style.display="none";
        college.style.display="block";
    }
};
graduate.onclick=function () {
    if(graduate.checked){
        college.style.display="none";
        company.style.display="block";
    }
};

function citySel() {
    var option;
    for(var i=0;i<list.length;i++){
        option=document.createElement("option");
        option.innerHTML=list[i].city;
        city.appendChild(option);
    }
}
function schoolSel() {
    school.innerHTML="";
    var value=list[city.selectedIndex].school;
    var option;
    for(var i=0;i<value.length;i++){
        option=document.createElement("option");
        option.innerHTML=value[i];
        school.appendChild(option);
    }
}
citySel();
schoolSel();
city.onclick=function () {
    schoolSel();
}


