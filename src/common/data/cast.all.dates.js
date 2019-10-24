export default function castAllDates(data) {
    Object.keys(data).forEach(x=>{
        if (x.search('Date')!==-1) {
            data[x]=new Date(data[x]);
        }
    })
}
  