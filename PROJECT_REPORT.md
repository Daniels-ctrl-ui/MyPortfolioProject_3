# Personal Academic Portfolio and Student Management Website Report

## 1. Introduction
This project was developed as a personal academic portfolio and student management website for Daniels Olubi Chukwuebuka. The goal was to create a polished, responsive website that highlights the student's academic interests, agricultural background, creative strengths and practical problem-solving approach while also including a functional academic planner and a client-side contact form.

## 2. Project Overview
The website contains five main pages:
- Home
- About Me
- Projects
- Academic Planner
- Contact

The design uses a deep navy and warm cream palette with muted green accents to create a professional and calm academic feel. The layout is clean, responsive and beginner-friendly.

## 3. Project Objectives
The project aims to:
- Present Daniels' academic identity honestly and professionally.
- Show his interests in Data Science, agriculture and creative thinking.
- Highlight practical experience without inventing qualifications or achievements.
- Demonstrate HTML, CSS and JavaScript fundamentals required in COS 106.
- Include functional student-planning features using JavaScript and local browser storage.
- Implement a contact form with validation for learning purposes.

## 4. Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript
- Local Storage
- Semantic HTML structure
- Responsive layout design

## 5. Website Pages and Features
### Home page
Includes:
- Welcome message
- Personal introduction
- Navigation links
- Profile placeholder image
- Overview cards
- Academic and interest summary table

### About Me page
Includes:
- Education section
- Agricultural experience section
- Entrepreneurial journey section
- Creative interests section
- Skills and interests categories
- Video section with local placeholder media

### Projects page
Includes:
- Three project cards
- Filter buttons by category
- Agricultural business section
- Data demonstration with sample dataset and chart

### Academic Planner page
Includes:
- Add task form
- Priority selection
- Due date field
- Task list
- Completed and pending filters
- Task statistics
- localStorage persistence

### Contact page
Includes:
- Clickable email links and phone links
- Contact form validation for required fields
- Email format validation
- Digits-only phone validation
- Frontend demo message

## 6. Screenshots and Explanations
Suggested screenshots to capture for the final report:
1. Home page hero section
2. About Me page with education and agricultural sections
3. Projects page with the three cards
4. Academic Planner page before and after adding a task
5. Contact page with validation message and contact details
6. Mobile navigation view

These images should be inserted where they best illustrate each major section of the project.

## 7. JavaScript Implementations
### Main.js
Purpose:
- Theme switching
- Mobile navigation menu
- Scroll reveal animations
- Dynamic footer year

Important variables:
- `body`
- `themeToggle`
- `menuToggle`
- `nav`

Key functions:
- `applyTheme()`
- `IntersectionObserver` logic

### Planner.js
Purpose:
- Manage academic tasks
- Save items to localStorage
- Filter tasks
- Update statistics

Important variables:
- `storageKey`
- `tasks`
- `currentFilter`

Key functions:
- `getTasks()`
- `saveTasks()`
- `renderTasks()`
- `addTask()`
- `toggleTask()`
- `deleteTask()`

### Projects.js
Purpose:
- Filter project cards by category

Important variables:
- `filterButtons`
- `projectCards`

Key function:
- `applyFilter()`

### Contact.js
Purpose:
- Validate form fields
- Give user feedback

Important variables:
- `fullNameInput`
- `emailInput`
- `phoneInput`

Key function:
- `setError()`

## 8. Codebase Explanation with Relevant Snippets
The project is organised into separate HTML, CSS and JavaScript files to make the code beginner-friendly. The shared layout and styling are in `css/style.css`, while each page-specific interactive feature is handled by dedicated JavaScript files.

Example concept: `localStorage`
```javascript
const storageKey = 'danielsPlannerTasks';
localStorage.setItem(storageKey, JSON.stringify(tasks));
```
This stores tasks in the browser, so they remain available after a refresh.

Example concept: event handling
```javascript
button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  renderTasks();
});
```
This listens for user clicks and updates the task view dynamically.

Example concept: validation
```javascript
if (!/^\d+$/.test(phoneInput.value.trim())) {
  setError('phone', 'Use digits only, without spaces, brackets or the plus sign.');
  isValid = false;
}
```
This ensures the phone number follows the assignment requirement.

## 9. Testing and Results
The website was tested by opening each page in a browser and checking:
- layout and navigation
- colour theme toggle
- project filter function
- academic planner add and delete logic
- task persistence in localStorage
- contact form validation
- responsiveness across different viewport widths

## 10. Conclusion
This project demonstrates a beginner-friendly portfolio and student management website that follows the assignment requirements while remaining understandable and easy to explain. It combines personal branding, academic presentation and functional JavaScript examples in a clear and professional way.

## 11. Hosted Website Link
This project has not been published yet. To publish it later, the files can be uploaded to GitHub and then deployed with a free hosting service such as Netlify.

## 12. GitHub Repository Link
A GitHub repository link should be added after the project is uploaded to GitHub.

## Suggested Final Presentation Steps
1. Open the site locally in a browser.
2. Capture the required screenshots.
3. Add the images to the report.
4. Export the markdown report to PDF for submission.
5. Create a GitHub repo and publish the website.
