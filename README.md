# jquery.typing
A typing effect plugin for jQuery

Demo: http://nhutrinh.com

Ussage:

html
```html
<h1><span class="typing"></span></h1>
<p class="hidden">finally</p>
```
javascript
```javascript
$('h1 .typing').typing({
    strings:["Hi! this is jQuery typing plugin", "after typing I delete", "then I type again."],
    onComplete: function(){
        $('.hidden').fadeIn(3000);
    }
});
```
Options:

 - **strings**: an array of strings to be type. Default: my intro
 - **typeDelay**: typing speed (delay between key stroke). Default: 20ms
 - **deleteDelay**: a delay before delete. Default: 1000ms
 - **rewind**: set to true to start over again. (Not yet implement). Default: false
 - **startDelay**: Delay from the beginning. Default: 1000ms
 - **caretDelay**: Caret (typing cursor) blinking delay. Default 500ms
 - **onComplete**: Call back when complete.



