function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('toAnalyze').value;
    console.log("::: Form Submitted :::")
    postData('/test',{text:formText})
    .then(res => res.json())
    .then(res => extractInfo(res))
}

const postData = async(url = '', data = {})=>{
    console.log('postData() ', data);
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        console.log('postData() ',newData);
        return newData;
    }catch(error) {
        console.log("error - postData()", error);
    }
}

function extractInfo(response){
    let info = '';
    info += 'agreement: '+response.agreement+'<br />';
    info += 'subjectivity: '+response.subjectivity+'<br />';
    info += 'confidence: '+response.confidence+'<br />';
    irony += 'irony: '+response.irony+'<br />';
    document.getElementById('results').innerHTML = info;
}

export { handleSubmit }