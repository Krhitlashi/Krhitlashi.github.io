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

document.body.classList.add('atletla');
document.addEventListener("DOMContentLoaded", function() {
    var links = document.querySelectorAll('a');
  
    links.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        var href = this.href;
  
        document.body.classList.add('sakatla');
  
        setTimeout(function() {
          window.location.href = href;
        }, 200);
        setTimeout(function() {
          document.body.classList.remove('sakatla');
        }, 200);
      });
    });
  
    // Remove the initial animation class after the animation completes
    setTimeout(function() {
      document.body.classList.remove('atletla');
    }, 200);
  });

var flak = document.getElementsByClassName("flak");
var i;
for (i = 0; i < flak.length; i++) {
	flak[i].addEventListener("click", function() {
		this.classList.toggle("atleflak");
        if (this.querySelector(".ciihiiflakcepai") != null) {
            var ciihiiflakcepai = this.querySelector(".ciihiiflakcepai");
            if (ciihiiflakcepai.style.maxHeight) {
                ciihiiflakcepai.style.maxHeight = null;
            } else {
                ciihiiflakcepai.style.maxHeight = ciihiiflakcepai.scrollHeight + "px";
            }
        }
        else {
            var ciihiiflak = this.nextElementSibling;
            if (ciihiiflak.style.maxWidth) {
			    ciihiiflak.style.maxWidth = null;
      	    } else {
     		    ciihiiflak.style.maxWidth = ciihiiflak.scrollWidth + "px";
   		    }
        }
	});
}
this.querySelector(".ciihiiflak").classList.toggle("atleciihiiflak");
this.querySelector(".ciihiiflakcepai").classList.toggle("atleciihiiflak");