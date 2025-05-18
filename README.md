#  LeetCode User Statistics Dashboard

A dynamic and responsive web application that allows users to view their LeetCode problem-solving statistics in real time. Built with HTML, CSS, and JavaScript, this dashboard fetches data from the LeetCode GraphQL API and displays it in a user-friendly format with visual indicators and detailed submission stats.

---

##  Features

###  Username Validation
- Ensures the LeetCode username format is valid using a regular expression.
- Prevents empty or incorrectly formatted inputs.

###  Real-Time API Integration
- Uses GraphQL to fetch user data from LeetCode.
- Integrates via a CORS proxy for smooth API access.

###  Progress Visualization
- Animated circular progress bars show completion status for:
  - Easy problems
  - Medium problems
  - Hard problems
- Auto-calculates progress percentage using CSS custom properties.

###  Submission Stats Summary
- Displays:
  - Overall submissions
  - Easy/Medium/Hard problem submissions
- Data is presented in responsive and neatly styled stat cards.

###  Error Handling & User Feedback
- Uses `try-catch-finally` blocks for robust error handling.
- Displays meaningful alerts and error messages for better user experience.

---

##  Tech Stack

- **HTML5** – Markup and structure
- **CSS3** – Styling and layout (including animated progress circles)
- **JavaScript (ES6+)** – DOM manipulation, event handling, and async API calls
- **GraphQL** – Used to query data from LeetCode’s API
- **CORS Anywhere Proxy** – Enables API access by bypassing CORS limitations

---


##  How It Works

1. **User enters their LeetCode username.**
2. **The app validates the username format.**
3. **GraphQL request is sent to LeetCode via a CORS proxy.**
4. **Response data is parsed and displayed dynamically.**
5. **Progress circles and submission stats are updated on the page.**

