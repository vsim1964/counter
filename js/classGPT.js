
class Counter {
	constructor() {
		this.form = document.querySelector('.counter__form');
		this.inputs = this.form.querySelectorAll("input[required]");
		this.submitButton = this.form.querySelector('[type="submit"]');
		this.resetButton = this.form.querySelector('[type="reset"]');
		this.resultBlock = document.querySelector('.counter__result');
		this.gender = document.querySelector('[name="gender"]').checked;
		this.age = document.querySelector('#age');
		this.height = document.querySelector('#height');
		this.weight = document.querySelector('#weight');
		this.activity = document.querySelector('[name="activity"]').checked;
		this.userGender = 'male';
		this.userAge = 0;
		this.userHeight = 0;
		this.userWeight = 0;
		this.activityValue = 'min';
		this.userActivity = 0;
		this.norma = 0;
		this.createUserActivity = this.createUserActivity.bind(this);
		this.handleFormInput = this.handleFormInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.form.addEventListener('input', this.handleFormInput);
		this.form.addEventListener('submit', this.handleSubmit);
		this.form.addEventListener('reset', this.handleReset);
	}
	createUserActivity(activityValue) {
		if (activityValue === 'min') { this.userActivity = 1.2 };
		if (activityValue === 'low') { this.userActivity = 1.375 };
		if (activityValue === 'medium') { this.userActivity = 1.55 };
		if (activityValue === 'high') { this.userActivity = 1.725 };
		if (activityValue === 'max') { this.userActivity = 1.9 };
		return this.activity;
	}
	handleFormInput() {
		if (this.form.checkValidity()) {
			this.submitButton.removeAttribute('disabled');
		} else {
			this.submitButton.setAttribute('disabled', true);
		}
		this.inputs.forEach(input => {
			input.addEventListener('input', () => {
				const inputsFilled = Array.from(this.inputs).some(input => input.value);
				this.resetButton.disabled = !inputsFilled;
			});
		});
	}
	handleSubmit(e) {
		e.preventDefault();
		this.userGender = this.gender.value;
		this.userAge = this.age.value;
		this.userHeight = this.height.value;
		this.userWeight = this.weight.value;
		this.userActivity = this.createUserActivity(this.activity.value);
		if (this.userGender === 'male') {
			this.norma = ((10 * this.userWeight) + (6.25 * this.userHeight) - (5 * this.userAge) + 5) * this.userActivity;
		} else {
			this.norma = ((10 * this.userWeight) + (6.25 * this.userHeight) - (5 * this.userAge) - 161) * this.userActivity;
		}
		document.getElementById('calories-norm').textContent = Math.round(this.norma);
		document.getElementById('calories-minimal').textContent = Math.round(this.norma * 0.85);
		document.getElementById('calories-maximal').textContent = Math.round(this.norma * 1.15);
		this.resultBlock.classList.remove('counter__result--hidden');
	}
	handleReset() {
		this.age.value = 0;
		this.height.value = 0;
		this.weight.value = 0;
		this.resetButton.setAttribute('disabled', true);
		this.resultBlock.classList.add('counter__result--hidden');
	}
}
const counter = new Counter();
