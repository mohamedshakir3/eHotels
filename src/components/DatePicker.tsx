'use client'

import React, {useState} from "react"; 
import Datepicker from "react-tailwindcss-datepicker"; 

const App = () => { 
const [value, setValue] = useState({ 
startDate: new Date(), 
endDate: new Date().setMonth(11) 
}); 

const handleValueChange = (newValue: any) => {
console.log("newValue:", newValue); 
setValue(newValue); 
} 

return (
<Datepicker 
primaryColor={"fuchsia"} 
value={value} 
onChange={handleValueChange} 
showShortcuts={true} 
/> 
);
}; 
export default App;