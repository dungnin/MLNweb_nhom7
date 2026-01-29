document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CHỌN CÁC PHẦN TỬ CẦN TẠO HIỆU ỨNG
    // Chúng ta sẽ thêm class 'hidden-scroll' vào các thẻ này trong file HTML sau
    // Hoặc dùng JS tự động thêm class cho các thẻ lớn (section, card)
    const observerOptions = {
        root: null, // Theo dõi trên viewport trình duyệt
        rootMargin: '0px',
        threshold: 0.15 // Khi 15% phần tử xuất hiện thì kích hoạt hiệu ứng
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Khi phần tử vào khung hình, thêm class 'show-scroll'
                entry.target.classList.add('show-scroll');
                // (Tùy chọn) Ngừng theo dõi sau khi đã hiện (để không lặp lại)
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Tự động tìm các khối nội dung lớn để gán hiệu ứng
    const animatedElements = document.querySelectorAll(
        '.intro-card, .section-title, .definition-box, .concept-col, .relationship-container, .video-container-box, .lesson-box, .impact-card'
    );

    animatedElements.forEach((el) => {
        el.classList.add('hidden-scroll'); // Thêm trạng thái ẩn ban đầu
        observer.observe(el); // Bắt đầu theo dõi
    });

    // 2. HIỆU ỨNG PARALLAX NHẸ CHO HEADER (Nếu muốn)
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header.main-header');
        if(header) {
            let scrollPosition = window.scrollY;
            // Làm mờ dần text trong header khi cuộn xuống
            header.style.opacity = 1 - scrollPosition / 700;
        }
    });
});