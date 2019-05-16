import http from "http";
import { exec } from "child_process";

const sleep = (msec: number) =>
  new Promise(resolve => setTimeout(resolve, msec));

async function init() {
    const command = "yarn start:server";
    const appProcess = exec(command);
    appProcess.stdout!.pipe(process.stdout);
    appProcess.stderr!.pipe(process.stderr);
    process.on("exit", () => {
      appProcess.kill();
    });
  
    console.log("sleep...");
    await sleep(5000);
}

async function request (url: string) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, res => {

      res.on("data", chunk => {
        console.log(`BODY: ${chunk.length}`);
      });
      res.on("end", () => {
        console.log("No more data in response.");
        req.end()
      });
      resolve()
    });
    req.on("error", e => {
      console.log(`problem with request: ${e.message}`);
      reject(e)
    });
    req.end();
  })
}

async function main() {
  await init()

  console.log("request");
  const url = "http://localhost:5650";

  const count = 10000;
  for (let i = 0; i < count; i++) {
    console.log(i)
    await request(url)
  }

}

main();
