exports.stepsArray = [
	{status: 'Approved', step: 0, details: 'Website Application'},
	{status: '', alert: '', step: 1, details: 'Khan Academy: Basics Tutorial /  Solo Learn: Basics Tutorial', link:'https://www.khanacademy.org', url: ''},
	{status: '', alert: '', step: 2, details: 'Code Academy: HTML & CSS Tutorial', link:'https://www.codecademy.com', url: ''},
	{status: '', alert: '', step: 3, details: 'Code Academy: Responsive Design Tutorial', link:'https://www.codecademy.com', url: ''},
	{status: '', alert: '', step: 4, details: 'Create a Web Page', link: 'https://codepen.io',  url: ''},
	{status: '', alert: '', step: 5, details: 'Iterate a Web Page', link: 'https://codepen.io',  url: ''}
];

exports.ValidURL = (str) => {
    const pattern = new RegExp('^((https?:)?\\/\\/)?'+ 
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ 
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ 
        '(\\?[;&a-z\\d%_.~+=-]*)?'+
        '(\\#[-a-z\\d_]*)?$','i'); 
    if (!pattern.test(str)) {
        return false;
    } else {
        return true;
    }
}

exports.containPartOf = (str, link) => str.indexOf(link)      
 