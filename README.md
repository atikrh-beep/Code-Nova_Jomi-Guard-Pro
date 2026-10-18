🛡️ Jomi Guard Pro

AI-Powered Land-Record Screening & Report Integrity Verification

<p align="center">
  A Government Technology prototype for structured land-record review, discrepancy screening, and report integrity verification.
</p><p align="center">
  <img src="https://img.shields.io/badge/Domain-GovTech-176B55?style=for-the-badge" alt="GovTech" />
  <img src="https://img.shields.io/badge/Project-Hackathon%20Prototype-2563EB?style=for-the-badge" alt="Hackathon Prototype" />
  <img src="https://img.shields.io/badge/UI-React%20%2B%20TypeScript-3178C6?style=for-the-badge" alt="React and TypeScript" />
  <img src="https://img.shields.io/badge/Status-Educational%20Prototype-CA8A04?style=for-the-badge" alt="Educational Prototype" />
</p><p align="center">
  <a href="https://github.com/atikrh-beep/Code-Nova_Jomi-Guard-Pro">Repository</a> •
  <a href="https://dlrs.gov.bd/">DLRS</a> •
  <a href="https://www.land.gov.bd/">Bangladesh Land Portal</a>
</p>---

📌 Project Overview

Jomi Guard Pro is a Government Technology (GovTech) prototype designed to support the preliminary screening and review of land-related records.

The platform aims to organize land cases, structure document-review workflows, highlight potential discrepancies where implemented, and support report integrity checks using trusted reference information.

By bringing relevant information and review findings into a structured interface, Jomi Guard Pro explores how digital tools can make land-record review more organized, transparent, and understandable.

«Our mission: Make preliminary land-record screening more structured, traceable, and accessible while keeping verification and legal decisions under appropriate human authority.»

🎯 Project Information

Item| Details
Project| Jomi Guard Pro
Hackathon Theme| Digital Land Records, Verification & Digitization
Domain| Government Technology
Presented by| Atikur Rahman & [Second Presenter’s Name]
Department| Computer Science and Engineering
University| Daffodil International University
Project Type| Educational hackathon prototype

✨ Core Features

The following describes the intended capabilities of the platform. Availability depends on what is implemented and operational in the current version.

🗂️ Land-Case Management

Organize land-related cases and their associated information in a structured workflow.

📄 Document Review

Support preliminary review of land-record information and associated case materials.

🔎 Discrepancy Reporting

Present potential inconsistencies for further examination where discrepancy-detection functionality is implemented.

🧾 Evidence & Findings

Structure review notes, observations, and supporting information to make findings easier to understand.

📊 Report Management

Organize and present case-review results in a consistent format.

🕘 Activity Tracking

Maintain a history of case-related actions where audit or activity logging is supported.

🔐 Report Integrity Verification

Compare a report's cryptographic hash against a trusted, previously recorded hash where this functionality is implemented.

🤖 AI-Assisted Processing

Support document analysis or explanations when the relevant AI integration is configured and operational.

---

🖥️ Technology Stack

The repository's package manifest identifies the following technologies. Some listed tools may be optional or used only in specific parts of the application.

Technology| Purpose
React| Component-based user interface
TypeScript| Typed application development
Vite| Development server and build tooling
Tailwind CSS| Utility-first styling
Lucide React| Interface icons
Motion| Interface animations
Node.js| JavaScript runtime
Express| Server framework, where used
Google Gen AI SDK| Gemini API integration, where configured
dotenv| Environment-variable management, where used

🏗️ Application Workflow

The intended review workflow can be represented as:

Case Registration → Document Review → Discrepancy Screening → Findings & Evidence → Report Generation → Integrity Check

Each stage depends on the functionality available in the running application. This workflow is a conceptual overview, not a claim that every stage is fully automated.

🚀 Getting Started

Follow these steps to run the project locally.

Prerequisites

- "Node.js" (https://nodejs.org/) — version 20.19.0 or newer
- npm
- "Git" (https://git-scm.com/)

1. Clone the repository

git clone https://github.com/atikrh-beep/Code-Nova_Jomi-Guard-Pro.git

2. Open the project directory

cd Code-Nova_Jomi-Guard-Pro

3. Install dependencies

npm install

4. Configure environment variables

Review the project's ".env.example" file, if available.

If an AI feature requires a Gemini API key, configure it through the appropriate environment or hosting settings. Follow the application's actual configuration requirements.

Security: Never commit API keys, passwords, or other private credentials to a public repository. Client-side environment variables must not be treated as secret.

5. Start the development server

npm run dev

Open the local address printed in your terminal.

The development server is configured to use port "3000" by default, subject to the current project configuration.

6. Build for production

npm run build

7. Preview the production build

npm run preview

Vite normally generates the production build in the "dist/" directory.

«Troubleshooting: If a command fails, check "package.json" for the available scripts, verify your Node.js version, and review any missing environment variables.»

🌐 Public Data & Reference Sources

The following public Bangladesh government websites provide reference information about land records and services.

Source| Relevance| Link
Department of Land Records and Surveys (DLRS)| Land-record and survey-related information| "dlrs.gov.bd" (https://dlrs.gov.bd/)
Online Land Record and Survey Management — Khatian Search| Public khatian search interface| "settlement.gov.bd/Khatian" (https://settlement.gov.bd/Khatian/)
Bangladesh Land Information Portal| Government land-service information| "land.gov.bd" (https://www.land.gov.bd/)

Data transparency: These are reference sources only. Their inclusion does not mean that Jomi Guard Pro downloads data from these websites, accesses government databases, or has an official government integration.

🧪 Demonstration Data

Sample identifiers used in demonstrations include:

- "RS-DEMO-101"
- "CS-DEMO-075"
- Plot number: "8-9-2"

These are illustrative demonstration values and must not be interpreted as real, authentic, or officially verified land records.

Any future use of real records must follow applicable access conditions, privacy requirements, and authorization rules.

🔐 Understanding Report Integrity

A cryptographic hash, such as SHA-256, can be used to compare a report file against a previously recorded integrity reference.

If the calculated hash matches a trusted reference, it provides evidence that the file contents match the contents represented by that reference.

However, a matching hash does not independently prove:

- Legal validity or authenticity of the document.
- Accuracy of the information it contains.
- Identity or authority of the document's issuer.
- Legal ownership of a property.
- Authenticity of the original reference hash.

The reliability of an integrity check depends on how the reference hash was created, protected, and verified.

Potential discrepancies and AI-generated findings must be reviewed by qualified people against appropriate source records.

🛡️ Security, Privacy & Responsible Use

Jomi Guard Pro is designed as an educational prototype. Responsible development and future deployment should prioritize:

- Credential protection: Keep API keys and secrets out of public repositories.
- Data minimization: Avoid collecting unnecessary personal or property information.
- Access control: Protect sensitive documents with appropriate authentication and authorization.
- Human oversight: Review AI-generated findings before relying on them.
- Authorized access: Obtain permission before accessing or integrating official systems.
- Transparent reporting: Clearly distinguish observed data, potential discrepancies, and unverified findings.
- Auditability: Protect activity records against unauthorized modification where audit logging is implemented.

🧰 Open-Source Tools & Credits

We acknowledge the maintainers and contributors of the open-source projects used in this application.

Project| Repository
React| "facebook/react" (https://github.com/facebook/react)
TypeScript| "microsoft/TypeScript" (https://github.com/microsoft/TypeScript)
Vite| "vitejs/vite" (https://github.com/vitejs/vite)
Tailwind CSS| "tailwindlabs/tailwindcss" (https://github.com/tailwindlabs/tailwindcss)
Lucide| "lucide-icons/lucide" (https://github.com/lucide-icons/lucide)
Motion| "motiondivision/motion" (https://github.com/motiondivision/motion)
Express| "expressjs/express" (https://github.com/expressjs/express)
dotenv| "motdotla/dotenv" (https://github.com/motdotla/dotenv)
Google Gen AI SDK| "googleapis/js-genai" (https://github.com/googleapis/js-genai)

The applicable licenses depend on the packages and versions actually used. Consult the corresponding license files and package metadata.

AI-Assisted Development

Development-related tasks and documentation were assisted by:

- "Google AI Studio" (https://aistudio.google.com/)
- "ChatGPT" (https://chatgpt.com/)

Additional AI tools should be credited if used by the team.

🔭 Future Roadmap

Potential improvements include:

- Authorized integration with official digital land-record services.
- Better document extraction and visual discrepancy highlighting.
- Stronger integrity-reference storage and digital signatures.
- More comprehensive, tamper-resistant audit trails.
- Workflow notifications and analytics.
- Bangla and English language support.
- Improved accessibility, security, and usability testing.

These items are proposed improvements, not claims of existing functionality.

⚖️ Disclaimer

Jomi Guard Pro is an educational hackathon prototype. It is not an official Bangladesh government service and does not independently establish land ownership, legal status, document authenticity, or legal validity.

All findings are preliminary and should be reviewed against appropriate records by authorized people. The application must not be used as a substitute for official verification, professional legal advice, or decisions by authorized government authorities.

📂 Repository

GitHub: "atikrh-beep/Code-Nova_Jomi-Guard-Pro" (https://github.com/atikrh-beep/Code-Nova_Jomi-Guard-Pro)

---

<p align="center">
  Built for the <strong>Digital Land Records, Verification & Digitization</strong> hackathon theme.
  <br />
  <strong>Jomi Guard Pro</strong> — Exploring more structured and transparent land-record review.
  <br /><br />
  <sub>Md.Atikur Rahman · Computer Science and Engineering · Daffodil International University</sub>
</p>