$(document).ready(() => {
	$('#modal-button').click(() => {
		$('.modal-body').html('');
		$.get('/api/products', (results = {}) => {
			let data = results.data;
			if (!data || !data.products) return;
			data.products.forEach((product) => {
				$('.modal-body').append(
					`<div>
<span class="user-name">
${product.name}
</span>
<button class='${product.added ? 'added-button' : 'add-button'}' data-id="${product._id}">
 ${product.added ? 'Added' : 'Add'}
</button>
<div class='user-email'>
${product.description}
</div>
</div>`
				);
			});
		}).then(() => {
			addAddButtonListener();
		});
	});
});

let addAddButtonListener = () => {
	$('.add-button').click((event) => {
		let $button = $(event.target),
			productId = $button.data('id');
		$.get(`/api/products/${productId}/add`, (results = {}) => {
			let data = results.data;
			if (data && data.success) {
				$button
					.text('Added')
					.addClass('added-button')
					.removeClass('added-button');
			} else {
				$button.text('Try again');
			}
		});
	});
};