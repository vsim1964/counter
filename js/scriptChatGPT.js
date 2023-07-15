document.addEventListener('DOMContentLoaded', function () {
	const form = document.forms.counter;
	const inputs = form.querySelectorAll("input[required]");
	const resultBlock = document.querySelector('.counter__result');
	const submitButton = form.querySelector('[type="submit"]');
	const resetButton = form.querySelector('[type="reset"]')
	const activityCoefficients = {
		min: 1.2,
		low: 1.375,
		medium: 1.55,
		high: 1.725,
		max: 1.9,
	};

	form.addEventListener('input', function () {
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

	form.addEventListener('submit', function (event) {
		event.preventDefault();

		const gender = form.gender.value;
		const age = Number(form.age.value);
		const height = Number(form.height.value);
		const weight = Number(form.weight.value);
		const activity = form.activity.value;

		const baseCalories = gender === 'male'
			? (10 * weight) + (6.25 * height) - (5 * age) + 5
			: (10 * weight) + (6.25 * height) - (5 * age) - 161;

		const totalCalories = baseCalories * activityCoefficients[activity];

		document.getElementById('calories-norm').textContent = Math.round(totalCalories);
		document.getElementById('calories-minimal').textContent = Math.round(totalCalories * 0.85);
		document.getElementById('calories-maximal').textContent = Math.round(totalCalories * 1.15);

		resultBlock.classList.remove('counter__result--hidden');
	});

	form.addEventListener('reset', function () {
		age.value = 0;
		height.value = 0;
		weight.value = 0;
		resetButton.setAttribute('disabled', true)
		resultBlock.classList.add('counter__result--hidden');
	});

});
