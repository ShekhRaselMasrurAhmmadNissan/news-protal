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
	console.log(data);
};

/**
 * All Functions End Here
 */

/**
 * Calling the functions that are needed to be loaded at the beginning
 */
loadAllCategories();
