export class BtnUp {
	constructor() {
		this.html = document.querySelector('html')
		this.btn = document.querySelector('#btn-up')

		if (this.btn) this.init()
	}

	init() {
		this.showBtnUp()
		this.pageScrollToTop()
	}

	pageScrollToTop() {
		this.btn.addEventListener('click', () => {
			this.html.scrollIntoView({block: 'start', behavior: 'smooth'})
		})
	}

	showBtnUp() {
		window.addEventListener('scroll', () => {
			const scrollPosition = window.pageYOffset
			const hasClass = this.btn.classList.contains('_visible')

			if (scrollPosition >= window.innerHeight) {
				if (hasClass) return

				this.btn.classList.add('_visible')
			} else {
				if (!hasClass) return

				this.btn.classList.remove('_visible')
			}
		})
	}
}
