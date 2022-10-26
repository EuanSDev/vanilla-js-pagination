export default class Pagination {
	constructor(params){
		this.pagination_container = params.pagination_container;
		this.list_el = (this.pagination_container.querySelector('.list')) && this.pagination_container.querySelector('.list');
		this.pagination_el = (this.pagination_container.querySelector('.pagination')) && this.pagination_container.querySelector('.pagination');

		this.options = {
			per_page		: (params.per_page) ? params.per_page : 10,
			current_page	: 1
		}

		this.fetch();
	}

	async fetch(){
		const res = await fetch('posts.json');
		this.posts = await res.json();

		this.displayList(this.options.current_page);
		this.setupPagination();
	}

	displayList(current_page){
		if(
			this.list_el &&
			this.posts
		){
			this.list_el.innerHTML = '';
			current_page--;

			let start = this.options.per_page * current_page;
			let end = start + this.options.per_page;
			let paginated_posts = this.posts.slice(start, end);

			paginated_posts.forEach((paginated_post) => {
				const post = document.createElement('div');
					post.classList.add('post');
					post.innerText = paginated_post.postName;
					post.id = paginated_post.id;

				this.list_el.appendChild(post);
			});
		}
	}

	setupPagination(){
		if(
			this.pagination_el &&
			this.posts
		){
			this.pagination_el.innerHTML = '';

			const page_count = Math.ceil(this.posts.length / this.options.per_page);
			for(let i = 1; i < page_count + 1; i++){
				let button = this.paginationButton(i);

				this.pagination_el.appendChild(button);
			}
		}
	}

	paginationButton(pageNumber){
		const button = document.createElement('button');
			button.innerText = pageNumber;

		if(this.options.current_page - 1 == pageNumber - 1) button.classList.add('active');

		button.addEventListener('click', () => {
			this.displayList(pageNumber);

			const current_btn = this.pagination_container.querySelector('button.active');
			if(current_btn.classList.contains('active')) current_btn.classList.remove('active');

			button.classList.add('active');
		});

		return button;
	}
}