const questions = [
    // ===== HTML QUESTIONS (1–15) =====
    {
        category: "html",
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0,
        explanation: "HTML = Hyper Text Markup Language. It's the standard language for creating web pages."
    },
    {
        category: "html",
        question: "Which HTML element is used for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        correct: 2,
        explanation: "<h1> is the largest heading. Headings go from <h1> (biggest) to <h6> (smallest)."
    },
    {
        category: "html",
        question: "What is the correct HTML element for inserting a line break?",
        options: ["<break>", "<lb>", "<br>", "<newline>"],
        correct: 2,
        explanation: "<br> is a self-closing tag that creates a line break."
    },
    {
        category: "html",
        question: "Which attribute specifies a unique identifier for an HTML element?",
        options: ["class", "name", "id", "key"],
        correct: 2,
        explanation: "The id attribute gives an element a unique identifier. No two elements should share the same id."
    },
    {
        category: "html",
        question: "What does the <a> tag define?",
        options: ["An image", "A paragraph", "A hyperlink", "A heading"],
        correct: 2,
        explanation: "The <a> (anchor) tag creates hyperlinks to other pages or resources."
    },
    {
        category: "html",
        question: "Which input type creates a checkbox?",
        options: [
            '<input type="check">',
            '<input type="checkbox">',
            '<input type="tick">',
            '<checkbox>'
        ],
        correct: 1,
        explanation: "type='checkbox' creates a checkbox input element."
    },
    {
        category: "html",
        question: "What is the purpose of the <meta> tag?",
        options: [
            "To create a paragraph",
            "To provide metadata about the HTML document",
            "To add a hyperlink",
            "To insert an image"
        ],
        correct: 1,
        explanation: "The <meta> tag provides metadata (character set, viewport, description) that isn't displayed on the page."
    },
    {
        category: "html",
        question: "Which tag is used to define an unordered list?",
        options: ["<ol>", "<list>", "<ul>", "<li>"],
        correct: 2,
        explanation: "<ul> creates an unordered (bulleted) list. <ol> creates an ordered (numbered) list."
    },
    {
        category: "html",
        question: "What does the 'required' attribute do on an input element?",
        options: [
            "Makes the input read-only",
            "Sets the input value",
            "Prevents form submission if empty",
            "Changes input color"
        ],
        correct: 2,
        explanation: "The 'required' attribute blocks form submission until the user fills in that field."
    },
    {
        category: "html",
        question: "Which HTML element defines the document's body?",
        options: ["<content>", "<body>", "<main>", "<page>"],
        correct: 1,
        explanation: "<body> contains all the visible content of an HTML document."
    },
    {
        category: "html",
        question: "What is a semantic HTML element?",
        options: [
            "An element with no meaning",
            "An element that describes its meaning to browser and developer",
            "An element that only works in Chrome",
            "An element that requires JavaScript"
        ],
        correct: 1,
        explanation: "Semantic elements (<header>, <nav>, <section>, <article>) clearly describe their purpose."
    },
    {
        category: "html",
        question: "Which attribute makes a link open in a new tab?",
        options: [
            'href="new"',
            'target="_blank"',
            'open="new"',
            'window="new"'
        ],
        correct: 1,
        explanation: 'target="_blank" tells the browser to open the link in a new tab or window.'
    },
    {
        category: "html",
        question: "What is the correct way to add a comment in HTML?",
        options: [
            "// comment",
            "/* comment */",
            "<!-- comment -->",
            "# comment"
        ],
        correct: 2,
        explanation: "HTML uses <!-- --> for comments. These are invisible to users but readable in source code."
    },
    {
        category: "html",
        question: "Which element is used to embed a JavaScript file?",
        options: ["<js>", "<javascript>", "<script>", "<code>"],
        correct: 2,
        explanation: "The <script> tag either contains JavaScript code or links to an external .js file via the src attribute."
    },
    {
        category: "html",
        question: "What is the purpose of the 'alt' attribute on images?",
        options: [
            "Sets image width",
            "Provides alternative text if image cannot load",
            "Changes image color",
            "Makes image clickable"
        ],
        correct: 1,
        explanation: "The 'alt' attribute describes the image for accessibility and when the image fails to load."
    },

    // ===== CSS QUESTIONS (16–30) =====
    {
        category: "css",
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Syntax"
        ],
        correct: 2,
        explanation: "CSS = Cascading Style Sheets. 'Cascading' means styles can override each other based on specificity."
    },
    {
        category: "css",
        question: "Which CSS property changes text color?",
        options: ["font-color", "text-color", "color", "foreground"],
        correct: 2,
        explanation: "The 'color' property sets the text color. 'background-color' sets the background."
    },
    {
        category: "css",
        question: "What does 'display: none' do?",
        options: [
            "Makes element transparent",
            "Completely removes element from page layout",
            "Makes element invisible but keeps its space",
            "Moves element off-screen"
        ],
        correct: 1,
        explanation: "'display: none' removes the element entirely. 'visibility: hidden' hides it but keeps the space."
    },
    {
        category: "css",
        question: "Which selector targets elements with class='header'?",
        options: ["#header", ".header", "header", "*header"],
        correct: 1,
        explanation: "A dot (.) targets classes. A hash (#) targets IDs. No prefix targets element names."
    },
    {
        category: "css",
        question: "What is the CSS box model order (outside to inside)?",
        options: [
            "Content → Padding → Border → Margin",
            "Margin → Border → Padding → Content",
            "Border → Margin → Padding → Content",
            "Padding → Content → Border → Margin"
        ],
        correct: 1,
        explanation: "From outside in: Margin (space outside) → Border → Padding (space inside) → Content."
    },
    {
        category: "css",
        question: "What does 'box-sizing: border-box' do?",
        options: [
            "Adds a border to all elements",
            "Makes padding and border included in the element's total width/height",
            "Changes the border color",
            "Removes all margins"
        ],
        correct: 1,
        explanation: "border-box includes padding and border in the element's width, preventing layout surprises."
    },
    {
        category: "css",
        question: "Which property creates rounded corners?",
        options: ["corner-radius", "border-curve", "border-radius", "round-corner"],
        correct: 2,
        explanation: "border-radius rounds corners. Use pixels (10px) or percentages (50% = circle)."
    },
    {
        category: "css",
        question: "What does 'position: relative' do?",
        options: [
            "Removes element from normal flow",
            "Positions element relative to the viewport",
            "Allows offset without affecting other elements' positions",
            "Centers the element"
        ],
        correct: 2,
        explanation: "'position: relative' lets you offset an element with top/left/right/bottom without disturbing neighbors."
    },
    {
        category: "css",
        question: "How do you apply a style only when the user hovers over an element?",
        options: [
            ".element:active",
            ".element:hover",
            ".element:focus",
            ".element:mouseover"
        ],
        correct: 1,
        explanation: ":hover is a pseudo-class that applies styles when the mouse is over the element."
    },
    {
        category: "css",
        question: "What is a CSS variable?",
        options: [
            "A JavaScript variable used in CSS",
            "A custom property defined with -- prefix, reusable across the stylesheet",
            "A browser default style",
            "An animation keyframe"
        ],
        correct: 1,
        explanation: "CSS variables (custom properties) use --name syntax and are accessed with var(--name)."
    },
    {
        category: "css",
        question: "What does 'flex: 1' do?",
        options: [
            "Sets font size to 1",
            "Makes the element take up all available space in a flex container",
            "Adds 1px border",
            "Sets opacity to 1"
        ],
        correct: 1,
        explanation: "'flex: 1' tells a flex child to grow and fill all remaining space in the flex container."
    },
    {
        category: "css",
        question: "Which unit is relative to the root element's font size?",
        options: ["px", "em", "rem", "vh"],
        correct: 2,
        explanation: "'rem' = root em. It's relative to the <html> font size (usually 16px). 'em' is relative to the parent."
    },
    {
        category: "css",
        question: "What does 'z-index' control?",
        options: [
            "Zoom level",
            "Element width",
            "Stacking order (which element appears on top)",
            "Animation speed"
        ],
        correct: 2,
        explanation: "z-index controls the stacking order. Higher values appear in front of lower values."
    },
    {
        category: "css",
        question: "What is the purpose of '@keyframes'?",
        options: [
            "To import external stylesheets",
            "To define animation sequences with start and end states",
            "To create media queries",
            "To declare variables"
        ],
        correct: 1,
        explanation: "@keyframes defines animation steps. You name it and reference it with the 'animation' property."
    },
    {
        category: "css",
        question: "What does 'media query' do in CSS?",
        options: [
            "Plays audio files",
            "Imports images",
            "Applies styles based on device properties (like screen width)",
            "Creates animations"
        ],
        correct: 2,
        explanation: "Media queries let you apply different styles for different screen sizes (responsive design)."
    },

    // ===== JAVASCRIPT QUESTIONS (31–50) =====
    {
        category: "javascript",
        question: "What is the correct way to declare a variable that can be reassigned?",
        options: ["const x = 5", "let x = 5", "var x = 5", "Both let and var"],
        correct: 3,
        explanation: "Both 'let' and 'var' allow reassignment. 'const' creates a constant. 'let' is preferred over 'var'."
    },
    {
        category: "javascript",
        question: "What does document.getElementById('test') return?",
        options: [
            "All elements with id 'test'",
            "The single element with id='test', or null",
            "A boolean",
            "The element's text content"
        ],
        correct: 1,
        explanation: "getElementById returns the ONE element matching that ID, or null if not found."
    },
    {
        category: "javascript",
        question: "What is an arrow function?",
        options: [
            "A function that draws arrows on screen",
            "A shorter syntax for writing functions using =>",
            "A function that only runs once",
            "A function with no return value"
        ],
        correct: 1,
        explanation: "Arrow functions use => instead of the function keyword: (x) => x * 2 instead of function(x) { return x * 2; }"
    },
    {
        category: "javascript",
        question: "What does .addEventListener() do?",
        options: [
            "Creates a new HTML element",
            "Attaches a function to run when a specific event occurs",
            "Removes an event from an element",
            "Styles an element"
        ],
        correct: 1,
        explanation: "addEventListener tells the browser: 'when THIS event happens on THIS element, run THIS function.'"
    },
    {
        category: "javascript",
        question: "What is .textContent used for?",
        options: [
            "Getting/setting the CSS of an element",
            "Getting/setting the text inside an element",
            "Creating a new text file",
            "Adding text animation"
        ],
        correct: 1,
        explanation: ".textContent is a property that reads or writes the text inside an HTML element."
    },
    {
        category: "javascript",
        question: "What does localStorage.setItem('key', 'value') do?",
        options: [
            "Sends data to a server",
            "Saves a key-value pair in the browser permanently",
            "Creates a cookie",
            "Deletes local data"
        ],
        correct: 1,
        explanation: "localStorage saves data in the browser. It persists even after closing the tab or browser."
    },
    {
        category: "javascript",
        question: "What will console.log(typeof []) output?",
        options: ['"array"', '"object"', '"list"', '"undefined"'],
        correct: 1,
        explanation: "In JavaScript, arrays are technically objects. Use Array.isArray() to check if something is an array."
    },
    {
        category: "javascript",
        question: "What does .classList.add('hidden') do?",
        options: [
            "Creates a new HTML element called 'hidden'",
            "Adds the CSS class 'hidden' to an element",
            "Hides the page",
            "Deletes the element"
        ],
        correct: 1,
        explanation: "classList.add() adds a CSS class. classList.remove() removes it. classList.toggle() switches it."
    },
    {
        category: "javascript",
        question: "What is the difference between == and ===?",
        options: [
            "No difference",
            "== checks value only; === checks value AND type",
            "=== is for strings only",
            "== is faster"
        ],
        correct: 1,
        explanation: "== converts types before comparing (1 == '1' is true). === requires same type AND value (1 === '1' is false)."
    },
    {
        category: "javascript",
        question: "What does JSON.parse() do?",
        options: [
            "Converts a JavaScript object to a string",
            "Converts a JSON string back into a JavaScript object",
            "Validates JSON syntax",
            "Sends JSON to a server"
        ],
        correct: 1,
        explanation: "JSON.parse() reads a JSON string and creates a JS object. JSON.stringify() does the reverse."
    },
    {
        category: "javascript",
        question: "What is the purpose of setInterval()?",
        options: [
            "Runs a function once after a delay",
            "Runs a function repeatedly at fixed time intervals",
            "Pauses the program",
            "Sets the time zone"
        ],
        correct: 1,
        explanation: "setInterval(fn, ms) calls fn every ms milliseconds. clearInterval() stops it."
    },
    {
        category: "javascript",
        question: "What does .forEach() do?",
        options: [
            "Creates a new array",
            "Runs a function once for each item in an array",
            "Filters array items",
            "Sorts the array"
        ],
        correct: 1,
        explanation: ".forEach() loops through every item: [1,2,3].forEach(x => console.log(x)) prints 1, 2, 3."
    },
    {
        category: "javascript",
        question: "What does .filter() return?",
        options: [
            "A single value",
            "A new array containing only items that pass a test",
            "The original array modified",
            "A boolean"
        ],
        correct: 1,
        explanation: ".filter() creates a new array with items where the callback returns true."
    },
    {
        category: "javascript",
        question: "What is an object in JavaScript?",
        options: [
            "A number type",
            "A collection of key-value pairs",
            "A type of function",
            "An HTML element"
        ],
        correct: 1,
        explanation: "Objects store data as key-value pairs: { name: 'John', age: 25 }."
    },
    {
        category: "javascript",
        question: "What does .map() do?",
        options: [
            "Creates a geographic map",
            "Transforms each item in an array and returns a new array",
            "Finds a single item",
            "Removes items from an array"
        ],
        correct: 1,
        explanation: ".map() creates a new array by transforming each element: [1,2,3].map(x => x*2) returns [2,4,6]."
    },
    {
        category: "javascript",
        question: "What is event.preventDefault() used for?",
        options: [
            "Stops all JavaScript",
            "Prevents the browser's default action (like form submission reloading the page)",
            "Prevents other events from firing",
            "Prevents CSS from loading"
        ],
        correct: 1,
        explanation: "preventDefault() stops default browser behavior. For forms, it prevents page reload on submit."
    },
    {
        category: "javascript",
        question: "What does the spread operator (...) do?",
        options: [
            "Multiplies numbers",
            "Expands an array or object into individual elements",
            "Creates a loop",
            "Compares two values"
        ],
        correct: 1,
        explanation: "The spread operator unpacks: [...arr1, ...arr2] merges arrays. {...obj1, ...obj2} merges objects."
    },
    {
        category: "javascript",
        question: "What is a callback function?",
        options: [
            "A function that calls itself",
            "A function passed as an argument to another function",
            "A function that returns HTML",
            "A function that only runs on page load"
        ],
        correct: 1,
        explanation: "A callback is a function passed to another function to be called later, like in addEventListener or forEach."
    },
    {
        category: "javascript",
        question: "What does .querySelector('.btn') return?",
        options: [
            "All elements with class 'btn'",
            "The first element matching the CSS selector '.btn'",
            "A boolean",
            "The element's style"
        ],
        correct: 1,
        explanation: "querySelector returns the FIRST matching element. querySelectorAll returns ALL matching elements."
    },
    {
        category: "javascript",
        question: "What is template literal syntax in JavaScript?",
        options: [
            "Using single quotes: 'hello'",
            "Using backticks with ${}: `Hello ${name}`",
            "Using double quotes: \"hello\"",
            "Using plus sign: 'hello' + name"
        ],
        correct: 1,
        explanation: "Template literals use backticks (`) and ${} to embed variables: `Hello ${name}` instead of 'Hello ' + name."
    }
];