# TouchPortal Message Key Press Plugin

- [TouchPortal Message Key Press Plugin](#touchportal-message-key-press-plugin)
- [Description](#description)
- [Change Log](#change-log)
- [System Requirements](#system-requirements)
- [Action](#action)
- [Build Notes](#build-notes)
  - [Your own build](#your-own-build)
- [Dependencies](#dependencies)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Bugs/Enhancements](#bugsenhancements)
- [Acknowledgements](#acknowledgements)

# Description
Touch Portal's default "Write Text" action uses copy/paste functionality.  This plugin adds the capability of actual keypresses of a set of text instead of the copy/paste method.  Currently only standard ASCII characters from a US keyboard are valid and supported.  Extended Latin characters are in the works but aren't working properly but will be an enhancement later.

# Change Log
```
v1.0.0 - Initial Release
    Actions:
      - Type Keys from String - type out a string like if it was typed on a keyboard
    States: None
    Events: None
```

# System Requirements

- Touch Portal (of course)
- **System Level Java** (even though this plugin is in Node.JS, it requires java to do the keypress actions)
  - currently tested with the following version available from [java.com](https://java.com)
  ```
  java version "1.8.0_333"
  Java(TM) SE Runtime Environment (build 1.8.0_333-b02)
  Java HotSpot(TM) 64-Bit Server VM (build 25.333-b02, mixed mode)
  ```
# Action
Only 1 action is provided from this plugin currently

![Action](resources/action-list.png)

- Type Keys from String
  - Desc: Takes in a string (max 4000 characters will work) and will then start typing those characters like using a keyboard. 


# Build Notes

Due to using `pkg` to build the binary, we also bring in the key-press jar file but need to make sure that the directory is properly setup in node-key-sender.js, so prior to build need to change node-key-sender.js to use `'.'` instead of `__dirname` for the jar path.

Instead of this: `var jarPath = path.join(__dirname, 'jar', 'key-sender.jar');`

The plugin needs this: `var jarPath = path.join(".", 'jar', 'key-sender.jar');`

## Your own build

If you want to build this yourself, you will need to fork then clone the repo
run `npm install` to pull in the dependencies

make the modification in the **Build Notes** section to the node_modules/node-key-sender/node_key_sender.js file

once ready, run one of the following depending on your OS of choice. It will package the code into a binary, and drop a .tpp file into the Installers directory

Windows: run `npm run build-win`

Mac(Intel): coming soon 

Mac(Arm64): coming soon

Linux: coming soon

# Dependencies
 - [node-key-sender](https://www.npmjs.com/package/node-key-sender)
 - [pkg](https://www.npmjs.com/package/pkg)
 - [touchportal-api](https://www.npmjs.com/package/touchportal-api)
 - [Java](https://www.java.com)

# Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/spdermn02/touchportal_messagekeypress/tags).

# Authors

- **Jameson Allen** - _Initial work_ - [Spdermn02](https://github.com/spdermn02)

# License

This project is licensed under the MIT license - see the [LICENSE](LICENSE) file for details

# Bugs/Enhancements
Use the Github Issues tab to report any bugs/enhancements for this plug-in. Or mention them in the Official Touch Portal discord channel #message-keypress

# Acknowledgements
1. Thank you to Reinier and Ty the Touch Portal Creators
2. Thank you to Gitago for testing initially
3. Thank you to Magicker for additional testing