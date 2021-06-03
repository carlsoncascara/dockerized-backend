module.exports = {

    //Date format in YYYY-MM-DD
    getDateYMDFormat(dateToFormat){
        date = new Date(dateToFormat);

        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();

        return year + "-" + 
            (month.toString().length > 1 ? month:"0" + month) + "-" + 
            (day.toString().length > 1 ? day : "0"+day);
    }


}