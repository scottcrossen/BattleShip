# Lab4-NodeREST

In this lab you will implement the cities RESTful service in Node.js that connects to your weather AJAX application. You will take a URL with a ?q=chars suffix and will look up all of the utah cities that have chose chars as a prefix. You will then return a JSON string corresponding to the entries.

You should utilize [this link](https://classroom.github.com/assignment-invitations/d1456a2f8324e42860d594dbae449f89) to get started. It will create a repository that already has the express generator run. If you haven't seen it run or perused the generated files before, check out this [documentation](https://expressjs.com/en/starter/generator.html).

The jquery application from a previous lab should be modified to make the jsonp request to your own REST server instead of the <a href="http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=P">one used</a> for your jquery lab. Before you do that, you should copy the related files over to your newly created express server. 

These [hints](https://github.com/BYUCS260/Lab4-NodeREST/wiki/Cities-REST-Service-Hints) may be helpful if you get stuck.

Once you have the getcity service working, implement a proxy for the [Owlbot](https://owlbot.info/api/v1/dictionary/owl) api that will allow the user to search for a word and see the definition. 


When you're finished, you should run your node application with something like:

nohup node ./bin/www >& output &

<strong>After you use nohup, make sure to exit by typing "exit" into the terminal (for PUTTY, there should be an equivalent if that doesn't work), otherwise the OS will kill the process in a short while.</strong>

Nohup directs the kernel to not send a HUP signal when you log out. the >& redirect stdout and stderr to the file output and the & on the end tells the script to run it in background. An alternative to nohup is to use a node package called "forever', but we sadly don't have time to cover all the various ways to do something.

To stop the server, run something like:

killall -ir 'node'

This will kill all processes that have 'node' in their name. The -i gives you a chance to confirm that you want to kill the job before it does it.

#### Passoff:

**You should test your server to make sure it works with your jquery script.**

Your submission to learningsuite should contain the url of your jquery front-end. You should have utilized [this link](https://classroom.github.com/assignment-invitations/d1456a2f8324e42860d594dbae449f89) to get started through github classroom.

#### Grading:

Behavior |	Approximate Points
 --- | ---
Your base url is of the form xxx.xxx:3004 and correctly serves static files (including your weather.html) | 10
You follow the page object specfications for routes and element IDs | 10
Your getcity service correctly returns the JSON containing the list of cities (all cities if no prefix given) | 20
You return the complete list of correct cities with the prefix given in the ?q=chars string | 10
Your jquery front-end correctly uses your getcity service instead of bioresearch.byu.edu... | 15
You implement a route that is a proxy for the Owlbot service that can be accessed by going to the owlRoute in the page object | 10
Your Owlbot route has associated front-end code, allowing the user to search for a word and be shown the definition | 15
Your code is correctly up to date on github, and your frontend page looks really good. This is subjective, so wow us. | 10
