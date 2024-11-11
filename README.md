![DAINFeature](https://github.com/user-attachments/assets/f8b630bf-8790-4c4e-a5e2-9e3c79ec73c0)

# DAIN Voice Assistant Feature

🤖 **DAIN Voice Assistant Feature** is an extension for DAIN’s AI platform, designed to provide hands-free, voice-based control for navigating and interacting with computers. This project aims to enhance accessibility and multitasking for users, allowing commands to be executed through voice, which is especially beneficial for those with disabilities or those who require hands-free control while performing tasks.

---

## 📖 About DAIN's Software

**DAIN** is a leading AI company dedicated to creating a Large Language Model (LLM) with a diverse range of features to cater to various user needs. DAIN’s platform enables both clients and developers to utilize and extend its functionalities:

- **Platform Link:** [DAIN Platform](https://platform.dain.org)
- **Documentation:** [DAIN Software Documentation](https://docs.dain.org/docs/getting-started/introduction)

Clients can interact with pre-built features, while software engineers can log in to develop new features, extending DAIN’s capabilities.

---

## 💡 Project Concept

The initial concept for this project was to develop a voice-activated AI assistant that could handle various tasks on behalf of the user, accommodating different types of users, especially those performing tasks or those with disabilities. Key features include:

1. **Voice-Based Navigation**: Allow users to navigate the internet using voice commands.
2. **Voice Reply**: DAIN responds with spoken feedback to enhance interactivity.
3. **Accessibility Focus**: Built with accessibility in mind to assist users with disabilities, providing an alternative to traditional mouse and keyboard navigation.

For more details, check the original project proposal document: [DAIN Voice Assistant Ideas](https://docs.google.com/document/d/11n0Rb9JMI2Jb7ZRkVxlT8zSZShz0XnHwEZPD0RmcRKY/edit?tab=t.0).

Thanks to our sponsor, **DAIN**, we have successfully integrated a voice-interaction feature, enabling users to control various actions on their computers using DAIN’s platform.

---

## 🛠️ Development Process

We explored three different approaches to create a seamless, voice-activated experience:

1. **Chrome Extension or OS Application**: Developed to interact with DAIN, allowing users to control their computers with voice commands via the Chrome browser.
2. **API Integration**: An API was deployed to communicate user actions to DAIN, which, in turn, controlled the operating system.
3. **Direct System Control with AST NPL Library**: This approach utilized the `ast` library to execute OS commands directly, such as mouse movements and scrolling.

Each method was tested to determine which approach provided the most efficient user experience.

---

## 💻 Technology Stack

Our tech stack included a combination of web and backend technologies, as well as DAIN’s platform-specific tools:

- **Chrome Extension Development**: Built with **JavaScript, HTML, and SCSS** to enable a user-friendly, voice-activated web browsing experience.
- **Backend (API Integration)**: Developed using **pyshell** in JavaScript to enable direct communication between DAIN’s feature and the operating system for executing commands.
- **System Control with AST Library**: Used **Python** and the **AST NPL** library to control OS-level actions directly, including mouse movements and scroll functions.
- **DAIN Platform Integration**: DAIN’s platform primarily runs on **TypeScript**. Our team had limited access to the core codebase and was able to add features but not alter DAIN’s main code.

### Key Technologies

- **JavaScript**: For frontend Chrome extension development.
- **HTML & SCSS**: To design and style the Chrome extension interface.
- **pyshell:**: Used in JavaScript to interface with Python commands for controlling the OS.
- **AST NPL Library**: A Python library that enables system-level control for executing commands like scrolling and clicking.
- **TypeScript**: Used in DAIN’s software ecosystem, which we worked with to extend, though with limited modification permissions.

---

## 🌐 API Endpoints

We developed an API that received requests from DAIN’s feature and translated them into actionable commands for the OS. Below are some of the initial endpoints used:

#### Example API URLs
- **Scroll Up**: `http://localhost/action/scroll/up`
- **Scroll Down**: `http://localhost/action/scroll/down`
- **Click at Specific Coordinates**:
  - `http://localhost/action/click/128/100`
  - `http://localhost/action/click/{x-coordinate}/{y-coordinate}`

#### API Responses
- **Check Action Endpoint**: `http://127.0.0.1:5000/check_action`
  ```json
  {
    "action": null,
    "direction": null
  }
  ```
  or
  ```json
  {
  "action": "scroll",
  "direction": "up"
  }
  ```
  or
  ```json
  {
  "action": "scroll",
  "direction": "down"
  }
  ```
  These endpoints and responses were essential for testing and ensuring effective communication between DAIN’s AI and the user’s operating system.

## 🔗 Resources and References

For inspiration and insights into enabling browser interaction through voice, we referred to this repository:

- **[GitHub Repository: Browser Control HackSC](https://github.com/gauravwarad/browser-control-hacksc)**

This project served as a guide for creating our initial API requests and understanding browser control possibilities.

## 🔗 Project on Devpost

Check out the project details on Devpost:

- **[Voicify on Devpost](https://devpost.com/software/voicify)**

This link provides an overview of the project, including features, development insights, and team contributions.


## Screenshots DEMO

![demo1](https://github.com/user-attachments/assets/d32e7b81-60f2-4e8f-8a22-e9f56543453a)


![demo2](https://github.com/user-attachments/assets/9537b961-17e3-4fae-8efb-176ff5aa91a7)


## TEAM Photo

![team](https://github.com/user-attachments/assets/a1f5b561-8abd-4d00-a938-1cf18c857cc3)




