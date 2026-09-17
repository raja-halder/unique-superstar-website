(function () {
"use strict";


document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    var menuToggle = document.querySelector(".menu-toggle");
    var navigation = document.querySelector(".navigation");
    var navigationLinks = document.querySelectorAll(".navigation a");

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", function () {

            var menuIsOpen = navigation.classList.toggle("open");

            menuToggle.classList.toggle("is-active", menuIsOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                menuIsOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                menuIsOpen ? "Close navigation" : "Open navigation"
            );
        });
    }


    /* =========================
       CLOSE MENU AFTER LINK CLICK
    ========================= */

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navigation) {
                navigation.classList.remove("open");
            }

            if (menuToggle) {

                menuToggle.classList.remove("is-active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );
            }
        });
    });


    /* =========================
       CLOSE MENU WITH ESCAPE
    ========================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            if (navigation) {
                navigation.classList.remove("open");
            }

            if (menuToggle) {

                menuToggle.classList.remove("is-active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );
            }
        }
    });


    /* =========================
       CLOSE MENU ON DESKTOP
    ========================= */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 760) {

            if (navigation) {
                navigation.classList.remove("open");
            }

            if (menuToggle) {

                menuToggle.classList.remove("is-active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );
            }
        }
    });


    /* =========================
       HEADER SCROLL EFFECT
    ========================= */

    var header = document.querySelector(".site-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("header-scrolled");
        } else {
            header.classList.remove("header-scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* =========================
       SCROLL REVEAL ANIMATION
    ========================= */

    var revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        var revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    /* =========================
       GALLERY LIGHTBOX
    ========================= */

    var galleryItems = document.querySelectorAll(".gallery-item");

    if (galleryItems.length > 0) {

        var lightbox = document.createElement("div");
        var lightboxImage = document.createElement("img");
        var lightboxClose = document.createElement("button");

        lightbox.className = "lightbox";
        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.className = "lightbox-image";
        lightboxImage.setAttribute("alt", "");

        lightboxClose.className = "lightbox-close";
        lightboxClose.type = "button";

        lightboxClose.setAttribute(
            "aria-label",
            "Close image"
        );

        lightboxClose.textContent = "×";

        lightbox.appendChild(lightboxImage);
        lightbox.appendChild(lightboxClose);

        document.body.appendChild(lightbox);


        function openLightbox(imageSource, imageAlt) {

            if (!imageSource) {
                return;
            }

            lightboxImage.src = imageSource;
            lightboxImage.alt = imageAlt || "Gallery image";

            lightbox.classList.add("is-open");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add("lightbox-open");
        }


        function closeLightbox() {

            lightbox.classList.remove("is-open");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            document.body.classList.remove(
                "lightbox-open"
            );

            lightboxImage.removeAttribute("src");
        }


        galleryItems.forEach(function (item) {

            item.addEventListener("click", function () {

                var image = item.querySelector("img");

                if (!image) {
                    return;
                }

                openLightbox(
                    image.currentSrc || image.src,
                    image.alt
                );
            });
        });


        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {
                    closeLightbox();
                }
            }
        );


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {
                    closeLightbox();
                }
            }
        );
    }


    /* =========================
       SMOOTH SCROLLING
    ========================= */

    var internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                var targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") {
                    return;
                }

                var targetElement =
                    document.querySelector(targetId);

                if (!targetElement) {
                    return;
                }

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        );
    });


    /* =========================
       UPDATE COPYRIGHT YEAR
    ========================= */

    var yearElements =
        document.querySelectorAll("[data-year]");

    var currentYear =
        new Date().getFullYear();

    yearElements.forEach(function (element) {

        element.textContent = currentYear;
    });

});

})();
