<script>
    const myCarouselElement = document.querySelector('#carouselExampleCaptions');

    const carousel = new boosted.Carousel(myCarouselElement, {
        interval: 2000,
        touch: true
    });

    carousel.cycle();
</script>
