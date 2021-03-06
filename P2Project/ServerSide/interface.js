try {
    const enableDebuging = true;
    let timeSinceLastCFGUpdate = new Date();

    //#region Header

    let BCC = require(__dirname + "/BasicCalls.js").BCC;
    let RCC = require(__dirname + "/ResourceCheck.js").RCC;
    let RC = require(__dirname + "/ReturnCodes.js");
    let CLC = require(__dirname + "/ConfigLoading.js").CLC;

    // Include modules
    let http = require("http");
    const queryString = require("querystring");

    //#endregion

    //#region Main server code

    // Main Server Code
    let server = http.createServer(async function (req, res) {

        timeSinceLastCFGUpdate = await CLC.checkForConfigUpdate(timeSinceLastCFGUpdate);
        let httpReturnCode = 200;

        let response = new BCC.retMSG(-1,"");
        try {
            let queryUrl = queryStringParse(req.url);
            response = await RCC.checkAllResource(response, req, queryUrl, enableDebuging);

            if (response.returnCode == -1) {
                BCC.errorWithTimestamp("Resource not found!");
                response = new RC.parseToRetMSG(RC.failCodes.ResourceNotFound);
                httpReturnCode = 404;
            }
            else {
                if (response.returnCode >= 400 && response.returnCode <= 499) {
                    BCC.errorWithTimestamp("(" + response.returnCode + ") Error msg: " + RC.parseCode(response.returnCode));
                    BCC.errorWithTimestamp("Parameters was: ");
                    for (let i = 0; i < Object.keys(queryUrl).length; i++)
                        BCC.errorWithTimestamp("     " + Object.keys(queryUrl)[i] + " : " + queryUrl[Object.keys(queryUrl)[i]]);
                    response = new RC.parseToRetMSG(response.returnCode);
                    httpReturnCode = 404;
                }
            }

        } catch (err) {
            BCC.errorWithTimestamp(err);
            response = new BCC.retMSG(499, "An error occured on the server!");
        }

        res.writeHead(httpReturnCode, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
        res.write(JSON.stringify(response));
        res.end();
    });

    function queryStringParse(url) {
        return queryString.parse(url.split("?")[1], "&", "=");
    }

    server.listen(3910);
    BCC.logWithTimestamp("Node.js server is running and listening at port 3910.");

    //#endregion

} catch (err) {
    //#region Error Catching

    // Simplified error for missing modules
    if (err.code == "MODULE_NOT_FOUND")
        BCC.logWithTimestamp("Use 'NPM INSTALL " + err.message.substring(err.message.indexOf("'"), err.message.lastIndexOf("'")) + "' to get the module");
    else
        BCC.logWithTimestamp(err)

    BCC.logWithTimestamp("\n Press any key to exit")
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0))

    //#endregion
}