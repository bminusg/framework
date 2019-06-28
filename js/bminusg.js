// General Vars
    //var body = document.body; //IE 'quirks'
    //var document = document.documentElement; //IE with doctype
    //document = (document.clientHeight) ? document : body;
    var btnMenu, header, pos, h, hero;

// POLYFILLS
    /**
	*	adding forEach support for NodeLists in IE !!!
	*	see: https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
	*	fix: http://stackoverflow.com/questions/15267295/nodelist-prototype-foreach-array-prototype-foreach
	*/
	if (!NodeList.prototype.forEach) {
		NodeList.prototype.forEach = Array.prototype.forEach;
	}


// Remote Functions

    // SCROLLTO FUNCTION        
    function scrollTo(element, to, duration) {
        
        var start = element.scrollTop,
            change = to - start,
            currentTime = 0,
            increment = 20;
        
        var animateScroll = function(){        
            currentTime += increment;
            var val = Math.easeInOutQuad(currentTime, start, change, duration);
            element.scrollTop = val;
            console.log(element);
            if(currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        };
        animateScroll();
    }
    // t = current time b = start value c = change in value d = duration
    Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };


    // NAVIGATION
    function nav_BG(scrollPosition,lastScrollTop,pos) {

        

        scrollPosition = (scrollPosition) ? scrollPosition : window.pageYOffset;

        console.log(scrollPosition);
        console.log(hero.clientHeight);


        if (scrollPosition < hero.clientHeight) {
            console.log("ON HERO");
            header.dataset.pos = "on-hero";
            header.classList.remove("hidden");
        }
        if (scrollPosition > hero.clientHeight) {
            console.log("APRES HERO");
            header.dataset.pos = "apres-hero";
            
            if (scrollPosition > lastScrollTop){
                header.classList.add("hidden");
            } else {
                header.classList.remove("hidden");
            }
        }
    

        

    }

    function menu_BG() {
        btnMenu.onclick = function() {
            this.classList.toggle('active');
            header.classList.toggle('active');
        }
    }



// init framework

    function bminusg() {

        // DEFINE GENERAL VARS
        initScrollTo = document.querySelectorAll('.scroll-to-link');
        btnMenu = document.querySelector("#btn-menu");
        header = document.querySelector("#header-primary-wrapper");
        h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        hero = document.querySelector("#hero");
        pos = header.dataset.pos;

        // INIT SCROLLTO FUNCTION
        initScrollTo.forEach(function(item){
            item.onclick = function() {
                //scrollTo(document.body, 1000, 1250);
                console.log("scroll du");
                window.scrollBy({ top: 300, left: 0, behavior: "smooth" });
            }
        });

        // INIT MOBILE MENU
        if (btnMenu) {
            menu_BG();
        }

        // INIT NAVIGATION SETUP        
        nav_BG();

    }

// Event Listeners

    // WINDOW ONLOAD
    window.onload = function() {
        bminusg();
    }

    // SCROLL EVENT
    var scrolling = false;
    var lastScrollTop = 0;
    
    window.onscroll =function() {
        scrolling = true;
    };
    
    setInterval( function() {
        if ( scrolling ) {
            scrolling = false;
            scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            nav_BG(scrollPosition,lastScrollTop,pos);
            lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition; // For Mobile or negative scrolling
        }
    }, 250 );
   



    

    