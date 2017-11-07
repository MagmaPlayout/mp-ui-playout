export interface NotiOptionModel{
    position : Array<string>; // default : ["bottom", "right"]
    timeOut: number; // default : 0
    showProgressBar: boolean; // default : true
    pauseOnHover : boolean; // default : true
    lastOnBottom : boolean; // default : true
    clickToClose : boolean; // default : true
    maxLength : number; // default : 0
    maxStack : number; // default : 8
    preventDuplicates : boolean; // default : false
    preventLastDuplicates : any; //boolean or string, default : false  
    theClass : string; // default : null
    rtl : boolean; // default : false
    animate : string; // default : fromRight
    icons : any; // type icons, default : DefaultIcons    
}