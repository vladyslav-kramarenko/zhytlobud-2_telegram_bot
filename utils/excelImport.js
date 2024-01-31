const ExcelJS = require('exceljs');

async function importMessagesFromExcel(filename) {
    let messages = {};
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filename);
    const worksheet = workbook.getWorksheet(1);
    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) { // Skip the header row
            const command = row.getCell(1).value;
            messages[command] = {};
            row.eachCell((cell, colNumber) => {
                if (colNumber !== 1) { // Skip the command column
                    const language = worksheet.getRow(1).getCell(colNumber).value;
                    messages[command][language] = cell.value;
                }
            });
        }
    });
    return messages;
}

module.exports = importMessagesFromExcel;