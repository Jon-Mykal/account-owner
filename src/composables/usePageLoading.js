import NProgress from 'nprogress';

export const usePageLoading = () => {
    const showLoading = () => {
        NProgress.start();
    }

    const closeLoading = () => {
        NProgress.done();
    }

    return  {
        showLoading,
        closeLoading
    }
}