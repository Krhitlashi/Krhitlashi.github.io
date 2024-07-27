window.addEventListener('load', () => {
	registerSW();
});
// Register the Service Worker
async function registerSW() {
	if ('serviceWorker' in navigator) {
		try {
			await navigator
			.serviceWorker
			.register('j͑ʃᴜ ſɭɔ j͑ʃ\'ɔ.js');
		}
		catch (e) {
			console.log('SW registration failed');
		}
	}
}

document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll('a');

    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
        event.preventDefault();
        var href = this.href;

        document.body.classList.add('sakatla');

        setTimeout(function() {
            window.location.href = href;
        }, 500); // Match the duration of the CSS transition
        });
    });
});


var flak = document.getElementsByClassName("flak");
var i;
for (i = 0; i < flak.length; i++) {
	flak[i].addEventListener("click", function() {
		this.classList.toggle("atleflak");
		var ciihiiflak = this.nextElementSibling;
        var ciihiiflakcepai = this.querySelector(".ciihiiflakcepai");
    	if (ciihiiflak.style.maxWidth) {
			ciihiiflak.style.maxWidth = null;
      	} else {
     		ciihiiflak.style.maxWidth = ciihiiflak.scrollWidth + "px";
   		}
        if (ciihiiflakcepai.style.maxHeight) {
            ciihiiflakcepai.style.maxHeight = null;
        } else {
          ciihiiflakcepai.style.maxHeight = ciihiiflakcepai.scrollWidth * 8 + "px";
        }
	});
}
this.querySelector(".ciihiiflak").classList.toggle("atleciihiiflak");
this.querySelector(".ciihiiflakcepai").classList.toggle("atleciihiiflak");