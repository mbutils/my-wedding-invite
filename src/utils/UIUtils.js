/**
 * 
 * @param {*} refName 
 * @param {*} start >100 hiện sớm hơn, <100 hiện muộn hơn
 * @param {*} end 
 * @returns 
 */
export function scrollTriggerVar(refName, start, end) {
    return {
        trigger: refName,
        start: 'top ' + (start || '100%'),
        end: 'top ' + (end || '40%'),
        scrub: true,
        toggleActions: 'play reverse play reverse',
    }
}