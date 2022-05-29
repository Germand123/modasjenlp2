var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 20,
    // slidesPerGroup: 4,
    grabCursor: true,
    loop: true,
    loopFillGroupWithBlank: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        // clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});