const dex = document.getElementById('dex');
const BASE_URL = "https://jak-api-dot-com.herokuapp.com";

const fetchFrameworks = async () => {
    const url = `${BASE_URL}/api/hobby/1`;
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	const frameworks = data.frameworks.map((result, index) => ({
		...result,
		id: index + 1,
		_imageURL: `${BASE_URL}/${result.imageURL}`
	}));
	displayFrameworks(frameworks);
};

const displayFrameworks = (frameworks) => {
    const frameworksHTMLString = frameworks
        .map((framework) => (`
			<li class="card" onclick="selectFramework(${framework.id})">
				<img class="card-image" src="${framework._imageURL}"/>
				<h2 class="card-title">${framework.id}. ${framework.value}</h2>
			</li>
		`)).join('');
    dex.innerHTML = frameworksHTMLString;
};

const selectFramework = async (id) => {
	const url = `${BASE_URL}/api/hobby/0`;
	const res = await fetch(url);
	const data = await res.json();
	
	displayPopup(data.frameworks[id - 1]);
};

const displayPopup = (framework) => {
	const imageURL = `${BASE_URL}/${framework.imageURL}`;
	let languages;
	
	if (!framework.languages[1]) {
		languages = Array(framework.languages).map((language) => language[0]);
	} else {
		languages = Array(framework.languages).map((language) => language.join(", "));
	}

	const htmlString = `
		<div class="popup">
			<button id="closeBtn" onclick="closePopup()">Close</button>
			<div class="card">
				<img class="card-image" src="${imageURL}" />
				<h2 class="card-title">
					${framework.id + 1}. ${framework.value}
				</h2>
				<p>
					<small>Languages: </small>${languages}
				</p>
			</div>
		</div>
	`;
	dex.innerHTML = htmlString + dex.innerHTML;
};

const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};

fetchFrameworks();
