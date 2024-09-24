

export const textEllipsis=(text:string,overNumber=6):string=>{
    if (text.length>overNumber){
        return text.substr(0,overNumber)+"..."
    }
    return text
}