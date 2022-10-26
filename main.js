import Pagination from './Pagination.js';

window.addEventListener('load', () => {
	const pagination_containers = document.querySelectorAll('.pagination-container');
	if(pagination_containers){
		pagination_containers.forEach((pagination_container) => {
			if(pagination_container){
				const postList = new Pagination({
					pagination_container: pagination_container,
					per_page: 5
				})
			}
		});
	}
});