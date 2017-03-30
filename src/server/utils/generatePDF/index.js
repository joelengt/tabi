var pdf = require('phantom-html2pdf');

function generatePDF(id_user, callback) {

    var options = {
        "html" : "./uploads/news/index.html",
        // "css" : "Path to additional CSS file",
        // "js" : "Path to additional JavaScript file",
        // "runnings" : "Path to runnings file. Check further below for explanation.",
        "paperSize" : {format: 'A4', orientation: 'portrait', border: '1cm', delay: 2000},
        // "deleteOnAction" : true/false (Deletes the created temp file once you access it via toBuffer() or toFile()),
      // "runningsArgs": Object (You can pass an object to the runnings file when you have wrapped it with a function)
    }

    pdf.convert(options, function(err, result) {
        if(err) {
            return callback(err);
        }

        /* Using a buffer and callback */
        result.toBuffer(function(returnedBuffer) {});
     
        /* Using a readable stream */
        var stream = result.toStream();
     
        /* Using the temp file path */
        var tmpPath = result.getTmpPath();
     
        /* Using the file writer and callback */
        result.toFile(`./uploads/news/${ id_user }.pdf`, function() {
            console.log('pdf generado');
            callback(err, result);
        });
    });
   
}

module.exports = generatePDF