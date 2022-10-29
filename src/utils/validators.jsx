export const required= value=>{
   if(value) return undefined;
   return "Field is required";
}

export const minLength=(value)=>{
   if(value.length<3) return `Min length is ${3}`;
   return undefined;
}