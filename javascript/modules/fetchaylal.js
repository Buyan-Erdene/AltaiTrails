export async function fetchAylalData() {
    const response = await fetch("http://localhost:3001/api/aylluud"); 
    if (!response.ok) {
        throw new Error(`Data tatahad aldaa garlaa: ${response.statusText}`);
    }
    const data = await response.json(); 
    return(data); 
}