# Usage of Tests

## Test 1 - Hello World

```bash
tsc test1.ts && node test1.js
```

## Terminal Tests

```bash

chr query \
    --blockchain-rid 4DD9B8DF5A3F0098B784762306DEB2EA602F9ED0D5257D31B0CEECC835A3FF83 \
    hello_world

chr query \
    --blockchain-rid 4DD9B8DF5A3F0098B784762306DEB2EA602F9ED0D5257D31B0CEECC835A3FF83 \
    create_user -- {name=Kaan, email=kaan@test.com}

```
