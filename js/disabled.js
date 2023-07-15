
const form = document.querySelector('.counter__form');
const inputs = form.querySelectorAll("input[required]");
const submitButton = form.querySelector('[type="submit"]');


form.addEventListener("input", function () {
	let isValid = true;
	inputs.forEach(function (input) {
		if (!input.checkValidity()) {
			isValid = false;
		}
	});
	submitButton.disabled = !isValid;
});

// условие - заполнение
inputs.forEach(input => {
	input.addEventListener('input', () => {
		// Check if all input fields have a value
		const allInputsFilled = Array.from(inputs).every(input => input.value);
		// Enable or disable the submit button based on the result
		submitButton.disabled = !allInputsFilled;
	});
});

// условие - валидность

form.addEventListener('input', () => {
	if (form.checkValidity()) {
		submitButton.removeAttribute('disabled');
	} else {
		submitButton.setAttribute('disabled', true);
	}
});
