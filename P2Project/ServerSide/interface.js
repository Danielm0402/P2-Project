try {
    /*
        =========================
                Header
        =========================
    */

    // File class
    class Credentials {
        constructor(Username, Password) {
            this.Username = Username;
            this.Password = Password;
        }
    }

    // Admin credentials
    let AdminCredentials = [new Credentials("Admin", "Password"), new Credentials("Sensor", "SensorPassword")]

    // Include all other js files
    let prediction = require(__dirname + "/PredictionAlgorithms.js");
    let sensorInfo = require(__dirname + "/SimpleSensorInfo.js");
    let warningAndSolution = require(__dirname + "/WarningAndSolutionSelectionAlgorithm");
    let adminCalls = require(__dirname + "/AdminCalls.js").ACC;

    // Include modules
    let http = require("http");
    const querystring = require("querystring");




    /*
        =========================
                Code Part
        =========================
    */

    let server = http.createServer(async function (req, res) {
        res.writeHead(200, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });

        try {
            if (CheckForResource(req, "/getsensorinfo")) {

                // jsonFetch("http://localhost:3910/getsensorinfo").catch(e => console.log(e));

                let response = await sensorInfo.SSIC.getSensorInfoQuery();
                res.write(JSON.stringify(response));
            }
            else if (CheckForResource(req, "/getpredictiondata")) {
                var queryUrl = queryStringParse(req.url); // This splits the url at the ? sign and returns the last part, so abc?def becomes def

                //jsonFetch("http://localhost:3910/getpredictiondata?room=0&date=2020-04-15T09:00:00").catch(e => console.log(e));

                if (queryUrl.room != null && queryUrl.date != null) {
                    let response = await prediction.PAC.getPredictionDatetimeQuery(queryUrl.room, queryUrl.date);
                    res.write(JSON.stringify(response));
                }
            }
            else if (CheckForResource(req, "/getwarningsandsolutions")) {
                var queryUrl = queryStringParse(req.url);

                //jsonFetch("http://localhost:3910/getwarningsandsolutions?room=0&date=2020-04-15T09:00:00").catch(e => console.log(e));

                if (queryUrl.room != null && queryUrl.date != null) {
                    let predictionData = await prediction.PAC.getPredictionDatetimeQuery(queryUrl.room, queryUrl.date);
                    let response = await warningAndSolution.WASC.getWarningsAndSolutions(predictionData);
                    res.write(JSON.stringify(response));
                }
            } 
            else if (CheckForResource(req, "/admin")) {
                var queryUrl = queryStringParse(req.url);

                if (CheckCredentials(new Credentials(queryUrl.Username, queryUrl.Password))) {
                    if (CheckForResource(req, "/getallwarningsandsolutions")) {
                        let response = await adminCalls.WASC.adminGetAllWarningsAndSolutions();
                        res.write(JSON.stringify(response));
                    }
                    else if (CheckForResource(req, "/addnewwarning")) {
                        if (queryUrl.sensorType != null && queryUrl.message != null) {
                            let response = await adminCalls.WASC.adminAddNewWarning(queryUrl.sensorType, queryUrl.message);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/removewarning")) {
                        if (queryUrl.warningID != null) {
                            let response = await adminCalls.WASC.adminRemoveWarning(queryUrl.warningID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/updatewarning")) {
                        if (queryUrl.warningID != null && queryUrl.message != null) {
                            let response = await adminCalls.WASC.adminUpdateWarning(queryUrl.warningID, queryUrl.message);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/addnewsolution")) {
                        if (queryUrl.warningID != null && queryUrl.priority != null && queryUrl.message != null) {
                            let response = await adminCalls.WASC.adminAddSolution(queryUrl.warningID, queryUrl.priority, queryUrl.message);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/removesolutionreference")) {
                        if (queryUrl.solutionID != null) {
                            let response = await adminCalls.WASC.adminRemoveSolutionReference(queryUrl.solutionID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/updatesolution")) {
                        if (queryUrl.solutionID != null && queryUrl.message != null && queryUrl.priority) {
                            let response = await adminCalls.WASC.adminUpdateSolution(queryUrl.solutionID, queryUrl.message, queryUrl.priority);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/addexistingsolution")) {
                        if (queryUrl.solutionID != null && queryUrl.warningID != null) {
                            let response = await adminCalls.WASC.adminAddExistingSolution(queryUrl.solutionID, queryUrl.warningID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/removesolution")) {
                        if (queryUrl.solutionID != null) {
                            let response = await adminCalls.WASC.adminRemoveSolution(queryUrl.solutionID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/getallsolutions")) {
                        let response = await adminCalls.WASC.adminGetAllSolutions();
                        res.write(JSON.stringify(response));
                    }
                    else if (CheckForResource(req, "/addnewroom")) {
                        if (queryUrl.roomName != null) {
                            let response = await adminCalls.SEC.adminAddNewRoom(queryUrl.roomName);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/removeroom")) {
                        if (queryUrl.roomID != null) {
                            let response = await adminCalls.SEC.adminRemoveRoom(queryUrl.roomID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/updateroom")) {
                        if (queryUrl.roomID != null && queryUrl.roomName != null) {
                            let response = await adminCalls.SEC.adminUpdateRoom(queryUrl.roomID, queryUrl.roomName);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/getallsensortypes")) {
                        let response = await adminCalls.SEC.adminGetAllSensorTypes();
                        res.write(JSON.stringify(response));
                    }
                    else if (CheckForResource(req, "/addnewsensortype")) {
                        if (queryUrl.typeName != null) {
                            let response = await adminCalls.SEC.adminAddNewSensorType(queryUrl.typeName);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/addexistingsensortype")) {
                        if (queryUrl.sensorType != null && queryUrl.sensorID != null && queryUrl.threshold != null) {
                            let response = await adminCalls.SEC.adminAddExistingSensorType(queryUrl.sensorType, queryUrl.sensorID, queryUrl.threshold);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/removesensortype")) {
                        if (queryUrl.sensorType != null) {
                            let response = await adminCalls.SEC.adminRemoveSensorType(queryUrl.sensorType);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/removesensortypereference")) {
                        if (queryUrl.sensorType != null) {
                            let response = await adminCalls.SEC.adminRemoveSensorTypeReference(queryUrl.sensorType);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/updatesensortypethreshold")) {
                        if (queryUrl.sensorID != null && queryUrl.sensorType && queryUrl.threshold != null) {
                            let response = await adminCalls.SEC.adminUpdateSensorTypeThreshold(queryUrl.sensorID, queryUrl.sensorType, queryUrl.threshold);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/getallsensors")) {
                        let response = await adminCalls.SEC.adminGetAllSensors();
                        res.write(JSON.stringify(response));
                    }
                    else if (CheckForResource(req, "/updatesensor")) {
                        if (queryUrl.sensorID != null && queryUrl.roomID) {
                            let response = await adminCalls.SEC.adminUpdateSensor(queryUrl.sensorID, queryUrl.roomID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/addnewsensor")) {
                        if (queryUrl.roomID != null) {
                            let response = await adminCalls.SEC.adminAddNewSensor(queryUrl.roomID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/removesensorreference")) {
                        if (queryUrl.sensorID != null) {
                            let response = await adminCalls.SEC.adminRemoveSensorReference(queryUrl.sensorID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/removesensor")) {
                        if (queryUrl.sensorID != null) {
                            let response = await adminCalls.SEC.adminRemoveSensor(queryUrl.sensorID);
                            res.write(JSON.stringify(response));
                        }
                    }
                    else if (CheckForResource(req, "/insertsensorvalue")) {
                        if (queryUrl.sensorID != null && queryUrl.sensorType && queryUrl.sensorValue != null) {
                            let response = await adminCalls.adminInsertSensorValue(queryUrl.sensorID, queryUrl.sensorType, queryUrl.sensorValue);
                            res.write(JSON.stringify(response));
                        }
                    }
                }
                else
                    CredentialsWrong(req, res);
            }
            else {
                console.log("Client (" + req.headers.host + ") Attempted to request resource: " + req.url + ". However the resource was not found.");
                res.writeHead(404, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
                res.write(JSON.stringify("Resource not found!"));
            }

        } catch (err) {
            console.log(err);
            res.write(JSON.stringify("An error occured on the server!"));
        }

        res.end();
    });

    function queryStringParse(url) {
        return querystring.parse(url.split("?")[1], "&", "=");
    }

    function CheckForResource(Request, TargetResource) {
        if (Request.url.includes(TargetResource)) {
            console.log("Client (" + Request.headers.host + ") requested resource: " + TargetResource);
            return true;
        }
        else return false;
    }

    function CheckCredentials(CredentialsInfo) {
        let credentialsCheck = false;

        AdminCredentials.forEach(function (v) {
            if (v.Username == CredentialsInfo.Username && v.Password == CredentialsInfo.Password)
                credentialsCheck = true;
        });

        return credentialsCheck;
    }

    function CredentialsWrong(req, res) {
        console.log("Client (" + req.headers.host + ") Attempted to request resource: " + req.url + " with wrong credentials");
        res.writeHead(404, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
        res.write(JSON.stringify("Wrong username or password"));
    }

    server.listen(3910);
    console.log("Node.js server is running and listening at port 3910.");

} catch (err) {
    /*
        =========================
            Main Error catch
        =========================
    */



    // Simplified error for missing modules
    if (err.code == "MODULE_NOT_FOUND")
        console.log("Use 'NPM INSTALL " + err.message.substring(err.message.indexOf("'"), err.message.lastIndexOf("'")) + "' to get the module");
    else
        console.log(err)

    console.log("\n Press any key to exit")
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on('data', process.exit.bind(process, 0))
}