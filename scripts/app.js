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
	toggleSpinner(true);
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
	toggleSpinner(false);
	document.getElementById('sorting-control').classList.remove('hidden');
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
	const newsContainer = document.getElementById('news-container');
	newsContainer.innerHTML = ``;
	toggleSpinner(false);
	console.log(data);
	showNewsCountMessage(data.length, categoryName);
	data.sort(function (a, b) {
		return b.total_view - a.total_view;
	});
	data.forEach((news) => {
		console.log(news);
		const {
			_id,
			title,
			thumbnail_url,
			details,
			total_view,
			author: { name: authorName, published_date, img: authorImage },
		} = news;
		const div = document.createElement('div');
		div.innerHTML = `
			<div
				href="#"
				class="mx-auto flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-col lg:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
			>
				<div class="lg:flex">
					<img
						class="object-cover w-full h-96 rounded-t-lg md:h-auto lg:w-48 md:rounded-none md:rounded-l-lg"
						src="${thumbnail_url}"
						alt=""
					/>
					<div
						class="flex flex-col p-4 leading-normal"
					>
						<h5
							class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white" title="${title}"
						>
							${title.length > 30 ? title.slice(0, 25) + '...' : title}
						</h5>
						<p
							class="mb-3 font-normal text-gray-700 dark:text-gray-400"
						>
							${details.length > 250 ? details.slice(0, 250) + '...' : details}
						</p>
					</div>
				</div>
				<div
					class="w-[95%] mx-auto md:flex justify-between items-center mt-2 mb-4 space-x-4"
				>
					<div class="flex items-center space-x-3">
						<img
							class="w-10 h-10 rounded-full"
							src="${authorImage}"
							alt=""
						/>
						<p>${
							authorName === null || authorName === ''
								? 'No data found'
								: authorName
						}</p>
					</div>
					<div
						class="flex flex-grow space-x-1 items-center justify-evenly font-medium dark:text-white"
					>
						<p class="flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
							${total_view === null ? 'No data found' : total_view}
						</p>
						<div class="hidden lg:flex items-center mb-1">
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-yellow-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>First star</title>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-yellow-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Second star</title>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-yellow-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Third star</title>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-yellow-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Fourth star</title>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
							<svg
								aria-hidden="true"
								class="w-5 h-5 text-yellow-400"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Fifth star</title>
								<path
									d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
								></path>
							</svg>
						</div>
						<label for="my-modal-4" class="btn modal-button" onclick="loadSingleNews('${_id}')">Read Full News</label>

					</div>
				</div>
			</div>
		`;
		newsContainer.appendChild(div);
	});
};

/**
 * @description This function will take the news ID as parameter and Fetch the news of that ID
 * @author Shekh Rasel Masrur Ahmmad
 * @date 03/09/2022
 * @param {String} id
 */
const loadSingleNews = async (id) => {
	const url = `https://openapi.programming-hero.com/api/news/${id}`;
	document.getElementById('modal-spinner').classList.remove('hidden');
	try {
		const res = await fetch(url);
		const data = await res.json();
		displaySingleNews(data.data[0]);
	} catch (error) {
		console.log(error);
	}
};

const displaySingleNews = async (news) => {
	document.getElementById('modal-spinner').classList.add('hidden');
	const modalBody = document.getElementById('modal-body');
	const {
		_id,
		title,
		image_url,
		details,
		total_view,
		author: { name: authorName, published_date, img: authorImage },
		rating: { number: ratingNumber },
	} = news;
	modalBody.innerHTML = `
		<img
			class="w-full"
			src="${image_url}"
			alt=""
		/>
		<article>
			<div class="flex items-center mb-4 space-x-4 justify-between w-[95%] mx-auto mt-2">
				<div class="flex items-center mb-4 space-x-4">
					<img
						class="w-16 h-16 rounded-full"
						src="${authorImage}"
						alt=""
					/>
					<div class="space-y-1 font-medium dark:text-white">
						<p>
							${authorName === null || authorName === '' ? 'No data found' : authorName}
							<time
								class="block text-sm text-gray-500 dark:text-gray-400"
								>${published_date}</time
							>
						</p>
					</div>
				</div>
				
				<!-- Views -->
				<p class="flex">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6 mr-1"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
						/>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>
					${total_view === null ? 'No data found' : total_view}
				</p>
				<!-- Ratings -->
				<div class="flex items-center mb-1">
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-yellow-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>First star</title>
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						></path>
					</svg>
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-yellow-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Second star</title>
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						></path>
					</svg>
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-yellow-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Third star</title>
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						></path>
					</svg>
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-yellow-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Fourth star</title>
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						></path>
					</svg>
					<svg
						aria-hidden="true"
						class="w-5 h-5 text-yellow-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Fifth star</title>
						<path
							d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
						></path>
					</svg>
					<span class="ml-2">${ratingNumber}</span>
				</div>
			</div>
			<!-- News Title -->
			<h5
				class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				${title}
			</h5>
			<p class="mb-2  dark:text-gray-400">
				${details}
			</p>
		</article>
	`;
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
searchNewsByCategories('08', 'All News');
