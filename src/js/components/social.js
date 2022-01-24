import Share from 'ninelines-sharing';

Array.from(document.querySelectorAll('[data-social]')).forEach((link) => {
	link.addEventListener('click', () => {
		let url = location.origin + location.pathname;

		switch (event.currentTarget.dataset.social) {
			case 'facebook':
				Share.facebook(url);
				break;

			case 'vk':
				Share.vk(url);
				break;

			case 'telegram':
				Share.telegram(url);
				break;
		}
	});
});
