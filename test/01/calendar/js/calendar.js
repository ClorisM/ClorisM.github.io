
function Calendar(mainContainer,isperiod,min,max,date,callback){
    this.mainContainer=mainContainer;
    this.isperiod=isperiod;
    this.min=min;
    this.max=max;
    this.date=date;
    this.callback=callback;
    this.index1=0;

    this.chosedDate=new Date();
    this.chosedDates=[];
    this.chosedDates.push(this.chosedDate);

    this.createCalendar();
    this.renderCalendar(this.date);
    this.selectEvent();
}
Calendar.prototype={
    //产生日历框架
    createCalendar:function(){
        var self=this;
        var container=$('<div>').addClass('container').appendTo(self.mainContainer);
        //设置input框
        var input=$('<input id="input">').appendTo(container).click(function(){
            calendarFrame.toggle();
        });
        //设置日历框架
        var calendarFrame=$('<div>').addClass('calendarFrame').appendTo(container);
        //头部
        var header=$('<div>').addClass('header').appendTo(calendarFrame);
        var prevyear=$('<span>').addClass('prevyear').appendTo(header).click(function(){self.prevyearEvent()});
        var prevmonth=$('<span>').addClass('prevmonth').appendTo(header).click(function(){self.prevmonthEvent()});
        var nextyear=$('<span>').addClass('nextyear').appendTo(header).click(function(){self.nextyearEvent()});
        var nextmonth=$('<span>').addClass('nextmonth').appendTo(header).click(function(){self.nextmonthEvent()});
        var datetitle=$('<span>').addClass('datetitle').appendTo(header);
        //内容部分
        var content=$('<div>').addClass('content').click(function(e){self.choseEvent(e)}).appendTo(calendarFrame);

        //底部按钮区
        var footer=$('<div>').addClass('footer').appendTo(calendarFrame);

        var sureBtn=$('<input type="button" value="确定">').addClass('sureBtn').appendTo(footer).click(function(){
            calendarFrame.hide();
            self.outputEvent($('#input'));
            self.callback();
        });
        var cancelBtn=$('<input type="button" value="取消">').addClass('cancelBtn').appendTo(footer).click(function(){
            calendarFrame.hide();
        });
    },
    //渲染日期
    renderCalendar:function(date){
        var weeks=['日','一','二','三','四','五','六']
        var content=$('.content');
        content.html('');
        //首先把前面的星期渲染出来
        for(var i=0;i<7;i++){
            $('<span>').html(weeks[i]).appendTo(content)
        }

        //找到第一个日期
        var odate=new Date(date);
        odate.setDate(1);
        odate.setDate(odate.getDate()-odate.getDay())

        for(var i=7;i<49;i++){
            var item=$('<span>').html(odate.getDate())
            //不是同月样式不一样
            if(odate.getMonth()!=date.getMonth()){
                item.css('color','#CCC')
            }
            //周六周日样式不一样
            if(odate.getDay()==0||odate.getDay()==6){
                item.css('color','#C91B02')
            }
            if(odate.getFullYear()==this.date.getFullYear()&&odate.getMonth()==this.date.getMonth()&&odate.getDate()==this.date.getDate()){
                this.index1=i;
            }
            //选择日期段
            if(this.isperiod){
                var date1=this.chosedDates[0];
                var date2=this.chosedDates[1];
                if(date1&&date2){
                    if(odate.getTime()==date1.getTime()||odate.getTime()==date2.getTime()){
                        item.css('background-color','#FF0000');
                    }
                    if(odate.getTime()>date1.getTime()&&odate.getTime()<date2.getTime()||odate.getTime()<date1.getTime()&&odate.getTime()>date2.getTime()){
                        item.css('background-color','#EBF4F9')
                    }
                }
            }
            //点击选择单个日期
            if(odate.getFullYear()==this.chosedDate.getFullYear()&&odate.getMonth()==this.chosedDate.getMonth()&&odate.getDate()==this.chosedDate.getDate()){
                item.css('background-color','#FF0000')
            }
            $('.datetitle').html(date.getFullYear()+'年'+(parseInt(date.getMonth())+1)+'月');
            item.appendTo(content)
            odate.setDate(odate.getDate()+1);
        }
    },//renderCalendar完
    prevyearEvent:function(){
        this.date.setFullYear(this.date.getFullYear()-1);
        this.renderCalendar(this.date);
    },
    prevmonthEvent:function(){
        this.date.setMonth(this.date.getMonth()-1);
        this.renderCalendar(this.date);
    },
    nextyearEvent:function(){
        this.date.setFullYear(this.date.getFullYear()+1);
        this.renderCalendar(this.date);
    },
    nextmonthEvent:function(){
        this.date.setMonth(this.date.getMonth()+1);
        this.renderCalendar(this.date);
    },
    //点选事件
    choseEvent:function(event){
        event=event||window.event;
        var target=event.target||event.srcElement;
        var chosedEle=$(target)
        var spans=$('.content span');
        var index2=spans.index(chosedEle);
        this.chosedDate=new Date(this.date);
        this.chosedDate.setDate(this.date.getDate()+(index2-this.index1));
        if(this.isperiod){
            if(this.chosedDates.length>=1){
                var predate=this.chosedDates[this.chosedDates.length-1];
                var days=(Math.abs(this.chosedDate.getTime()-predate.getTime()))/1000/60/60/24;
            }
            if(this.chosedDates.length>1){
                this.chosedDates.shift();
            }
            if(days&&(days<this.min||days>this.max)){
                alert('不在时间跨度范围内，请重新选择')
            }else{
                this.chosedDates.push(this.chosedDate);
                this.date=this.chosedDate;
                this.renderCalendar(this.date);
            }

        }else{
            this.date=this.chosedDate
            this.renderCalendar(this.date);
        }

    },
    //输出事件
    outputEvent:function(obj){
        var date1=this.chosedDates[0];
        var date2=this.chosedDates[1];
        obj.html();
        if(this.isperiod){
            if(date1&&date2){
                if(date2.getTime()>date1.getTime()){
                    obj.val(date1.getFullYear()+'年'+(parseInt(date1.getMonth())+1)+'月'+date1.getDate()+'号'+'-'+date2.getFullYear()+'年'+date2.getMonth()+'月'+date2.getDate()+'号');
                }else{
                    obj.val(date2.getFullYear()+'年'+(parseInt(date2.getMonth())+1)+'月'+date2.getDate()+'号'+'-'+date1.getFullYear()+'年'+date1.getMonth()+'月'+date1.getDate()+'号');

                }
            }
        }else{
            obj.val(this.chosedDate.getFullYear()+'年'+(parseInt(this.chosedDate.getMonth())+1)+'月'+this.chosedDate.getDate()+'号');
        }
    },
    selectEvent:function(){
        var selyear=$('.selyear');
        var selmonth=$('.selmonth');
        var self=this;
        selyear.change(function(){
            self.date.setFullYear(selyear.val());
            self.renderCalendar(self.date);
        })
        selmonth.change(function(){
            self.date.setMonth(selmonth.val()-1);
            self.renderCalendar(self.date);
        })

    }
}
