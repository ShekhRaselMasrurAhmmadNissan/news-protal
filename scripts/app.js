/**
 * Global Variables Start
 */
const newsCountField = document.getElementById('news-count');
/**
 * Global Variables End
 */

/**
 * All Functions Start From Here
 */

/**
 * @description This function will fetch all the categories from the API.
 * @author Shekh Rasel Masrur Ahmmad
 * @date 03/09/2022
 */
const loadAllCategories = async () => {
	const url = `https://openapi.programming-hero.com/api/news/categories`;
	try {
		const res = await fetch(url);
		const data = await res.json();
		displayCategories(data.data.news_category);
	} catch (error) {
		console.log(error);
	}
};

/**
 * @description This Function will Take the categories as input and show them to the UI.
 * @author Shekh Rasel Masrur Ahmmad
 * @date 03/09/2022
 * @param {Array} data
 */
const displayCategories = async (data) => {
	const categoriesList = document.getElementById('categories-list');
	data.forEach((category) => {
		console.log(category);
		const { category_id, category_name } = category;
		const li = document.createElement('li');
		li.innerHTML = `
			<a
				href="#"
				class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-emerald-400 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-xl" onclick="searchNewsByCategories('${category_id}', '${category_name}')"
				>${category_name}</a
			>
		`;
		categoriesList.appendChild(li);
	});
};

/**
 * @description This Function will take category id as parameter and fetch the news of that category from API
 * @author Shekh Rasel Masrur Ahmmad
 * @date 03/09/2022
 * @param {String} categoryID
 */
const searchNewsByCategories = async (categoryID, categoryName) => {
	const url = `https://openapi.programming-hero.com/api/news/category/${categoryID}`;
	newsCountField.classList.add('hidden');
	toggleSpinner(true);
	try {
		const res = await fetch(url);
		const data = await res.json();
		displayAllNews(data.data, categoryName);
	} catch (error) {
		console.log(error);
	}
};

/**
 * @description This function will take a news list as parameter and Display them to the UI.
 * @author Shekh Rasel Masrur Ahmmad
 * @date 03/09/2022
 * @param {Array} data
 * @param {String} categoryName
 */
const displayAllNews = async (data, categoryName) => {
	toggleSpinner(false);
	console.log(data);
	showNewsCountMessage(data.length, categoryName);
	data.forEach((news) => {
		console.log(news);
	});
};

/**
 * @description This function will take a boolean as parameter and toggle the spinner according to that parameter.
 * @author Shekh Rasel Masrur Ahmmad
 * @date 03/09/2022
 * @param {boolean} isLoading
 */
const toggleSpinner = (isLoading) => {
	const spinner = document.getElementById('spinner');
	if (isLoading) {
		spinner.classList.remove('hidden');
	} else {
		spinner.classList.add('hidden');
	}
};

/**
 * @description
 * @author Shekh Rasel Masrur Ahmmad
 * @date 03/09/2022
 * @param {Number} count
 * @param {String} categoryName
 */
const showNewsCountMessage = (count, categoryName) => {
	newsCountField.classList.remove('hidden');
	if (count === 0) {
		newsCountField.innerHTML = `
			<h1 class="text-center text-4xl font-bold text-red-600">No Result Found</h1>
		`;
	} else {
		newsCountField.innerHTML = `
			<h1 class="text-center text-4xl font-bold text-green-600">${count} News Found for Category ${categoryName}</h1>
		`;
	}
};

/**
 * All Functions End Here
 */

/**
 * Calling the functions that are needed to be loaded at the beginning
 */
loadAllCategories();
