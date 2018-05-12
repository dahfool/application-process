exports.stepsArray = [
    {status: 'Approved', step: 0, details: 'Website Application'},
    
    {processus: 'Register and complete Khan Academy HTML/CSS course at ' , status: '', alert: '', step: 1, details: ' Khan Academy: Basics Tutorial', link:'https://www.khanacademy.org', directLink: ['https://www.khanacademy.org/computing/computer-programming/html-css'], url: ''},
    
	{processus: 'Register and complete  HTML tutorial and CSS tutorial  respectively at '  , status: '', alert: '', step: 2, details: 'Code Academy: HTML & CSS Tutorial', link:'https://www.codecademy.com', directLink: ['https://www.codecademy.com/learn/learn-html', 'https://www.codecademy.com/learn/learn-css'], url: ''},
    
    {processus: 'Register and complete Codecademy Responsive Design course at ' , status: '', alert: '', step: 3, details: 'Code Academy: Responsive Design Tutorial', link:'https://www.codecademy.com', directLink: ['https://www.codecademy.com/learn/learn-responsive-design'], url: ''},
    
    {processus: ' Implement what you’ve learned so far from the HTML, CSS and Responsive Design courses.' , status: '', alert: '', step: 4, details: 'Create a Web Page', link: 'https://codepen.io', directLink: ['https://www.freecodecamp.org/challenges/build-a-tribute-page'],  url: ''},
    
    {processus: 'Add the Best Practices described  to your Tribute Page as describe here'  , status: '', alert: '', step: 5, details: 'Iterate a Web Page',  link: 'https://codepen.io', directLink: ['https://drive.google.com/file/d/11SyzjpcJu-iUkEdRkI0ObHubejVWp2QU/view'],  url: ''}
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
 