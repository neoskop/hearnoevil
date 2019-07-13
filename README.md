# 🙉

Mute you monitors when doing something evil.

## Synopsis

`hearnoevil` (🙉) is a CLI that enables you to disable and re-enable a check of an external monitoring service. Currently only [Uptime Robot][1] is supported, however. You can use this tool, when you don't want anyone to notice when you do something evil ... or when deploying.

## Usage

You can either start the CLI as a Docker container:

```
$ docker run neoskop/hearnoevil -a <api-key> -i <id-1> -i <id-2> mute
$ docker run neoskop/hearnoevil -a <api-key> -i <id-1> -i <id-2> unmute
```

Or you can install an NPM package and run the CLI directly:

```
$ npm i -g @neoskop/hearnoevil
$ hearnoevil -a <api-key> -i <id-1> -i <id-2> mute
$ hearnoevil -a <api-key> -i <id-1> -i <id-2> unmute
```

## License

This project is under the terms of the Apache License, Version 2.0. A [copy of this license](LICENSE) is included with the sources.

[1]: https://www.uptimerobot.com
