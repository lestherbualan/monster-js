---
sidebar_position: 3
---

# Polyfill

The MonsterJS polyfill will allow the MonsterJS applications to run on different browsers and be compatible with other javascript frameworks.

In MonsterJS application, polyfill is referenced inside `src/index.html`.

Example.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MonsterJS</title>
    <link rel="shortcut icon" href="#" type="image/x-icon">
</head>
<body>

    <app-root></app-root>
    
    <script src="/polyfill.js"></script>
    <script src="/index.js"></script>
</body>
</html>
```

The polyfill should be included first before the actual application codes which is `index.js`.
