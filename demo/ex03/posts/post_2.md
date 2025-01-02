# HTML5 Basics to Advanced with Examples

HTML5 is the latest version of the HyperText Markup Language (HTML), used to structure content on the web. It introduces new features, APIs, and improved support for multimedia and mobile devices. This guide will take you from the basics to advanced HTML5 concepts, with examples, and tips for interview preparation.

---

## **Basic Concepts**

### 1. **HTML Structure**

A basic HTML document consists of the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Basic HTML5 Example</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a basic HTML5 page.</p>
</body>
</html>
```

### Explanation:

- `<!DOCTYPE html>`: Declares the document type and version (HTML5).
- `<html>`: The root element.
- `<head>`: Contains metadata like character set, title, and viewport settings.
- `<body>`: Contains the actual content visible to users.

>**Interview Tip:** Always include `<!DOCTYPE html>` in your HTML documents. It tells the browser to render the page in standards mode.

# 2. Basic HTML Elements

## Headings

`<h1>` to `<h6>` (h1 is the most important, h6 is the least)

```html
<h1>This is a Heading 1</h1>
<h2>This is a Heading 2</h2>
```

## Paragraphs

`<p>` tags are used for paragraphs.

```html
<p>This is a paragraph.</p>
```

## Links

`<a>` is used for hyperlinks.

```html
<a href="https://www.example.com">Visit Example</a>
```

## Images

`<img>` is used for embedding images.

```html
<img src="image.jpg" alt="An example image" width="300" height="200">
```

# Intermediate Concepts

## 3. Forms in HTML5

HTML5 introduces new input types like email, tel, date, etc., to help with form validation and user input.

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob">
    
    <button type="submit">Submit</button>
</form>
```

**Interview Tip:** Be familiar with HTML5 form elements like email, tel, date, range, and search. These provide built-in validation and are commonly asked in interviews.

## 4. HTML5 Semantic Elements

HTML5 introduced semantic tags that improve accessibility and SEO. These include:

`<header>`, `<footer>`, `<nav>`, `<article>`, `<section>`, `<aside>`, `<main>`, `<figure>`, and `<figcaption>`.

```html
<header>
    <h1>Welcome to My Website</h1>
</header>

<main>
    <section>
        <h2>About Us</h2>
        <p>Information about our company.</p>
    </section>
    
    <section>
        <h2>Our Services</h2>
        <p>Details of our services.</p>
    </section>
</main>

<footer>
    <p>© 2024 My Website. All rights reserved.</p>
</footer>
```

> **Interview Tip:** Understand the purpose of semantic tags and be prepared to explain how they improve accessibility and SEO.

----------------------

# Intermediate Concepts

## 3. Forms in HTML5

<details>
<summary>Click to view the HTML5 Form example</summary>

HTML5 introduces new input types like email, tel, date, etc., to help with form validation and user input.

```html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="dob">Date of Birth:</label>
    <input type="date" id="dob" name="dob">
    
    <button type="submit">Submit</button>
</form>





