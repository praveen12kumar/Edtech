import { helper } from "./helper-service";
 export const execute = ()=>{
    const result = helper();

    if(result === true){
        return "Learning JS"
    }
    else{
        return "Learning Python"
    }
}

