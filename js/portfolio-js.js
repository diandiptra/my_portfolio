import { bodyScrollingToggle } from "./main-js.js";

// Portfolio Section
(() => {
    const filterCont = document.querySelector(".portfolio-filter"),
        portfolioItmCont = document.querySelector(".portfolio-items"),
        portfolioItm = document.querySelectorAll(".portfolio-item"),
        popup = document.querySelector(".portfolio-popup"),
        prevBtn = popup.querySelector(".pp-prev"),
        nextBtn = popup.querySelector(".pp-next"),
        closeBtn = popup.querySelector(".pp-close"),
        projectDtCont = popup.querySelector(".pp-details"),
        projectDtBtn = popup.querySelector(".pp-project-details-btn");

        let itemIndex, slideIndex, screenshoots ; 

        /* ----------- Filter Portfolio Item ------------- */
        filterCont.addEventListener("click", (e) => {
            if (e.target.classList.contains("filter-item") && !e.target.classList.contains("active")) {
                filterCont.querySelector(".active").classList.remove("outer-shadow","active");
                e.target.classList.add("active","outer-shadow");
                const target = e.target.getAttribute("data-target");
                
                portfolioItm.forEach((itm) => {
                    console.log(itm);
                    if(target === itm.getAttribute("data-cat") || target === "all") {
                        itm.classList.remove("hide");
                        itm.classList.add("show");
                    }
                    else {
                        itm.classList.remove("show");
                        itm.classList.add("hide");
                    }
                })
            }
        })

        portfolioItmCont.addEventListener("click", (e) => {
            if (e.target.closest(".portfolio-item-inner")) {
                const portfolioItem = e.target.closest(".portfolio-item-inner").parentElement;
                itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
                screenshoots = portfolioItm[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screeshoots");
                screenshoots = screenshoots.split(",");
                if (screenshoots.length === 1) {
                    prevBtn.style.display = "none";
                    nextBtn.style.display = "none";
                }
                else {
                    prevBtn.style.display = "block";
                    nextBtn.style.display = "block";
                }
                slideIndex = 0;
                popupToggle();
                popupSlideshow();
                popupDetails();
            }
        })

        closeBtn.addEventListener("click", () => {
            popupToggle();
        })
        
        function popupToggle() {
            popup.classList.toggle("open")
            bodyScrollingToggle();
        }

        function popupSlideshow() {
            const Imgsrc = screenshoots[slideIndex];
            const popupImg = popup.querySelector(".pp-img");

            popup.querySelector(".pp-loader").classList.add("active");
            popupImg.src = Imgsrc;
            popupImg.onload = () => {
                popup.querySelector(".pp-loader").classList.remove("active");
            }

            popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshoots.length;
        }

        nextBtn.addEventListener("click", () => {
            if (slideIndex === screenshoots.length-1) {
                slideIndex = 0;
            }
            else {
                slideIndex++;
            }
            popupSlideshow();
        })

        prevBtn.addEventListener("click", () => {
            if (slideIndex === 0) {
                slideIndex = screenshoots.length - 1;
            }
            else {
                slideIndex--;
            }
            popupSlideshow();
        })

        function popupDetails() { 
            const details = portfolioItm[itemIndex].querySelector(".portfolio-item-details").innerHTML;
            popup.querySelector(".pp-project-details").innerHTML = details;
            const title = portfolioItm[itemIndex].querySelector(".portfolio-item-title").innerHTML;
            popup.querySelector(".pp-title h2").innerHTML = title;
        }

        projectDtBtn.addEventListener("click", () => {
            popupDetailsToggle();
        })

        function popupDetailsToggle() {
            if (projectDtCont.classList.contains("active")) {
                projectDtBtn.querySelector("i").classList.remove("fa-minus");
                projectDtBtn.querySelector("i").classList.add("fa-plus");
                projectDtCont.classList.remove("active");
                projectDtCont.style.maxHeight = 0 + "px";
            }
            else {
                projectDtBtn.querySelector("i").classList.remove("fa-plus");
                projectDtBtn.querySelector("i").classList.add("fa-minus");
                projectDtCont.classList.add("active");
                projectDtCont.style.maxHeight = projectDtCont.scrollHeight + "px";
                popup.scrollTo(0, projectDtCont.offsetTop)
            }
        }

})();