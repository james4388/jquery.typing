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
