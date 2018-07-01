//导航页
function fnhander() {
	let ul = document.getElementById("list");
	let ali = ul.children;
	let bg = document.getElementById("bg");
	let resume = document.getElementById("resume");
	let boxplay = document.getElementById("titleh");
	let animateTD = document.getElementById("animateTD");
	let boxmag = document.getElementById("boxmag");
	for(let i = 0; i < ali.length - 1; i++) {
		ali[i].index = i;
		ali[i].onmouseenter = function() {
			move(bg, this.offsetLeft);
			switch(this.index) {
				case 0:
					resume.style.display = 'block';
					boxplay.style.display = 'none';
					animateTD.style.display = 'none';
					boxmag.style.display = 'none';
					break;
				case 1:
					resume.style.display = 'none';
					boxplay.style.display = 'block';
					animateTD.style.display = 'none';
					boxmag.style.display = 'none';
					break;
				case 2:
					resume.style.display = 'none';
					boxplay.style.display = 'none';
					animateTD.style.display = 'block';
					boxmag.style.display = 'none';
					break;
				case 3:
					resume.style.display = 'none';
					boxplay.style.display = 'none';
					animateTD.style.display = 'none';
					boxmag.style.display = 'block';
					break;
			}
		}
	}
	//弹性运动
	function move(obj, target) {
		let speed = 0;
		clearInterval(obj.timer);
		obj.timer = setInterval(function() {
			let current = obj.offsetLeft;
			speed += (target - current) / 8;
			speed *= 0.8;
			if(Math.abs(speed) < 1 && Math.abs(target - current) < 1) {
				clearInterval(obj.timer);
				obj.style.left = target + "px";
				return;
			}
			obj.style.left = current + speed + "px";
		}, 30);
	}
}
//右边悬浮框
function fnright() {
	let box = document.getElementById("boxright");
	let winH = document.documentElement.clientHeight;
	let top = (winH - box.offsetHeight) / 2;
	let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	let top2 = top + scrollTop;
	animate(box, {
		top: parseInt(top2)
	});
	box.onclick = function() {
		let timer = setInterval(function() {
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			let speed = Math.floor((0 - scrollTop) / 8);
			if(scrollTop == 0) {
				clearInterval(timer);
			}
			document.documentElement.scrollTop = scrollTop + speed;
			document.body.scrollTop = scrollTop + speed;
		}, 30)
	}
}
//下框
function fnbottom() {
	let boxleft = document.getElementById('boxleft');
	let boxbottom = document.getElementById('boxbottom');
	let abutton = document.getElementById('abutton');
	boxleft.onclick = function() {
		animate(boxbottom, {
			opacity: 100
		});
		boxleft.style.display = 'none';
	}
	abutton.onclick = function() {
		animate(boxbottom, {
			opacity: 0
		});
		boxleft.style.display = '';
	}
}
//放大镜
function fnmag() {
	function $(id) {
		return document.getElementById(id);
	}
	$("middleImg").onmousemove = function(e) {
		e = e || event;
		$("middleArea").style.display = "block";
		$("bigArea").style.display = "block";
		let scale = $("bigImg").offsetHeight / $("middleImg").offsetHeight;
		let x = e.pageX - $("boxmag").offsetLeft - $("middleImg").offsetLeft - $("middleArea").offsetWidth / 2;
		let y = e.pageY - $("boxmag").offsetTop - $("middleImg").offsetTop - $("middleArea").offsetHeight / 2;
		if(x <= 0) x = 0;
		else if(x >= $("middleImg").offsetWidth - $("middleArea").offsetWidth) {
			x = $("middleImg").offsetWidth - $("middleArea").offsetWidth
		}
		if(y <= 0) y = 0;
		else if(y >= $("middleImg").offsetHeight - $("middleArea").offsetHeight) {
			y = $("middleImg").offsetHeight - $("middleArea").offsetHeight
		}
		$("middleArea").style.left = x + 'px';
		$("middleArea").style.top = y + 'px';
		$("bigImg").style.left = -x * scale + "px";
		$("bigImg").style.top = -y * scale + "px";

	}
	$("middleImg").onmouseleave = function() {
		$("middleArea").style.display = "none";
		$("bigArea").style.display = "none";
	}
	let ali = $("small").getElementsByTagName("li");
	for(let i = 0; i < ali.length; i++) {
		ali[i].onclick = function() {
			let src = this.children[0].getAttribute("src"); //获取
			$("middleImg").children[0].src = src.replace('_1', '_2'); //赋值
			$("bigImg").src = src.replace('_1', '_3');
		}
	}
}

//轮播图
function fnplay() {
	let boxplay = document.getElementById("boxplay");
	let list = boxplay.getElementsByClassName("list")[0];
	let ali = list.getElementsByTagName("li");
	let list2 = boxplay.getElementsByClassName("list2")[0];
	let ali2 = list2.getElementsByTagName("li");
	let liW = ali[0].offsetWidth;
	let size = ali.length;
	list.style.width = liW * size + "px";
	let n = 0;
	let timer = setInterval(function() {
		n++;
		move();
	}, 2000);

	function move() {
		if(n >= size) {
			list.style.left = 0;
			n = 1;
		}
		if(n < 0) {
			list.style.left = -(size - 1) * liW + "px";
			n = size - 2;
		}
		animate(list, {
			left: -liW * n
		});
		for(let i = 0; i < ali2.length; i++) {
			if(n == i) {
				ali2[n].className = "active";
			} else {
				ali2[i].className = "";
			}
		}
		if(n == size - 1) {
			ali2[0].className = "active";
		}
	}
	for(let i = 0; i < ali2.length; i++) {
		ali2[i].index = i;
		ali2[i].onmouseenter = function() {
			n = this.index;
			move();
		}
	}
	let prev = document.getElementById("prev");
	prev.onclick = function() {
		n--;
		move();
	}
	let next = document.getElementById("next");
	next.onclick = function(e) {
		e.preventDefault()
		n++;
		move();
	}
	boxplay.onmouseenter = function() {
		clearInterval(timer);
	}
	boxplay.onmouseleave = function() {
		clearInterval(timer);
		timer = setInterval(function() {
			n++;
			move();
		}, 4000);
	}
}
//animate
function getStyleAttr(obj, attr) {
	if(window.getComputedStyle) {
		return getComputedStyle(obj, null)[attr];
	}
	return obj.currentStyle[attr];
}

function animate(obj, json, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		let bstop = true;
		for(let attr in json) {
			let target = json[attr];
			let current;
			if(attr == "opacity") { //透明度
				current = Math.round(getStyleAttr(obj, attr) * 100);
			} else { //left, top, width,height,...
				current = parseInt(getStyleAttr(obj, attr));
			}
			let speed = (target - current) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			if(current != target) {
				bstop = false;
			}
			if(attr == "opacity") {
				obj.style[attr] = (current + speed) / 100;
				obj.style.filter = "alpha(opacity=" + (current + speed) + ")";
			} else {
				obj.style[attr] = current + speed + "px";
			}
		}
		if(bstop) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 90)
}