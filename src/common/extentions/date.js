  /**
   * formate date to yyyy / MM /DD hh:mm
     * @param {Date} date date to be formated.
    */
export default function formateDate(date) {
    var dateString = date.getUTCFullYear() +"/"+ 
    (date.getUTCMonth()+1) +"/"+ date.getUTCDate() + " " +
    date.getUTCHours() + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
     return dateString
}