let test = document.querySelector('.test');
console.log('Hello');
test.addEventListener('click', () => {
	if (test.style.color == 'blue') {
		test.style.color = 'green';
	} else {
		test.style.color = 'blue';
	}
});
