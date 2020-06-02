export const formatNumber=(number)=>{
    return new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number)
}

export const formatDate=(date)=>{
    return new Intl.DateTimeFormat("en-IN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        timeZone: "Asia/Kolkata",
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZoneName:'short'

      }).format(new Date(date));
}