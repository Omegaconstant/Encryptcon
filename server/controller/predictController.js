const { spawn } = require("child_process");

module.exports.pred = async (req, res) => {
  const data = req.body.data;
  const content = [
    {
      username: "admin",
      first_name: "",
    },
  ];
  const outputData = await new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", ["untitled14.py"]);

    pythonProcess.stdin.write(JSON.stringify(content));
    pythonProcess.stdin.end();
    let outputData = "";

    pythonProcess.stdout.on("data", (data) => {
      outputData += data.toString();
    });
    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`Python script exited with code ${code}`));
        return;
      }

      try {
        const result = JSON.parse(outputData);
        resolve(result);
      } catch (error) {
        reject(new Error("Failed to parse output data"));
      }
    });
    // const timeout = setTimeout(() => {
    //   pythonProcess.kill();
    //   reject(new Error("Script execution timed out"));
    // }, 5000); // Timeout after 5 seconds

    // pythonProcess.on("close", (code) => {
    //   clearTimeout(timeout);
    //   console.log(`child process exited with code ${code}`);
    // });
  });
  // let options = {
  //   mode: "text",
  //   pythonPath: "python3", // path to your python executable
  //   pythonOptions: ["-u"],
  //   scriptPath: "", // path to your python script
  //   args: [JSON.stringify(content)],
  // };

  // PythonShell.run("untitled14.py", options, (err, results) => {
  //   if (err) {
  //     console.error(err);
  //     res.status(500).json({ error: "Error executing Python script" });
  //     return;
  //   }

  //   const result = JSON.parse(results[0]); // Assuming your Python script returns JSON
  //   res.json({ result });
  // });

  //   let pyshell = new PythonShell("./untitled14.py");
  //   pyshell.send([JSON.stringify(content)]);

  //   pyshell.on("message", function (message) {
  //     // received a message sent from the Python script (a simple "print" statement)
  //     console.log(message);
  //   });

  //   pyshell.end(function (err, code, signal) {
  //     if (err) throw err;
  //     console.log("The exit code was: " + code);
  //     console.log("The exit signal was: " + signal);
  //     console.log("finished");
  //   });
  //   res.json({ receivedData: data });
};
