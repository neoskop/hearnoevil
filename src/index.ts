#!/usr/bin/env node

import program from "commander";
import { Provider } from "./providers/provider";
import { UptimeRobotProvider } from "./providers/uptime-robot.provider";

const loadProvider = (
  name: string,
  ids: string[],
  apiKey: string
): Provider => {
  switch (name) {
    case "uptimerobot":
      return new UptimeRobotProvider(ids, apiKey);
  }

  throw new Error(`Provider ${name} is not supported`);
};

const executeProviderCommand = async (
  providerConsumer: (provider: Provider) => Promise<void[]>
): Promise<void[]> => {
  const provider = loadProvider(program.service, program.id, program.apiKey);
  return providerConsumer(provider);
};

program
  .version("0.0.1")
  .description("Mute you monitors when doing something evil.")
  .option("-s, --service <service>", "The monitor service", "uptimerobot")
  .option("-a, --api-key <api-key>", "API key")
  .option(
    "-i, --id <value>",
    "The ID of the monitor (repeatable)",
    (value, previous) => {
      return previous.concat([value]);
    },
    []
  );
program
  .command("mute")
  .description("Mute a monitor")
  .action(() => {
    executeProviderCommand(p => {
      return p.mute();
    }).catch(err => {
      console.error(`Muting failed: ${err}`);
      process.exit(1);
    });
  });
program
  .command("unmute")
  .description("Unmute a monitor")
  .action(() => {
    executeProviderCommand(p => {
      return p.unmute();
    }).catch(err => {
      console.error(`Unmuting failed: ${err}`);
      process.exit(1);
    });
  });

program.parse(process.argv);

const commandName = process.argv[process.argv.length - 1];

if (
  (commandName !== "mute" && commandName !== "unmute") ||
  program.id === undefined ||
  program.apiKey === undefined
) {
  program.outputHelp();
  process.exit(1);
}
