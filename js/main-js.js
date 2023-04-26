// Main Section
function bodyScrollingToggle() {
    document.body.classList.toggle("stop-scrolling");
}

export { bodyScrollingToggle }

// Hide Section Func Ex. Active
(() => {
    const sections = document.querySelectorAll(".section");
    
    sections.forEach((section) => {
        if (!section.classList.contains("active")) {
            section.classList.add("hide");
        }
    })
})();

// Navigation Menu
(() => {
    const hambBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    hambBtn.addEventListener("click", showNav);
    closeNavBtn.addEventListener("click", hideNav);

    function showNav() { 
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    
    function hideNav() { 
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }

    function fadeOutEffect() { 
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() => {
            document.querySelector(".fade-out-effect").classList.remove("active");
        }, 300);
    }

    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("link-item")) {
            if (e.target.hash !== "") {
                e.preventDefault();
                
                const hash = e.target.hash;
                
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                navMenu.querySelector(".active").classList.add("outer-shadow", "hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active", "inner-shadow");
                if (navMenu.classList.contains("open")) {
                    e.target.classList.add("active", "inner-shadow");
                    e.target.classList.remove("outer-shadow", "hover-in-shadow");
    
                    hideNav();
                }
                else {
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) => {
                        if (hash === item.hash) {
                            item.classList.add("active", "inner-shadow");
                            item.classList.remove("outer-shadow", "hover-in-shadow");
                        }
                    });
                    fadeOutEffect();
                }

                window.location.hash = hash;
            }
        }
        // else {
        //     console.log("Not Contains");
        // }
    })
})();

// Styles Switcher
const styleToggler = document.querySelector(".style-toggler");

styleToggler.addEventListener("click",  () => {
    document.querySelector(".style-switcher").classList.toggle("open");
})

window.addEventListener("scroll", () => {
    if (document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})