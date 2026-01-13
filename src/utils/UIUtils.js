import { Informations } from "./informations";

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

export function getFirst(guestOf, key) {
    const obj = guestOf === 1 ? 'Groom' : 'Bride';
    return Informations[obj][key];
}

export function getSecond(guestOf, key) {
    const obj = guestOf === 1 ? 'Bride' : 'Groom';
    return Informations[obj][key];
}