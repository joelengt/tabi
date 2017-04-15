(function mainMobile() {

	var $mainButton = document.getElementById('menu-button')
	var $mainMobile = document.getElementById('menu-mobile')
	var $mainOptions = document.querySelectorAll('.menuMobile-options')

	function viewMain(ev){

		ev.preventDefault()

		if ($mainMobile.style.left==='-100%') {

			$mainMobile.style.left = '0'

		} else {

			$mainMobile.style.left = '-100%'

		}
	}

	$mainButton.addEventListener('click', viewMain)

	$mainOptions.forEach(function(item){
		item.addEventListener('click', viewMain)
	})

})()