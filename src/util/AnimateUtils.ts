// 动画库
// 几倍速
export let magnification = 2;

export const beAttacked = (node: HTMLElement | undefined | null): Promise<any> => {
    return animateCSS(node, 'shakeX')
}

export const doAttacked = (node: HTMLElement | undefined | null): Promise<any> => {
    return animateCSS(node, 'wobble')
}


const animateCSS = (node: HTMLElement | undefined | null, animation: string, prefix = 'animate__'): Promise<any> => {
    if (!node) {
        return Promise.resolve('node 为空');
    }
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;

        node.classList.add(`${prefix}animated`, animationName);
        node.style.setProperty('--animate-duration', `${2 / magnification}s`);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }

        node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
}