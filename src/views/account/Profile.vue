<template>
    <div>

    </div>
</template>

<script>
import { usePageLoading } from '@/composables/usePageLoading';
import { onMounted } from 'vue';
export default {
    setup () {
        const pageLoader = usePageLoading();
        onMounted(() => {
            pageLoader.closeLoading();
        })
        return { onMounted }
    }
}
</script>

<style scoped>

</style>