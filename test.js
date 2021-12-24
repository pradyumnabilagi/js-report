var htmlToPdfmake = require("html-to-pdfmake");

var html = htmlToPdfmake(`
  <div>
    <h1>My title</h1>
    <p>
      This is a sentence with a <strong>bold word</strong>, <em>one in italic</em>,
      and <u>one with underline</u>. And finally <a href="https://www.somewhere.com">a link</a>.
    </p>
  </div>
`);


console.log(html)