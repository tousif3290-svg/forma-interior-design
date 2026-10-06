document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const video = document.getElementById('bg-video');
    const slides = gsap.utils.toArray('.slide');
    
    slides.forEach((slide, i) => {
        if (i !== 0) {
            const content = slide.querySelector('.forma-content');
            gsap.set(content, { opacity: 0, scale: 0.8 });
        }
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".stack-container", 
            start: "top top",
            end: "+=6000", 
            scrub: 1,
            pin: true,
            onUpdate: (self) => {
                if(video.duration) {
                    video.currentTime = self.progress * video.duration;
                }
            }
        }
    });

    slides.forEach((slide, i) => {
        if (i === slides.length - 1) return; 
        
        const startTime = i * 2;
        const content = slide.querySelector('.forma-content');
        const nextContent = slides[i + 1].querySelector('.forma-content');

        // Phase 1: Text goes OUT
        tl.to(content, { opacity: 0, scale: 3, duration: 0.5, ease: "power2.in" }, startTime + 1.2);
        
        // Phase 2: Next text comes IN
        tl.to(nextContent, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }, startTime + 1.5);
    });
});
