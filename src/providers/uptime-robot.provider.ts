import * as request from "request";
import { Provider } from "./provider";

export class UptimeRobotProvider extends Provider {
  public mute(): Promise<void[]> {
    return Promise.all(
      this.ids.map(id => this.sendEditMonitorRequest({ id, status: 0 }))
    );
  }

  public unmute(): Promise<void[]> {
    return Promise.all(
      this.ids.map(id => this.sendEditMonitorRequest({ id, status: 1 }))
    );
  }

  private sendEditMonitorRequest(props: any): Promise<void> {
    const form = Object.assign({ api_key: this.apiKey, format: "json" }, props);
    return new Promise((resolve, reject) => {
      request.post(
        {
          url: "https://api.uptimerobot.com/v2/editMonitor",
          form
        },
        (error: any, response: request.Response, body: any) => {
          if (error) {
            reject(error);
            return;
          }

          if (response.statusCode !== 200) {
            reject(`Failed with status code ${response.statusCode}`);
            return;
          }

          const parsedBody = JSON.parse(body);

          if (parsedBody.stat !== "ok") {
            reject(`Failed with error ${JSON.stringify(parsedBody.error)}`);
            return;
          }

          resolve();
        }
      );
    });
  }
}
