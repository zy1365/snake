let moveDirection = 1; //1:right -1:left 2:up -2:down
let oldMoveDirection = "";
let timeInterval = 200;
let snakeHead = document.querySelector(".snakeHead");
let food = document.querySelector(".food");
let a = document.querySelector(".a");
let object1={
    moveSnakeInterval:null,
    clearInterval:function(){
        clearInterval(this.moveSnakeInterval);
    }
};
let headSite = [
	{
		x: 0,
		y: 0,
	},
];
let foodSite = {
	x: 0,
	y: 0,
};
createFood();
// if (timeInterval < 200) {
// 	snakeHead.style.transition = "all " + (timeInterval * 3) / 4000 + "s" + " linear";
// }else{
//     snakeHead.style.transition = "all " + timeInterval / 1000 + "s" + " linear";
// }
window.addEventListener("keydown", (e) => {
	console.log(e.key);
	switch (e.key) {
		case "ArrowRight":
			moveDirection = 1;
			break;
		case "ArrowLeft":
			moveDirection = -1;
			break;
		case "ArrowUp":
			moveDirection = 2;
			break;
		case "ArrowDown":
			moveDirection = -2;
			break;
		case "a":
			addNewBody();
			break;
        case "f":
            createFood();
            break;
		default:
			break;
	}
});
function moveSnake() {
	let x = 0;
	let y = 0;

	if (moveDirection === -oldMoveDirection) {
		moveDirection = oldMoveDirection;
	}
	switch (moveDirection) {
		case 1:
			x = +50;
			y = 0;
			oldMoveDirection = moveDirection;
			snakeHead.style.borderRadius = "0px";
			snakeHead.style.borderTopRightRadius = "30px";
			snakeHead.style.borderBottomRightRadius = "30px";
			break;
		case -1:
			x = -50;
			y = 0;
			oldMoveDirection = moveDirection;
			snakeHead.style.borderRadius = "0px";
			snakeHead.style.borderTopLeftRadius = "30px";
			snakeHead.style.borderBottomLeftRadius = "30px";
			break;
		case 2:
			x = 0;
			y = -50;
			oldMoveDirection = moveDirection;
			snakeHead.style.borderRadius = "0px";
			snakeHead.style.borderTopLeftRadius = "30px";
			snakeHead.style.borderTopRightRadius = "30px";
			break;
		case -2:
			x = 0;
			y = +50;
			oldMoveDirection = moveDirection;
			snakeHead.style.borderRadius = "0px";
			snakeHead.style.borderBottomLeftRadius = "30px";
			snakeHead.style.borderBottomRightRadius = "30px";
			break;

		default:
			break;
	}
	//将蛇头位置加入数组的开头
	headSite.unshift({ x: headSite[0].x + x, y: headSite[0].y + y });
	//删除数组最后一个元素
	headSite.pop();
    //判断是否吃到食物
    if (headSite[0].x === foodSite.x && headSite[0].y === foodSite.y) {
        createFood();
        addNewBody();
    }
	//移动蛇身
	let snake = document.querySelectorAll(".snake");
	snake.forEach((item, index) => {
		item.style.left = headSite[index].x + "px";
		item.style.top = headSite[index].y + "px";
		// if (timeInterval < 200) {
		//     item.style.transition = "all " + (timeInterval * 3) / 4000 + "s" + " linear";
		// }else{
		//     item.style.transition = "all " + timeInterval / 1000 + "s" + " linear";
		// }
	});

	//移动蛇头

	a.innerHTML = headSite[0].x + "," + headSite[0].y;
	if (headSite[0].x > 450 || headSite[0].x < 0 || headSite[0].y > 450 || headSite[0].y < 0) {
		//删除计时器
		object1.clearInterval();
		alert("Game Over");
		return;
	}
}
function addNewBody() {
	let newBody = document.createElement("div");
	newBody.classList.add("snakeBody");
	newBody.classList.add("snake");
	newBody.style.left = headSite[headSite.length - 1].x + "px";
	newBody.style.top = headSite[headSite.length - 1].y + "px";
	document.querySelector(".gameMain").appendChild(newBody);
	headSite.push(headSite[headSite.length - 1]);
}
function startGame() {
	object1.moveSnakeInterval = setInterval(moveSnake, timeInterval);
	headSite = [{ x: 0, y: 0 }];
    document.querySelectorAll('div.snakeBody').forEach((element) => {
        element.parentNode.removeChild(element);
    });
    moveDirection = 1;
    oldMoveDirection = "";
}
function createFood(){
    
    foodSite.x = Math.floor(Math.random() * 9) * 50;
    foodSite.y = Math.floor(Math.random() * 9) * 50;
    headSite.forEach((item) => {
        if (item.x === foodSite.x && item.y === foodSite.y) {
            createFood();
            return;
        }
    });
    food.style.left = foodSite.x + "px";
    food.style.top = foodSite.y + "px";
}
