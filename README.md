Oliver
======

Ask for permissions in the browser.

> Please sir, can I have more desktop permissions.
>
>  Oliver Twist

A small library to make issuing desktop notifications a breeze. [Demo](http://htmlpreview.github.io/?https://github.com/ConnorAtherton/oliver/blob/master/example/index.html)

```js
/* Create a new Oliver object. This acts
 * as a factory for all notifications so set global
 * options for all notifications here. They can be overwritten later
 */
var oliver = new Oliver({
	title: 'It\'s Austin'
});

/* Create a notification overwriting any defaults.
 * *title* and *body* are mandatory. Everything else is optional.
 *
 * See here for all options
 * https://developer.mozilla.org/en-US/docs/Web/API/notification
 */
var notification = oliver.notify({
	// title: 'Each notification is separate' -> would overwrite
	body: 'Notify me baby',
	icon: './austin.jpg',
});

// Attach events directly to the notification object
notification.onclick = function() {
	console.log('clicked the notificaton')
};

// Or add them as you normally would to any DOM element
notification.addEventListener('click', function() {
	console.log('Also clicked it.');
}, false);

```