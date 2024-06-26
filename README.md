# StudyHaven Project

Study buddy is a website where students can find resources for practice. It is completely open source and free for students. On StudyHaven, you can generate topical questions pdfs, custom questions using AI and plan your studies.

---

## Project Roadmap
### Current Features
- **Question Creator** – Generate custom questions based on a subject and topic using the power of AI. Uses google’s gemini-1.5-flash model.


- **Topical Questions** – Generate PDF documents of hundreds of questions correlating to specific topics the user can choose. You can generate pdfs based on the years of question papers, their subject, their component and topics.


- **Support for CIE A Levels** – StudyHaven supports CAIE A Level resources for a specific number of subjects.

### Upcoming Features (In Development)
- **Flash Cards** - Flashcards generator, users will be able to create flashcards that will have a word/keyword and a definition on the back. They can also export their flashcards as a pdf where they can print it double sided.


- **Sub-Topic Support** - Addition of choice of sub topics for the question creator to allow more flexibility and more accuracy in questions and answers.


- **Study Plan** – Use the website’s powerful timeline-based planner to plan how you spend your week relating to studies. You can choose specific goals in your study plan and gain points and achievements when you complete those goals. Goals can be completing specific past papers, completing specific topical papers. You can also add custom goals that can’t be tracked by the website, so you would have to label them as completed on your own.

 
- **Trusted Resources** – These are resources that the developer of the website trusts. These resources can range from websites that provide study material to PDFs that include notes on specific topics. They will also include the best books that are used for specific subjects.


- **Plan Advice** – Use the power of AI to generate a study plan that can benefit you. You can include multiple details such as how much time you would like to dedicate to studying per day, what activities you usually do daily and what activities you would like to add. The AI will generate a study plan that may benefit you based on your situation. You can include activities such as hobbies and other tests that you may be studying for. Uses google's gemini-1.5-flash model.
 

- **Profiles (About Me)** – Students can build their profile on StudyHaven to include a profile picture, their name, their nickname, their biography or about me, and more. The profile will list all the student’s achievements and subjects.

### Planned Features
- **Resource Forum** – A place where students can help each other by posting resources. The forum will be protected by (hopefully) an AI moderator to stop students from sending troll posts. Posts can include pdfs and/or website links to resources. PDF resources that are sent can be uploaded to the website under the condition that the size is less than 10 megabytes.
 

- **Support for IGCSE** – StudyHaven will support study resources for students of IGCSE (grade 9 and 10)
 

- **Support for Edexcel IAL** – StudyHaven will support study resources for students of Edexcel IAL.
---

## Project Technical Details

| Feature          | Packages Used                       |
|------------------|-------------------------------------|
| Website Frontend | Svelte, TailwindCSS, Vite, DaisyUI  |
| Website Backend  | Node.js, SvelteKit, Supabase        |
| AI Models        | Google's gemini-1.5-flash model     |
| PDF Generation   | pdf-lib                             |

---
## Latest Updates
### 24/06/2024
- Added flashcards function (Exporting will be available in the next update)
- Added a feature for you to regenerate questions in the question creator in case of bad question
- Added computer science from 2021 and economics paper 2 and 4 to topical questions
- 

### 20/06/2024
- Refined UI for larger devices.
- Added flash cards tab, actual feature is still in development
- Topical questions uses dropdown radio instead of select to match other dropdowns

---
## I'm Still Learning!
I'm still learning new concepts, this website was a test of my knowledge of svelte and sveltekit. If you encounter any issues on the website, or if you just want to reach out to me, please contact me at `mario.developer.183@gmail.com`

---
## Credits
- **Developers** – [Mario](https://portfolio.magery.dev/)

---
## Support Me
<a href="https://buymeacoffee.com/mario183" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
