/*        // js进入页面时定高（等于图片的高度）
		var List = document.getElementById("list");
		var imgHeight = List.getElementsByTagName("img")[0].offsetHeight||List.getElementsByTagName("img")[0].height;
		var banner = document.getElementById("banner");
		banner.style.height = imgHeight+"px";*/

/*		//js  onresize方法改变浏览器尺寸时定高（等于图片的高度）
		window.onresize = function() {
			var List = document.getElementById("list");
			var imgHeight = List.getElementsByTagName("img")[0].offsetHeight||List.getElementsByTagName("img")[0].height;
			var banner = document.getElementById("banner");
			banner.style.height = imgHeight+"px";
			// console.log(imgHeight);
		};*/

/*
// banner自适应定高(jq自执行函数)
//自执行函数（console报错函数有问题，但轮播图变成可以自适应宽度，同时也导致了其他函数失效？？？？）
		($(window).resize(function() {
			var List = document.getElementById("list");
			var imgHeight = List.getElementsByTagName("img")[0].offsetHeight||List.getElementsByTagName("img")[0].height;
			var banner = document.getElementById("banner");
			banner.style.height = imgHeight+"px";
			// console.log(imgHeight);
		}))();*/

		// 轮播图代码


		$(function(){
			
		//jq定高(关于各种height相关的尺寸要加括号，类似方法写法。。。)
		var imgHeight = $("#list img:eq(0)").height();
		$("#banner").css("height",imgHeight);
		//	.css("element",val),这里的val不需要用“”。

			// banner自适应定宽(jq resize函数)有bug。。。
			$(window).resize(function() {
				// stop();
				var imgHeight = $("#list img:eq(0)").height();
				// console.log(imgHeight);
				$("#banner").css("height",imgHeight);
				
				oWidth = parseInt(oList.css('width')) / 5;
				// console.log(oWidth);
				oList.css('left',-oWidth*index); 
				// console.log(imgHeight);
				autoplay();
				if(document.getElementById("wrap")){
					clientHeigth = document.documentElement.clientHeight;
					clientWidth = document.documentElement.clientWidth;
					wrapHeigth = wrap.offsetHeight;
					wrapWidth = wrap.offsetWidth;
					wrap.style.top = (clientHeigth-wrapHeigth)/2 + "px";
					wrap.style.left = (clientWidth-wrapWidth)/2 + "px";
				}
			});


		    var oList = $("#list");
		    var oRight = $("#rightArrow");
		    var oLeft = $("#leftArrow");
		    var oWidth = parseInt(oList.css('width')) / 5; 
		    // console.log(oWidth);
		    //计算图片的宽度从而达到自适应屏幕宽度
		    var oSpan = $(".buttons span");
		    var len = 3;
		    var index = 1;
		    var interval = 3000;
		    var timer = null;
		    oList.css('left',-oWidth);        
		    //图片加载完成时将图片向左偏移一张图片
		
		    function animate(offset){                               
		    //过渡效果
		        var newLeft = parseInt(oList.css('left')) + offset; 
		        //点击后的图片偏移量
		        oList.animate({'left':newLeft + 'px'},"slow",function(){
		            if(newLeft > -oWidth){  /*0改为-oWidth*/                                 
		            //判断图片是否已经循环一次
		                oList.css('left',-oWidth * len);
		                 // index = 3;
		                 /*????去掉这个就可以了（bug还是存在），自己添加的index又删除，改变主页中的alt为index属性。未解决。。。（解决，问题不在这里）*/
		            }
		            if(newLeft < -oWidth * 3){
		                oList.css('left',-oWidth);
		                // index = 1;
		            }

		            //这里（回调函数）追加轮播图图片详情内容的动态效果。
		            if (index==3) {
					imgMessageShow("translateX(0px)","translateX(0px)");
			        }
		            if (index==2) {
					imgMessageShow("translateY(0px)","translateY(0px)");
			        }
		        });
		    }

			function imgMessageShow(changeOne,changeTwo){
	            var imgMessage = document.querySelectorAll(".img-message");
	            currentImgMessage = imgMessage[index];
	            // console.log(currentImgMessage);
				currentImgMessage.querySelector("hr").style.width = 250+"px";
				currentImgMessage.style.opacity = 1;
				// currentImgMessage.style.marginTop = -85.5 + "px";
				currentImgMessage.querySelector(".message-top").style.transform =changeOne;
				//关于style.change显示错误，改成style[change]。change传入的是一个字符串(style.change等价于style."change")???,不是一个属相（或者说css样式属性），适用于style["change"]等价于style.marginLeft。中括号接受的是字符串。
				currentImgMessage.querySelector(".message-bottom").style.transform =changeTwo;
				// currentImgMessage.querySelector(".message-bottom").style.change = 0+"px";
				// console.log(currentImgMessage.querySelector(".message-top").style.change);
				// console.log(currentImgMessage.querySelector(".message-top").style[change]);
			}






		    function showBtns(){                
		    //按钮过渡
		        oSpan.each(function(){          
		        //遍历每个按钮将其Class设置为空
		            $(this).attr('class','');
		        });
		        $(".buttons > span").eq(index - 1).addClass('on');   
		        //将当前Span的索引Class设置为on
		    }
		    function autoplay(){                    
		    //自动播放
		        timer = setTimeout(function(){
		            oRight.trigger('click');
		            autoplay();
		        },interval);
		    }
		    function stop(){
		        clearInterval(timer);
		    }
		    oList.on('mouseover',function(){       
		    //判断鼠标是否在容器上面
		        stop();
		    });
		    oLeft.on('mouseover',function(){       
		    //判断鼠标是否在容器上面
		        stop();
		    });
		    oRight.on('mouseover',function(){       
		    //判断鼠标是否在容器上面
		        stop();
		    });
		    oSpan.on('mouseover',function(){       
		    //判断鼠标是否在容器上面
		        stop();
		    });
		    oList.on('mouseout',function(){
		        autoplay();
		    });
		    oRight.on('click',function(){
		        if(oList.is(':animated')){
		            return;
		        }
		        // console.log(index);
		        if(index == 3){         
		        //向右点击 index索引+1
		            index = 1;
		        }else{
		        	// console.log(index);
		            // index += 1;
		            /*不知为何 上面的运算（测试的过程是点击第三个按钮，再点击第一个按钮，再点击向右箭头（index依次变化））这里本来应该是十进制的（1+1）的运算变成了二进制的 （1+1）？？？。。。（正确的应该是字符串"1"+"1" = "11"!!!...）
		            改成下面的parseInt(index)转换,默认不填写第二个参数为十进制。*/
		            // index = Number(index)+1;
		            index = parseInt(index)+1;
		            // console.log(index);
		        }
		        // console.log(index);
		        animate(-oWidth);
		        showBtns();
		        // console.log(index);
		    });
		
		    oLeft.on('click',function(){
		        if(oList.is(':animated')){
		            return;
		        }
		        if(index == 1){         
		        //向左点击 index索引-1
		            index = 3;
		        }else{
		            index -= 1;
		        }
		        animate(oWidth);
		        showBtns();
		    });
		    oSpan.each(function(){      
		    //底部按钮点击切换图片
		        $(this).on('click',function(){
		            if(oList.is(":animated") || $(this).attr('class') == "on"){
		                return;
		            }
		            var myIndex = $(this).attr('index');
		            // 获取按钮的index
		            // console.log(myIndex);
		            var offset = (myIndex - index) * -oWidth;
		            // console.log(offset);
		            index = myIndex;
		            animate(offset);
		            showBtns();
		            // console.log(typeof index);
		            //类型string 获取的是字符串“1”。。。
		        })
		    })
		    autoplay();
		});






			//用户详情信息滑出滑入jq简单特效
		    // var user = $(".user").eq(0);
		    // var userMessage = $(".userMessage").eq(0);
		    //[]是js的dom对象不是jquery的，所以不能调用jq定义的函数，出现is not a function问题。
		    // console.log(user);

		  //   user.mouseenter(function(event) {
		  //   	$(".userMessage").eq(0).css("margin-top","0px");

		  //   	/*jq中使用CSSStyleSheet的insertRule来为伪元素修改样式：(解决无法dom获取伪元素的问题（无法获取就直接修改覆盖样式），以及无法用纯css的hover来控制非子类和兄弟元素的问题)*/
			 //   //  if(window.attachEvent){
		  //   // 	document.styleSheets[0].addRule('.navbar .user a::after','transform: rotate(180deg)');
		  //   // }
		  //   	/*兼容其他浏览器insertRule(有bug无法解决)，addRule兼容ie浏览器（可以用，但我不会用判断方法来解决ie和其他浏览器的兼容问题。导致的控制台错误信息（运行没问题只是缺少某个动画））*/

				// //jq方法在head插入内联样式，它会优先于外部样式表，改变某个css样式。（可以解决浏览器兼容问题。ie11，10，9都可以，8及以下不行。。。） 
		  //   	$('head').append("<style>.navbar .user a::after{transform: rotate(180deg); }</style>");

		  //   });
		    // user.mouseleave(function(event) {
		    // 	$(".userMessage").eq(0).css("margin-top","-250px");
	    	// 	// if(window.attachEvent){  /*有bug。。。*/
		    // 	// 	document.styleSheets[0].addRule('.navbar .user a::after','transform: rotate(0deg)');
		    // 	// }
		    // 	// document.styleSheets[0].insertRule('.navbar .user a::after { transform: rotate(180deg) }', 0);

		    // 	$('head').append("<style>.navbar .user a::after{transform: rotate(0deg); }</style>");
		    // });
		    // userMessage.mouseenter(function(event) {
		    // 	$(".userMessage").eq(0).css("margin-top","0px");
	    	// 	// if(window.attachEvent){
		    // 	// 	document.styleSheets[0].addRule('.navbar .user a::after','transform: rotate(180deg)');
		    // 	// }
		    // 	// document.styleSheets[0].insertRule('.navbar .user a::after { transform: rotate(180deg) }', 0);

		    // 	$('head').append("<style>.navbar .user a::after{transform: rotate(180deg); }</style>");
		    // });
		    // userMessage.mouseleave(function(event) {
		    // 	$(".userMessage").eq(0).css("margin-top","-250px");
	    	// 	// if(window.attachEvent){
		    // 	// 	document.styleSheets[0].addRule('.navbar .user a::after','transform: rotate(0deg)');
		    // 	// }
		    // 	// document.styleSheets[0].insertRule('.navbar .user a::after { transform: rotate(180deg) }', 0);

		    // 	$('head').append("<style>.navbar .user a::after{transform: rotate(0deg); }</style>");
		    // });

	    	// userMessage.mouseover(function(event){
	    	// 	 $(".user:eq(0) a:after").css("transform","rotate(180deg)")
	    	// });
	    	// userMessage.mouseout(function(event){
	    	// 	 $(".user:eq(0) a:after").css("transform","rotate(0deg)")
	    	// });
	    	/*无法获取伪类：after
	    	譬如::before和::after伪元素，用于在CSS渲染中向元素的头部或尾部插入内容，它们不受文档约束，也不影响文档本身，只影响最终样式。这些添加的内容不会出现在DOM中，仅仅是在CSS渲染层中加入。*/

			/*删除再添加类来控制类里面的伪元素after等(伪元素无法直接在dom获取)
			但是这样写没有了CSS3 的过渡效果。。。*/
			// userTest = user.parent().children().eq(10);
			/*userTest获取.user的li的父类再获取所有子类的第十个子类（就是user。。。），是等于 userd 。。。。*/
			// userTest.removeClass('user').addClass('user-test')
			// user.removeClass('user').addClass('user-test')
			// console.log(userTest);
			// console.log(user);

	    /*用js强制解决position：absolute导致的父类高度塌陷需要用到固定高度的问题*/
        /*	<script type="text/javascript">
				window.onload = function(){
					var List = document.getElementById("list");
					var imgHeight = List.getElementsByTagName("img")[0].offsetHeight||List.getElementsByTagName("img")[0].height;
					var banner = document.getElementById("banner");
					banner.style.height = imgHeight+"px";
				}
			</script>*/

		// 添加一个script会导致宽度出错？？？去除一个script将其加入到轮播图的js中。






		/* activity 动态创建图片详情展示 */
		var activity = document.getElementById("activity");
		var aImg = activity.getElementsByTagName("a");
		var clientHeigth = document.documentElement.clientHeight;
		var clientWidth = document.documentElement.clientWidth;

		for(var i = 0;i<aImg.length;i++){
			aImg[i].onclick = function(){
				var Mask = document.createElement("div");
				Mask.id="mask";
				Mask.className ="mask-opacity-first";
				document.body.appendChild(Mask);

				var wrap = document.createElement("div");
				wrap.id = "wrap";
				var close = document.createElement("a");
				close.innerHTML = "&times;"
				// close.classList.add('closeTag');
				var showImg = document.createElement("img");
				var showMessages = document.createElement("p");
				showMessages.innerHTML = "HD50 头戴式耳机";
				wrap.appendChild(close);
				wrap.appendChild(showImg);
				wrap.appendChild(showMessages);
				document.body.appendChild(wrap);

				var imgsrc = this.getElementsByTagName("img")[0].getAttribute("src");
				wrap.getElementsByTagName("img")[0].setAttribute("src",imgsrc);

				var wrapHeigth = wrap.offsetHeight;
				var wrapWidth = wrap.offsetWidth;
				wrap.style.top = (clientHeigth-wrapHeigth)/2 + "px";
				wrap.style.left = (clientWidth-wrapWidth)/2 + "px";

				var idWrap = document.getElementById("wrap");
				idWrap.style.transform = "scale(1.15)"; 
				idWrap.style.opacity = "1";
				mask.style.background = "rgba(0, 0, 0, 0.8)";

				close.onclick = mask.onclick = function(){
					document.body.removeChild(Mask);
					document.body.removeChild(wrap);
				}
				return false;

			}
		};






		//数字滚动简单特效代码：

		var scrollArrive = false;//用于判断scrollTop滚动距离是否到达这个位置。
		var idBottom = document.getElementById("bottom");

		var idActivity = document.getElementById("activity");
		// console.log(idActivity);
		var activityOffsetTop = idActivity.offsetTop;
		// console.log(activityOffsetTop);

		//这里activityOffsetTop的值是526px（除去了banner的高度。。。。。）
		/*（原因是jq中的是文档加载完成才触发，而这里
				的activityOffsetTop值，在jq定义banner的高时就已经提前获取了，此时css定义的banner的高为零。。。。）*/

		/*		
		OffsetTop此属性可以获取元素的上外缘距离最近采用定位父元素内壁的距离，如果父元素中没有采用定位的，则是获取上外边缘距离文档内壁的距离。所谓的定位就是position属性值为relative、absolute或者fixed。
		返回值是一个整数，单位是像素。
		此属性是只读的*/

		var b1 = idBottom.getElementsByTagName("b")[0];
		var b2 = idBottom.getElementsByTagName("b")[1];
		var b3 = idBottom.getElementsByTagName("b")[3];
		// console.log(b3);

			window.onscroll = function(){

				var idActivity = document.getElementById("activity");
				// console.log(idActivity);
				var activityOffsetTop = idActivity.offsetTop;
				// console.log(activityOffsetTop);

				//这里activityOffsetTop的值是正常的值。。。。

				var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
				// console.log(scrollTop);

				if (scrollTop>activityOffsetTop&&scrollArrive==false) {

				// 此处上下文的scrollArrive作用是只执行一次函数（即scrollTop>=这里执行一次函数，而后不会再执行。）

					scrollArrive = true;
					
				function numRunFun(num,maxNum,object,speedNub){
					// cancelAnimationFrame(golb);
					var numText = num;
					var golb; // 为了清除requestAnimationFrame
					function numSlideFun(){
						numText+=speedNub; // 速度的计算可以为小数
						if(numText >= maxNum){
							numText = maxNum;	
							cancelAnimationFrame(golb);
						}else {
							golb = requestAnimationFrame(numSlideFun);
						}
						object.innerHTML = ~~(numText);
					}
					numSlideFun();
				}
				// 运行
				if (scrollArrive) {
				numRunFun(0,7,b1,0.08);
				numRunFun(0,15,b2,0.17);
				numRunFun(0,2000,b3,23);
				// scrollArrive = undefined;
				}
			}
		};





		/*js中使用CSSStyleSheet的insertRule来为伪元素修改样式：(解决无法dom获取伪元素的问题（无法获取就直接修改覆盖样式），以及无法用纯css的hover来控制非子类和兄弟元素的问题)
		与上面的jq同理（解决了一部分bug，若要用上面的jq来实现要根据js的用法再修改）*/
	    var idHeader = document.getElementById("header"); 
	    var classUser = idHeader.querySelector(".user");
	    // console.log(classUser);
	    classUser.onmouseover = function(){
			classUserMessage.style.marginTop = "0px";
	    	// document.styleSheets[0].addRule('.navbar .user a::after','transform: rotate(180deg)');
	    	document.styleSheets[1].insertRule('.navbar .user a::after { transform: rotate(180deg) }', document.styleSheets[1].cssRules.length);
	    	// （重点）从加入的inserRule后面在加入insertRule覆盖前面的，长度再加1。
	    	// console.log(document.styleSheets[0]);
	    };
	    classUser.onmouseout = function(){
	    	classUserMessage.style.marginTop = "-250px";//注意单位;
	    	// document.styleSheets[0].addRule('.navbar .user a::after','transform: rotate(0deg)');
	    	document.styleSheets[1].insertRule('.navbar .user a::after { transform: rotate(0deg) }', document.styleSheets[1].cssRules.length);
	    	// console.log(document.styleSheets[0]);
	    };

	    var idContainer = document.getElementById("container"); 
	    var classUserMessage = idContainer.querySelector(".userMessage");
	    // console.log(classUserMessage);
	    classUserMessage.onmouseover = function(){
	    	classUserMessage.style.marginTop = "0px";
	    	// document.styleSheets[0].addRule('.navbar .user a::after','transform: rotate(180deg)');
	    	document.styleSheets[1].insertRule('.navbar .user a::after { transform: rotate(180deg) }', document.styleSheets[1].cssRules.length);
	    	// console.log(document.styleSheets[0]);
	    };

	    classUserMessage.onmouseout = function(){
	    	classUserMessage.style.marginTop = "-250px";
	    	// document.styleSheets[0].addRule('.navbar .user a::after','transform: rotate(0deg)');
	    	document.styleSheets[1].insertRule('.navbar .user a::after { transform: rotate(0deg) }', document.styleSheets[1].cssRules.length);
	    	// console.log(document.styleSheets[0]);
	    };

	    // 定义页面加载时触发第一张轮播图的信息移动特效
	    var opacityOn = document.querySelector(".img-message-one");
	    // console.log(opacityOn);
	    opacityOn.style.opacity = 1;
	    opacityOn.querySelector("hr").style.width = 250+"px";
	    opacityOn.querySelector(".message-top").style.transform = "translateX(0px)";
	    opacityOn.querySelector(".message-bottom").style.transform = "translateX(0px)";



