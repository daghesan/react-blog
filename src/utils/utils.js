export function convertToDate(d){
    const date = new Date(d);
    const fullDate = (date.getDate()).toString() + "-" + (date.getMonth()+1).toString() + "-" + (date.getFullYear()).toString();
    return fullDate;
}

export function nullCheck(el){
    if (el === null || el === undefined) {
        return true;
    }else{
        return false;
    }
}

export const getWindowDimension = () => {
    const width = window.innerWidth 
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    const height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    return {width, height}
};
