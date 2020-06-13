$(document).ready(() => {
	$('#modal-button').click(() => {
		$('.modal-body').html('');
		$.get('/api/users', (results = {}) => {
			let data = results.data;
			if (!data || !data.users) return;
			data.users.forEach((user) => {
				$('.modal-body').append(
					`<div>
<span class="user-name">
${user.name.first}
</span>
<div class='user-email'>
${user.email}
</div>
</div>`
				);
			});
		});
	});
});