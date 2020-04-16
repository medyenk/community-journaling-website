## Project Feedback

### Successes
* Really well polished UI 
* Well commented for the first project. This shouldn't be required in future projects unless there is something specific that needs to be communicated.
* implemented the post-redirect-get loop. Well done.
* The start of some good documentation. This can be developed and built upon earlier in future projects. Very promising.

### Improvements
* `app.js` ln 30 - this will get easily lost => needs to be under import statements
* could use a templating engine like ejs. This would require a bit of a refactor, but will make life easier to serve files rather than using `res.sendFile...`
* `app.js` post on line 30 => any function method should ideally be kept to under 30 lines, otherwise it can get a bit unruly. This is right on the edge. Getting the date in the desired format/structure could be abstracted to it's own function. Additionally, line 42 (`commentText`) is never used - get rid. 
* `APIKEY` in `search.js` was committed to public repo. This is never a great idea. This should be in a `.env` file.
* again in `search.js` there is a lot going on in the fetch's second `.then(...)` could this be abstracted to a function to be called?
* `main.js` - this achieves the end goal, but the fetch is 125 lines long. Could/should this functionality be handled using a different approach? 
* `gifpass.js` has a lot of repetition of functionality. This should be abstracted into a single function and called recursively with variables interpoleted into the appropriate strings. Twice is fine, but three times you should look to abstract.

* lots of `console.log()`s left in code - these should be for debugging and thus removed before committing and pushing to github. Also, is `bash.exe.stackdump` needed for the project? Likewise - tidy up and remove redundant code.


### Comments

* Some good practices visible and developing well.
* using a templating engine would have abstracted chunks of your html into smaller, more manageable template. This is something worth looking at for future projects for readability and maintainability. 
* obvious that files have been written by different people due to the mix and match of ES5/6 (`main.js` uses ES5). This is decision that needs to be made as a team and adhered to unless a library/module specifically requires it.


Overall, this was a really solid first project. There was alot of good here, but a collection of smaller things to be considered and ironed out for the next project. Good Job, Well Done! 