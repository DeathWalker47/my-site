
const burgerBtn = document.querySelector('.burger-btn');
const menuList = document.querySelector('.menu-items');

burgerBtn.addEventListener('click' , (e)=> {
	let current = e.currentTarget;
	current.classList.toggle('active');
	menuList.classList.toggle('active');
})

document.addEventListener('mousemove', e => {
	document.body.style.cssText = `--move-x: ${e.clientX}px; --move-y: ${e.clientY}px;`
})


