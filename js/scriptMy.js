// Код представляет собой скрипт для работы с калькулятором калорий. Он содержит обработчики событий для формы, кнопок и полей ввода, а также функции для расчета нормы калорий и создания пользователя с заданной активностью.
// Все необходимые элементы находятся в DOM-дереве с помощью метода document.querySelector().
// При отправке формы происходит расчет нормы калорий в зависимости от выбранных пользователем параметров (пол, возраст, рост, вес и активность). Результаты расчета выводятся на страницу.
// При сбросе формы все поля ввода сбрасываются в исходное состояние, а результаты расчета скрываются.
// Код написан на английском языке.

const form = document.querySelector('.counter__form');
const inputs = form.querySelectorAll("input[required]");
const submitButton = form.querySelector('[type="submit"]');
const resetButton = form.querySelector('[type="reset"]')
const resultBlock = document.querySelector('.counter__result');

const gender = document.querySelector('[name="gender"]').checked;
const age = document.querySelector('#age');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const activity = document.querySelector('[name="activity"]').checked;

let userGender = 'male';
let userAge = 0;
let userHeight = 0;
let userWeight = 0;
let activityValue = 'min';
let userActivity = 0;
let norma = 0;

function createUserActivity(activityValue) {
	if (activityValue === 'min') { userActivity = 1.2 };
	if (activityValue === 'low') { userActivity = 1.375 };
	if (activityValue === 'medium') { userActivity = 1.55 };
	if (activityValue === 'high') { userActivity = 1.725 };
	if (activityValue === 'max') { userActivity = 1.9 };
	return activity;
}

form.addEventListener('input', () => {
	if (form.checkValidity()) {
		submitButton.removeAttribute('disabled');
	} else {
		submitButton.setAttribute('disabled', true);
	}
	inputs.forEach(input => {
		input.addEventListener('input', () => {
			const inputsFilled = Array.from(inputs).some(input => input.value);
			resetButton.disabled = !inputsFilled;
		});
	});
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	userGender = gender.value;
	userAge = age.value;
	userHeight = height.value;
	userWeight = weight.value;
	userActivity = createUserActivity(activity.value);

	if (userGender === 'male') {
		norma = ((10 * userWeight) + (6.25 * userHeight) - (5 * userAge) + 5) * userActivity;
	} else {
		norma = ((10 * userWeight) + (6.25 * userHeight) - (5 * userAge) - 161) * userActivity;
	}
	document.getElementById('calories-norm').textContent = Math.round(norma);
	document.getElementById('calories-minimal').textContent = Math.round(norma * 0.85);
	document.getElementById('calories-maximal').textContent = Math.round(norma * 1.15);
	resultBlock.classList.remove('counter__result--hidden');
});

form.addEventListener('reset', function () {
	age.value = 0;
	height.value = 0;
	weight.value = 0;
	resetButton.setAttribute('disabled', true)
	resultBlock.classList.add('counter__result--hidden');
});
