// list
class FastFood{
	constructor(number, name, price, imgUrl){
			this.number = number;
			this.name = name;
			this.price = price;
			this.imgUrl = imgUrl;
	};
};
const fastFoodsList = [
	new FastFood(0, "press button, please.", "", "https://cdn.pixabay.com/photo/2016/08/24/17/16/open-sign-1617495_960_720.jpg"),
	new FastFood(1, "Hamburger", "$10", "https://cdn.pixabay.com/photo/2016/03/05/22/09/beef-1239198__340.jpg"),
	new FastFood(2, "Fried Potato", "$5", "https://cdn.pixabay.com/photo/2016/11/20/09/06/bowl-1842294_960_720.jpg"),
	new FastFood(3, "Fried Chicken", "$8", "https://cdn.pixabay.com/photo/2019/09/26/18/23/republic-of-korea-4506696__340.jpg"),
	new FastFood(4, "Pizza", "$10", "https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523__340.jpg"),
	new FastFood(5, "Fish & Chips", "$8", "https://cdn.pixabay.com/photo/2016/02/24/06/33/fries-1219189__340.jpg"),
	new FastFood(6, "Sandwiches", "$10", "https://cdn.pixabay.com/photo/2016/01/10/02/46/sandwiches-1131401__340.jpg"),
	new FastFood(7, "Doughnuts", "$5", "https://cdn.pixabay.com/photo/2019/05/11/17/08/donuts-4196093__340.jpg"),
	new FastFood(8, "Salad", "$8", "https://cdn.pixabay.com/photo/2016/08/18/18/40/salad-1603608__340.jpg"),
	new FastFood(9, "Orange", "$5", "https://cdn.pixabay.com/photo/2017/01/20/14/59/orange-1995044__340.jpg"),
	new FastFood(10, "Coke", "$5", "https://cdn.pixabay.com/photo/2021/08/17/20/06/coca-cola-6554092__340.jpg")
];
// slider
let slider = document.getElementById("slider");
let sliderData = document.createElement("div");
sliderData.classList.add("slider-data", "hidden");

for(let i=0; i < fastFoodsList.length; i++){
	let sliderItem = document.createElement("div");
	sliderItem.classList.add("slider-item");
	let img = document.createElement("img");
	img.classList.add("imgFit", "col-10")
	img.src = fastFoodsList[i].imgUrl;
	sliderItem.append(img);
	sliderData.append(sliderItem);
}
slider.append(sliderData);

let sliderItems = document.querySelectorAll(".slider-item");

let sliderShow = document.createElement("div");
let main = document.createElement("div");
main.classList.add("full-width")
let extra = document.createElement("div");
extra.classList.add("full-width")

sliderShow.classList.add("col-12", "d-flex", "flex-nowrap");

main.append(sliderItems[0]);
sliderShow.append(main);
sliderShow.append(extra);
slider.append(sliderShow);

main.setAttribute("data-index", "0")

// slide
function slideJump(steps){
	// 現在の要素
	let currentIndex = parseInt(main.getAttribute("data-index"));
	let currentElement = document.createElement("div");
	currentElement.innerHTML = `
	<div class="slider-item">
			<img class="imgFit col-10" src="${fastFoodsList[currentIndex].imgUrl}">
	</div>
	`

	// 次の要素
	let nextIndex = parseInt(steps);
	let nextElement = sliderItems[nextIndex];
	main.setAttribute("data-index", steps);

	// アニメーション
	let animationType = getAnimationType(currentIndex, nextIndex);
	console.log(animationType)
	animation(currentElement, nextElement, animationType);
}

// getAnimationType
function getAnimationType(current, next){
	let jumps = next - current;
	let halfLen = fastFoodsList.length / 2;
	return ((jumps >= 0 && Math.abs(jumps) < halfLen) || (jumps < 0 && Math.abs(jumps) > halfLen)) ? true : false;
}

// アニメーション
function animation(currentElement, nextElement, animationType){
	main.innerHTML = "";
	main.append(nextElement);

	extra.innerHTML = "";
	extra.append(currentElement);

	main.classList.add("expand-animation");
	extra.classList.add("deplete-animation");

	console.log(main)
	console.log(extra)
	console.log(currentElement)
	console.log(nextElement)

	if(animationType){
			sliderShow.innerHTML = "";
			sliderShow.append(extra);
			sliderShow.append(main);
	}else{
			sliderShow.innerHTML = "";
			sliderShow.append(main);
			sliderShow.append(extra);
	}
}

// info生成
let info = document.getElementById("info");
let description = document.createElement("div");
description.classList.add("p-2");
let descriptionElement = fastFoodsList[0].name;
description.innerHTML = descriptionElement;

// description
function getDescription(element){
	let descriptionElement = `
	${element.name}
	<br>
	${element.price}
	`;
	description.innerHTML = descriptionElement;
}

// btn生成
let btn = document.createElement("div");
for(let i=0; i < sliderItems.length-1; i++){
	let jumpBtn = document.createElement("button");
	jumpBtn.classList.add("btn", "btn-light", "m-2")
	let currentIndex = i+1
	jumpBtn.innerHTML = currentIndex;
	jumpBtn.addEventListener("click", ()=>{
			slideJump(currentIndex);
	});
	jumpBtn.addEventListener("click", ()=>{
			getDescription(fastFoodsList[currentIndex]);
	});
	btn.append(jumpBtn);
}
info.append(description);
info.append(btn);