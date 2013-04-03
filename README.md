bigbadselect
============

A jQuery plugin for creating minimalistic custom select(s). It doesn't modify
anything about a `select` besides adding an html layer on top which can
be easily styled. Also works inline inside a `form`. So you do not need
to change anything to your current structure.

Doesn't use themes (who uses them anyways?).

Requirements
------------

jQuery version ~> 1.9.1

Example
-------

```js
$('select').bigbadselect();
```

Creates a simple DOM structure that is easily styled. The DOM structure
is as follows.

A select with:

```html
<select>
  <option value="CA">California</option>
  <option value="NY">New York</option>
</select>
```

Produces:

```html
<div class="selectify">
  <div class="selectify-current-container">California</div>
  <div class="selectify-options-container">
    <div class="selectify-option selected" data-val="CA">California</div>
    <div class="selectify-option" data-val="NY">New York</div>
  </div>
</div>
```

License
-------

MIT
