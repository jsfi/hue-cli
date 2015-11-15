# hue-cli

> Control your hue lights on the command line

## Working commands

### Discover bridge

Returns the IP of the bridge.

```
--discover
-d
```

### Create new user

Creates a new user.
Optional parameter is username.
Default is hue-cli#username (whoami).

```
--createUser
--createUser hue-custom#myname
```

### Light

#### On

Set light state to on.

```
1 -n
```

#### Of

Set light state to off.

```
1 -f
```

#### Brightness

Number of light and integer.

```
1 100
```

#### Color

Number of light and rgb-array

```
1 255,0,0
```
