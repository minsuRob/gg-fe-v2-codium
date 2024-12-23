export const getCurrentDate = () => {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 만듭니다.
    const day = String(dateObject.getDate()).padStart(2, '0'); // 날짜도 두 자리로 만듭니다.
    return `${year}-${month}-${day}`;
};

export const getCurrentDateDot = () => {
    const dateObject = new Date();
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고, 두 자리로 만듭니다.
    const day = String(dateObject.getDate()).padStart(2, '0'); // 날짜도 두 자리로 만듭니다.
    return `${year}.${month}.${day}`;
};