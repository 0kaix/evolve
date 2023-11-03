export default {
    data() {
        return {
            isMobile: false
        };
    },
    mounted() {
        this.isMobile = this.checkIsMobile();
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.isMobile = this.checkIsMobile();
        },
        checkIsMobile() {
            return window.innerWidth < 600;
        }
    }
};