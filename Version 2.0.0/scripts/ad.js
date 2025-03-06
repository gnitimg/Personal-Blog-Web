document.querySelectorAll('.promo-option-left a, .promo-option-right a').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetLink = this.getAttribute('data-link');
        window.location.href = `login.html?redirect=${encodeURIComponent(targetLink)}`;
    });
});