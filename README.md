<h1>Explanatory Video</h1>
<a href="https://youtu.be/zYAKCbzMw6w" target="_blank">Explanatory Video</a>

<h1>How to run this project locally?</h1>
<h2>Config</h2>
Create a .env file with variables PORT and MONGO_URI at the project root.
PORT is the desired application port; and MONGO_URI is MongoDB URI.<br/>

Alternative to MONGO_URI in the .env file, a <b>MongoDB</b> Server must run at <b>localhost:27017</b>.<br/>

<h2>Install Dependencies, Build and Execution</h2>
Make sure <b>TypeScript</b> is installed globally.<br/>
Then, run the following command at project root to install all the dependencies.<br/>

```bash
npm i
```

Then, execute the following command to build the project.
```bash
npm run build
```

Finally, excute this command to run the project.
```bash
npm run start
```


<h1>Features</h1>
<ol>
    <li>Client can register a new book.</li>
    <li>Client can see all books.</li>
    <li>Client can get info about an specific book by ID.</li>
    <li>Client can update an specific book by ID.</li>
    <li>Client can delete an specific book by ID.</li>
    <li>Client can request to borrow copies of a book.</li>
    <li>Client can see summary for all borrowed books.</li>
</ol>

