import { ref, onMounted, onBeforeUnmount } from 'vue';

// export default function useIsMobile() {
//     const isMobile = ref(false);

//     const handleResize = () => {
//         isMobile.value = checkIsMobile();
//         console.log(isMobile.value);
//     };

//     const checkIsMobile = () => {
//         return window.innerWidth < 600;
//     };

//     onMounted(() => {
//         isMobile.value = checkIsMobile();
//         window.addEventListener('resize', handleResize);
//     });

//     onBeforeUnmount(() => {
//         window.removeEventListener('resize', handleResize);
//     });

//     return {
//         isMobile,
//     };
// }

const isMobile = ref(false);

const handleResize = () => {
    isMobile.value = checkIsMobile();
}
const checkIsMobile = () => {
    return window.innerWidth < 600;
}

const useIsMobile = () => {
    onMounted(() => {
        isMobile.value = checkIsMobile();
        window.addEventListener('resize', handleResize);
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', handleResize);
    });
    return {
        isMobile
    }
}

export {
    useIsMobile
}


