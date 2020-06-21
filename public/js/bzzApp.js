$(document).ready(() => {
	const socket = io();
	$("#chatForm").submit(() => {
		let text = $("#chat-input").val(),
			userName = $("#chat-user-name").val(),
			userId = $("#chat-user-id").val();
		socket.emit("message", {
			content: text,
			userName: userName,
			userId: userId
		});
		$("#chat-input").val("");
		return false;
	});

	socket.on("message", (message) => {
		displayMessage(message);
		/*for (let i = 0; i < 2; i++) {
			$(".chat-icon").fadeOut(200).fadeIn(200);
		}*/
	});

	socket.on("load all messages", data => {
		data.forEach(message => {
			displayMessage(message);
		})
	});

	let displayMessage = (message) => {
		$("#chat").prepend($("<li>")
			.html(`<div class='message ${getCurrentUserClass(message.user)}'>
		<span class="user-name">
		${message.userName}:
		</span>
		${message.content}
		</div>
		`));
	};

	/** 
	 * Checks whether the displayed message 
	 * belongs to the current user. 
	*/
	let getCurrentUserClass = (id) => {
		let userId = $("#chat-user-id").val();
		if (userId === id) return "current-user";
		else return "";
	};

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
