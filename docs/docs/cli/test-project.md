---
sidebar_position: 6
---

# Test project

MonsterJS CLI provides a command to test the project to make sure everything is working as expected.

## Test command

To test the project we can run the following command:

```bash
mn test
```

### Command options

| Options | Description | Value type | Default |
| --- | --- | --- | --- |
| --env <value\> | Test the project using the specified environment. | string | |
| --mode <value\> | This is an option to test the application in different modes. Same as webpack's '--mode' option. (choices: "development", "production", "none", default: "development") | string | development |
| --watch | This is an option to keep the test command running and rerun the test when there is a change in the application. | boolean | |
