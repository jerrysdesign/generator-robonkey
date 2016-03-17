# Functions

> Some useful functions

##### Table of contents


### Assets
> Function to set assets path

##### Use:

```sh
.foo {
  background-image: image('image.png');
}

@fontface {
  src: font('fontfolder/fontfile.eot');
}
```

##### Output:

```sh
.foo {
  background-image: url("../assets/images/image.png");
}

@fontface {
  src: url("../assets/fonts/fontfolder/fontfile.eot");
}
```

### Black and white opacity
> Black and white opacity shortcut function

##### Use:

```sh
.foo--black {
  background: black(.5);
}

.foo--white {
  background: white(.5);
}
```

##### Output:

```sh
.foo--black {
  background: rgba(0, 0, 0, 0.5);
}

.foo--white {
  background: rgba(255, 255, 255, 0.5);
}
```

### Ease
> Named easings to bezier function
##### Use:

```sh
.foo {
  transition: all .3s ease(in-out-circ);
}
```

##### Output:

```sh
.foo {
  transition: all 0.3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
}
```

### px to em/rem

 ##### Use:

 ```sh
 .foo {
   font-size: em(16px);
   width: rem(100);
 }
 ```

 ##### Output:

 ```sh
 .foo {
  font-size: 1em;
  width: 6.25rem;
}
 ```

### Fontweights

##### Use:
```sh
.foo {
  font-weight: fw(light);
}
```

##### Output:
```sh
.foo {
  font-weight: 300;
}
```


### Opposite direction

##### Use:

```sh
.foo {
  background-position: opposite-direction(top right);
}
```

##### Output:

```sh
.foo {
  background-position: bottom left;
}
```


## Docs

- [Home](/README.md)
- [Getting started](/docs/README.md)
- [Features](/docs/features.md)
- [Options](/docs/options.md)
- [Sass](/docs/sass/sass.md)
	- [Mixins](/docs/sass/mixins.md)
	- [Mixins](/docs/sass/mixins.md)