Jomi Guard Pro

AI-Powered Land-Record Screening and Report Integrity Verification System

Hackathon Theme: Digital Land Records, Verification & Digitization
Domain: Government Technology
Presented by: Atikur Rahman and Mir Abrar Rahman
Department: Computer Science and Engineering
University: Daffodil International University

---

About the Project

Jomi Guard Pro is a government-technology prototype designed to support the preliminary screening and review of land-related records. It provides a structured approach to case management, document review, discrepancy reporting, and report integrity checking.

The goal is to make land-record review more organized, transparent, and easier to understand while supporting responsible digital workflows.

Jomi Guard Pro is a prototype and does not replace official land records, legal advice, or decisions made by authorized government authorities.

Key Features

- Land-Case Management: Organize land-related cases and their associated information.
- Document Review: Support the preliminary review of land-record information.
- Discrepancy Reporting: Present potential inconsistencies for further examination where implemented.
- Evidence and Findings: Organize review notes and supporting information.
- Report Management: Structure and present case-review results.
- Activity Tracking: Maintain a history of actions where supported by the implementation.
- Report Integrity Checking: Compare report files against trusted integrity records where implemented.
- AI-Assisted Processing: Support document analysis or explanations when the relevant AI functionality is configured and operational.

Feature availability depends on the current implementation and configuration.

Technology Stack

The repository's package manifest includes the following technologies:

Technology| Purpose
React| User interface
TypeScript| Application development
Vite| Development server and build tooling
Tailwind CSS| Styling
Lucide React| Icons
Motion| Interface animations
Node.js| JavaScript runtime
Express| Web server framework, where used
Google Gen AI SDK| Gemini API client, where integrated

Open-Source Tools and Credits

We acknowledge the maintainers and contributors of the open-source projects used in this application.

- React: https://github.com/facebook/react
- TypeScript: https://github.com/microsoft/TypeScript
- Vite: https://github.com/vitejs/vite
- Tailwind CSS: https://github.com/tailwindlabs/tailwindcss
- Lucide: https://github.com/lucide-icons/lucide
- Motion: https://github.com/motiondivision/motion
- Express: https://github.com/expressjs/express
- dotenv: https://github.com/motdotla/dotenv
- Google Gen AI SDK: https://github.com/googleapis/js-genai

These projects are maintained by their respective authors and communities. Their names and trademarks belong to their respective owners. Refer to each project's license and the installed package versions for applicable license terms.

AI-assisted development: Google AI Studio and ChatGPT were used to assist with development-related tasks and documentation. Other tools should be credited if they were used by the team.

Public Data and Reference Sources

The following public Bangladesh government websites provide reference information about land records and services:

1. Department of Land Records and Surveys (DLRS):
   https://dlrs.gov.bd/

2. Online Land Record and Survey Management — Khatian Search:
   https://settlement.gov.bd/Khatian/

3. Bangladesh Land Information Portal:
   https://www.land.gov.bd/

These links are listed as public reference sources. Their inclusion does not mean that data was downloaded from these websites or that the application is connected to government databases.

Demonstration Data

Sample identifiers, including "RS-DEMO-101", "CS-DEMO-075", and plot number "8-9-2", are illustrative demonstration values. They should not be interpreted as real or officially verified land records.

Any future use of actual records must comply with applicable access conditions, privacy requirements, and authorization rules.

How to Run Locally

Prerequisites

- Node.js 20.19.0 or newer
- npm
- Git

Step 1: Clone the repository

git clone https://github.com/atikrh-beep/Code-Nova_Jomi-Guard-Pro.git

Step 2: Enter the project directory

cd Code-Nova_Jomi-Guard-Pro

Step 3: Install dependencies

npm install

Step 4: Configure environment variables

Review the ".env.example" file. If an AI feature requires a Gemini API key, configure it securely through the appropriate environment or hosting settings.

Never publish API keys, passwords, or private credentials in a public repository.

Step 5: Start the development server

npm run dev

Open the local URL printed in the terminal. The project's development script uses port "3000" by default.

Step 6: Build for production

npm run build

To preview the production build locally:

npm run preview

The production build is generated in the "dist/" directory.

Report Integrity and Responsible Screening

Cryptographic hashes can help determine whether a report file matches a previously recorded file hash. A matching hash supports a conclusion that the file contents match that stored integrity reference.

However, a hash match alone does not establish:

- Legal validity of a document
- Accuracy of the information contained in it
- Identity or authority of the issuer
- Legal ownership of land

Potential discrepancies and AI-generated findings require human review and comparison with appropriate source records.

Security and Privacy

- Do not expose API keys or credentials.
- Use only documents that you are authorized to access.
- Avoid collecting or publishing unnecessary personal information.
- Protect sensitive records with appropriate access controls.
- Review AI-generated findings before relying on them.
- Obtain authorization before connecting to official government systems.

Future Improvements

- Authorized integration with official digital land-record services
- Improved document extraction and discrepancy highlighting
- Stronger report-integrity records and digital signatures
- More comprehensive audit trails
- Notifications and workflow analytics
- Bangla and English language support
- Accessibility, security, and usability testing

These are potential improvements and should not be interpreted as features already completed.

Repository

GitHub: https://github.com/atikrh-beep/Code-Nova_Jomi-Guard-Pro

Disclaimer

Jomi Guard Pro is an educational hackathon prototype. It is not an official government service and does not independently establish land ownership, legal status, or document validity. All findings should be reviewed against appropriate records by authorized people.