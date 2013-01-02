# jQuery.loadingmask
## License
Licence: <b>Apache License, Version 2.0</b>
## Requirements
jQuery version 1.8.3
# Example
```javascript
$('selector').loadingmask({
    message: 'Your Text' // or a jQuery element like $('<span class="your-class">Your Text</span>')
}).on('show.loadingmask hide.loadingmask destroy.loadingmask', function(e){
    console.log(e.type);
});
// show mask:
$('selector').loadingmask('show');
// hide mask:
$('selector').loadingmask('hide');
// destroy mask
$('selector').loadingmask('destroy');
// set an option
$('.userdata').loadingmask('option','message','Some new text...');
```
# Installation
Include
```html
<script type="text/javascript" src="jquery-loadingmask/jquery.loadingmask.min.js"></script>
<link rel="stylesheet" type="text/css" href="jquery-loadingmask/jquery.loadingmask.css" />
```
after the jQuery include tag in your head tag.

If you want to support <b>Internert Explorer 6</b>, you have to include this fix, too:
```html
<!--[if IE 6]>
<link rel="stylesheet" type="text/css" href="jquery-loadingmask/jquery.loadingmask-ie6.css" />
<![endif]-->
```