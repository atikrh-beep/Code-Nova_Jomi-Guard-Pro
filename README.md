🛡️ Jomi Guard Pro

AI-Powered Land Record Screening and Report Integrity Verification System

AI Hackathon Project
Team Members: Atikur Rahman and [Second Presenter’s Name]
Department: Computer Science and Engineering
University: Daffodil International University

About the Project

Jomi Guard Pro is a government-technology prototype designed to support structured land-record screening, case management, review workflows, and report integrity checking.

Land administration involves reviewing documents, comparing land identifiers, recording findings, and maintaining a traceable workflow. Jomi Guard Pro explores how digital tools and AI-assisted document processing can help make these activities more organized and efficient.

Our vision: Help government officers review land-related cases more systematically while supporting accountability, transparency, and responsible decision-making.

Key Features

- Case Intake: Collect structured land-case information.
- Review Workspace: Organize cases and review progress.
- Findings and Evidence: Record observations and supporting information.
- Report Management: Organize reports within the application workflow.
- Audit Trail: Provide activity history where implemented.
- Role-Based Access: Support access according to assigned roles.
- Public Report Integrity Checking: Check report contents against a trusted integrity record where implemented.
- AI-Assisted Processing: Support document analysis and explanations where the relevant AI functionality is configured.

Feature availability depends on the current implementation.

Technology Stack

- React 19 — User interface
- TypeScript — Application development
- Vite — Development server and build tooling
- CSS and Tailwind CSS — Styling
- Google GenAI SDK — AI integration dependency
- Node.js and npm — Development environment and package management

How to Run Locally

Prerequisites

- Node.js 20.19.0 or newer
- npm
- Git

1. Clone the repository

git clone https://github.com/atikrh-beep/Code-Nova_Jomi-Guard-Pro.git
cd Code-Nova_Jomi-Guard-Pro

2. Install dependencies

npm install

3. Configure environment variables

Review ".env.example". If your local setup requires Gemini API access, configure the required "GEMINI_API_KEY" securely using the method supported by the application.

Never commit API keys or other secrets to GitHub.

The example environment file also defines "APP_URL", which may be supplied by the hosting environment.

4. Start the development server

npm run dev

Open the local address shown in the terminal. The configured Vite development server uses port "3000" by default.

5. Create a production build

npm run build

The production build is generated in the "dist" directory.

To preview the build locally:

npm run preview

Data Used

The project uses demonstration land-case information to illustrate its workflows. Example fields include:

- Mouza or locality
- RS and CS Khotian references
- Dag or plot number
- Recorded land quantity and area unit
- Land classification
- Registration reference
- Recorded party name
- Officer notes and review findings

Example identifiers such as "RS-DEMO-101", "CS-DEMO-075", and "8-9-2" are synthetic demonstration values, not evidence of live government-record access.

No live government database integration is claimed unless it has been implemented and authorized.

AI Tools Used

- Google AI Studio: AI-assisted application development and code generation.
- ChatGPT: Project planning, documentation, and development guidance.
- Additional tools: List Cursor, Codex, or other tools if used during the project workflow.

The Google GenAI SDK is included as a dependency. Actual AI functionality requires the relevant code and configuration; the presence of the dependency alone does not establish that every AI feature is operational.

Government and Public Benefits

Jomi Guard Pro explores how digital workflows could help:

- Reduce repetitive document-handling work.
- Identify potential inconsistencies for further review.
- Organize case findings and supporting information.
- Improve visibility into case progress.
- Maintain clearer activity histories.
- Support report-integrity checking.
- Establish a foundation for future authorized integration with digital land-record systems.

These are intended benefits that require testing and evaluation before real-world deployment.

Limitations and Responsible Use

- AI-generated findings require human review.
- The system does not independently establish land ownership or make legally binding decisions.
- Hash comparison can help detect file changes but does not establish legal validity or factual accuracy.
- Government-system integration requires authorization and appropriate security controls.
- Data handling and access protection depend on the actual implementation.

Future Improvements

- Authorized integration with digital land-record systems.
- Improved document extraction and discrepancy detection.
- Stronger report-integrity records and digital signatures.
- Workflow analytics and notifications.
- Bangla and English language support.
- Security testing and pilot deployment.

Project Details

- Project: Jomi Guard Pro
- Domain: Government Technology
- Hackathon Theme: Digital Land Records, Verification & Digitization
- Repository: https://github.com/atikrh-beep/Code-Nova_Jomi-Guard-Pro
- Live Demo: https://code-nova-jomi-guard-pro.vercel.app/

Disclaimer

Jomi Guard Pro is an AI Hackathon prototype. It is not an official government service and does not replace authorized land records, legal advice, or government decisions.

---

Built for the AI Hackathon at Daffodil International University.