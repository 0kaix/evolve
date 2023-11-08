// export default {
//     data() {
//         return {
//             isMobile: false
//         };
//     },
//     mounted() {
//         this.isMobile = this.checkIsMobile();
//         window.addEventListener('resize', this.handleResize);
//     },
//     beforeDestroy() {
//         window.removeEventListener('resize', this.handleResize);
//     },
//     methods: {
//         handleResize() {
//             this.isMobile = this.checkIsMobile();
//         },
//         checkIsMobile() {
//             return window.innerWidth < 600;
//         }
//     }
// };
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default function useIsMobile() {
    const isMobile = ref(false);

    const handleResize = () => {
        isMobile.value = checkIsMobile();
        console.log(isMobile.value);
    };

    const checkIsMobile = () => {
        return window.innerWidth < 600;
    };

    onMounted(() => {
        isMobile.value = checkIsMobile();
        window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });

    return {
        isMobile,
    };
}


