# Revised Prompt Template: From Idea to Production Flow for Angular Application

**Project Goal:** To define, design, develop, test, and deploy an Angular application based on research into `[Project Topic]`, specifically tailored for the development of angular application, including stakeholder feedback and post-launch considerations.

**Instructions:** Execute the following steps sequentially. Replace `[Project Topic]` with the specific subject of the project. Ensure all technical constraints (Angular 19.2.4+, Standalone Components, NgRx SignalStore, Data Services with HttpClient/HttpResource, Vitest, Playwright) are considered where relevant, especially from Step 2 onwards.

---

## Phase 1: Planning & Design

### Step 1: Domain Research & Context Definition

* **Role:** Domain expert
* **Objective:** Understand the `[Project Topic]` thoroughly from the perspective of a Domain expert, Client, focusing on their problems, goals, workflows, and information needs relevant to a potential software solution.
* **Actions:**
    1.  Conduct web research on `[Project Topic]`.
    2.  **Focus:** Identify key concepts, common challenges, existing solutions (if any), relevant regulations or standards, typical data points, and workflows pertinent to a Domain expert interacting with this topic.
    3.  **Synthesize:** Create a summary document (`1_Research_Summary.md`) outlining these findings. Clearly state the implications for a software solution – what problems could it solve? What information must it manage/display?
    4.  **Curate Links:** Compile a list of authoritative/official sources and highly relevant links (`1_Relevant_Links.md`).
    5.  **(Optional) Visualize Complexity:** If the topic involves complex relationships, processes, or systems, create Mermaid diagrams (`1_Domain_Diagram.md` or embedded in the summary) to illustrate these concepts visually.
* **Deliverables:**
    * `1_Research_Summary.md`
    * `1_Relevant_Links.md`
    * `1_Domain_Diagram.md` (Optional, or embedded)

---

### Step 2: Product Requirements & Initial Technical Concept

* **Role:** Domain expert and Angular architect
* **Objective:** Translate research findings into functional software requirements and outline a high-level technical approach for the Angular application.
* **Actions:**
    1.  **Define Requirements:** Based on `1_Research_Summary.md`, create a Product Requirements Document (PRD) (`2_PRD.md`). Include:
        * Introduction: Brief overview and goals.
        * User Personas.
        * Key Features / User Stories.
        * Data Requirements.
        * Non-Functional Requirements (Performance, Security, Usability).
        * Technical Stack Summary (Angular 19.2.4+, Standalone, SignalStore, HttpClient/HttpResource).
    2.  **Outline App Concept:** Create an application concept document (`2_App_Concept.md`). Include:
        * High-Level Features Map (linking features to potential screens).
        * Proposed Folder Structure.
        * Initial Component List (structural/feature level).
        * State Management Sketch (what SignalStore will manage).
        * Data Service Strategy.
* **Deliverables:**
    * `2_PRD.md`
    * `2_App_Concept.md`

---

### Step 2.5: Stakeholder Review & Concept Refinement (NEW)

* **Role:** Product Owner / Project Manager (presenting), Key Stakeholders (Client, End-Users, Domain Experts, Technical Leads)
* **Objective:** Validate the defined requirements and high-level technical concept with stakeholders to ensure alignment and gather crucial feedback before proceeding.
* **Actions:**
    1.  **Present:** Share and walk through `2_PRD.md` and `2_App_Concept.md` with stakeholders.
    2.  **Gather Feedback:** Facilitate discussion and collect feedback on:
        * Accuracy and completeness of requirements.
        * Alignment with business goals and user needs.
        * Feasibility and appropriateness of the proposed technical approach.
        * Overall understanding of the application's scope and direction.
    3.  **Document:** Summarize the feedback and decisions made in `2.5_Feedback_Summary.md`.
    4.  **Refine:** Update `2_PRD.md` and `2_App_Concept.md` based on the agreed-upon feedback.
* **Deliverables:**
    * Updated `2_PRD.md`
    * Updated `2_App_Concept.md`
    * `2.5_Feedback_Summary.md`

---

### Step 3: User Experience (UX) Flows & UI Component Definition

* **Role:** UX/UI Designer
* **Objective:** Define how the user will interact with the application (based on the *refined* requirements) and identify the necessary UI building blocks.
* **Actions:**
    1.  **Map User Flows:** Based on the updated `2_PRD.md`, define major user interaction flows in `3_UX_Flows.md` (using lists, descriptions, and Mermaid diagrams for key flows).
    2.  **Identify UI Components:** List reusable UI elements needed across the application in `3_UI_Component_List.md` (atomic/molecular level: buttons, inputs, tables, cards, modals, etc.).
* **Deliverables:**
    * `3_UX_Flows.md` (including embedded Mermaid diagrams)
    * `3_UI_Component_List.md`

---

### Step 4: Task Breakdown & Acceptance Criteria

* **Role:** Product owner / Project Manager / Lead Developer
* **Objective:** Break down the development work into manageable tasks based on the refined requirements, concept, and UX flows, with clear completion criteria.
* **Actions:**
    1.  **Define Tasks:** Create a list of specific, actionable development tasks in `4_Implementation_Tasks.md`, grouped logically (by feature, component, etc.). Reference PRD, App Concept, UX Flows.
    2.  **Define Acceptance Criteria:** For each major task or feature, write clear, testable acceptance criteria confirming successful completion.
* **Deliverables:**
    * `4_Implementation_Tasks.md`

---

### Step 5: UI Mockups (HTML/CSS - Static)

* **Role:** Frontend developer / UI Designer
* **Objective:** Create static, responsive HTML and CSS mockups for core layouts and key screens based on UX flows and UI components, facilitating easy translation to Angular.
* **Actions:**
    1.  **Establish Basic Layout:** Create `index.html` and `styles.css` for the main shell.
    2.  **Mock Key Screens:** Create separate HTML files (e.g., `dashboard.html`, `feature_list.html`).
    3.  **Apply Styling:** Use `styles.css` for consistent styling, layout, typography, color, spacing, implementing styles for components from `3_UI_Component_List.md`.
    4.  **Prioritize Cleanliness & Migration:** Use semantic HTML and clear CSS conventions (like bem).
    5.  **Responsiveness:** Ensure mockups adapt to different screen sizes.
    6.  **Minimal JS:** Use `scripts.js` *only* for basic UI interactions needed in the mockup (e.g., toggles).
* **Deliverables:**
    * A folder named `5_UI_Mocks/` containing HTML, CSS, minimal JS, and optional assets.

---

### Step 5.5: Mockup Review & UI Approval (NEW)

* **Role:** Frontend Developer / UI Designer (presenting), Product Owner, Key Stakeholders
* **Objective:** Review the static UI mockups to ensure they accurately represent the intended user interface and gain approval before starting functional implementation.
* **Actions:**
    1.  **Present:** Demonstrate the static mockups (`5_UI_Mocks/`), showing key screens and responsiveness.
    2.  **Gather Feedback:** Collect feedback on visual design, layout, usability implications, and consistency.
    3.  **Document:** Summarize feedback and note any required revisions or approval in `5.5_Mockup_Review.md`.
    4.  **Refine (if needed):** Update the mockups based on feedback until approval is granted.
* **Deliverables:**
    * Approved (potentially revised) `5_UI_Mocks/`
    * `5.5_Mockup_Review.md`

---

## Phase 2: Implementation & Testing

### Step 6: Angular Implementation & Integrated Testing

* **Role:** Angular Developer(s)
* **Objective:** Develop the functional Angular application based on the preceding approved plans and designs, adhering to the specified technical stack and incorporating continuous testing.
* **Actions:**
    1.  **Project Setup:** Initialize Angular workspace (v19.2.4+, Standalone), configure linting/formatting, **integrate Vitest** and **set up Playwright**.
    2.  **Core Layout Implementation:** Build the main application layout components.
    3.  **Library Structure:** Set up feature libraries (`ng generate library...`).
    4.  **Routing:** Implement lazy-loaded routing (`provideRouter`, `loadComponent`).
    5.  **Shared Assets:** Create shared libraries/directories.
    6.  **Feature Implementation (Iterative):** Work through `4_Implementation_Tasks.md`:
        * Build Standalone Components (Signals, new control flow), translating from approved mockups.
        * Implement State Management (Local Signals, NgRx SignalStore for global/shared).
        * Develop Data Access Services (HttpClient/HttpResource).
        * Apply component styling.
    7.  **Integrated Testing:**
        * **Unit/Component Testing (Vitest):** Write tests alongside development for services, utilities, pipes, components. Mock dependencies.
        * **End-to-End Testing (Playwright):** Write E2E tests for critical user flows (`3_UX_Flows.md`) and acceptance criteria (`4_Implementation_Tasks.md`).
    8.  **Best Practices:** Adhere to Angular best practices, ensure code quality, documentation.
* **Deliverables:**
    * Functional Angular application source code (organized in libraries).
    * Comprehensive Vitest and Playwright test suites.
    * Running application implementing approved features and UI.

---

### Step 7: Quality Assurance (QA) & User Acceptance Testing (UAT)

* **Role:** QA Testers, Product Owner, Key Stakeholders / End Users
* **Objective:** Perform formal testing on the developed application to ensure it meets requirements, is free of critical defects, and is acceptable to end-users before release.
* **Actions:**
    1.  **QA Testing:** Execute test plans (manual or automated) covering functional requirements, non-functional requirements, usability, and regression testing. Log defects.
    2.  **Bug Fixing:** Development team addresses reported defects.
    3.  **UAT:** Key stakeholders or a sample of end-users test the application in a realistic environment (staging) to confirm it meets their needs and business objectives. Provide final feedback or sign-off.
* **Deliverables:**
    * QA Test Report(s)
    * Resolved Defect List
    * UAT Feedback / Sign-off Document

---

## Phase 3: Release & Operations

### Step 8: Deployment

* **Role:** DevOps / Development Team / Release Manager
* **Objective:** Release the tested and approved application to the production environment.
* **Actions:**
    1.  **Prepare Release:** Build the production version of the application, compile release notes.
    2.  **Execute Deployment:** Follow the deployment process (automated CI/CD pipeline or manual steps) to push the application to production servers.
    3.  **Post-Deployment Checks:** Verify the application is running correctly in production.
* **Deliverables:**
    * Deployed Application in Production
    * Release Notes

---

### Step 9: Monitoring, Maintenance & Iteration

* **Role:** DevOps / Development Team / Support Team / Product Owner
* **Objective:** Ensure the application runs smoothly in production, address issues, and plan for future improvements.
* **Actions:**
    1.  **Monitoring:** Actively monitor application performance, errors, and availability using appropriate tools.
    2.  **Maintenance:** Perform regular maintenance (dependency updates, security patches, bug fixes for issues found post-launch).
    3.  **Feedback Collection:** Gather user feedback from the live application.
    4.  **Iteration Planning:** Use monitoring data and user feedback to inform the backlog for the next development cycle (feature enhancements, optimizations).
* **Deliverables:**
    * Monitoring Dashboards / Alerts
    * Maintenance Logs / Patch Releases
    * Updated Product Backlog for future iterations

---